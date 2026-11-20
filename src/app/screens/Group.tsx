import { href } from '../../shared/router';
import { Icon } from '../Tracker';
import { TabDock } from './TabDock';

const MEMBERS = [
  { initials: 'IB', tint: 'orange' },
  { initials: 'MN', tint: 'green' },
  { initials: 'AF', tint: 'sun' },
  { initials: 'CO', tint: 'lilac' },
  { initials: 'TK', tint: '' },
];

const TURNS: { month: string; kind: 'paid' | 'now' | 'later'; n: number }[] = [
  { month: 'Jan', kind: 'paid', n: 1 },
  { month: 'Feb', kind: 'paid', n: 2 },
  { month: 'Mar', kind: 'now', n: 3 },
  { month: 'Apr', kind: 'later', n: 4 },
  { month: 'May', kind: 'later', n: 5 },
  { month: 'Jun', kind: 'later', n: 6 },
];

/** Group detail (Kolo v2 AppScreens): this month's pot, pay action, due notice, turns, how-ajo-works promo. */
export function Group() {
  return (
    <div className="kolo-phone">
      <div className="kolo-phone__scroll">
        <div className="kl-topbar">
          <a className="kl-iconbtn" href={href('home')} aria-label="Back"><Icon name="back" /></a>
          <h1 className="kl-topbar__title">Oja Oba Traders</h1>
          <button className="kl-iconbtn" type="button" aria-label="More"><Icon name="moreVertical" /></button>
        </div>

        <div className="kl-frame">
          <div className="kl-balance">
            <span className="kl-balance__label">This month's pot</span>
            <span className="kl-amount kl-amount--hero kl-amount--on-blue"><span className="kl-amount__naira">₦</span>60,000</span>
            <span style={{ fontSize: 15 }}>Alhaja F. collects on 28 March</span>
            <div className="kl-balance__avatars" aria-label="12 members">
              {MEMBERS.map((m) => (
                <span key={m.initials} className={m.tint ? `kl-avatar kl-avatar--${m.tint}` : 'kl-avatar'}>{m.initials}</span>
              ))}
            </div>
          </div>
          <div className="kl-balance__spacer" />
          <div style={{ padding: '0 10px 10px', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 12 }}>
            <button className="kl-btn" type="button"><Icon name="people" />Members</button>
            <a className="kl-btn kl-btn--dark" href={href('receipt/processing')}>Pay ₦5,000 <Icon name="arrowUp" /></a>
          </div>
        </div>

        <div className="kl-notice kl-notice--due">
          <img className="kl-spot" src="/assets/spot-due.svg" alt="" />
          <p className="kl-notice__text">Pay <b>₦5,000</b> before <b>Friday</b>.</p>
        </div>

        <div className="kl-card">
          <h2 className="kl-card__title">Your turns this year</h2>
          <div className="kl-coins">
            {TURNS.map((t) => (
              <div key={t.month} className={`kl-coin kl-coin--${t.kind}`}>
                <span className="kl-coin__face">{t.kind === 'paid' ? <Icon name="check" /> : t.n}</span>
                {t.month}
              </div>
            ))}
          </div>
        </div>

        <div className="kl-promo kl-promo--blue">
          <div className="kl-promo__text">
            <p className="kl-promo__title">How ajo works</p>
            <button className="kl-btn kl-btn--white" type="button"><Icon name="speaker" />Hear am</button>
          </div>
          <img className="kl-promo__art" src="/assets/illus-ajo-circle.svg" alt="" />
        </div>
      </div>
      <TabDock active="groups" />
    </div>
  );
}
