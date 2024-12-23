import React from 'react';
import type { Message } from '@/app/types/chat';

interface MessageListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export default function MessageList({ messages, messagesEndRef }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              message.sender === 'You'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 dark:text-white [data-theme="green"]:bg-emerald-700'
            }`}
          >
            <div className="font-semibold text-sm mb-1">{message.sender}</div>
            <div className="text-sm whitespace-pre-wrap">{message.content}</div>
            <div className="text-xs opacity-70 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}