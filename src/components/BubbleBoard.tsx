import React from 'react';
import MessageBubble from './MessageBubble';
import { Message } from '../types';

interface BubbleBoardProps {
  messages: Message[];
}

const BubbleBoard: React.FC<BubbleBoardProps> = ({ messages }) => {
  // Calculate positions in a circular pattern
  const getCircularPosition = (index: number, total: number) => {
    if (total === 1) return { x: 50, y: 50 }; // Center single message
    
    const radius = Math.min(35, Math.max(20, 40 - total * 2)); // Adjust radius based on message count
    const angle = (index / total) * 2 * Math.PI;
    return {
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle),
    };
  };

  // Update message positions
  const positionedMessages = messages.map((message, index) => ({
    ...message,
    position: getCircularPosition(index, messages.length),
  }));

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-8rem)] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Central circle decoration */}
        <div className="absolute w-[40vmin] h-[40vmin] rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl" />
      </div>
      
      {positionedMessages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      
      {messages.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 py-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm">
            <p className="text-white/70 text-lg mb-2">
              No messages yet
            </p>
            <p className="text-white/50">
              Be the first to write something!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BubbleBoard;