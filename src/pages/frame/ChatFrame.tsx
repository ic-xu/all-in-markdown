import React from 'react';
import Conversions from '@/components/chat-ui/Converstions';
import ChatArea from '@/components/chat-ui/ChatArea';

const ChatFrame = () => {
  return (
    <div className="flex w-full">
        <Conversions />
        <ChatArea />
    </div>
  );
};

export default ChatFrame;