// Content for the transfer receipt, its PDF and the six transfer emails, taken from the Kolo design.
// The demo transfer (₦50,000 to Bisi Adeyemi) stands in for real transfer data.

export type StepState = 'done' | 'fail' | 'now' | 'todo';
export type Tone = 'waiting' | 'due' | 'paid' | 'missed' | 'info';
export type NoticeTone = 'info' | 'due' | 'success' | 'missed';
export type TransferStatus = 'processing' | 'delayed' | 'successful' | 'failed' | 'refunded' | 'review';
export type PillIcon = 'rotate' | 'clock' | 'check' | 'alert' | 'down' | 'shield';

export const STATUSES: { id: TransferStatus; label: string }[] = [
  { id: 'processing', label: 'Processing' },
  { id: 'delayed', label: 'Delayed' },
  { id: 'successful', label: 'Successful' },
  { id: 'failed', label: 'Failed' },
  { id: 'refunded', label: 'Refunded' },
  { id: 'review', label: 'Under review' },
];

export const SESSION_ID = '000013 261120 141405 627381 904215';
export const REFERENCE = 'TRF2611200001';

const DELIVERY = ['Money left your account', 'Sent to Access Bank', 'Access Bank confirmed', 'Completed'];
const REFUND = ['Money left your account', 'Transfer failed', 'Refund started', 'Refund completed'];

export const SPOT = {
  payOut: '/assets/icon-pay-out.svg',
  clock: '/assets/icon-clock.svg',
  check: '/assets/icon-check.svg',
  alert: '/assets/icon-alert.svg',
  payIn: '/assets/icon-pay-in.svg',
  safe: '/assets/icon-shield.svg',
};

export const ART = {
  paid: { src: '/assets/illus-paid.svg', alt: 'A hand holding a phone showing a paid tick' },
  rolling: { src: '/assets/illus-rolling.svg', alt: 'A naira coin rolling fast' },
  handoff: { src: '/assets/illus-handoff.svg', alt: 'One hand passes a bundle of naira notes into another open hand' },
};

export interface ReceiptState {
  pill: Tone;
  icon: PillIcon;
  pillLabel: string;
  heroAmount: string;
  heroLabel: string;
  headline: string;
  sub: string;
  refund: boolean;
  track: string[];
  states: StepState[];
  subs: string[];
  notice: NoticeTone;
  spot: string;
  next: string;
  warn?: string;
  proof?: boolean;
  repeat?: boolean;
  hasCase?: boolean;
  updated: string;
  // PDF-only copy
  pdf: { sub: string; amountLabel: string; times: string[]; stamp: string };
}

export const RECEIPT: Record<TransferStatus, ReceiptState> = {
  processing: {
    pill: 'waiting', icon: 'rotate', pillLabel: 'Processing',
    heroAmount: '50,000', heroLabel: 'to Bisi Adeyemi',
    headline: 'Your transfer is on its way', sub: 'We sent it to Access Bank.',
    refund: false, track: DELIVERY, states: ['done', 'now', 'todo', 'todo'], subs: ['2:14 PM', 'Now', '', ''],
    notice: 'info', spot: SPOT.payOut,
    next: 'It usually arrives in under a minute. You don’t need to do anything.',
    updated: '2:14 PM',
    pdf: { sub: 'Usually arrives in under a minute.', amountLabel: 'Sent to Bisi Adeyemi', times: ['2:14 PM', 'Now', '', ''], stamp: '20 November 2026, 2:14 PM' },
  },
  delayed: {
    pill: 'due', icon: 'clock', pillLabel: 'Delayed',
    heroAmount: '50,000', heroLabel: 'to Bisi Adeyemi',
    headline: 'Waiting for Access Bank to confirm', sub: 'We are checking with Access Bank.',
    refund: false, track: DELIVERY, states: ['done', 'now', 'todo', 'todo'], subs: ['2:14 PM, 12 minutes ago', 'Waiting for an answer', '', ''],
    notice: 'due', spot: SPOT.clock,
    next: 'You get a final answer by 2:14 PM tomorrow, Saturday 21 November. Your money is not lost.',
    warn: 'Don’t send it again. You could pay twice.',
    updated: '2:26 PM',
    pdf: { sub: 'Final answer by 2:14 PM, Saturday 21 November. Do not resend.', amountLabel: 'Sent to Bisi Adeyemi', times: ['2:14 PM', 'Waiting', '', ''], stamp: '20 November 2026, 2:26 PM' },
  },
  successful: {
    pill: 'paid', icon: 'check', pillLabel: 'Successful',
    heroAmount: '50,000', heroLabel: 'to Bisi Adeyemi',
    headline: 'Delivered to Bisi Adeyemi', sub: 'Access Bank confirmed it at 2:14 PM.',
    refund: false, track: DELIVERY, states: ['done', 'done', 'done', 'done'], subs: ['2:14 PM', '2:14 PM', '2:14 PM', '2:14 PM'],
    notice: 'success', spot: SPOT.check,
    next: 'Delivered to Access Bank at 2:14 PM. If Bisi can’t see it, her bank can trace it with the session ID below.',
    proof: true, repeat: true,
    updated: '2:15 PM',
    pdf: { sub: 'Access Bank confirmed it at 2:14 PM.', amountLabel: 'Sent to Bisi Adeyemi', times: ['2:14 PM', '2:14 PM', '2:14 PM', '2:14 PM'], stamp: '20 November 2026, 2:15 PM' },
  },
  failed: {
    pill: 'missed', icon: 'alert', pillLabel: 'Failed, refund in progress',
    heroAmount: '50,010', heroLabel: 'coming back to you',
    headline: 'Transfer failed. Your money is coming back.', sub: 'Access Bank did not accept it, so Bisi was not paid.',
    refund: true, track: REFUND, states: ['done', 'fail', 'now', 'todo'], subs: ['2:14 PM', '2:31 PM', '2:31 PM', 'By 2:31 PM tomorrow'],
    notice: 'missed', spot: SPOT.alert,
    next: 'Your ₦50,010 is on its way back to you. Expect it by 2:31 PM tomorrow, Saturday 21 November. You don’t need to do anything.',
    updated: '2:31 PM',
    pdf: { sub: 'Refund expected by 2:31 PM, Saturday 21 November.', amountLabel: 'Coming back to you', times: ['2:14 PM', '2:31 PM', '2:31 PM', ''], stamp: '20 November 2026, 2:31 PM' },
  },
  refunded: {
    pill: 'info', icon: 'down', pillLabel: 'Refunded',
    heroAmount: '50,010', heroLabel: 'back in your Kolo wallet',
    headline: '₦50,010 returned to your account', sub: 'It landed at 4:05 PM.',
    refund: true, track: REFUND, states: ['done', 'fail', 'done', 'done'], subs: ['2:14 PM', '2:31 PM', '2:31 PM', '4:05 PM'],
    notice: 'success', spot: SPOT.payIn,
    next: '₦50,010 returned to your account at 4:05 PM. If you still want to send the money, you can try again now.',
    repeat: true,
    updated: '4:05 PM',
    pdf: { sub: 'Returned at 4:05 PM on 20 November.', amountLabel: 'Returned to you', times: ['2:14 PM', '2:31 PM', '2:31 PM', '4:05 PM'], stamp: '20 November 2026, 4:05 PM' },
  },
  review: {
    pill: 'due', icon: 'shield', pillLabel: 'Under review',
    heroAmount: '50,000', heroLabel: 'to Bisi Adeyemi',
    headline: 'A specialist is reviewing this transfer', sub: 'Case CS-10482. Update by Monday 23 November.',
    refund: false, track: DELIVERY, states: ['done', 'now', 'todo', 'todo'], subs: ['2:14 PM', 'Under review since 21 November', '', ''],
    notice: 'info', spot: SPOT.safe,
    next: 'A specialist is following up with Access Bank. Your money is either with Bisi or it comes back to you in full. We will update you by Monday 23 November.',
    warn: 'Keep your case ID: CS-10482.',
    hasCase: true,
    updated: '21 November, 2:14 PM',
    pdf: { sub: 'Case CS-10482. Update by Monday 23 November.', amountLabel: 'Sent to Bisi Adeyemi', times: ['2:14 PM', 'Under review', '', ''], stamp: '21 November 2026, 2:14 PM' },
  },
};

// ---- Emails ----

export type EmailId = 'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6';

export const EMAILS: { id: EmailId; label: string }[] = [
  { id: 'e1', label: 'E1 Successful' },
  { id: 'e2', label: 'E2 Delayed' },
  { id: 'e3', label: 'E3 Delivered after delay' },
  { id: 'e4', label: 'E4 Failed, refunding' },
  { id: 'e5', label: 'E5 Refund completed' },
  { id: 'e6', label: 'E6 Under review' },
];

export interface SummaryRow { k: string; v: string }

export interface EmailTemplate {
  sentAt: string;
  subject: string;
  preheader: string;
  pill: Tone;
  pillLabel: string;
  headline: string;
  art?: { src: string; alt: string };
  track: string[];
  states: StepState[];
  tagAt: number;
  tag: string;
  paras: string[];
  list?: string[];
  parasAfter?: string[];
  notice: NoticeTone;
  spot: string;
  next: string;
  button: string;
  secondary?: string;
  quote?: string;
  summary: SummaryRow[];
}

// Emails label step 3 "Bank confirmed" (shorter, fits a 4-column tracker at 640px).
const EMAIL_DELIVERY = ['Money left your account', 'Sent to Access Bank', 'Bank confirmed', 'Completed'];

const BASE_SUMMARY: SummaryRow[] = [
  { k: 'Amount', v: '₦50,000' },
  { k: 'To', v: 'Bisi Adeyemi, Access Bank' },
  { k: 'Account', v: '01****4521' },
  { k: 'Sent', v: '20 November, 2:14 PM' },
  { k: 'Reference', v: REFERENCE },
];

export const EMAIL: Record<EmailId, EmailTemplate> = {
  e1: {
    sentAt: '2:14 PM', subject: '₦50,000 sent to Bisi Adeyemi',
    preheader: 'Delivered to Access Bank at 2:14 PM. Your receipt is inside.',
    pill: 'paid', pillLabel: 'Successful', headline: 'Your transfer was delivered',
    art: ART.paid,
    track: EMAIL_DELIVERY, states: ['done', 'done', 'done', 'done'], tagAt: 3, tag: 'Completed',
    paras: [
      'Hi Mama Tunde, your transfer of ₦50,000 to Bisi Adeyemi (Access Bank, 01****4521) was confirmed by their bank at 2:14 PM on 20 November.',
      `If Bisi can’t see it yet, share your receipt with them. Their bank can trace the payment with session ID ${SESSION_ID}.`,
    ],
    notice: 'success', spot: SPOT.check, next: 'Nothing else to do. Your receipt is ready to share.',
    button: 'View receipt', summary: BASE_SUMMARY,
  },
  e2: {
    sentAt: '2:24 PM', subject: 'Your ₦50,000 transfer to Bisi Adeyemi is taking longer than usual',
    preheader: 'Your money is safe. We are checking with Access Bank now.',
    pill: 'due', pillLabel: 'Delayed', headline: 'Your transfer is waiting on Access Bank',
    art: ART.rolling,
    track: EMAIL_DELIVERY, states: ['done', 'now', 'todo', 'todo'], tagAt: 1, tag: 'You are here',
    paras: [
      'Hi Mama Tunde, we sent ₦50,000 to Bisi Adeyemi at 2:14 PM. We are still waiting for Access Bank to confirm it arrived.',
      'This happens when a bank is slow to respond. Your money is not lost. One of two things will happen:',
    ],
    list: [
      'Access Bank confirms, and we email you that it was delivered.',
      'Access Bank declines, and we return the full ₦50,000 to your account.',
    ],
    parasAfter: ['You will have a final answer by 2:14 PM tomorrow, Saturday 21 November. You don’t need to do anything, and sending it again could mean paying twice.'],
    notice: 'due', spot: SPOT.clock, next: 'Final answer by 2:14 PM, Saturday 21 November. Don’t send it again.',
    button: 'Track live status', summary: BASE_SUMMARY,
  },
  e3: {
    sentAt: '2:41 PM', subject: 'Good news: your ₦50,000 reached Bisi Adeyemi',
    preheader: 'Access Bank confirmed your transfer at 2:41 PM.',
    pill: 'paid', pillLabel: 'Successful', headline: 'Delivered. Thanks for your patience.',
    art: ART.paid,
    track: EMAIL_DELIVERY, states: ['done', 'done', 'done', 'done'], tagAt: 3, tag: 'Completed',
    paras: [
      'Hi Mama Tunde, earlier we told you your transfer to Bisi Adeyemi was delayed. Access Bank has now confirmed that ₦50,000 arrived at 2:41 PM.',
      `There’s nothing else to do. If Bisi can’t see it, their bank can trace it with session ID ${SESSION_ID}.`,
    ],
    notice: 'success', spot: SPOT.check, next: 'Nothing else to do. The transfer is complete.',
    button: 'View receipt', summary: BASE_SUMMARY,
  },
  e4: {
    sentAt: '2:31 PM', subject: 'Your ₦50,000 transfer to Bisi Adeyemi didn’t go through. Your refund has started.',
    preheader: 'The full ₦50,010 will be back in your account by 2:31 PM, Saturday 21 November.',
    pill: 'missed', pillLabel: 'Failed, refund in progress', headline: 'This transfer failed, and your money is coming back',
    track: REFUND, states: ['done', 'fail', 'now', 'todo'], tagAt: 2, tag: 'You are here',
    paras: [
      'Hi Mama Tunde, Access Bank did not accept your transfer of ₦50,000, so Bisi Adeyemi was not credited.',
      'We have started returning ₦50,010 to your account ending 7781. Expect it by 2:31 PM, Saturday 21 November. We will email you the moment it lands.',
      'What went wrong: Access Bank’s system was not available.',
      'You can try again once the refund is complete.',
    ],
    notice: 'due', spot: SPOT.clock, next: 'Refund by 2:31 PM, Saturday 21 November. You don’t need to do anything.',
    button: 'Track your refund',
    summary: [{ k: 'Coming back to you', v: '₦50,010' }, ...BASE_SUMMARY.slice(1)],
  },
  e5: {
    sentAt: '4:05 PM', subject: '₦50,010 is back in your account',
    preheader: 'Your refund for the failed transfer to Bisi Adeyemi is complete.',
    pill: 'info', pillLabel: 'Refunded', headline: 'Your refund is complete',
    art: ART.handoff,
    track: REFUND, states: ['done', 'fail', 'done', 'done'], tagAt: 3, tag: 'Completed',
    paras: [
      'Hi Mama Tunde, we returned ₦50,010 to your account ending 7781 at 4:05 PM.',
      `This closes the failed transfer to Bisi Adeyemi from 20 November (reference ${REFERENCE}). If you still want to send the money, you can try again now.`,
    ],
    notice: 'success', spot: SPOT.payIn, next: 'Nothing else to do. Your money is back in your Kolo wallet.',
    button: 'Send again', secondary: 'View receipt',
    summary: [{ k: 'Returned to you', v: '₦50,010' }, ...BASE_SUMMARY.slice(1)],
  },
  e6: {
    sentAt: '21 Nov, 2:14 PM', subject: 'We’re reviewing your ₦50,000 transfer to Bisi Adeyemi',
    preheader: 'Case CS-10482. You will hear from us by Monday 23 November.',
    pill: 'due', pillLabel: 'Under review', headline: 'A specialist is now handling your transfer',
    track: EMAIL_DELIVERY, states: ['done', 'now', 'todo', 'todo'], tagAt: 1, tag: 'Under review',
    paras: [
      'Hi Mama Tunde, we haven’t had a final answer from Access Bank about your ₦50,000 transfer, so we opened case CS-10482. A specialist is following up with the bank directly.',
      'Your money is accounted for. It is either with Bisi Adeyemi or it comes back to you in full.',
      'We will email you by Monday 23 November, sooner if it is resolved. You don’t need to contact us, but if you do, quote case CS-10482.',
    ],
    notice: 'info', spot: SPOT.safe, next: 'Update by Monday 23 November. Keep your case ID: CS-10482.',
    button: 'View case status', quote: 'case CS-10482',
    summary: [...BASE_SUMMARY, { k: 'Case', v: 'CS-10482' }],
  },
};
