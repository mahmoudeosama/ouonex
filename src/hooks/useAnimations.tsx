import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power4.out';
const isMobile = () => window.matchMedia('(max-width: 768px)').matches;
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || isMobile()) return;

    let lenis: any = null;
    let frame: number | null = null;

    import('lenis').then((mod) => {
      const Lenis = mod.default;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenis.on('scroll', ScrollTrigger.update);
      const raf = (time: number) => {
        lenis?.raf(time * 1000);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);
}

type RevealProps = {
  children: ReactNode;
  as?: 'div' | 'section' | 'article' | 'li' | 'span' | 'p' | 'h2' | 'h3';
  className?: string;
  delay?: number;
  y?: number;
  stagger?: number;
  id?: string;
};

export function Reveal({ children, as = 'div', className, delay = 0, y, stagger, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    const mobile = isMobile();
    const travel = y ?? (mobile ? 15 : 30);

    if (stagger && el.children.length > 1) {
      gsap.set(el.children, { opacity: 0, y: travel });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el.children, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: EASE,
            stagger: mobile ? stagger / 2 : stagger,
            delay,
          });
        },
      });
    } else {
      gsap.set(el, { opacity: 0, y: travel });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: EASE,
            delay,
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [delay, y, stagger]);

  const Tag = as as any;
  return (
    <Tag ref={ref as any} className={className} id={id}>
      {children}
    </Tag>
  );
}

export function useHeroIntro() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el.children, { opacity: 1 });
      return;
    }

    const mobile = isMobile();
    const tl = gsap.timeline({ defaults: { ease: EASE } });

    const lines = el.querySelectorAll('[data-hero-line]');
    const body = el.querySelector('[data-hero-body]');
    const actions = el.querySelector('[data-hero-actions]');
    const showcase = el.querySelector('[data-hero-showcase]');

    gsap.set(lines, { opacity: 0, y: mobile ? 20 : 40 });
    gsap.set(body, { opacity: 0, y: 15 });
    gsap.set(actions, { opacity: 0, y: 15 });
    gsap.set(showcase, { opacity: 0, scale: 0.95 });

    tl.to(lines, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 })
      .to(body, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .to(actions, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
      .to(showcase, { opacity: 1, scale: 1, duration: 0.8 }, '-=0.5');

    return () => {
      tl.kill();
    };
  }, []);

  return ref;
}

export function useParallax(target: string, intensity = 30) {
  useEffect(() => {
    if (prefersReducedMotion() || isMobile()) return;

    const el = document.querySelector(target);
    if (!el) return;

    const tween = gsap.to(el, {
      y: -intensity,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [target, intensity]);
}

export function useTimelineDraw(target: string) {
  useEffect(() => {
    const el = document.querySelector(target);
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { scaleX: 1 });
      return;
    }

    gsap.set(el, { scaleX: 0, transformOrigin: 'left center' });

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(el, { scaleX: 1, duration: 1.2, ease: EASE });
      },
    });

    return () => {
      st.kill();
    };
  }, [target]);
}

export function useStaggerReveal(target: string, stagger = 0.08) {
  useEffect(() => {
    const el = document.querySelector(target);
    if (!el || !el.children.length) return;

    if (prefersReducedMotion()) {
      gsap.set(el.children, { opacity: 1 });
      return;
    }

    const mobile = isMobile();
    gsap.set(el.children, { opacity: 0, y: mobile ? 15 : 30 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el.children, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: EASE,
          stagger: mobile ? stagger / 2 : stagger,
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [target, stagger]);
}

export function useNavScroll() {
  useEffect(() => {
    const header = document.querySelector('.site-header') as HTMLElement | null;
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

export function useMagneticButton() {
  useEffect(() => {
    if (isMobile() || prefersReducedMotion()) return;

    const buttons = document.querySelectorAll<HTMLElement>('[data-magnetic]');
    const handlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: (e: MouseEvent) => void }> = [];

    buttons.forEach((btn) => {
      const move = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' });
      };
      const leave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: EASE });
      };
      btn.addEventListener('mousemove', move as EventListener);
      btn.addEventListener('mouseleave', leave as EventListener);
      handlers.push({ el: btn, move, leave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move as EventListener);
        el.removeEventListener('mouseleave', leave as EventListener);
      });
    };
  }, []);
}

export function useCustomCursor() {
  useEffect(() => {
    if (isMobile() || prefersReducedMotion()) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3.out' });
    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' });
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const onEnter = () => ring.classList.add('cursor-hover');
    const onLeave = () => ring.classList.remove('cursor-hover');

    const interactive = document.querySelectorAll('a, button, [data-cursor]');
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      dot.remove();
      ring.remove();
    };
  }, []);
}
