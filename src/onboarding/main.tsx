import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/tokens-v1.css';
import '../styles/bundle-v1.css';
import './app.css';
import { useHashRoute } from '../shared/router';
import { HowItWorks, Language, Phone, Pin, Ready, Welcome } from './screens/Onboarding';

const ROUTES: Record<string, () => JSX.Element> = {
  welcome: Welcome,
  language: Language,
  'how-it-works': HowItWorks,
  phone: Phone,
  pin: Pin,
  ready: Ready,
};

function Onboarding() {
  const route = useHashRoute('welcome');
  const Screen = ROUTES[route] ?? Welcome;
  return <Screen />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Onboarding />
  </StrictMode>,
);
