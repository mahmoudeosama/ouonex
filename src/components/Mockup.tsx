import type { Block } from '@/data/products';

function BlockView({ block, tone }: { block: Block; tone: string }) {
  switch (block.kind) {
    case 'header':
      return (
        <div className="mu-header">
          <span className="mu-app-name">{block.label}</span>
          {block.sub && <span className="mu-app-sub">{block.sub}</span>}
        </div>
      );
    case 'couple':
      return (
        <div className="mu-couple">
          <div className="mu-couple-names">{block.names}</div>
          <div className="mu-couple-date">{block.date}</div>
          <div className="mu-couple-venue">{block.venue}</div>
        </div>
      );
    case 'rsvpButton':
      return <div className="mu-rsvp">{block.label}</div>;
    case 'menuItem':
      return (
        <div className="mu-menu-item">
          <div className="mu-menu-info">
            <span className="mu-menu-name">{block.name}</span>
            <span className="mu-menu-desc">{block.desc}</span>
          </div>
          <span className="mu-menu-price">{block.price}</span>
        </div>
      );
    case 'sectionTitle':
      return <div className="mu-section-title">{block.label}</div>;
    case 'cvEntry':
      return (
        <div className="mu-cv-entry">
          <span className="mu-cv-role">{block.role}</span>
          <span className="mu-cv-company">{block.company}</span>
          <span className="mu-cv-period">{block.period}</span>
        </div>
      );
    case 'memberRow':
      return (
        <div className="mu-member-row">
          <div className={`mu-member-avatar ${block.active ? 'active' : ''}`} />
          <div className="mu-member-info">
            <span className="mu-member-name">{block.name}</span>
            <span className="mu-member-plan">{block.plan}</span>
          </div>
          <div className={`mu-member-status ${block.active ? 'active' : ''}`} />
        </div>
      );
    case 'toolItem':
      return (
        <div className="mu-tool-item">
          <span className="mu-tool-icon" />
          <span className="mu-tool-label">{block.label}</span>
          <span className="mu-tool-arrow">→</span>
        </div>
      );
    case 'usageBar':
      return (
        <div className="mu-usage">
          <div className="mu-usage-top">
            <span className="mu-usage-used">{block.used}</span>
            <span className="mu-usage-total">{block.total}</span>
          </div>
          <div className="mu-usage-track">
            <div className="mu-usage-fill" style={{ width: `${block.pct}%` }} />
          </div>
        </div>
      );
    case 'appUsageRow':
      return (
        <div className="mu-app-row">
          <span className="mu-app-name-row">{block.app}</span>
          <div className="mu-app-bar">
            <div className="mu-app-bar-fill" style={{ width: `${block.pct}%` }} />
          </div>
          <span className="mu-app-amount">{block.amount}</span>
        </div>
      );
    case 'shopCard':
      return (
        <div className="mu-shop-card">
          <div className="mu-shop-image" />
          <div className="mu-shop-info">
            <span className="mu-shop-name">{block.name}</span>
            <span className="mu-shop-price">${block.price}</span>
          </div>
        </div>
      );
    case 'statCard':
      return (
        <div className="mu-stat-card">
          <span className="mu-stat-value">{block.value}</span>
          <span className="mu-stat-label">{block.label}</span>
        </div>
      );
    case 'textLine':
      return <div className={`mu-text-line ${block.width}`} />;
    default:
      return null;
  }
}

export default function Mockup({ mockup, tone, compact = false }: { mockup: Block[]; tone: string; compact?: boolean }) {
  return (
    <div className={`mockup mockup-${tone} ${compact ? 'mockup-compact' : ''}`}>
      <div className="mockup-screen">
        <div className="mockup-notch" />
        <div className="mockup-status-bar">
          <span>9:41</span>
          <span className="mockup-status-icons">
            <span className="mu-signal" />
            <span className="mu-battery" />
          </span>
        </div>
        <div className="mockup-body">
          {mockup.map((block, i) => (
            <BlockView key={i} block={block} tone={tone} />
          ))}
        </div>
      </div>
    </div>
  );
}
