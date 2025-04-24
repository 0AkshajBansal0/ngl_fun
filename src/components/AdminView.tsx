import React from 'react';
import { Message } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle, XCircle } from 'lucide-react';

interface AdminViewProps {
  messages: Message[];
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const AdminView: React.FC<AdminViewProps> = ({ messages, onClose, onApprove, onReject }) => {
  return (
    <div className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden shadow-xl">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Admin Dashboard</h2>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm text-gray-400 hover:text-white rounded-lg
                     hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-4rem)]">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No pending messages to review</p>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="bg-gray-700/50 p-4 rounded-xl shadow-lg border border-gray-600/50"
                >
                  <p className="text-white font-medium mb-3">{message.content}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {formatDistanceToNow(message.timestamp)} ago
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onReject(message.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-400 
                                 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <XCircle size={16} />
                        Reject
                      </button>
                      <button
                        onClick={() => onApprove(message.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-emerald-400 
                                 hover:text-emerald-300 hover:bg-emerald-500/20 rounded-lg transition-colors"
                      >
                        <CheckCircle size={16} />
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminView;