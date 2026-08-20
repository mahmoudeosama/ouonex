import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe2,
  Menu,
  Minus,
  X,
} from 'lucide-react';
import Mockup from '@/components/Mockup';
import { products, services } from '@/data/products';
import {
  useSmoothScroll,
  useNavScroll,
  useHeroIntro,
  useParallax,
  useTimelineDraw,
  useStaggerReveal,
  useMagneticButton,
  useCustomCursor,
  Reveal,
} from '@/hooks/useAnimations';

type Locale = 'en' | 'ar';

type Copy = {
  nav: { products: string; services: string; work: string; about: string; contact: string; cta: string };
  hero: { eyebrow: string; title: string; accent: string; body: string; primary: string; secondary: string; note: string };
  products: { label: string; title: string; body: string; view: string };
  services: { label: string; title: string; body: string; details: string };
  process: { label: string; title: string; body: string };
  work: { label: string; title: string; body: string; view: string };
  about: { label: string; title: string; body: string; points: string[] };
  cta: { title: string; accent: string; body: string; button: string };
  contact: { label: string; title: string; body: string; name: string; email: string; project: string; message: string; submit: string; placeholder: string };
  footer: { statement: string; rights: string; email: string; whatsapp: string; phone: string };
};

const copy: Record<Locale, Copy> = {
  en: {
    nav: { products: 'Products', services: 'Services', work: 'Work', about: 'About', contact: 'Contact', cta: 'Start a project' },
    hero: { eyebrow: 'Independent digital product studio / 2026', title: 'We build digital products.', accent: 'For ourselves. And for you.', body: 'OUONEX designs and builds mobile apps, web platforms, SaaS products and digital experiences — from idea to launch.', primary: 'Start a project', secondary: 'Explore our products', note: 'Scroll to explore' },
    products: { label: '01 / Products', title: 'Built by OUONEX.', body: 'A growing collection of focused software products, shaped by real needs and built with care.', view: 'View product' },
    services: { label: '02 / Services', title: 'Need something built?', body: 'From idea to launch, we design and develop digital products for real businesses and real users.', details: 'Learn more' },
    process: { label: 'How we work', title: 'From an idea to a real product.', body: 'Clear thinking, deliberate design and disciplined engineering — in one continuous line of work.' },
    work: { label: '03 / Selected work', title: 'Made for the moments that matter.', body: 'A selection of OUONEX products. Client work will join this collection as it takes shape.', view: 'Explore work' },
    about: { label: '04 / About OUONEX', title: 'Product thinking, engineering discipline.', body: 'We combine product thinking, design and engineering to make software people can actually use. No noise. Just useful, considered digital products.', points: ['Built for real users.', 'Designed with intention.', 'Engineered to scale.', 'Focused on the product.'] },
    cta: { title: 'Have an idea?', accent: "Let's build it.", body: "Tell us what you're building and we'll help turn the idea into a real digital product.", button: 'Start a conversation' },
    contact: { label: '05 / Contact', title: 'Tell us what you’re building.', body: 'A short note is enough to start. Share the shape of the idea, and we’ll take it from there.', name: 'Your name', email: 'Email address', project: 'Project type', message: 'Tell us about the project', submit: 'Send inquiry', placeholder: 'Your message will open a conversation.' },
    footer: { statement: 'We build digital products for the next generation.', rights: '© 2026 OUONEX. All rights reserved.', email: 'EMAIL_ADDRESS', whatsapp: 'WHATSAPP_NUMBER', phone: 'PHONE_NUMBER' },
  },
  ar: {
    nav: { products: 'المنتجات', services: 'الخدمات', work: 'أعمالنا', about: 'عن OUONEX', contact: 'تواصل معنا', cta: 'ابدأ مشروعًا' },
    hero: { eyebrow: 'استوديو مستقل للمنتجات الرقمية / ٢٠٢٦', title: 'نبني المنتجات الرقمية.', accent: 'لنا. ولك.', body: 'تصمم OUONEX تطبيقات الهاتف والمنصات الرقمية ومنتجات SaaS والتجارب الرقمية — من الفكرة إلى الإطلاق.', primary: 'ابدأ مشروعًا', secondary: 'اكتشف منتجاتنا', note: 'مرر للاستكشاف' },
    products: { label: '٠١ / المنتجات', title: 'من بناء OUONEX.', body: 'مجموعة متنامية من المنتجات البرمجية المركزة، صُممت لاحتياجات حقيقية وبُنيت بعناية.', view: 'شاهد المنتج' },
    services: { label: '٠٢ / الخدمات', title: 'لديك فكرة تحتاج إلى بناء؟', body: 'من الفكرة إلى الإطلاق، نصمم ونطور منتجات رقمية للشركات والمستخدمين الحقيقيين.', details: 'اعرف المزيد' },
    process: { label: 'طريقة عملنا', title: 'من فكرة إلى منتج حقيقي.', body: 'تفكير واضح، تصميم مقصود وهندسة منضبطة — في مسار عمل واحد متكامل.' },
    work: { label: '٠٣ / أعمال مختارة', title: 'مصممة للحظات المهمة.', body: 'مجموعة من منتجات OUONEX. ستنضم أعمال العملاء إلى هذه المجموعة مع نموها.', view: 'استكشف الأعمال' },
    about: { label: '٠٤ / عن OUONEX', title: 'تفكير منتج. وانضباط هندسي.', body: 'نجمع بين التفكير في المنتج والتصميم والهندسة لصناعة برمجيات يستخدمها الناس فعلاً. بدون ضجيج، فقط منتجات رقمية مفيدة ومدروسة.', points: ['مصمم للمستخدم الحقيقي.', 'مصمم بقصد.', 'هندسة قابلة للنمو.', 'التركيز على المنتج.'] },
    cta: { title: 'لديك فكرة؟', accent: 'لنبنها معًا.', body: 'أخبرنا بما تعمل عليه وسنساعدك في تحويل الفكرة إلى منتج رقمي حقيقي.', button: 'ابدأ محادثة' },
    contact: { label: '٠٥ / تواصل', title: 'أخبرنا بما تعمل عليه.', body: 'رسالة قصيرة تكفي للبدء. شاركنا ملامح الفكرة، وسنتولى الباقي.', name: 'الاسم', email: 'البريد الإلكتروني', project: 'نوع المشروع', message: 'حدثنا عن المشروع', submit: 'إرسال الاستفسار', placeholder: 'ستفتح رسالتك محادثة جديدة.' },
    footer: { statement: 'نبني منتجات رقمية للجيل القادم.', rights: '© ٢٠٢٦ OUONEX. جميع الحقوق محفوظة.', email: 'EMAIL_ADDRESS', whatsapp: 'WHATSAPP_NUMBER', phone: 'PHONE_NUMBER' },
  },
};

const steps = ['Idea', 'Strategy', 'Design', 'Build', 'Launch', 'Scale'];
const stepsAr = ['الفكرة', 'الاستراتيجية', 'التصميم', 'البناء', 'الإطلاق', 'النمو'];

function App() {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem('ouonex-locale') as Locale | null;
    if (saved) return saved;
    return navigator.language.toLowerCase().startsWith('ar') ? 'ar' : 'en';
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const t = copy[locale];
  const isArabic = locale === 'ar';

  useEffect(() => {
    localStorage.setItem('ouonex-locale', locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }, [locale, isArabic]);

  useSmoothScroll();
  useNavScroll();
  useMagneticButton();
  useCustomCursor();
  useParallax('[data-hero-showcase]', 40);
  useTimelineDraw('[data-timeline-line]');
  useStaggerReveal('[data-service-list]', 0.08);
  useStaggerReveal('[data-timeline-steps]', 0.1);
  useStaggerReveal('[data-work-grid]', 0.12);
  useStaggerReveal('[data-about-points]', 0.08);

  const heroRef = useHeroIntro();

  // Deduplicate: each column shows unique products only
  const showcaseColumns = useMemo(() => {
    const cols: typeof products[] = [[], [], []];
    products.forEach((p, i) => cols[i % 3].push(p));
    return cols;
  }, []);

  const jump = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="site-shell">
      <div className="grain-overlay" aria-hidden="true" />

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="OUONEX home">OUONEX<span className="wordmark-dot">.</span></a>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <button onClick={() => jump('products')}>{t.nav.products}</button>
          <button onClick={() => jump('services')}>{t.nav.services}</button>
          <button onClick={() => jump('work')}>{t.nav.work}</button>
          <button onClick={() => jump('about')}>{t.nav.about}</button>
          <button onClick={() => jump('contact')}>{t.nav.contact}</button>
          <button className="mobile-cta" onClick={() => jump('contact')}>{t.nav.cta} <ArrowUpRight size={15} /></button>
        </nav>
        <div className="header-actions">
          <button className="language-switch" onClick={() => setLocale(isArabic ? 'en' : 'ar')} aria-label="Switch language"><Globe2 size={15} /> {isArabic ? 'EN' : 'AR'}</button>
          <button className="header-cta" data-magnetic onClick={() => jump('contact')}>{t.nav.cta} <ArrowUpRight size={15} /></button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-copy" ref={heroRef}>
            <p className="eyebrow"><span className="eyebrow-mark">✳</span>{t.hero.eyebrow}</p>
            <h1>
              <span data-hero-line>{t.hero.title}</span>
              <br />
              <em data-hero-line>{t.hero.accent}</em>
            </h1>
            <p className="hero-body" data-hero-body>{t.hero.body}</p>
            <div className="hero-actions" data-hero-actions>
              <button className="button button-dark" data-magnetic onClick={() => jump('contact')}>{t.hero.primary} <ArrowUpRight size={17} /></button>
              <button className="text-button" onClick={() => jump('products')}>{t.hero.secondary} <ArrowRight size={17} /></button>
            </div>
          </div>
          <div className="hero-showcase" data-hero-showcase aria-label="OUONEX product previews">
            <div className="showcase-label"><span>PRODUCT SYSTEM / 001</span><span>LIVE PREVIEW</span></div>
            <div className="showcase-wall">
              {showcaseColumns.map((column, columnIndex) => (
                <div className={`showcase-column column-${columnIndex}`} key={columnIndex}>
                  {[...column, ...column].map((product, index) => (
                    <Mockup key={`${columnIndex}-${index}-${product.id}`} mockup={product.mockup} tone={product.tone} compact />
                  ))}
                </div>
              ))}
            </div>
            <div className="showcase-fade showcase-fade-top" />
            <div className="showcase-fade showcase-fade-bottom" />
            <div className="showcase-caption"><span>OUONEX / SELECTED PRODUCTS</span><span>07 — 2026</span></div>
          </div>
          <div className="hero-meta"><span>OUONEX® / DIGITAL PRODUCTS</span><span>{t.hero.note} <ArrowDownRight size={15} /></span></div>
        </section>

        <Reveal as="section" className="intro-strip" delay={0.1}>
          <div className="strip-symbol">✳</div>
          <p>We build digital products<br /><span>that earn their place in the world.</span></p>
          <div className="strip-index">00 — 06</div>
        </Reveal>

        <section className="products-section content-section" id="products">
          <Reveal className="section-heading">
            <p className="section-label">{t.products.label}</p>
            <div><h2>{t.products.title}</h2><p className="section-body">{t.products.body}</p></div>
            <span className="heading-mark">+</span>
          </Reveal>
          <div className="product-list">
            {products.map((product, index) => (
              <Reveal as="article" className="product-row" key={product.id} delay={index * 0.05}>
                <div className="product-info">
                  <span className="product-number">{product.number} / PRODUCT</span>
                  <h3>{isArabic ? product.ar : product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-description">{isArabic ? product.arDescription : product.description}</p>
                  <p className="product-feature">{isArabic ? product.arFeature : product.feature}</p>
                  <button className="row-link">{t.products.view} <ArrowUpRight size={15} /></button>
                </div>
                <div className="product-visual">
                  <Mockup mockup={product.mockup} tone={product.tone} />
                  <span className="visual-index">{String(index + 1).padStart(2, '0')} / 07</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="services-section content-section section-grid" id="services">
          <Reveal className="section-heading">
            <p className="section-label">{t.services.label}</p>
            <div><h2>{t.services.title}</h2><p className="section-body">{t.services.body}</p></div>
            <span className="heading-mark">+</span>
          </Reveal>
          <div className="services-layout">
            <Reveal className="service-note">
              <span>WE BUILD / WITH INTENTION</span>
              <p>Every project has a different shape. The principles stay the same: clarity, care, and momentum.</p>
            </Reveal>
            <div className="service-list" data-service-list>
              {services.map((service) => (
                <button className="service-item" key={service.title}>
                  <span className="service-index">{service.index}</span>
                  <span className="service-title">{isArabic ? service.ar : service.title}</span>
                  <span className="service-desc">{service.desc}</span>
                  <span className="service-arrow"><ArrowUpRight size={18} /></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="process-section content-section" id="process">
          <Reveal className="process-top">
            <p className="section-label">{t.process.label}</p>
            <div><h2>{t.process.title}</h2><p className="section-body">{t.process.body}</p></div>
          </Reveal>
          <div className="process-line" data-timeline-line />
          <div className="process-steps" data-timeline-steps>
            {steps.map((step, index) => (
              <div className="process-step" key={step}>
                <div className="process-dot">{String(index + 1).padStart(2, '0')}</div>
                <span>{isArabic ? stepsAr[index] : step}</span>
              </div>
            ))}
          </div>
          <Reveal className="process-footer" delay={0.2}>
            <span>ONE CLEAR LINE OF WORK</span>
            <ArrowRight size={20} />
            <span>FROM FIRST THOUGHT TO FIRST USER</span>
          </Reveal>
        </section>

        <section className="work-section content-section section-grid" id="work">
          <Reveal className="section-heading">
            <p className="section-label">{t.work.label}</p>
            <div><h2>{t.work.title}</h2><p className="section-body">{t.work.body}</p></div>
            <button className="heading-link">{t.work.view} <ArrowUpRight size={16} /></button>
          </Reveal>
          <div className="work-grid" data-work-grid>
            {products.slice(0, 4).map((product, index) => (
              <article className={`work-card work-card-${index}`} key={product.id}>
                <div className="work-card-visual">
                  <Mockup mockup={product.mockup} tone={product.tone} compact />
                </div>
                <div className="work-card-footer">
                  <div><span>{product.category}</span><h3>{isArabic ? product.ar : product.name}</h3></div>
                  <ArrowUpRight size={19} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section content-section section-grid" id="about">
          <Reveal className="about-symbol">OU<br />ON<br />EX</Reveal>
          <div className="about-main">
            <Reveal><p className="section-label">{t.about.label}</p></Reveal>
            <Reveal delay={0.1}><h2>{t.about.title}</h2></Reveal>
            <Reveal delay={0.15}><p className="about-body">{t.about.body}</p></Reveal>
            <div className="about-points" data-about-points>
              {t.about.points.map((point, index) => (
                <div key={point}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{point}</p>
                  <Check size={17} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <Reveal>
            <div className="cta-ornament">✳</div>
            <p className="section-label">OUONEX / OPEN FOR GOOD WORK</p>
            <h2>{t.cta.title}<br /><em>{t.cta.accent}</em></h2>
            <p>{t.cta.body}</p>
            <button className="button button-light" data-magnetic onClick={() => jump('contact')}>{t.cta.button} <ArrowUpRight size={17} /></button>
          </Reveal>
        </section>

        <section className="contact-section content-section section-grid" id="contact">
          <div className="contact-intro">
            <Reveal><p className="section-label">{t.contact.label}</p></Reveal>
            <Reveal delay={0.1}><h2>{t.contact.title}</h2></Reveal>
            <Reveal delay={0.15}><p>{t.contact.body}</p></Reveal>
            <Reveal className="contact-placeholder" delay={0.2}>
              <span>CONTACT DETAILS</span>
              <strong>Replace these placeholders<br />when you’re ready.</strong>
              <div><Minus size={16} /> EMAIL_ADDRESS</div>
              <div><Minus size={16} /> WHATSAPP_NUMBER</div>
            </Reveal>
          </div>
          <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setFormSent(true); }}>
            <label>{t.contact.name}<input required name="name" /></label>
            <label>{t.contact.email}<input required type="email" name="email" /></label>
            <label>{t.contact.project}
              <select name="project" defaultValue="">
                <option value="" disabled>Select one</option>
                <option>Mobile app</option>
                <option>Web platform</option>
                <option>SaaS product</option>
                <option>Custom software</option>
              </select>
            </label>
            <label>{t.contact.message}<textarea required name="message" rows={4} /></label>
            <button className="button button-dark" type="submit">{formSent ? <>{t.contact.placeholder} <Check size={17} /></> : <>{t.contact.submit} <ArrowUpRight size={17} /></>}</button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-wordmark">OUONEX<span>.</span></div>
          <p>{t.footer.statement}</p>
        </div>
        <div className="footer-bottom">
          <div className="footer-links">
            <button onClick={() => jump('products')}>{t.nav.products}</button>
            <button onClick={() => jump('services')}>{t.nav.services}</button>
            <button onClick={() => jump('work')}>{t.nav.work}</button>
            <button onClick={() => jump('about')}>{t.nav.about}</button>
            <button onClick={() => jump('contact')}>{t.nav.contact}</button>
          </div>
          <div className="footer-contact">
            <span>{t.footer.email}</span>
            <span>{t.footer.whatsapp}</span>
            <span>{t.footer.phone}</span>
          </div>
          <div className="footer-legal">
            <span>{t.footer.rights}</span>
            <button onClick={() => setLocale(isArabic ? 'en' : 'ar')}>{isArabic ? 'EN / English' : 'AR / العربية'}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
