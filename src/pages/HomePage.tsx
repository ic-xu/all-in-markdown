import React from 'react';
import SideNav from '@/components/SideNav';
import ChatFrame from "@/pages/frame/ChatFrame";
import DocsFrame from "@/pages/frame/DocsFrame";

const HomePage = () => {

    const [currentView, setCurrentView] = React.useState('chat-ui');

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-dark">
      <div className="flex w-full overflow-hidden bg-white/10 backdrop-blur-glass shadow-glass">
        <SideNav onNavClick={(view) =>{setCurrentView(view)}} activeView={currentView}/>
          {currentView === 'chat-ui' ? <ChatFrame /> : <DocsFrame/>}
      </div>
    </div>
  );
};

export default HomePage;