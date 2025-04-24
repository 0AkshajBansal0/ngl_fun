import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const sizeClasses = {
  small: 'w-[180px] min-h-[80px]',
  medium: 'w-[220px] min-h-[100px]',
  large: 'w-[260px] min-h-[120px]',
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={`absolute ${sizeClasses[message.size]} ${message.color}
        rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-sm
        transform transition-all duration-500 hover:scale-105 hover:z-10
        border border-white/10 bg-opacity-90`}
      style={{
        left: `${message.position.x}%`,
        top: `${message.position.y}%`,
        transform: `translate(-50%, -50%) rotate(${Math.random() * 6 - 3}deg)`,
        animationName: 'bubble-in',
        animationDuration: '0.6s',
        animationTimingFunction: 'ease-out',
        animationFillMode: 'forwards',
      }}
    >
      <div className="flex flex-col h-full justify-between">
        <p className="font-medium break-words text-white/90 leading-relaxed">
          {message.content}
        </p>
        <div className="text-xs text-white/70 text-right mt-3 font-medium">
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;