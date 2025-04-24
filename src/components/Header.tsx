import React, { useState } from 'react';
import { MessageCircle, Lock } from 'lucide-react';

interface HeaderProps {
  messageCount: number;
  onAdminLogin: (password: string) => void;
}

const Header: React.FC<HeaderProps> = ({ messageCount, onAdminLogin }) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onAdminLogin(password);
    setPassword('');
    setShowPasswordInput(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 bg-gray-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageCircle size={24} className="text-indigo-500" />
          <h1 className="text-xl font-bold text-white">Anonymous Bubbles</h1>
          <span className="ml-3 bg-indigo-500/20 text-indigo-300 text-sm px-2 py-0.5 rounded-full">
            {messageCount} approved
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {showPasswordInput ? (
            <form onSubmit={handleAdminLogin} className="flex gap-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="px-3 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded-lg
                         focus:outline-none focus:border-indigo-500"
                autoFocus
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-sm text-indigo-400 hover:text-indigo-300 
                         hover:bg-indigo-500/20 rounded-lg transition-colors"
              >
                Login
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowPasswordInput(true)}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white px-3 py-1.5 
                       rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Lock size={16} />
              <span>Admin</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;