import React from 'react';
import { useXMPP } from '@/context/XMPPContext';
import { FaSignOutAlt } from 'react-icons/fa';
import ContactItem from '@/components/chat-ui/ContactItem';
import { useTheme } from '@/themes/ThemeContext';

const Conversions: React.FC = () => {
  const { contacts, messages, selectedContact, setSelectedContact } = useXMPP();
  const { currentTheme } = useTheme();

  const getLastMessage = (contactJid: string) => {
    const contactMessages = messages
      .filter(msg => msg.from === contactJid || msg.to === contactJid)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    return contactMessages[0];
  };

  return (
    <div className={`w-80 ${currentTheme.styles.background.primary} ${currentTheme.styles.text.primary} flex flex-col border-r ${currentTheme.styles.border.primary}`}>
      <div className={`p-6 border-b ${currentTheme.styles.border.primary} flex items-center justify-between`}>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          XMPP Chat
        </h1>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-sm uppercase mb-4 font-semibold tracking-wider">
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

      <div className={`p-4 border-t ${currentTheme.styles.border.primary}`}>
        <button className="w-full flex items-center justify-center p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors duration-200">
          <FaSignOutAlt className="mr-2" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Conversions;