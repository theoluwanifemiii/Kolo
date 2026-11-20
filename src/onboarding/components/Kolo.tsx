import type { CSSProperties, ReactNode } from 'react';
import { href } from '../../shared/router';

/** Kolo v1 icon, served from /public/assets. Decorative by default (the label lives on the control). */
export function Ico({ name, lg, style }: { name: string; lg?: boolean; style?: CSSProperties }) {
  return <img className={lg ? 'kl-ico kl-ico--lg' : 'kl-ico'} src={`/assets/${name}.svg`} alt="" style={style} />;
}

export function ListenButton({ iconOnly, label = 'Listen to this page', style }: { iconOnly?: boolean; label?: string; style?: CSSProperties }) {
  return iconOnly ? (
    <button className="kl-listen kl-listen--icon" type="button" aria-label={label} style={style}>
      <span className="kl-listen__disc"><Ico name="icon-listen" /></span>
    </button>
  ) : (
    <button className="kl-listen" type="button" style={style}>
      <span className="kl-listen__disc"><Ico name="icon-listen" /></span>
      Listen
    </button>
  );
}

/** Full-height phone screen on the cream surface. */
export function Screen({ children, gap = 24, padded = true }: { children: ReactNode; gap?: number; padded?: boolean }) {
  return (
    <main className="kolo-screen" style={{ gap, padding: padded ? 20 : 0 }}>
      {children}
    </main>
  );
}

/** Back button + 4-segment progress + listen, shared by onboarding steps 1–4. */
export function StepHeader({ step, back }: { step: number; back: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <a className="kl-btn" href={href(back)} aria-label="Go back" style={{ padding: 0, width: 56 }}>
        <Ico name="icon-back" />
      </a>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', gap: 6 }} aria-hidden="true">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className={i <= step ? 'kolo-progress is-done' : 'kolo-progress'} />
          ))}
        </div>
        <span className="kolo-muted" style={{ fontSize: 15, lineHeight: '20px', fontWeight: 500 }}>Step {step} of 4</span>
      </div>
      <ListenButton iconOnly />
    </div>
  );
}

export function Title({ children, size = 28 }: { children: ReactNode; size?: 28 | 40 }) {
  const big = size === 40;
  return (
    <h1
      style={{
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontSize: size,
        lineHeight: big ? '44px' : '34px',
        fontWeight: big ? 800 : 700,
        letterSpacing: big ? -0.5 : undefined,
      }}
    >
      {children}
    </h1>
  );
}

export function Lead({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <p style={{ margin: 0, fontSize: 20, lineHeight: '30px', ...style }}>{children}</p>;
}

export function Naira({ value, size, inflow, onBlue }: { value: string; size?: 'md' | 'lg' | 'hero'; inflow?: boolean; onBlue?: boolean }) {
  const cls = ['kl-amount', size && `kl-amount--${size}`, inflow && 'kl-amount--in', onBlue && 'kl-amount--on-blue'].filter(Boolean).join(' ');
  return (
    <span className={cls}>
      {inflow && '+'}
      <span className="kl-amount__naira">₦</span>
      {value}
    </span>
  );
}
