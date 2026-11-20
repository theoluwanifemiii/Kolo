import { href } from '../../shared/router';
import { Icon, type IconName } from '../Tracker';

const TABS: { id: string; label: string; icon: IconName; to: string }[] = [
  { id: 'home', label: 'Home', icon: 'home', to: href('home') },
  { id: 'groups', label: 'Groups', icon: 'people', to: href('group') },
  { id: 'receipts', label: 'Receipts', icon: 'receipt', to: href('receipt/successful') },
  { id: 'wallet', label: 'Wallet', icon: 'wallet', to: '#wallet' },
];

/** Floating dark tab bar with the blue add button. Only the active tab shows its label. */
export function TabDock({ active }: { active: string }) {
  return (
    <div className="kolo-phone__dock">
      <div className="kl-tabdock">
        <nav className="kl-tabbar" aria-label="Main">
          {TABS.map((t) => {
            const on = t.id === active;
            return (
              <a key={t.id} className={on ? 'kl-tab is-active' : 'kl-tab'} href={t.to} aria-current={on ? 'page' : undefined} aria-label={on ? undefined : t.label}>
                <Icon name={t.icon} />
                {on && t.label}
              </a>
            );
          })}
        </nav>
        <button className="kl-fab" type="button" aria-label="Start a new ajo"><Icon name="plus" /></button>
      </div>
    </div>
  );
}
