import React from 'react';
import Conversions from '@/components/chat-ui/Converstions';
import ChatArea from '@/components/chat-ui/ChatArea';
import SideNav from '@/components/SideNav';

const ChatLayout = () => {
  return (

    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-dark p-4">
      <div className="flex w-full rounded-2xl overflow-hidden bg-white/10 backdrop-blur-glass shadow-glass">
        <SideNav onNavClick={() =>{}} activeView=" "/>
        <Conversions />
        <ChatArea />
      </div>
    </div>
  );
};

export default ChatLayout;