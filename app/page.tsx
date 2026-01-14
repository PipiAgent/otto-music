'use client';

import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Box, Cpu, Fingerprint, Globe, Mic, Music, Radio, Share2, Users, Zap, Disc } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Hero: Z-Axis Tunnel
      gsap.to('.hero-text', {
        scale: 50, // Reduced scale slightly for smoother exit
        opacity: 0,
        ease: 'power2.in', // Changed ease for better feeling
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
        },
      });

      // 2. Manifesto: Kinetic Typography
      const manifestoLines = gsap.utils.toArray('.manifesto-line');
      manifestoLines.forEach((line: any, i) => {
        gsap.from(line, {
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.manifesto-section',
            start: 'top 85%',
            end: 'center center',
            scrub: 1,
          },
        });
      });

      // 3. Solution: Masked Reveal
      gsap.to('.glass-layer', {
        clipPath: 'circle(150% at 50% 50%)',
        ease: 'none',
        scrollTrigger: {
          trigger: '.solution-section',
          start: 'top top',
          end: '+=100%',
          scrub: true,
          pin: true,
        },
      });

      // 4. Creator Spectrum: Deck of Cards
      const cards = gsap.utils.toArray('.spectrum-card');
      cards.forEach((card: any) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          end: '+=100%',
        });
        gsap.to(card, {
          scale: 0.90, // Less aggressive scale down
          filter: 'brightness(0.3)', // Darker fade
          scrollTrigger: {
            trigger: card,
            start: 'top top',
            end: '+=100%',
            scrub: true,
          },
        });
      });

      // 7. DNA Engine: Exploded View
      gsap.from('.dna-segment', {
        x: (i) => Math.cos(i) * 150,
        y: (i) => Math.sin(i) * 150,
        opacity: 0,
        scale: 0.5,
        scrollTrigger: {
          trigger: '.dna-section',
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
      });

      // 8. Cover Revolution: Museum Walk
      const sections = gsap.utils.toArray('.cover-slide');
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: '.cover-section',
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => '+=' + (document.querySelector('.cover-section') as HTMLElement).offsetWidth,
        },
      });

      // 10. Distribution: Variable Pathing
      gsap.fromTo('.dist-path', 
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: '.dist-section',
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          }
        }
      );

      // 12. Footer Reveal
      gsap.from('.footer-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.footer-section',
          start: 'top 70%',
        },
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="w-full relative bg-[var(--color-void)]">
      
      {/* SECTION 1: HERO */}
      <section className="hero-section h-screen flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 mesh-gradient-1 opacity-40" />
        <h1 className="hero-text text-[20vw] font-bold leading-none tracking-tighter text-white z-10 mix-blend-overlay opacity-90">
          OTTO
        </h1>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-void)] to-[var(--color-void)] z-0" />
        <p className="absolute bottom-12 text-xs uppercase tracking-[0.5em] text-white/30 animate-pulse z-20">
          Scroll to Initialize
        </p>
      </section>

      {/* SECTION 2: MANIFESTO */}
      <section className="manifesto-section min-h-screen flex flex-col justify-center px-6 md:px-20 py-20 space-y-16 relative">
        <div className="absolute right-0 top-20 w-96 h-96 bg-purple-900/10 blur-[100px] rounded-full pointer-events-none" />
        
        <h2 className="manifesto-line text-5xl md:text-8xl font-medium tracking-tight text-white/90 text-balance">
          Music Set Free.
        </h2>
        <h2 className="manifesto-line text-5xl md:text-8xl font-medium tracking-tight text-white/50 text-right text-balance">
          No Gatekeepers.
        </h2>
        <h2 className="manifesto-line text-5xl md:text-8xl font-medium tracking-tight text-white/30 text-balance">
          Total Transparency.
        </h2>
        <h2 className="manifesto-line text-5xl md:text-8xl font-bold tracking-tighter text-white text-right gradient-text-glow">
          The Glass Box.
        </h2>
      </section>

      {/* SECTION 3: THE SOLUTION */}
      <section className="solution-section h-screen w-full relative overflow-hidden">
        {/* Layer A: Void Box */}
        <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center border-y border-white/5">
          <div className="text-center space-y-8">
            <div className="w-40 h-40 mx-auto border border-white/10 flex items-center justify-center rounded-sm bg-black">
               <Box size={60} className="text-zinc-800" strokeWidth={1} />
            </div>
            <div>
               <h3 className="text-2xl font-mono text-zinc-600 mb-2 tracking-widest uppercase">Legacy System</h3>
               <p className="text-zinc-700 font-mono text-sm">Opaque. Slow. Centralized.</p>
            </div>
          </div>
        </div>
        
        {/* Layer B: Glass Box */}
        <div 
          className="glass-layer absolute inset-0 bg-white flex items-center justify-center text-black"
          style={{ clipPath: 'circle(0% at 50% 50%)' }}
        >
          <div className="text-center space-y-8">
            <div className="w-40 h-40 mx-auto border border-gray-200 flex items-center justify-center rounded-sm bg-white/50 backdrop-blur-xl shadow-2xl">
               <Box size={60} className="text-black" strokeWidth={1.5} />
            </div>
            <div>
               <h3 className="text-2xl font-mono text-black mb-2 tracking-widest uppercase">Otto Protocol</h3>
               <p className="text-gray-500 font-mono text-sm">Transparent. Instant. Sovereign.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SPECTRUM INTRO */}
      <div className="py-32 text-center relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
         <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-white/40 bg-[var(--color-void)] relative z-10 inline-block px-4">
            The Creator Spectrum
         </h2>
      </div>

      {/* SECTION 5: HUMAN CORE */}
      <section className="spectrum-card h-screen sticky top-0 bg-[var(--color-void)] border-t border-white/5 flex items-center justify-center">
        <div className="glass-card max-w-5xl w-full mx-6 p-12 md:p-20 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative overflow-hidden">
          {/* Subtle Inner Glow */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="space-y-8 relative z-10">
            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
               <Mic size={24} className="text-white" />
            </div>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight">The Human Core</h3>
            <p className="text-lg text-white/60 leading-relaxed font-light">
              Raw emotion preserved on the blockchain. You retain 100% of your master rights. 
              Immutable proof of creation.
            </p>
          </div>
          <div className="h-full min-h-[300px] border border-white/10 rounded-2xl flex items-center justify-center bg-black/20 relative">
             <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10">
                {[...Array(36)].map((_, i) => <div key={i} className="border-r border-b border-white/20" />)}
             </div>
             <span className="font-mono text-xs text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full bg-purple-500/10">
               100% BIOLOGICAL
             </span>
          </div>
        </div>
      </section>

      {/* SECTION 6: AI CO-PILOT */}
      <section className="spectrum-card h-screen sticky top-0 bg-[#080808] border-t border-white/5 flex items-center justify-center">
        <div className="glass-card max-w-5xl w-full mx-6 p-12 md:p-20 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative overflow-hidden">
           {/* Subtle Inner Glow */}
           <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

           <div className="order-2 md:order-1 h-full min-h-[300px] border border-white/10 rounded-2xl flex items-center justify-center bg-black/20 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/26tn33ai01UfQN3ad/giphy.gif')] opacity-5 mix-blend-screen bg-cover grayscale" />
             <span className="relative z-10 font-mono text-xs text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full bg-cyan-500/10">
               AI SYNTHESIS
             </span>
          </div>
          <div className="order-1 md:order-2 space-y-8 relative z-10">
            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
               <Cpu size={24} className="text-white" />
            </div>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight">The AI Co-Pilot</h3>
            <p className="text-lg text-white/60 leading-relaxed font-light">
              Use Otto's Neural Engine as an instrument. 
              Transparent tagging ensures honesty. 
              Split royalties with the algorithm's training pool.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: DNA ENGINE */}
      <section className="dna-section min-h-screen flex flex-col items-center justify-center py-32 relative bg-[var(--color-void)]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #222 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <h2 className="text-center text-5xl md:text-7xl font-bold mb-32 z-10 tracking-tighter">The DNA Engine</h2>
        
        <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center">
          {/* Central Hub */}
          <div className="absolute z-20 w-40 h-40 bg-black border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)]">
             <div className="text-center">
                <p className="text-xs text-white/40 font-mono mb-1">REVENUE</p>
                <p className="text-2xl font-bold text-white">$1,000</p>
             </div>
          </div>
          
          {/* Exploding Segments - Technical Look */}
          <div className="dna-segment absolute top-1/4 right-1/4 p-4 border-l border-t border-white/40 w-40 h-20">
             <p className="text-xs text-white/40 font-mono mb-1">01. ARTIST</p>
             <p className="text-xl text-white">35%</p>
          </div>
          <div className="dna-segment absolute bottom-1/4 right-1/4 p-4 border-l border-b border-white/40 w-40 h-20 flex flex-col justify-end">
             <p className="text-xs text-white/40 font-mono mb-1">02. PRODUCER</p>
             <p className="text-xl text-white">35%</p>
          </div>
          <div className="dna-segment absolute bottom-1/4 left-1/4 p-4 border-r border-b border-white/40 w-40 h-20 flex flex-col items-end justify-end">
             <p className="text-xs text-white/40 font-mono mb-1">03. AI POOL</p>
             <p className="text-xl text-white">10%</p>
          </div>
           <div className="dna-segment absolute top-1/4 left-1/4 p-4 border-r border-t border-white/40 w-40 h-20 flex flex-col items-end">
             <p className="text-xs text-white/40 font-mono mb-1">04. DAO</p>
             <p className="text-xl text-white">20%</p>
          </div>
        </div>
      </section>

      {/* SECTION 8: COVER REVOLUTION */}
      <section className="cover-section h-screen w-full bg-[#050505] flex flex-nowrap overflow-hidden">
        <div className="cover-slide w-screen h-full flex-shrink-0 flex items-center justify-center border-r border-white/5 relative">
           <div className="absolute inset-0 mesh-gradient-2 opacity-20" />
           <div className="max-w-4xl text-center px-6 relative z-10">
             <Disc size={80} className="mx-auto mb-10 text-white/20" />
             <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">Cover Revolution</h2>
             <p className="text-xl text-white/50 font-light">Scroll to authorize permissionless creativity.</p>
           </div>
        </div>
        
        <div className="cover-slide w-screen h-full flex-shrink-0 flex items-center justify-center border-r border-white/5 bg-[#080808]">
           <div className="max-w-4xl px-12 md:px-32">
             <h3 className="text-4xl md:text-6xl font-bold mb-8 text-white">1. Permissionless</h3>
             <p className="text-2xl text-white/60 font-light leading-relaxed">
               Forget emails and managers. The license is in the protocol. 
               Cover any song in the catalog instantly.
             </p>
           </div>
        </div>
        
        <div className="cover-slide w-screen h-full flex-shrink-0 flex items-center justify-center border-r border-white/5 bg-[#0a0a0a]">
           <div className="max-w-4xl px-12 md:px-32">
             <h3 className="text-4xl md:text-6xl font-bold mb-8 text-white">2. Auto-Splits</h3>
             <p className="text-2xl text-white/60 font-light leading-relaxed">
               Smart contracts handle the money. 
               <span className="text-white block mt-4">50% to Original Composition.</span>
               <span className="text-white block">50% to New Performance.</span>
             </p>
           </div>
        </div>
      </section>

      {/* SECTION 9: THE TRIBUNAL */}
      <section className="tribunal-section min-h-[150vh] relative bg-[var(--color-void)] flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 flex items-center justify-center p-12 border-r border-white/5 z-10 bg-[var(--color-void)]">
          <div className="max-w-md">
            <Users size={48} className="mb-8 text-white/30" />
            <h2 className="text-5xl font-bold mb-8 tracking-tight">The Tribunal</h2>
            <p className="text-lg text-white/50 leading-relaxed font-light">
              We don't trust black-box algorithms to curate culture. We trust you.
              <br/><br/>
              Scout hidden gems. Vote on quality. Earn governance tokens for your "Golden Ear."
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-20 space-y-24 pt-20 bg-[var(--color-void)] z-0">
           {/* Card 1 */}
           <div className="glass-card p-8 rounded-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full border border-white/10" />
                  <div>
                    <h4 className="font-bold text-lg">Neon Horizon</h4>
                    <p className="text-xs text-white/40 font-mono mt-1">NEW ARRIVAL</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-2xl font-bold">124</p>
                   <p className="text-[10px] text-white/30 uppercase tracking-wider">Votes</p>
                </div>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white w-1/3" />
              </div>
           </div>
           
           {/* Card 2 */}
           <div className="glass-card p-8 rounded-2xl transform hover:scale-[1.02] transition-transform duration-500 translate-x-4 md:translate-x-12 border-l-4 border-l-purple-500">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full border border-purple-500/30 flex items-center justify-center">
                     <Radio size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Midnight Soul</h4>
                    <p className="text-xs text-white/40 font-mono mt-1">RISING STAR</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-2xl font-bold text-purple-300">892</p>
                   <p className="text-[10px] text-white/30 uppercase tracking-wider">Votes</p>
                </div>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-2/3 shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
              </div>
           </div>

           {/* Card 3 */}
           <div className="glass-card p-8 rounded-2xl transform hover:scale-[1.02] transition-transform duration-500 border-l-4 border-l-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.05)]">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-lg shadow-amber-400/20">
                     <Zap size={20} className="text-black" fill="black" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Electric Dreams</h4>
                    <p className="text-xs text-white/40 font-mono mt-1">GLOBAL HIT</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-2xl font-bold text-amber-400">15k</p>
                   <p className="text-[10px] text-white/30 uppercase tracking-wider">Votes</p>
                </div>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 w-full shadow-[0_0_20px_rgba(251,191,36,0.6)]" />
              </div>
           </div>
        </div>
      </section>

      {/* SECTION 10: DISTRIBUTION */}
      <section className="dist-section h-screen flex flex-col items-center justify-center relative bg-[var(--color-void)] overflow-hidden">
        <h2 className="text-4xl md:text-6xl font-bold mb-20 z-10 tracking-tight">Universal Launchpad</h2>
        
        <div className="relative w-full max-w-5xl flex items-center justify-between px-10 z-10">
           {/* Origin */}
           <div className="flex flex-col items-center space-y-6">
             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl shadow-[0_0_40px_rgba(255,255,255,0.3)] z-10">OTTO</div>
             <p className="text-xs font-mono uppercase tracking-widest text-white/50">Origin</p>
           </div>

           {/* Path */}
           <svg className="absolute top-12 left-0 w-full h-32 pointer-events-none" style={{ overflow: 'visible' }}>
             <path 
               className="dist-path"
               d="M 200 50 Q 512 150 824 50" 
               fill="none" 
               stroke="rgba(255,255,255,0.2)" 
               strokeWidth="2" 
               strokeDasharray="6 6"
             />
             <path 
               className="dist-path"
               d="M 200 50 Q 512 150 824 50" 
               fill="none" 
               stroke="white" 
               strokeWidth="2" 
               strokeDasharray="6 6"
             />
           </svg>

           {/* Destinations */}
           <div className="flex flex-col items-center space-y-6">
             <div className="flex -space-x-4">
               <div className="w-20 h-20 glass-card rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md z-30">S</div>
               <div className="w-20 h-20 glass-card rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md z-20">A</div>
               <div className="w-20 h-20 glass-card rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md z-10">T</div>
             </div>
             <p className="text-xs font-mono uppercase tracking-widest text-white/50">DSP Network</p>
           </div>
        </div>
      </section>

      {/* SECTION 11: FOOTER CTA */}
      <section className="footer-section min-h-screen flex flex-col items-center justify-center relative bg-white text-black z-20">
         <div className="footer-content text-center space-y-8 px-6">
            <Globe size={60} className="mx-auto text-black mb-8" strokeWidth={1} />
            <h2 className="text-7xl md:text-[10rem] font-bold tracking-tighter leading-none mb-8">
               JOIN OTTO
            </h2>
            <div className="w-full h-px bg-black/10 max-w-xs mx-auto my-8" />
            <p className="text-xl md:text-3xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed text-balance">
               The era of the "Starving Artist" is over.
               The era of the Sovereign Creator has begun.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-16">
               <button className="bg-black text-white px-12 py-6 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300">
                  Create Account
               </button>
               <button className="px-12 py-6 rounded-full font-bold text-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-300">
                  Read Whitepaper
               </button>
            </div>
            <div className="mt-40 text-xs font-mono text-gray-400 uppercase tracking-widest">
               © 2026 Otto Music. Protocol v1.0
            </div>
         </div>
      </section>

    </main>
  );
}

function PlayIcon() {
   return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M5 3L19 12L5 21V3Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
   )
}