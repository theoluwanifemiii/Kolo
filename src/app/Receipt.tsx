import { useState } from 'react';
import { RECEIPT, REFERENCE, SESSION_ID, type TransferStatus } from './data';
import { downloadReceiptPdf, shareReceiptImage } from './exportReceipt';
import { Icon, StepDot, solidAfter } from './Tracker';

type Busy = null | 'share' | 'pdf';

function copy(text: string) {
  void navigator.clipboard?.writeText(text);
}

/** In-app transfer receipt (Kolo v2), one layout for all six statuses. */
export function Receipt({ status }: { status: TransferStatus }) {
  const d = RECEIPT[status];
  const [busy, setBusy] = useState<Busy>(null);
  const [error, setError] = useState(false);

  const run = (kind: Exclude<Busy, null>, task: (s: TransferStatus) => Promise<void>) => async () => {
    setBusy(kind);
    setError(false);
    try {
      await task(status);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setBusy(null);
    }
  };
  return (
    <main className="kolo-receipt">
      <header className="kl-topbar">
        <button className="kl-iconbtn" type="button" aria-label="Back"><Icon name="back" /></button>
        <h1 className="kl-topbar__title">Transfer receipt</h1>
        <button className="kl-iconbtn" type="button" aria-label="More"><Icon name="more" /></button>
      </header>

      <section className="kl-card" aria-label="Status" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12, padding: '24px 20px' }}>
        <span className={`kl-pill kl-pill--${d.pill}`}>
          <Icon name={d.icon} />
          {d.pillLabel}
        </span>
        <span className="kl-amount kl-amount--hero"><span className="kl-amount__naira">₦</span>{d.heroAmount}</span>
        <p className="kolo-muted" style={{ margin: '-4px 0 0', fontSize: 15, lineHeight: '20px' }}>{d.heroLabel}</p>
        <h2 style={{ margin: '8px 0 0', fontSize: 22, lineHeight: '28px', fontWeight: 600, letterSpacing: -0.3 }}>{d.headline}</h2>
        <p className="kolo-muted" style={{ margin: 0, fontSize: 17, lineHeight: '24px' }}>{d.sub}</p>
        <button className="kl-listen" type="button" style={{ marginTop: 8 }}>
          <span className="kl-listen__disc"><Icon name="speaker" /></span>Listen
        </button>
      </section>

      <section className="kl-card" aria-labelledby="track-h">
        <h3 id="track-h" className="kl-card__title">{d.refund ? 'Where your refund is' : 'Where your money is'}</h3>
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
          {d.track.map((label, i) => {
            const st = d.states[i];
            const last = i === d.track.length - 1;
            let sub = d.subs[i];
            if (st === 'now') sub = sub ? `You are here. ${sub}` : 'You are here';
            return (
              <li key={label} style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 32, flex: 'none' }}>
                  <StepDot state={st} size={32} />
                  {!last && <span className={solidAfter(d.states, i) ? 'kolo-vline is-solid' : 'kolo-vline'} />}
                </div>
                <div style={{ padding: '4px 0 20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span className={st === 'todo' ? 'kolo-step-label is-todo' : 'kolo-step-label'}>{label}</span>
                  <span className="kolo-muted" style={{ fontSize: 15, lineHeight: '20px' }}>{sub}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className={`kl-notice kl-notice--${d.notice}`} aria-label="What happens next" style={{ width: '100%', alignItems: 'flex-start' }}>
        <img className="kl-spot" src={d.spot} alt="" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <p className="kl-notice__text"><b>What happens next</b></p>
          <p className="kl-notice__text">{d.next}</p>
          {d.warn && <p className="kl-notice__text"><b>{d.warn}</b></p>}
        </div>
      </section>

      <section className="kl-card" aria-labelledby="details-h">
        <h3 id="details-h" className="kl-card__title">Transfer details</h3>
        <div className="kl-person" style={{ marginBottom: 16 }}>
          <span className="kl-avatar kl-avatar--green">BA</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 17, lineHeight: '24px', fontWeight: 500 }}>Bisi Adeyemi</p>
            <p className="kolo-muted" style={{ margin: 0, fontSize: 15, lineHeight: '20px' }}>Access Bank, 01****4521</p>
          </div>
        </div>
        <hr className="kl-dash" />
        <div className="kl-lines" style={{ padding: '16px 0' }}>
          <div className="kl-line"><span>Amount</span><b>₦50,000</b></div>
          <div className="kl-line"><span>Fee</span><b>₦10</b></div>
          <div className="kl-line kl-line--total"><span>Total taken from you</span><b>₦50,010</b></div>
        </div>
        <hr className="kl-dash" />
        <div className="kl-lines" style={{ paddingTop: 16 }}>
          <div className="kl-line"><span>For</span><b>Pepper and tomatoes</b></div>
          <div className="kl-line"><span>Sent</span><b>20 November, 2:14 PM</b></div>
          <div className="kl-line"><span>From</span><b>Kolo wallet ****7781</b></div>
          {d.hasCase && <div className="kl-line"><span>Case</span><b>CS-10482</b></div>}
          <div className="kl-line" style={{ alignItems: 'center' }}>
            <span>Reference</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <b>{REFERENCE}</b>
              <button className="kl-iconbtn kl-iconbtn--sunk" type="button" aria-label="Copy reference" style={{ width: 40, height: 40 }} onClick={() => copy(REFERENCE)}>
                <Icon name="copy" size={20} />
              </button>
            </span>
          </div>
        </div>
      </section>

      <section className="kl-card" aria-labelledby="proof-h" style={d.proof ? { background: 'var(--blue-soft)', boxShadow: 'none' } : undefined}>
        <h3 id="proof-h" className="kl-card__title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="shield" />Proof of payment</h3>
        <p className="kolo-muted" style={{ margin: 0, fontSize: 15, lineHeight: '20px' }}>Session ID</p>
        <p className="kolo-session-id" style={{ margin: '2px 0 12px', fontSize: 20, lineHeight: '28px' }}>{SESSION_ID}</p>
        <p style={{ margin: '0 0 16px', fontSize: 17, lineHeight: '24px' }}>Give this number to Bisi. Her bank can trace the payment with it.</p>
        <button className="kl-btn kl-btn--white kl-btn--block" type="button" onClick={() => copy(SESSION_ID)}><Icon name="copy" />Copy session ID</button>
      </section>

      <section aria-label="Actions" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {d.repeat && (
          <button className="kl-btn kl-btn--primary kl-btn--lg kl-btn--block" type="button"><Icon name="rotate" />Send again</button>
        )}
        <div className="kl-receipt__btns">
          <button className="kl-btn kl-btn--white" type="button" style={{ padding: '0 16px' }} disabled={busy !== null} aria-busy={busy === 'share'} onClick={run('share', shareReceiptImage)}>
            <Icon name="share" />{busy === 'share' ? 'Getting it ready…' : 'Share'}
          </button>
          <button className="kl-btn kl-btn--white" type="button" style={{ padding: '0 16px' }} disabled={busy !== null} aria-busy={busy === 'pdf'} onClick={run('pdf', downloadReceiptPdf)}>
            <Icon name="download" />{busy === 'pdf' ? 'Getting it ready…' : 'Download PDF'}
          </button>
        </div>
        {error && (
          <p role="alert" style={{ margin: 0, fontSize: 15, lineHeight: '20px', color: 'var(--red)', textAlign: 'center' }}>
            We could not make your receipt. Please try again.
          </p>
        )}
        <button className="kl-btn kl-btn--white kl-btn--block" type="button"><Icon name="people" />Get help with this transfer</button>
      </section>

      <footer style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center' }}>
        <p className="kolo-muted" style={{ margin: 0, fontSize: 15, lineHeight: '20px' }}>Last updated {d.updated}</p>
        <p className="kolo-muted" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, lineHeight: '20px' }}>
          <Icon name="shield" size={18} />We will never ask for your PIN or OTP.
        </p>
      </footer>
    </main>
  );
}
