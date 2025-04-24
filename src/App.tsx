import React from 'react';
import MessageForm from './components/MessageForm';
import BubbleBoard from './components/BubbleBoard';
import Header from './components/Header';
import AdminView from './components/AdminView';
import { useMessages } from './hooks/useMessages';
import './assets/animation.css';

function App() {
  const {
    messages,
    approvedMessages,
    addMessage,
    approveMessage,
    rejectMessage,
    showAdminView,
    toggleAdminView,
    closeAdminView,
  } = useMessages();

  return (
    <div className="relative min-h-screen bg-gradient-dark text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, index) => (
          <div
            key={index}
            className="absolute rounded-full opacity-10 floating"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      
      <Header 
        messageCount={approvedMessages.length}
        onAdminLogin={toggleAdminView}
      />
      
      <main className="relative min-h-screen pt-16 pb-16">
        <BubbleBoard messages={approvedMessages} />
      </main>
      
      <MessageForm onSubmit={addMessage} />

      {showAdminView && (
        <AdminView
          messages={messages}
          onClose={closeAdminView}
          onApprove={approveMessage}
          onReject={rejectMessage}
        />
      )}
    </div>
  );
}

export default App;