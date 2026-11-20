import { useState } from 'react';
import { href } from '../../shared/router';
import { Icon } from '../Tracker';
import { TabDock } from './TabDock';

type Group = {
  id: string;
  initials: string;
  tint: 'orange' | 'sun';
  name: string;
  meta: string;
  amount: string;
  turn: number;
  status: 'due' | 'turn';
  when: string;
};

const GROUPS: Group[] = [
  { id: 'oja-oba', initials: 'OO', tint: 'orange', name: 'Oja Oba Traders', meta: '12 members · monthly', amount: '5,000', turn: 3, status: 'due', when: 'Fri' },
  { id: 'balogun', initials: 'BF', tint: 'sun', name: 'Balogun Fabrics', meta: '10 members · monthly', amount: '10,000', turn: 2, status: 'turn', when: '28 Mar' },
];

function GroupCard({ g }: { g: Group }) {
  return (
    <a className="kl-group kolo-link-card" href={href('group')} aria-label={`${g.name}, ₦${g.amount}, ${g.status === 'due' ? 'due' : 'your turn'} ${g.when}`}>
      <div className="kl-group__top">
        <span className={`kl-avatar kl-avatar--${g.tint}`}>{g.initials}</span>
        <div className="kl-row__body">
          <p className="kl-row__title">{g.name}</p>
          <p className="kl-row__sub">{g.meta}</p>
        </div>
        <span className="kl-amount kl-amount--md"><span className="kl-amount__naira">₦</span>{g.amount}</span>
      </div>
      <hr className="kl-dash" />
      <div className="kl-group__foot">
        <span className="kl-group__ref"><Icon name="rotate" />Turn {g.turn}</span>
        {g.status === 'due' ? (
          <span className="kl-pill kl-pill--due"><Icon name="clock" />Due</span>
        ) : (
          <span className="kl-pill kl-pill--turn"><Icon name="star" />Your turn</span>
        )}
        <span className="kl-grow" />
        {g.when}
      </div>
    </a>
  );
}

/** Home (Kolo v2 AppScreens): greeting, wallet balance, quick actions, ajo groups, floating tab bar. */
export function Home() {
  const [hidden, setHidden] = useState(false);
  return (
    <div className="kolo-phone">
      <div className="kolo-phone__scroll">
        <div className="kl-topbar">
          <div className="kl-topbar__hello">
            <span className="kl-avatar kl-avatar--orange">IB</span>
            <div><small>Good morning</small><b>Iya Bisi</b></div>
          </div>
          <button className="kl-iconbtn" type="button" aria-label="Hear" style={{ color: 'var(--blue-ink)' }}><Icon name="speaker" /></button>
          <button className="kl-iconbtn" type="button" aria-label="Reminders"><Icon name="bell" /><span className="kl-iconbtn__dot" /></button>
        </div>

        <div className="kl-balance kl-balance--white">
          <button className="kl-balance__corner" type="button" aria-label={hidden ? 'Show balance' : 'Hide balance'} aria-pressed={hidden} onClick={() => setHidden((h) => !h)}>
            <Icon name="eye" />
          </button>
          <span className="kl-balance__label">Wallet balance</span>
          {hidden ? (
            <span className="kl-amount kl-amount--hero" aria-label="Balance hidden">••••••</span>
          ) : (
            <span className="kl-amount kl-amount--hero"><span className="kl-amount__naira">₦</span>34,567<span className="kl-amount__kobo">.90</span></span>
          )}
          <span className="kl-balance__acct"><Icon name="copy" />1289440585</span>
        </div>

        <div className="kl-actions">
          <a className="kl-action kl-action--main" href={href('group')}><span className="kl-action__circle"><Icon name="naira" /></span>Pay ajo</a>
          <button className="kl-action" type="button"><span className="kl-action__circle"><Icon name="plus" /></span>Add money</button>
          <button className="kl-action" type="button"><span className="kl-action__circle"><Icon name="people" /></span>Join group</button>
          <button className="kl-action" type="button"><span className="kl-action__circle"><Icon name="more" /></span>More</button>
        </div>

        <div className="kl-section">
          <h2>My ajo groups</h2>
          <button className="kl-chip" type="button">See all</button>
        </div>
        {GROUPS.map((g) => <GroupCard key={g.id} g={g} />)}
      </div>
      <TabDock active="home" />
    </div>
  );
}
