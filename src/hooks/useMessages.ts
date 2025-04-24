import { useState, useEffect } from 'react';
import { Message } from '../types';
import { getRandomBubbleColor, getRandomPosition, getRandomSize } from '../utils/colors';

const ADMIN_PASSWORD = 'Baniya';
const API_URL = '/api';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [approvedMessages, setApprovedMessages] = useState<Message[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminView, setShowAdminView] = useState(false);

  const fetchMessages = async () => {
    try {
      const [approvedRes, pendingRes] = await Promise.all([
        fetch(`${API_URL}/messages`),
        isAdmin ? fetch(`${API_URL}/messages/pending`) : Promise.resolve(null)
      ]);

      const approved = await approvedRes.json();
      setApprovedMessages(approved);

      if (isAdmin && pendingRes) {
        const pending = await pendingRes.json();
        setMessages(pending);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [isAdmin]);

  const addMessage = async (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      color: getRandomBubbleColor(),
      size: getRandomSize(),
      position: getRandomPosition(),
    };

    try {
      await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      });
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  const approveMessage = async (messageId: string) => {
    try {
      await fetch(`${API_URL}/messages/${messageId}/approve`, {
        method: 'PUT'
      });
      await fetchMessages();
    } catch (error) {
      console.error('Error approving message:', error);
    }
  };

  const rejectMessage = async (messageId: string) => {
    try {
      await fetch(`${API_URL}/messages/${messageId}`, {
        method: 'DELETE'
      });
      await fetchMessages();
    } catch (error) {
      console.error('Error rejecting message:', error);
    }
  };

  const toggleAdminView = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowAdminView(true);
    } else {
      alert('Incorrect password');
    }
  };

  const closeAdminView = () => {
    setShowAdminView(false);
  };

  return {
    messages,
    approvedMessages,
    addMessage,
    approveMessage,
    rejectMessage,
    isAdmin,
    showAdminView,
    toggleAdminView,
    closeAdminView,
  };
}