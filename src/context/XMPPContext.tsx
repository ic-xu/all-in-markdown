import React, { createContext, useContext, useState, useEffect } from 'react';
import { Contact, Message } from '@/types/xmpp';
import { demoContacts, demoMessages } from '@/utils/demoData';

interface XMPPContextType {
  contacts: Contact[];
  messages: Message[];
  selectedContact: Contact | null;
  setSelectedContact: (contact: Contact) => void;
  sendMessage: (to: string, body: string) => void;
}

const XMPPContext = createContext<XMPPContextType | null>(null);

export const XMPPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>(demoContacts);
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const sendMessage = async (to: string, body: string) => {
    const newMessage: Message = {
      from: 'user@example.com',
      to,
      body,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);

    // Simulate received message after 1 second
    setTimeout(() => {
      const response: Message = {
        from: to,
        to: 'user@example.com',
        body: `Demo reply to: ${body}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  return (
    <XMPPContext.Provider
      value={{
        contacts,
        messages,
        selectedContact,
        setSelectedContact,
        sendMessage
      }}
    >
      {children}
    </XMPPContext.Provider>
  );
};

export const useXMPP = () => {
  const context = useContext(XMPPContext);
  if (!context) {
    throw new Error('useXMPP must be used within an XMPPProvider');
  }
  return context;
};