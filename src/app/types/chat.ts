export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  name: string;
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
}