import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import type { Message, Conversation } from '@/app/types/chat';

// Mock data for demonstration
const mockConversations: Conversation[] = [
  {
    id: '1',
    name: '张三',
    lastMessage: {
      id: '1',
      sender: '张三',
      content: '好的，我们下周再讨论',
      timestamp: new Date(),
    },
    unreadCount: 2,
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: '李四',
    lastMessage: {
      id: '2',
      sender: '你',
      content: '项目进展如何？',
      timestamp: new Date(Date.now() - 3600000),
    },
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 3600000),
  },
];

const MIN_CONVERSATION_SIZE = 15;
const MIN_CHAT_SIZE = 30;

export default function ChatInterface() {
  const [selectedConversation, setSelectedConversation] = React.useState<string | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [newMessage, setNewMessage] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'You',
        content: newMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="h-full bg-white dark:bg-gray-800 [data-theme='green']:bg-emerald-800">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={20} minSize={MIN_CONVERSATION_SIZE}>
          <ConversationList
            conversations={mockConversations}
            selectedId={selectedConversation}
            onSelect={setSelectedConversation}
          />
        </Panel>
        <PanelResizeHandle className="w-1 hover:w-2 bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-600 transition-all duration-150 cursor-col-resize" />
        <Panel minSize={MIN_CHAT_SIZE}>
          <div className="h-full flex flex-col">
            <MessageList messages={messages} messagesEndRef={messagesEndRef} />
            <MessageInput
              value={newMessage}
              onChange={setNewMessage}
              onSend={handleSendMessage}
            />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}