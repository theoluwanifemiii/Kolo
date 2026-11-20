import { EMAIL, REFERENCE, type EmailId } from './data';
import { HorizontalTrack, Icon } from './Tracker';

/**
 * Transfer status email (E1–E6) with its inbox preview, as designed.
 * This is the web preview; a production send would need these styles inlined into table markup.
 */
export function TransferEmail({ template }: { template: EmailId }) {
  const t = EMAIL[template];
  const cur = t.states.indexOf('now');
  const trackLabel = cur >= 0 ? `Step ${cur + 1} of 4: ${t.track[cur]}` : 'All 4 steps complete';

  return (
    <div className="kolo-email">
      <section aria-label="Inbox preview" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span className="kolo-eyebrow">Inbox preview</span>
        <div className="kolo-email-card" style={{ borderRadius: 20, padding: '16px 20px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <span className="kl-avatar" style={{ background: 'var(--blue)', color: 'var(--on-blue)', fontFamily: 'var(--font-display)', fontWeight: 800 }}>K</span>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 15, lineHeight: '20px' }}>
              <b style={{ fontWeight: 600 }}>Kolo</b>
              <span className="kolo-muted">{t.sentAt}</span>
            </div>
            <p style={{ margin: 0, fontSize: 17, lineHeight: '24px', fontWeight: 600 }}>{t.subject}</p>
            <p className="kolo-muted" style={{ margin: 0, fontSize: 15, lineHeight: '20px' }}>{t.preheader}</p>
          </div>
        </div>
      </section>

      <article style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <header style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 0' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 30, lineHeight: '34px', letterSpacing: -0.5 }}>Kolo</span>
        </header>

        <section className="kolo-email-card" style={{ borderRadius: 28, padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {t.art && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={t.art.src} alt={t.art.alt} width={160} height={160} style={{ display: 'block' }} />
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <span className={`kl-pill kl-pill--${t.pill}`}>{t.pillLabel}</span>
            <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 600, letterSpacing: -0.4 }}>{t.headline}</h1>
          </div>

          <div aria-label={trackLabel} style={{ background: 'var(--surface)', borderRadius: 20, padding: '20px 12px 16px', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
            <HorizontalTrack
              labels={t.track}
              states={t.states}
              renderAbove={(i) => (i === t.tagAt ? <span className="kolo-tag">{t.tag}</span> : <span className="kolo-tag-spacer" />)}
              labelStyle={(i) => (t.states[i] === 'todo' ? { color: 'var(--ink-muted)', fontWeight: 400 } : { color: 'var(--ink)', fontWeight: 500 })}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 17, lineHeight: '26px' }}>
            {t.paras.map((p) => <p key={p} style={{ margin: 0 }}>{p}</p>)}
            {t.list && (
              <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {t.list.map((li) => <li key={li}>{li}</li>)}
              </ul>
            )}
            {t.parasAfter?.map((p) => <p key={p} style={{ margin: 0 }}>{p}</p>)}
          </div>

          <div style={{ borderRadius: 20, background: 'var(--surface)', padding: 20 }}>
            <h2 style={{ margin: '0 0 12px', fontSize: 17, lineHeight: '22px', fontWeight: 600 }}>Transfer summary</h2>
            <div className="kl-lines">
              {t.summary.map((row) => (
                <div key={row.k} className="kl-line"><span>{row.k}</span><b style={{ textAlign: 'right' }}>{row.v}</b></div>
              ))}
            </div>
          </div>

          <div className={`kl-notice kl-notice--${t.notice}`} style={{ width: '100%', alignItems: 'flex-start' }}>
            <img className="kl-spot" src={t.spot} alt="" />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p className="kl-notice__text"><b>What happens next</b></p>
              <p className="kl-notice__text">{t.next}</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'stretch' }}>
            <a className="kl-btn kl-btn--primary kl-btn--lg kl-btn--block" href="#/receipt/successful">{t.button}</a>
            {t.secondary && <a className="kl-btn kl-btn--lg kl-btn--block" href="#/receipt/successful">{t.secondary}</a>}
          </div>
        </section>

        <section aria-label="Help" className="kolo-email-card" style={{ borderRadius: 20, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h2 style={{ margin: 0, fontSize: 17, lineHeight: '22px', fontWeight: 600 }}>Need help?</h2>
          <p className="kolo-muted" style={{ margin: 0, fontSize: 15, lineHeight: '22px' }}>
            Call us on [support phone number] or write to [support email]. Quote {t.quote ?? `reference ${REFERENCE}`} so we can find your transfer fast.
          </p>
        </section>

        <footer style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'center', padding: '0 16px' }}>
          <p style={{ margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, fontSize: 15, lineHeight: '20px', fontWeight: 500 }}>
            <Icon name="shield" size={18} />We will never ask for your PIN, OTP or password by email.
          </p>
          <p className="kolo-muted" style={{ margin: 0, fontSize: 15, lineHeight: '20px' }}>You are getting this because you made a transfer with Kolo. It is a service email, so it still comes if you turn off offers.</p>
          <p className="kolo-muted" style={{ margin: 0, fontSize: 15, lineHeight: '20px' }}>[Kolo company name and address]</p>
        </footer>
      </article>
    </div>
  );
}
