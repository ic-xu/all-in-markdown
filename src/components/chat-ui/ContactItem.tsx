import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Contact } from '@/types/xmpp';

interface ContactItemProps {
  contact: Contact;
  lastMessage?: string;
  lastMessageTime?: Date;
  isSelected: boolean;
  onClick: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ 
  contact, 
  lastMessage, 
  lastMessageTime, 
  isSelected, 
  onClick 
}) => {
  return (
    <div
      className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'bg-primary/20 dark:bg-primary/20 border border-primary/30' 
          : 'hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-3">
          <FaUser className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 dark:text-white truncate">
            {contact.name || contact.jid}
          </h3>
          {lastMessage && (
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {lastMessage}
            </p>
          )}
        </div>
        {lastMessageTime && (
          <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
            {lastMessageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
};

export default ContactItem;