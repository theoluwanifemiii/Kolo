import { RECEIPT, REFERENCE, SESSION_ID, type TransferStatus } from './data';
import { HorizontalTrack } from './Tracker';

function Table({ rows }: { rows: [string, string, boolean?][] }) {
  return (
    <table className="kolo-pdf-table">
      <tbody>
        {rows.map(([k, v, strong]) => (
          <tr key={k} className={strong ? 'is-strong' : undefined}>
            <th scope="row">{k}</th>
            <td>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** A4 receipt (794×1123 CSS px) — the "Download PDF" output. Prints to one page. */
export function ReceiptPdf({ status }: { status: TransferStatus }) {
  const d = RECEIPT[status];
  return (
    <article className="kolo-pdf">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 34, lineHeight: '38px', letterSpacing: -0.5 }}>Kolo</span>
          <span className="kolo-muted" style={{ fontSize: 13, lineHeight: '18px' }}>Ajo and transfers for the market</span>
        </div>
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
          <h1 style={{ margin: 0, fontSize: 24, lineHeight: '30px', fontWeight: 600, letterSpacing: -0.3 }}>Transfer receipt</h1>
          <span style={{ display: 'inline-flex', padding: '6px 12px', borderRadius: 999, background: 'var(--surface-sunk)', fontSize: 14, lineHeight: '18px', fontWeight: 600 }}>Status as at {d.pdf.stamp}</span>
        </div>
      </header>

      <section style={{ borderRadius: 28, background: 'var(--surface)', padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
          <span className={`kl-pill kl-pill--${d.pill}`}>{d.pillLabel}</span>
          <h2 style={{ margin: 0, fontSize: 22, lineHeight: '28px', fontWeight: 600, letterSpacing: -0.3 }}>{d.headline}</h2>
          <p className="kolo-muted" style={{ margin: 0, fontSize: 15, lineHeight: '22px' }}>{d.pdf.sub}</p>
        </div>
        <div style={{ textAlign: 'right', flex: 'none' }}>
          <p className="kolo-muted" style={{ margin: 0, fontSize: 14, lineHeight: '20px' }}>{d.pdf.amountLabel}</p>
          <span className="kl-amount kl-amount--hero"><span className="kl-amount__naira">₦</span>{d.heroAmount}</span>
        </div>
      </section>

      <section aria-label="Progress" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
        <HorizontalTrack
          labels={d.track}
          states={d.states}
          labelStyle={() => ({ padding: '0 6px' })}
          renderBelow={(i) => <span className="kolo-muted" style={{ fontSize: 13, lineHeight: '18px' }}>{d.pdf.times[i]}</span>}
        />
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 32 }}>
        <div>
          <h3 className="kolo-pdf-h3">Sent to</h3>
          <Table rows={[['Name', 'Bisi Adeyemi'], ['Bank', 'Access Bank'], ['Account', '01****4521'], ['For', 'Pepper and tomatoes']]} />
        </div>
        <div>
          <h3 className="kolo-pdf-h3">Payment</h3>
          <Table rows={[['Amount', '₦50,000'], ['Fee', '₦10'], ['Total taken from you', '₦50,010', true], ['From', 'Kolo wallet ****7781']]} />
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 32, fontSize: 14, lineHeight: '20px' }}>
        <div><p className="kolo-muted" style={{ margin: 0 }}>Sent</p><p style={{ margin: '2px 0 0', fontWeight: 500 }}>Friday 20 November 2026, 2:14 PM (Lagos time)</p></div>
        <div><p className="kolo-muted" style={{ margin: 0 }}>Reference</p><p style={{ margin: '2px 0 0', fontWeight: 500 }}>{REFERENCE}</p></div>
      </section>

      <section style={{ borderRadius: 20, background: 'var(--blue-soft)', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h3 style={{ margin: 0, fontSize: 16, lineHeight: '22px', fontWeight: 600 }}>Proof of payment: session ID</h3>
        <p className="kolo-session-id" style={{ margin: 0, fontSize: 24, lineHeight: '32px', wordSpacing: 6 }}>{SESSION_ID}</p>
        <p style={{ margin: 0, fontSize: 14, lineHeight: '20px' }}>Give this number to the recipient. Their bank can trace the payment with it.</p>
      </section>

      <footer className="kolo-muted" style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, lineHeight: '18px' }}>
        <p style={{ margin: 0 }}>This receipt shows the status at the moment it was downloaded. Open the Kolo app for the live status.</p>
        <p style={{ margin: 0, color: 'var(--ink)', fontWeight: 500 }}>We will never ask for your PIN or OTP.</p>
      </footer>
    </article>
  );
}
