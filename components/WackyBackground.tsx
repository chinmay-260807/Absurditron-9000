
import React from 'react';
import { motion } from 'framer-motion';

const WackyBackground: React.FC<{ isSuperWacky: boolean }> = ({ isSuperWacky }) => {
  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-500 ${isSuperWacky ? 'bg-orange-500' : 'bg-[#f0f0f0]'}`}>
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.2]" 
        style={{ 
          backgroundImage: `radial-gradient(black 2px, transparent 2px)`, 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Floating Geometric Elements */}
      <motion.div
        animate={{ 
          rotate: [0, 90, 180, 270, 360],
          x: isSuperWacky ? [0, 100, -100, 0] : 0 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -left-20 w-64 h-64 border-[16px] border-black opacity-10"
      />

      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          y: isSuperWacky ? [0, -200, 0] : 0,
          rotate: [12, -12, 12]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-10 right-10 w-48 h-48 bg-pink-500 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] opacity-20"
      />

      {isSuperWacky && (
        <>
          <div className="absolute top-0 left-0 w-full h-full mix-blend-multiply bg-yellow-400 opacity-20" />
          <motion.div 
            className="absolute top-1/4 left-1/4 w-32 h-32 border-8 border-black flex items-center justify-center text-6xl font-black text-black"
            animate={{ rotate: 360, x: [0, 500, 0], y: [0, 300, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ?
          </motion.div>
          <motion.div 
            className="absolute bottom-1/4 right-1/3 w-40 h-10 bg-cyan-400 border-4 border-black"
            animate={{ skewX: [0, 20, -20, 0], x: [-200, 200, -200] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </>
      )}
    </div>
  );
};

export default WackyBackground;
