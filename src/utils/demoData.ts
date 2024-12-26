import { Contact, Message } from '@/types/xmpp';

export const demoContacts: Contact[] = [
  { jid: 'alice@example.com', name: 'Alice' },
  { jid: 'bob@example.com', name: 'Bob' },
  { jid: 'charlie@example.com', name: 'Charlie' },
];

export const demoMessages: Message[] = [
  {
    from: 'alice@example.com',
    to: 'user@example.com',
    body: 'Hey! How are you?',
    timestamp: new Date('2023-12-20T10:00:00')
  },
  {
    from: 'user@example.com',
    to: 'alice@example.com',
    body: 'I\'m good, thanks! How about you?',
    timestamp: new Date('2023-12-20T10:01:00')
  },
  {
    from: 'bob@example.com',
    to: 'user@example.com',
    body: 'Did you see the new project requirements?',
    timestamp: new Date('2023-12-20T11:30:00')
  },
];