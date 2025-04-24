export interface Message {
  id: string;
  content: string;
  timestamp: number;
  color: string;
  size: 'small' | 'medium' | 'large';
  position: {
    x: number;
    y: number;
  };
}