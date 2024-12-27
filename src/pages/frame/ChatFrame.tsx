import React from 'react';
import Conversions from '@/components/chat-ui/Converstions';
import ChatArea from '@/components/chat-ui/ChatArea';
import { ThemeProvider } from '@/themes/ThemeContext';

const ChatFrame = () => {
  return (
    <ThemeProvider>
      <div className="flex w-full">
        <Conversions />
        <ChatArea />
      </div>
    </ThemeProvider>
  );
};

export default ChatFrame;