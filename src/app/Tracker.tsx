import type { CSSProperties, ReactNode } from 'react';
import type { StepState } from './data';

/** Line icons used across the v2 transfer screens (stroke icons, inherit text color). */
export const PATHS = {
  back: <path d="M19 12H5M11 6l-6 6 6 6" />,
  more: (
    <>
      <circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  rotate: <path d="M4.5 11a7.5 7.5 0 0 1 13-4.5M18 3v4h-4M19.5 13a7.5 7.5 0 0 1-13 4.5M6 21v-4h4" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  alert: (
    <>
      <path d="M12 4 21 19.5H3zM12 10v4" />
      <circle cx="12" cy="16.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  down: <path d="M12 5v14M6 13l6 6 6-6" />,
  shield: <path d="M12 3.5l7 2.8V12c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5V6.3zM9 12l2 2 4-4.5" />,
  speaker: <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4zM15.5 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" />,
  copy: (
    <>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2.5" />
      <path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
    </>
  ),
  share: <path d="M13 5l6 6-6 6M19 11h-7a7 7 0 0 0-7 7" />,
  download: <path d="M12 4v11M7 10.5l5 5 5-5M5 19.5h14" />,
  moreVertical: (
    <>
      <circle cx="12" cy="5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  bell: <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0" />,
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  naira: <path d="M8 19V5l8 14V5M5.5 10.5h13M5.5 13.5h13" />,
  plus: <path d="M12 5v14M5 12h14" />,
  star: <path d="M12 4l2.4 5 5.4.6-4 3.7 1.1 5.4L12 16l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6z" />,
  home: <path d="M4 10.5 12 4l8 6.5V20H4zM10 20v-5h4v5" />,
  receipt: <path d="M6 3.5h12v17l-2.5-1.5-2 1.5-1.5-1.5-1.5 1.5-2-1.5L6 20.5zM9 8h6M9 12h6M9 16h3" />,
  wallet: <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3M4 7.5V17a2.5 2.5 0 0 0 2.5 2.5H20V8H6.5A2.5 2.5 0 0 1 4 7.5zM16 13.5h1" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  people: (
    <>
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M3 19.5c.6-3.4 3-5.5 6-5.5s5.4 2.1 6 5.5M15.5 5.3a3.5 3.5 0 0 1 0 6.4M17.5 14.3c1.8.8 3 2.6 3.5 5.2" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size, style }: { name: IconName; size?: number; style?: CSSProperties }) {
  return (
    <svg className="kl-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={size ? { width: size, height: size, ...style } : style}>
      {PATHS[name]}
    </svg>
  );
}

/** Round step marker: green tick, red cross, orange "you are here" ring, or grey to-do. */
export function StepDot({ state, size }: { state: StepState; size: 28 | 32 }) {
  const glyph = size === 32 ? 18 : 16;
  return (
    <span className={`kolo-dot kolo-dot--${state}`} style={{ width: size, height: size }}>
      {state === 'done' && (
        <svg viewBox="0 0 24 24" width={glyph} height={glyph} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      )}
      {state === 'fail' && (
        <svg viewBox="0 0 24 24" width={glyph} height={glyph} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
      )}
      {state === 'now' && <span className="kolo-dot__now" style={{ width: size === 32 ? 10 : 8, height: size === 32 ? 10 : 8 }} />}
    </span>
  );
}

const reached = (s: StepState) => s === 'done' || s === 'fail';

/** Is the connector between step i and i+1 solid (both sides reached/active)? */
export const solidAfter = (states: StepState[], i: number) => reached(states[i]) && states[i + 1] !== 'todo';

/** Horizontal 4-step tracker used by the PDF and emails. */
export function HorizontalTrack({
  labels,
  states,
  renderAbove,
  renderBelow,
  labelStyle,
}: {
  labels: string[];
  states: StepState[];
  renderAbove?: (i: number) => ReactNode;
  renderBelow?: (i: number) => ReactNode;
  labelStyle?: (i: number) => CSSProperties;
}) {
  const n = labels.length;
  return (
    <>
      {labels.map((label, i) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 8 }}>
          {renderAbove?.(i)}
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <span className={i === 0 ? 'kolo-hline' : solidAfter(states, i - 1) ? 'kolo-hline is-solid' : 'kolo-hline is-dashed'} />
            <StepDot state={states[i]} size={28} />
            <span className={i === n - 1 ? 'kolo-hline' : solidAfter(states, i) ? 'kolo-hline is-solid' : 'kolo-hline is-dashed'} />
          </div>
          <span style={{ fontSize: 14, lineHeight: '19px', fontWeight: 500, padding: '0 4px', ...labelStyle?.(i) }}>{label}</span>
          {renderBelow?.(i)}
        </div>
      ))}
    </>
  );
}
