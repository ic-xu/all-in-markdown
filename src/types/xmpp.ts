export interface Contact {
  jid: string;
  name?: string;
}

export interface Message {
  from: string;
  to: string;
  body: string;
  timestamp: Date;
}