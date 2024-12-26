import React from 'react';
import { Message } from '@/types/xmpp';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
  return (
    <div className={`max-w-[70%] ${isOwn ? 'ml-auto' : 'mr-auto'}`}>
      <div
        className={`p-4 rounded-2xl ${
          isOwn
            ? 'bg-gradient-to-r from-primary to-secondary text-white rounded-br-sm'
            : 'bg-white/10 dark:bg-white/5 text-gray-800 dark:text-white rounded-bl-sm'
        }`}
      >
        {message.body}
      </div>
      <div className={`text-xs mt-1 text-gray-500 dark:text-white/40 ${
        isOwn ? 'text-right' : 'text-left'
      }`}>
        {message.timestamp.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default MessageBubble;