import { Ico } from './Kolo';

/** 3×4 Kolo keypad: digits, Clear and Delete. */
export function Keys({ onDigit, onClear, onDelete }: { onDigit: (d: string) => void; onClear: () => void; onDelete: () => void }) {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return (
    <div className="kl-keys">
      {digits.map((d) => (
        <button key={d} className="kl-key" type="button" onClick={() => onDigit(d)}>{d}</button>
      ))}
      <button className="kl-key kl-key--fn" type="button" onClick={onClear} style={{ fontSize: 20 }}>Clear</button>
      <button className="kl-key" type="button" onClick={() => onDigit('0')}>0</button>
      <button className="kl-key kl-key--fn" type="button" onClick={onDelete} aria-label="Delete digit">
        <Ico name="icon-delete" lg />
      </button>
    </div>
  );
}
