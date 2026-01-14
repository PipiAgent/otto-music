'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, Pause, SkipForward, Volume2 } from 'lucide-react';
import clsx from 'clsx';

export default function FloatingPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Law 2.8: Magnetic Attraction (simplified for this widget)
    // We'll add a subtle float animation
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleExpand = () => setExpanded(!expanded);

  return (
    <div
      ref={containerRef}
      className={clsx(
        'fixed bottom-8 right-8 z-50 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]',
        expanded ? 'w-80 h-96' : 'w-16 h-16'
      )}
    >
      <div
        className="relative w-full h-full glass-card rounded-2xl overflow-hidden cursor-pointer shadow-2xl shadow-white/5"
        onClick={!expanded ? toggleExpand : undefined}
      >
        {/* Visualizer Background (Abstract) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-blue-900/40 opacity-50" />
        
        {/* Collapsed State: Icon */}
        <div
          className={clsx(
            'absolute inset-0 flex items-center justify-center transition-opacity duration-500',
            expanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          )}
        >
          <div className={`w-3 h-3 bg-white rounded-full ${isPlaying ? 'animate-pulse' : ''}`} />
        </div>

        {/* Expanded State: Player UI */}
        <div
          className={clsx(
            'absolute inset-0 p-6 flex flex-col justify-between transition-opacity duration-500 delay-100',
            expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-bold tracking-widest text-white/70">NOW PLAYING</h3>
              <p className="text-xl font-bold mt-1 leading-none">Neon Nights</p>
              <p className="text-xs text-white/50 mt-1">Otto Original • AI Hybrid</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); toggleExpand(); }}
              className="text-white/30 hover:text-white transition-colors"
            >
              Minimize
            </button>
          </div>

          {/* Visualizer Mock */}
          <div className="flex items-center justify-center space-x-1 h-20">
             {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-white/80 rounded-full"
                  style={{
                    height: isPlaying ? `${Math.random() * 100}%` : '20%',
                    transition: 'height 0.2s ease'
                  }} 
                />
             ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <Volume2 size={16} className="text-white/50" />
            <div className="flex items-center space-x-4">
               <div className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <SkipForward size={20} className="rotate-180" />
               </div>
               <button 
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                  className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
               >
                  {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" ml-1 />}
               </button>
               <div className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <SkipForward size={20} />
               </div>
            </div>
            <div className="w-4" /> 
          </div>
        </div>
      </div>
    </div>
  );
}
