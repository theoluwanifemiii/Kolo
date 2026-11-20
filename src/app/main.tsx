import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/tokens-v2.css';
import '../styles/bundle-v2.css';
import './app.css';
import { useHashRoute } from '../shared/router';
import { EMAILS, STATUSES, type EmailId, type TransferStatus } from './data';
import { Receipt } from './Receipt';
import { ReceiptPdf } from './ReceiptPdf';
import { Group } from './screens/Group';
import { Home } from './screens/Home';
import { TransferEmail } from './TransferEmail';

type PreviewView = 'receipt' | 'pdf' | 'email';

const isStatus = (v: string) => STATUSES.some((s) => s.id === v);
const isEmail = (v: string) => EMAILS.some((e) => e.id === v);

const go = (view: PreviewView, variant: string) => {
  window.location.hash = `/${view}/${variant}`;
};

/** Status/template picker for the receipt, PDF and emails (mirrors the design's Tweaks panel). */
function Switcher({ view, variant }: { view: PreviewView; variant: string }) {
  const options = view === 'email' ? EMAILS : STATUSES;
  return (
    <nav className="kolo-switcher" aria-label="Preview">
      <label>
        Screen
        <select
          value={view}
          onChange={(e) => {
            const next = e.target.value as PreviewView;
            go(next, next === 'email' ? 'e1' : isStatus(variant) ? variant : 'processing');
          }}
        >
          <option value="receipt">Receipt</option>
          <option value="pdf">Receipt PDF</option>
          <option value="email">Email</option>
        </select>
      </label>
      <label>
        {view === 'email' ? 'Template' : 'Status'}
        <select value={variant} onChange={(e) => go(view, e.target.value)}>
          {options.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
        </select>
      </label>
    </nav>
  );
}

function App() {
  const [view, variant = ''] = useHashRoute('home').split('/');

  if (view === 'group') return <Group />;
  if (view === 'receipt' || view === 'pdf') {
    const status = (isStatus(variant) ? variant : view === 'pdf' ? 'successful' : 'processing') as TransferStatus;
    return (
      <>
        <Switcher view={view} variant={status} />
        {view === 'receipt' ? <Receipt status={status} /> : <ReceiptPdf status={status} />}
      </>
    );
  }
  if (view === 'email') {
    const template = (isEmail(variant) ? variant : 'e1') as EmailId;
    return (
      <>
        <Switcher view="email" variant={template} />
        <TransferEmail template={template} />
      </>
    );
  }
  return <Home />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
