import { useState } from 'react';
import { href } from '../../shared/router';
import { Keys } from '../components/Keypad';
import { Ico, Lead, ListenButton, Screen, StepHeader, Title } from '../components/Kolo';

/** Home lives in the main app page (Kolo v2 design system). */
const HOME_URL = '/app.html#/home';

export function Welcome() {
  return (
    <Screen>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 56 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 36, lineHeight: '40px', letterSpacing: -0.5 }}>Kolo</span>
        <ListenButton />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src="/assets/illus-welcome.svg" alt="A market woman in a blue gele smiling at a paid confirmation on her phone" width={300} height={300} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Title size={40}>Your ajo, sorted.</Title>
        <Lead>Pay your ajo, see who collects next, and get your money on your phone.</Lead>
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <a className="kl-btn kl-btn--primary kl-btn--lg kl-btn--block" href={href('language')}>Start</a>
        <a className="kl-btn kl-btn--quiet" href={HOME_URL}>I have an account</a>
      </div>
    </Screen>
  );
}

const LANGUAGES = [
  { id: 'english', name: 'English', hello: 'Hello' },
  { id: 'pidgin', name: 'Pidgin', hello: 'How far' },
  { id: 'yoruba', name: 'Yorùbá', hello: 'Ẹ n lẹ' },
  { id: 'hausa', name: 'Hausa', hello: 'Sannu' },
  { id: 'igbo', name: 'Igbo', hello: 'Ndewo' },
];

export function Language() {
  const [picked, setPicked] = useState('pidgin');
  return (
    <Screen>
      <StepHeader step={1} back="welcome" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Title>Choose your language</Title>
        <Lead>Kolo will talk to you in this language. You can change it later.</Lead>
      </div>
      <div className="kl-langs" style={{ width: '100%' }}>
        {LANGUAGES.map((l) => {
          const on = l.id === picked;
          return (
            <button key={l.id} type="button" className={on ? 'kl-lang is-selected' : 'kl-lang'} aria-pressed={on} onClick={() => setPicked(l.id)} style={{ minHeight: 72 }}>
              <span>
                <span style={{ display: 'block' }}>{l.name}</span>
                <span className="kl-lang__hello">{l.hello}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="kl-notice kl-notice--info" style={{ width: '100%' }}>
        <Ico name="icon-listen" lg />
        <p className="kl-notice__text">Tap the <b>Listen</b> button on any page and Kolo will read it out for you.</p>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <a className="kl-btn kl-btn--primary kl-btn--lg kl-btn--block" href={href('how-it-works')}>Continue</a>
      </div>
    </Screen>
  );
}

const AJO_STEPS = [
  { icon: 'icon-coins', bg: 'var(--sun-soft)', text: <>Everybody pays the <b>same money</b> every week or month.</> },
  { icon: 'icon-star', bg: 'var(--orange-soft)', text: <>Each time, <b>one person collects</b> the whole pot.</> },
  { icon: 'icon-round', bg: 'var(--blue-soft)', text: <>It goes round until <b>everybody</b> has collected.</> },
];

export function HowItWorks() {
  return (
    <Screen gap={20}>
      <StepHeader step={2} back="language" />
      <Title>How ajo works</Title>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src="/assets/illus-circle.svg" alt="Six market women in a circle passing the ajo payout round" width={230} height={230} />
      </div>
      <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {AJO_STEPS.map((s) => (
          <li key={s.icon} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="kl-tx__tile" style={{ width: 56, height: 56, background: s.bg }}><Ico name={s.icon} lg /></span>
            <span style={{ fontSize: 18, lineHeight: '26px' }}>{s.text}</span>
          </li>
        ))}
      </ol>
      <div style={{ marginTop: 'auto' }}>
        <a className="kl-btn kl-btn--primary kl-btn--lg kl-btn--block" href={href('phone')}>I understand</a>
      </div>
    </Screen>
  );
}

function formatPhone(d: string) {
  let shown = d.slice(0, 3);
  if (d.length > 3) shown += ' ' + d.slice(3, 6);
  if (d.length > 6) shown += ' ' + d.slice(6, 10);
  return shown;
}

export function Phone() {
  const [digits, setDigits] = useState('');
  return (
    <Screen gap={20}>
      <StepHeader step={3} back="how-it-works" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Title>Your phone number</Title>
        <Lead>We send a code to this number.</Lead>
      </div>
      <div className="kl-keypad" style={{ width: '100%' }}>
        <div className="kl-readout" role="status" aria-label="Phone number">
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="kolo-muted" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, lineHeight: '28px' }}>+234</span>
            {digits ? (
              <span className="kl-amount kl-amount--md" style={{ fontSize: 28, lineHeight: '32px', letterSpacing: 1 }}>{formatPhone(digits)}</span>
            ) : (
              <span className="kl-readout__hint">Type your number</span>
            )}
          </span>
          <span className="kl-readout__hint">{digits.length} of 10</span>
        </div>
        <Keys
          onDigit={(n) => setDigits((d) => (d.length < 10 ? d + n : d))}
          onClear={() => setDigits('')}
          onDelete={() => setDigits((d) => d.slice(0, -1))}
        />
      </div>
      <div style={{ marginTop: 'auto' }}>
        <a className="kl-btn kl-btn--primary kl-btn--lg kl-btn--block" href={href('pin')}>Send me the code</a>
      </div>
    </Screen>
  );
}

export function Pin() {
  const [pin, setPin] = useState('');
  return (
    <Screen gap={20}>
      <StepHeader step={4} back="phone" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Title>Make your 4 number PIN</Title>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Ico name="icon-shield" style={{ marginTop: 2 }} />
          <Lead>You use it every time you pay. We will never ask you for it.</Lead>
        </div>
      </div>
      <div role="status" aria-label={`${pin.length} of 4 numbers typed`} style={{ display: 'flex', justifyContent: 'center', gap: 16, padding: '4px 0' }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={i < pin.length ? 'kolo-pin-dot is-filled' : 'kolo-pin-dot'} />
        ))}
      </div>
      <Keys
        onDigit={(n) => setPin((p) => (p.length < 4 ? p + n : p))}
        onClear={() => setPin('')}
        onDelete={() => setPin((p) => p.slice(0, -1))}
      />
      <div style={{ marginTop: 'auto' }}>
        <a className="kl-btn kl-btn--primary kl-btn--lg kl-btn--block" href={href('ready')}>Save my PIN</a>
      </div>
    </Screen>
  );
}

export function Ready() {
  return (
    <Screen gap={0} padded={false}>
      <div style={{ padding: '20px 20px 0', display: 'flex', justifyContent: 'flex-end' }}>
        <ListenButton />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0 24px' }}>
        <img src="/assets/illus-pot.svg" alt="A clay kolo savings pot with a naira coin dropping in" width={280} height={280} />
      </div>
      <section className="kl-sheet" style={{ width: '100%', boxSizing: 'border-box', flex: 1, alignItems: 'stretch', textAlign: 'left', gap: 16, padding: '24px 20px 20px', borderLeft: 0, borderRight: 0, borderBottom: 0 }}>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 40, lineHeight: '44px', fontWeight: 800, letterSpacing: -0.5, textAlign: 'center' }}>You are ready, Mama Tunde.</h1>
        <p className="kl-sheet__text" style={{ fontSize: 20, lineHeight: '30px', textAlign: 'center' }}>Join your group with the code your leader gave you, or start a new ajo with your people.</p>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <a className="kl-btn kl-btn--primary kl-btn--lg kl-btn--block" href={HOME_URL}><Ico name="icon-groups" />Join a group</a>
          <a className="kl-btn kl-btn--lg kl-btn--block" href={HOME_URL}><Ico name="icon-plus" />Start a new ajo</a>
        </div>
      </section>
    </Screen>
  );
}
