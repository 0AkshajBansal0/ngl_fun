// Color palette for message bubbles
export const bubbleColors = [
  'bg-pink-500',
  'bg-purple-500',
  'bg-indigo-500',
  'bg-blue-500',
  'bg-cyan-500',
  'bg-teal-500',
  'bg-green-500',
  'bg-lime-500',
  'bg-yellow-500',
  'bg-amber-500',
  'bg-orange-500',
  'bg-red-500',
];

export const getRandomBubbleColor = (): string => {
  return bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
};

export const getRandomPosition = (): { x: number; y: number } => {
  // Return a random position within reasonable bounds
  return {
    x: 10 + Math.random() * 70, // 10% to 80% of container width
    y: 10 + Math.random() * 70, // 10% to 80% of container height
  };
};

export const getRandomSize = (): 'small' | 'medium' | 'large' => {
  const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
  return sizes[Math.floor(Math.random() * sizes.length)];
};