import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { Conversation } from '@/app/types/chat';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 [data-theme='green']:bg-emerald-800">
      <div className="p-4 border-b dark:border-gray-700 [data-theme='green']:border-emerald-700">
        <h2 className="text-lg font-semibold">Conversations</h2>
      </div>
      <div className="flex-1 overflow-y-auto divide-y dark:divide-gray-700 [data-theme='green']:divide-emerald-700">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelect(conversation.id)}
            className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 [data-theme='green']:hover:bg-emerald-700 transition-colors ${
              selectedId === conversation.id ? 'bg-gray-100 dark:bg-gray-600 [data-theme="green"]:bg-emerald-600' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{conversation.name}</h3>
                {conversation.lastMessage && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {conversation.lastMessage.content}
                  </p>
                )}
              </div>
              <div className="ml-2 flex flex-col items-end">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(conversation.updatedAt, { addSuffix: true })}
                </span>
                {conversation.unreadCount > 0 && (
                  <span className="mt-1 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}