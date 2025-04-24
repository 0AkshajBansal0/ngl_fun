import React, { useState } from 'react';
import { getRandomBubbleColor, getRandomPosition, getRandomSize } from '../utils/colors';
import { MessageSquarePlus } from 'lucide-react';

interface MessageFormProps {
  onSubmit: (message: string) => void;
}

const MAX_MESSAGE_LENGTH = 150;

const MessageForm: React.FC<MessageFormProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_MESSAGE_LENGTH) {
      setMessage(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message.trim());
      setMessage('');
      setIsFormOpen(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isFormOpen ? (
        <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl 
                    transform transition-all duration-300 w-72">
          <form onSubmit={handleSubmit}>
            <h3 className="text-white text-lg font-semibold mb-2">Post Anonymously</h3>
            <textarea
              value={message}
              onChange={handleChange}
              placeholder="Type your anonymous message..."
              className="w-full p-3 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 
                        focus:ring-indigo-500 resize-none h-24"
              autoFocus
            />
            <div className="flex justify-between items-center mt-2">
              <span className={`text-sm ${message.length > MAX_MESSAGE_LENGTH * 0.8 ? 'text-orange-400' : 'text-gray-400'}`}>
                {message.length}/{MAX_MESSAGE_LENGTH}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-3 py-1.5 text-sm text-white bg-gray-600 hover:bg-gray-700 
                            rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="px-3 py-1.5 text-sm text-white bg-indigo-600 hover:bg-indigo-700 
                            disabled:bg-indigo-500/50 disabled:cursor-not-allowed
                            rounded-lg transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg 
                    transition-all duration-300 hover:scale-110"
          aria-label="Create new message"
        >
          <MessageSquarePlus size={24} />
        </button>
      )}
    </div>
  );
};

export default MessageForm;