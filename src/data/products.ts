export type Block =
  | { kind: 'header'; label: string; sub?: string }
  | { kind: 'couple'; names: string; date: string; venue: string }
  | { kind: 'menuItem'; name: string; desc: string; price: string }
  | { kind: 'sectionTitle'; label: string }
  | { kind: 'cvEntry'; role: string; company: string; period: string }
  | { kind: 'memberRow'; name: string; plan: string; active: boolean }
  | { kind: 'toolItem'; label: string }
  | { kind: 'usageBar'; used: string; total: string; pct: number }
  | { kind: 'appUsageRow'; app: string; amount: string; pct: number }
  | { kind: 'shopCard'; name: string; price: string }
  | { kind: 'rsvpButton'; label: string }
  | { kind: 'statCard'; label: string; value: string }
  | { kind: 'textLine'; width: 'long' | 'medium' | 'short' };

export type Product = {
  id: string;
  number: string;
  name: string;
  ar: string;
  category: string;
  tone: string;
  description: string;
  arDescription: string;
  feature: string;
  arFeature: string;
  mockup: Block[];
};

export const products: Product[] = [
  {
    id: 'wedding-invitation',
    number: '01',
    name: 'Wedding Invitation',
    ar: 'دعوة زفاف',
    category: 'Digital experience',
    tone: 'sand',
    description: 'A considered way to bring people together for the moments that matter.',
    arDescription: 'طريقة مدروسة لجمع الناس في اللحظات المهمة.',
    feature: 'RSVP tracking and live guest updates',
    arFeature: 'تتبع تأكيدات الحضور وتحديثات الضيوف المباشرة',
    mockup: [
      { kind: 'header', label: 'WEDDING', sub: 'You are invited' },
      { kind: 'couple', names: 'Layla & Adam', date: '12 . 06 . 2026', venue: 'Grand Pavilion, Cairo' },
      { kind: 'rsvpButton', label: 'RSVP' },
    ],
  },
  {
    id: 'smart-menu',
    number: '02',
    name: 'Smart Menu',
    ar: 'القائمة الذكية',
    category: 'Business tool',
    tone: 'ink',
    description: 'Digital menus and restaurant tools made simple for modern businesses.',
    arDescription: 'قوائم رقمية وأدوات مطاعم بسيطة للشركات الحديثة.',
    feature: 'AI-powered menu scanning and ordering',
    arFeature: 'مسح القائمة بالذكاء الاصطناعي والطلب المباشر',
    mockup: [
      { kind: 'header', label: 'MENU', sub: 'Today' },
      { kind: 'menuItem', name: 'Margherita', desc: 'Basil, mozzarella', price: '14' },
      { kind: 'menuItem', name: 'Truffle Pasta', desc: 'Fresh tagliatelle', price: '22' },
      { kind: 'menuItem', name: 'Caesar Salad', desc: 'Romaine, parmesan', price: '11' },
    ],
  },
  {
    id: 'cv-maker',
    number: '03',
    name: 'CV Maker',
    ar: 'منشئ السيرة الذاتية',
    category: 'Productivity',
    tone: 'lime',
    description: 'A clear, focused way to help people present their next chapter.',
    arDescription: 'طريقة واضحة ومركزة لمساعدة الناس على تقديم فصلهم القادم.',
    feature: 'One-click export to PDF and web',
    arFeature: 'تصدير بنقرة واحدة إلى PDF والويب',
    mockup: [
      { kind: 'header', label: 'SARAH HASSAN', sub: 'Product Designer' },
      { kind: 'sectionTitle', label: 'Experience' },
      { kind: 'cvEntry', role: 'Senior Designer', company: 'Studio Nile', period: '2023 — Now' },
      { kind: 'cvEntry', role: 'UI Designer', company: 'Folio Labs', period: '2020 — 2023' },
    ],
  },
  {
    id: 'gym-management',
    number: '04',
    name: 'Gym Management',
    ar: 'إدارة النادي الرياضي',
    category: 'Operations',
    tone: 'blue',
    description: 'A foundation for smoother days, better decisions and stronger communities.',
    arDescription: 'أساس لأيام أسلس وقرارات أفضل ومجتمعات أقوى.',
    feature: 'Member tracking, scheduling, and billing in one place',
    arFeature: 'تتبع الأعضاء والجدولة والفوترة في مكان واحد',
    mockup: [
      { kind: 'header', label: 'MEMBERS', sub: '248 active' },
      { kind: 'memberRow', name: 'Omar Khaled', plan: 'Premium', active: true },
      { kind: 'memberRow', name: 'Mona Ali', plan: 'Standard', active: true },
      { kind: 'memberRow', name: 'Youssef N.', plan: 'Premium', active: false },
    ],
  },
  {
    id: 'tools-app',
    number: '05',
    name: 'Tools App',
    ar: 'تطبيق الأدوات',
    category: 'Utilities',
    tone: 'orange',
    description: 'Small, useful tools brought together in one calm, focused place.',
    arDescription: 'أدوات صغيرة ومفيدة مجتمعة في مكان هادئ ومركوز.',
    feature: 'Calculator, timer, converter, and notes — all in one',
    arFeature: 'آلة حاسبة، مؤقت، محول، وملاحظات — الكل في تطبيق واحد',
    mockup: [
      { kind: 'header', label: 'TOOLS' },
      { kind: 'toolItem', label: 'Calculator' },
      { kind: 'toolItem', label: 'Timer' },
      { kind: 'toolItem', label: 'Converter' },
      { kind: 'toolItem', label: 'Notes' },
    ],
  },
  {
    id: 'data-usage',
    number: '06',
    name: 'Data Usage',
    ar: 'استهلاك البيانات',
    category: 'Utility',
    tone: 'violet',
    description: 'A simpler view of the invisible systems that power everyday life.',
    arDescription: 'رؤية أبسط للأنظمة غير المرئية التي تشغل الحياة اليومية.',
    feature: 'Real-time tracking with per-app breakdown',
    arFeature: 'تتبع لحظي مع تفصيل لكل تطبيق',
    mockup: [
      { kind: 'header', label: 'DATA USAGE', sub: 'This month' },
      { kind: 'usageBar', used: '12.4 GB', total: '20 GB', pct: 62 },
      { kind: 'appUsageRow', app: 'Social', amount: '5.2 GB', pct: 42 },
      { kind: 'appUsageRow', app: 'Streaming', amount: '3.8 GB', pct: 31 },
    ],
  },
  {
    id: 'ecommerce',
    number: '07',
    name: 'E-commerce',
    ar: 'التجارة الإلكترونية',
    category: 'Commerce',
    tone: 'rose',
    description: 'A flexible foundation for products, people and meaningful transactions.',
    arDescription: 'أساس مرن للمنتجات والناس والمعاملات ذات المعنى.',
    feature: 'Cart, checkout, and inventory in one clean flow',
    arFeature: 'سلة، دفع، ومخزون في مسار واحد نظيف',
    mockup: [
      { kind: 'header', label: 'SHOP', sub: 'New arrivals' },
      { kind: 'shopCard', name: 'Linen Shirt', price: '89' },
      { kind: 'shopCard', name: 'Wool Coat', price: '240' },
    ],
  },
];

export type Service = {
  title: string;
  ar: string;
  desc: string;
  index: string;
};

export const services: Service[] = [
  { title: 'Mobile development', ar: 'تطوير تطبيقات الهاتف', desc: 'Flutter / iOS / Android', index: '01' },
  { title: 'Web development', ar: 'تطوير الويب', desc: 'Landing pages / platforms / web apps', index: '02' },
  { title: 'Backend & cloud', ar: 'الأنظمة السحابية والخلفية', desc: 'APIs / databases / infrastructure', index: '03' },
  { title: 'SaaS development', ar: 'تطوير منتجات SaaS', desc: 'Scalable software products', index: '04' },
  { title: 'Custom software', ar: 'برمجيات مخصصة', desc: 'Solutions shaped around your business', index: '05' },
];
