import React from 'react';
import { useXMPP } from '@/context/XMPPContext';
import { FaSignOutAlt } from 'react-icons/fa';
import ContactItem from '@/components/chat-ui/ContactItem';
import ThemeSelector from "@/themes/ThemeSelector";
// import ThemeToggle from '@/components/ThemeToggle';

const Conversions: React.FC = () => {
  const { contacts, messages, selectedContact, setSelectedContact } = useXMPP();

  const getLastMessage = (contactJid: string) => {
    const contactMessages = messages
      .filter(msg => msg.from === contactJid || msg.to === contactJid)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    return contactMessages[0];
  };

  return (
    <div className="w-80 bg-white dark:bg-dark/40 backdrop-blur-sm text-gray-900 z-0
     dark:text-white flex flex-col border-r border-gray-200 dark:border-white/10">
      <div className="p-6 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          XMPP Chat
        </h1>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-sm text-gray-500 dark:text-gray-400 uppercase mb-4 font-semibold tracking-wider">
            Contacts
          </h2>
          <div className="space-y-2">
            {contacts.map((contact) => {
              const lastMessage = getLastMessage(contact.jid);
              return (
                <ContactItem
                  key={contact.jid}
                  contact={contact}
                  lastMessage={lastMessage?.body}
                  lastMessageTime={lastMessage?.timestamp}
                  isSelected={selectedContact?.jid === contact.jid}
                  onClick={() => setSelectedContact(contact)}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-white/10">
        <button className="w-full flex items-center justify-center p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors duration-200">
          <FaSignOutAlt className="mr-2" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Conversions;