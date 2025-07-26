import React from 'react';

const AnimatedTears: React.FC = () => {
  const tears = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {tears.map((tear) => (
        <div
          key={tear.id}
          className="absolute w-2 h-8 bg-gradient-to-b from-blue-300 to-blue-500 rounded-full opacity-60 animate-bounce"
          style={{
            left: `${tear.left}%`,
            animationDelay: `${tear.delay}s`,
            animationDuration: `${tear.duration}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
            transform: 'rotate(15deg)',
          }}
        />
      ))}
      
      {/* Additional floating tear drops */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`float-${i}`}
          className="absolute w-1 h-4 bg-blue-400 rounded-full opacity-40"
          style={{
            left: `${20 + i * 30}%`,
            top: `${10 + i * 20}%`,
            animation: `float 4s ease-in-out infinite ${i * 0.5}s`,
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedTears;