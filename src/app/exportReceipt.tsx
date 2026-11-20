import { toPng } from 'html-to-image';
import { createRoot } from 'react-dom/client';
import { REFERENCE, type TransferStatus } from './data';
import { ReceiptPdf } from './ReceiptPdf';

// A4 at 96 dpi, the size ReceiptPdf is laid out at.
const A4_W = 794;
const A4_H = 1123;

/** Render the A4 receipt off-screen and capture it as a PNG data URL (2× for sharp text). */
async function renderReceiptPng(status: TransferStatus): Promise<string> {
  const host = document.createElement('div');
  host.setAttribute('aria-hidden', 'true');
  host.style.cssText = `position:fixed;left:-${A4_W * 2}px;top:0;width:${A4_W}px;pointer-events:none;`;
  document.body.appendChild(host);
  const root = createRoot(host);
  try {
    root.render(<ReceiptPdf status={status} />);
    // Let React commit, then wait for web fonts and the SVG spot icons before capturing.
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    await document.fonts.ready;
    await Promise.all(
      Array.from(host.querySelectorAll('img')).map((img) => (img.complete ? null : img.decode().catch(() => null))),
    );
    const node = host.firstElementChild as HTMLElement;
    return await toPng(node, { pixelRatio: 2, backgroundColor: '#ffffff', width: A4_W, height: A4_H });
  } finally {
    root.unmount();
    host.remove();
  }
}

function saveDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const baseName = (status: TransferStatus) => `kolo-receipt-${REFERENCE}-${status}`;

/** "Download PDF": a one-page A4 PDF of the receipt. */
export async function downloadReceiptPdf(status: TransferStatus) {
  const png = await renderReceiptPng(status);
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [A4_W, A4_H], hotfixes: ['px_scaling'] });
  pdf.addImage(png, 'PNG', 0, 0, A4_W, A4_H);
  pdf.save(`${baseName(status)}.pdf`);
}

/** "Share": share the receipt as an image where the device supports it, otherwise download the PNG. */
export async function shareReceiptImage(status: TransferStatus) {
  const png = await renderReceiptPng(status);
  const filename = `${baseName(status)}.png`;
  const blob = await (await fetch(png)).blob();
  const file = new File([blob], filename, { type: 'image/png' });
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: 'Kolo transfer receipt' });
      return;
    } catch (err) {
      if ((err as DOMException).name === 'AbortError') return; // user closed the share sheet
    }
  }
  saveDataUrl(png, filename);
}
