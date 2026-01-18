
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, RefreshCw, Trash2, Rocket, AlertTriangle, HelpCircle, XCircle, Dices } from 'lucide-react';
import WackyBackground from './components/WackyBackground.tsx';
import { getWackyResponse } from './services/geminiService.ts';
import { WackyResponse, AnimationType } from './types.ts';
import { ANIMATION_VARIANTS, PROMPT_SUGGESTIONS } from './constants.ts';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<WackyResponse | null>(null);
  const [isSuperWacky, setIsSuperWacky] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{message: string, code?: string} | null>(null);
  const [history, setHistory] = useState<WackyResponse[]>([]);
  const lastAnimationRef = useRef<AnimationType | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await getWackyResponse(prompt, isSuperWacky, lastAnimationRef.current);
      lastAnimationRef.current = result.animation;
      setResponse(result);
      setHistory(prev => [result, ...prev].slice(0, 5));
      setPrompt('');
    } catch (err: any) {
      console.error("Submission error:", err);
      setError({ message: err.message || "The Void is currently undergoing scheduled maintenance." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRandomize = () => {
    const otherSuggestions = PROMPT_SUGGESTIONS.filter(s => s !== prompt);
    const randomPrompt = otherSuggestions[Math.floor(Math.random() * otherSuggestions.length)];
    setPrompt(randomPrompt);
    inputRef.current?.focus();
  };

  const clearError = () => {
    setError(null);
    setIsLoading(false);
  };

  // Enhanced subtle pop effect for response cards
  const cardHoverEffect = {
    scale: 1.02,
    y: -5,
    boxShadow: "16px 16px 0px 0px rgba(0,0,0,1)",
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col p-4 md:p-10 transition-all duration-500 overflow-hidden">
      <WackyBackground isSuperWacky={isSuperWacky} />

      <header className="z-10 flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <motion.div 
          animate={{ rotate: isSuperWacky ? [-2, 2, -2] : -2 }}
          transition={{ repeat: Infinity, duration: 2 }}
          className={`${isSuperWacky ? 'bg-cyan-400' : 'bg-white'} brutalist-border brutalist-shadow p-4 transform transition-colors duration-500`}
        >
          <h1 className="text-3xl md:text-5xl font-black tracking-tight flex items-center gap-3 text-black" style={{ fontFamily: 'Syne, sans-serif' }}>
            ABSURDITRON <span className="bg-black text-white px-3 py-1 -skew-x-12">9000</span>
          </h1>
        </motion.div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSuperWacky(!isSuperWacky)}
            className={`brutalist-border brutalist-shadow-sm p-4 font-black flex items-center gap-3 transition-all ${
              isSuperWacky ? 'bg-red-600 text-white scale-110' : 'bg-yellow-400 text-black hover:bg-yellow-300'
            }`}
          >
            <AlertTriangle className={isSuperWacky ? 'animate-pulse' : ''} />
            {isSuperWacky ? 'DANGER: REALITY MELTING' : 'ACTIVATE CHAOS'}
          </button>
        </div>
      </header>

      <main className="z-10 flex-grow flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            {error ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="bg-white brutalist-border brutalist-shadow p-10 text-center max-w-2xl mx-auto"
              >
                <XCircle className="w-20 h-20 text-red-600 mx-auto mb-6" />
                <h2 className="text-4xl font-black uppercase mb-4">Logic Engine Seizure</h2>
                <div className="bg-slate-100 p-4 border-2 border-dashed border-black mb-8 font-mono text-left">
                  <p className="text-red-600 font-bold">{error.message}</p>
                </div>
                <button 
                  onClick={clearError}
                  className="bg-black text-white brutalist-shadow-sm px-10 py-4 font-black hover:bg-slate-800 transition-all flex items-center gap-3 mx-auto"
                >
                  <RefreshCw className="w-6 h-6" /> REBOOT LOGIC
                </button>
              </motion.div>
            ) : isLoading ? (
              <motion.div 
                key="loading"
                initial={{ rotate: 10, scale: 0.8, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -10, scale: 1.2, opacity: 0 }}
                className="bg-purple-500 text-white brutalist-border brutalist-shadow p-12 text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="inline-block"
                >
                  <RefreshCw className="w-24 h-24 mb-6 stroke-[4]" />
                </motion.div>
                <h2 className="text-4xl font-black uppercase italic">Fracturing Reality...</h2>
                <p className="mt-4 font-bold tracking-widest opacity-75 uppercase">Negotiating with the algorithm</p>
              </motion.div>
            ) : response ? (
              <motion.div 
                key="response"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full"
              >
                {/* Emoji Card with Hover Effect */}
                <motion.div 
                  whileHover={cardHoverEffect}
                  className="md:col-span-4 bg-white brutalist-border brutalist-shadow flex items-center justify-center p-10 h-64 md:h-auto overflow-hidden cursor-default"
                >
                  <motion.div 
                    className="text-[12rem] select-none"
                    {...ANIMATION_VARIANTS[response.animation]}
                  >
                    {response.emoji}
                  </motion.div>
                </motion.div>

                {/* Text Response Card with Hover Effect */}
                <motion.div 
                  whileHover={cardHoverEffect}
                  className="md:col-span-8 bg-white brutalist-border brutalist-shadow p-10 flex flex-col justify-center gap-8 min-h-[300px] cursor-default"
                >
                   <motion.div {...ANIMATION_VARIANTS[response.animation]}>
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">The Oracle Proclaims:</p>
                    <h3 
                      className="text-4xl md:text-6xl font-black leading-tight italic"
                      style={{ color: response.moodColor }}
                    >
                      "{response.text}"
                    </h3>
                   </motion.div>
                   
                   <div className="flex flex-wrap gap-4 mt-auto">
                     <button 
                       onClick={() => setResponse(null)}
                       className="bg-black text-white brutalist-shadow-sm brutalist-border px-8 py-4 font-black hover:bg-slate-800 transition-transform active:translate-y-1 flex items-center gap-3"
                     >
                       <Rocket className="w-5 h-5" /> MOAR CHAOS!
                     </button>
                     <div className="bg-lime-400 text-black brutalist-border px-4 py-4 font-black flex items-center gap-2">
                       ANIM: {String(response.animation).toUpperCase()}
                     </div>
                   </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                key="input"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full"
              >
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="relative group">
                    <input
                      ref={inputRef}
                      autoFocus
                      type="text"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Input nonsense here..."
                      className="w-full bg-white text-black text-3xl md:text-5xl font-black p-10 brutalist-border brutalist-shadow focus:outline-none focus:ring-8 focus:ring-black/10 transition-all placeholder:text-slate-300"
                    />
                    <button
                      type="submit"
                      disabled={!prompt.trim()}
                      className="absolute right-4 top-4 bottom-4 bg-pink-500 text-white brutalist-border brutalist-shadow-sm px-10 hover:bg-pink-400 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none transition-all font-black text-2xl flex items-center gap-3"
                    >
                      <Send className="w-8 h-8" />
                      <span className="hidden md:inline">GO</span>
                    </button>
                  </div>

                  <div className="bg-black text-white p-6 brutalist-border flex flex-wrap gap-4 items-center">
                    <HelpCircle className="w-8 h-8 text-yellow-400" />
                    <span className="font-bold text-lg mr-4 uppercase">Prompt Ideas:</span>
                    
                    <button
                      type="button"
                      onClick={handleRandomize}
                      className="bg-yellow-400 text-black px-4 py-2 brutalist-border brutalist-shadow-sm font-black text-xs hover:bg-yellow-300 transition-all flex items-center gap-2 mr-2"
                    >
                      <Dices className="w-4 h-4" /> RANDOMIZE
                    </button>

                    {PROMPT_SUGGESTIONS.map((suggest) => (
                      <button
                        key={suggest}
                        type="button"
                        onClick={() => {
                          setPrompt(suggest);
                          inputRef.current?.focus();
                        }}
                        className="bg-white text-black px-4 py-2 brutalist-border font-bold text-xs hover:bg-cyan-400 transition-colors"
                      >
                        {suggest}
                      </button>
                    ))}
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="z-10 mt-12 overflow-x-auto pb-10 scrollbar-hide">
        <div className="flex gap-8 px-4 items-center">
          <AnimatePresence>
            {history.length > 0 && (
              <motion.button 
                initial={{ x: -50, opacity: 0, rotate: -15 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0, rotate: 45 }}
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setHistory([])}
                className="bg-red-600 text-white brutalist-border brutalist-shadow-sm px-6 py-4 font-black text-sm uppercase hover:bg-red-500 transition-colors flex items-center gap-3 flex-shrink-0 z-20"
              >
                <Trash2 className="w-5 h-5" /> CLEAR HISTORY
              </motion.button>
            )}
          </AnimatePresence>

          <div className="flex gap-8">
            <AnimatePresence>
              {history.map((item, idx) => (
                <motion.div 
                  key={`${item.text}-${idx}`}
                  initial={{ rotate: idx % 2 === 0 ? -10 : 10, y: 50, opacity: 0 }}
                  animate={{ rotate: idx % 2 === 0 ? -5 : 5, y: 0, opacity: 1 }}
                  whileHover={{ rotate: 0, scale: 1.1, zIndex: 50 }}
                  className="bg-white brutalist-border brutalist-shadow-sm p-3 w-40 flex-shrink-0 cursor-pointer group"
                  onClick={() => {
                    setResponse(item);
                    lastAnimationRef.current = item.animation;
                  }}
                >
                  <div className="bg-slate-100 aspect-square mb-3 flex items-center justify-center text-5xl group-hover:bg-cyan-100 transition-colors">
                    {item.emoji}
                  </div>
                  <p className="text-[10px] text-black font-black uppercase italic truncate border-t border-black pt-2">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </footer>

      {isSuperWacky && (
        <>
          <div className="fixed top-0 left-0 w-full z-[100] bg-black text-yellow-400 overflow-hidden brutalist-border border-l-0 border-r-0 border-t-0">
            <div className="marquee py-2 font-black text-xl uppercase italic">
              Reality check failed // Chaos protocol engaged // The universe is a taco // Please do not adjust your sanity //
            </div>
          </div>
          <div className="fixed bottom-0 left-0 w-full z-[100] bg-black text-cyan-400 overflow-hidden brutalist-border border-l-0 border-r-0 border-b-0">
            <div className="marquee py-2 font-black text-xl uppercase italic" style={{ animationDirection: 'reverse' }}>
              Logic is a prison // Free your pancakes // Gravity is just an opinion // Time is a flat donut //
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
