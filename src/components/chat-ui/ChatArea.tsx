import React, { useState } from 'react';
import { useXMPP } from '@/context/XMPPContext';
import { FaPaperPlane } from 'react-icons/fa';
import MessageBubble from './MessageBubble';

const ChatArea: React.FC = () => {
  const { selectedContact, messages, sendMessage } = useXMPP();
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedContact) {
      sendMessage(selectedContact.jid, newMessage);
      setNewMessage('');
    }
  };

  if (!selectedContact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-dark/20 backdrop-blur-sm">
        <p className="text-gray-500 dark:text-white/60 text-lg">Select a contact to start chatting</p>
      </div>
    );
  }

  const chatMessages = messages
    .filter(msg => msg.from === selectedContact.jid || msg.to === selectedContact.jid);

  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-dark/20 backdrop-blur-sm">
      <div className="p-6 border-b border-gray-200 dark:border-white/10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {selectedContact.name || selectedContact.jid}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chatMessages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message}
            isOwn={message.from !== selectedContact.jid}
          />
        ))}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-white/10">
        <div className="flex gap-3 bg-white dark:bg-white/5 p-2 rounded-xl shadow-sm">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:outline-none"
          />
          <button
            type="submit"
            className="p-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity"
          >
            <FaPaperPlane />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatArea;