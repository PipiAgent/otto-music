'use client';

import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Box, Cpu, Fingerprint, Globe, Mic, Music, Radio, Share2, Users, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Hero: Z-Axis Tunnel
      // Scale up the text until it disappears behind camera
      gsap.to('.hero-text', {
        scale: 100,
        opacity: 0,
        ease: 'power1.in',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
        },
      });

      // 2. Manifesto: Kinetic Typography
      // Text lines sliding in from different directions
      const manifestoLines = gsap.utils.toArray('.manifesto-line');
      manifestoLines.forEach((line: any, i) => {
        gsap.from(line, {
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.manifesto-section',
            start: 'top 80%',
            end: 'center center',
            scrub: 1,
          },
        });
      });

      // 3. Solution: Masked Reveal (Black Box -> Glass Box)
      // Reveal the "Glass Box" content over the "Black Box"
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
      // Cards stacking
      const cards = gsap.utils.toArray('.spectrum-card');
      cards.forEach((card: any, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          end: '+=100%',
        });
        gsap.to(card, {
          scale: 0.95,
          filter: 'brightness(0.5)',
          scrollTrigger: {
            trigger: card,
            start: 'top top',
            end: '+=100%',
            scrub: true,
          },
        });
      });

      // 7. DNA Engine: Exploded View
      // Circle segments expanding
      gsap.from('.dna-segment', {
        x: (i) => Math.cos(i) * 100,
        y: (i) => Math.sin(i) * 100,
        opacity: 0,
        scrollTrigger: {
          trigger: '.dna-section',
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
      });

      // 8. Cover Revolution: Museum Walk (Horizontal Scroll)
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
      // Line drawing connection
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

      // 12. Footer: Parallax Curtain
      // Already handled by CSS z-index and min-height logic usually, 
      // but let's add a reveal fade for content
      gsap.from('.footer-content', {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: '.footer-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="w-full relative">
      
      {/* SECTION 1: HERO (Z-Axis Tunnel) */}
      <section className="hero-section h-screen flex items-center justify-center overflow-hidden relative">
        <h1 className="hero-text text-[15vw] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 z-10">
          OTTO
        </h1>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-black to-black -z-10" />
        <p className="absolute bottom-10 text-sm uppercase tracking-[0.5em] text-white/50 animate-pulse">
          Scroll to Enter
        </p>
      </section>

      {/* SECTION 2: MANIFESTO (Kinetic Typography) */}
      <section className="manifesto-section min-h-screen flex flex-col justify-center px-10 md:px-32 py-20 space-y-12">
        <h2 className="manifesto-line text-6xl md:text-8xl font-light text-white/90">
          Music Set Free.
        </h2>
        <h2 className="manifesto-line text-6xl md:text-8xl font-light text-white/70 text-right">
          No Gatekeepers.
        </h2>
        <h2 className="manifesto-line text-6xl md:text-8xl font-light text-white/50">
          Total Transparency.
        </h2>
        <h2 className="manifesto-line text-6xl md:text-8xl font-bold text-white text-right">
          The Glass Box.
        </h2>
      </section>

      {/* SECTION 3: THE SOLUTION (Masked Reveal) */}
      <section className="solution-section h-screen w-full relative overflow-hidden">
        {/* Layer A: Black Box (Old World) */}
        <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
          <div className="text-center">
            <Box size={100} className="mx-auto text-zinc-700 mb-6" />
            <h3 className="text-4xl font-bold text-zinc-600 mb-4">THE BLACK BOX</h3>
            <p className="text-zinc-500 max-w-md mx-auto">
              Opaque royalties. Hidden data. <br/>Creators left in the dark.
            </p>
          </div>
        </div>
        
        {/* Layer B: Glass Box (New World) */}
        <div 
          className="glass-layer absolute inset-0 bg-white flex items-center justify-center text-black"
          style={{ clipPath: 'circle(0% at 50% 50%)' }}
        >
          <div className="text-center">
            <Box size={100} className="mx-auto text-blue-600 mb-6" />
            <h3 className="text-4xl font-bold text-black mb-4">THE GLASS BOX</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Transparent ledger. Real-time splits. <br/>A sovereign economy.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: CREATOR SPECTRUM (Deck of Cards Intro) */}
      {/* Not a section with content, just a title trigger essentially, but let's merge into the cards */}
      <div className="py-20 text-center">
         <h2 className="text-2xl uppercase tracking-widest text-white/40">The Creator Spectrum</h2>
      </div>

      {/* SECTION 5: HUMAN CORE (Card 1) */}
      <section className="spectrum-card h-screen sticky top-0 bg-zinc-900 border-t border-white/10 flex items-center justify-center">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
          <div className="flex flex-col justify-center space-y-6">
            <Mic size={48} className="text-purple-400" />
            <h3 className="text-5xl font-bold">The Human Core</h3>
            <p className="text-xl text-zinc-400">
              For the instrumentalist, the vocalist, the songwriter.
              Upload and protect your raw emotion on the blockchain.
              You retain 100% of your masters.
            </p>
          </div>
          <div className="bg-purple-900/20 rounded-3xl h-[400px] w-full flex items-center justify-center border border-purple-500/30">
             <div className="w-32 h-32 bg-purple-500 rounded-full blur-[60px] opacity-50" />
             <span className="relative z-10 text-purple-200 font-mono">100% HUMAN</span>
          </div>
        </div>
      </section>

      {/* SECTION 6: AI CO-PILOT (Card 2) */}
      <section className="spectrum-card h-screen sticky top-0 bg-zinc-800 border-t border-white/10 flex items-center justify-center">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
           <div className="order-2 md:order-1 bg-cyan-900/20 rounded-3xl h-[400px] w-full flex items-center justify-center border border-cyan-500/30 overflow-hidden relative">
             <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/26tn33ai01UfQN3ad/giphy.gif')] opacity-10 mix-blend-overlay bg-cover" />
             <span className="relative z-10 text-cyan-200 font-mono">AI SYNTHESIS</span>
          </div>
          <div className="order-1 md:order-2 flex flex-col justify-center space-y-6">
            <Cpu size={48} className="text-cyan-400" />
            <h3 className="text-5xl font-bold">The AI Co-Pilot</h3>
            <p className="text-xl text-zinc-400">
              For the visionary and the producer.
              Use Otto's AI as an instrument, not a replacement.
              Transparent tagging ensures honesty for the listener.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: DNA ENGINE (Exploded View) */}
      <section className="dna-section min-h-screen flex flex-col items-center justify-center py-20 relative overflow-hidden">
        <div className="absolute top-10 left-10">
           <Fingerprint size={40} className="text-white/30" />
        </div>
        <h2 className="text-center text-5xl md:text-7xl font-bold mb-20 z-10">The DNA Engine</h2>
        
        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">
          {/* Central Hub */}
          <div className="absolute z-20 w-32 h-32 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl shadow-[0_0_50px_rgba(255,255,255,0.3)]">
            $1,000
          </div>
          
          {/* Exploding Segments */}
          <div className="dna-segment absolute top-0 right-0 p-4 bg-green-500/20 border border-green-500 rounded-lg backdrop-blur-md">
            <p className="text-sm text-green-300 font-mono">SINGER: 35%</p>
          </div>
          <div className="dna-segment absolute bottom-0 right-0 p-4 bg-blue-500/20 border border-blue-500 rounded-lg backdrop-blur-md">
            <p className="text-sm text-blue-300 font-mono">PRODUCER: 35%</p>
          </div>
          <div className="dna-segment absolute bottom-0 left-0 p-4 bg-pink-500/20 border border-pink-500 rounded-lg backdrop-blur-md">
             <p className="text-sm text-pink-300 font-mono">AI POOL: 10%</p>
          </div>
           <div className="dna-segment absolute top-0 left-0 p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg backdrop-blur-md">
             <p className="text-sm text-yellow-300 font-mono">DAO: 20%</p>
          </div>
        </div>
        
        <p className="mt-20 text-center max-w-2xl text-zinc-500 px-6">
          Every song is a Smart Contract. Money is split the second revenue is generated.
          No waiting 6 months for a check.
        </p>
      </section>

      {/* SECTION 8: COVER REVOLUTION (Museum Walk) */}
      <section className="cover-section h-screen w-full bg-zinc-950 flex flex-nowrap overflow-hidden">
        <div className="cover-slide w-screen h-full flex-shrink-0 flex items-center justify-center border-r border-white/5">
           <div className="max-w-3xl text-center px-6">
             <Share2 size={80} className="mx-auto mb-8 text-orange-500" />
             <h2 className="text-6xl font-bold mb-6">The Cover Revolution</h2>
             <p className="text-2xl text-zinc-400">Scroll to see how permissions work on Otto.</p>
           </div>
        </div>
        
        <div className="cover-slide w-screen h-full flex-shrink-0 flex items-center justify-center border-r border-white/5 bg-zinc-900">
           <div className="max-w-3xl px-6">
             <h3 className="text-4xl font-bold mb-4 text-orange-400">1. Permissionless Creativity</h3>
             <p className="text-xl text-zinc-300">
               You don't need to ask to cover a song. The license is built into the protocol.
               Just upload and link.
             </p>
           </div>
        </div>
        
        <div className="cover-slide w-screen h-full flex-shrink-0 flex items-center justify-center border-r border-white/5 bg-zinc-800">
           <div className="max-w-3xl px-6">
             <h3 className="text-4xl font-bold mb-4 text-orange-400">2. Automatic Splits</h3>
             <p className="text-xl text-zinc-300">
               Original Artist gets 50% (Composition).<br/>
               Cover Artist gets 50% (Performance).<br/>
               Everyone wins.
             </p>
           </div>
        </div>
      </section>

      {/* SECTION 9: THE TRIBUNAL (Sticky Narrative) */}
      <section className="tribunal-section min-h-[150vh] relative bg-black flex">
        <div className="w-1/2 h-screen sticky top-0 flex items-center justify-center p-12 border-r border-white/10">
          <div>
            <Users size={64} className="mb-6 text-indigo-500" />
            <h2 className="text-5xl font-bold mb-6">The Tribunal</h2>
            <p className="text-xl text-zinc-400 leading-relaxed">
              No secret algorithms. Just people.<br/><br/>
              Scout hidden gems. Vote on the best tracks. 
              Earn rewards for your "Golden Ear" when you spot a hit early.
            </p>
          </div>
        </div>
        <div className="w-1/2 p-12 space-y-32 pt-32">
           <div className="p-8 border border-white/20 rounded-2xl glass-card transform hover:scale-105 transition-transform duration-500">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-full" />
                <div>
                  <h4 className="font-bold">New Arrival</h4>
                  <p className="text-xs text-white/50">Just Uploaded</p>
                </div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-1/3" />
              </div>
              <p className="mt-2 text-right text-xs text-indigo-400">124 Votes</p>
           </div>
           
           <div className="p-8 border border-white/20 rounded-2xl glass-card transform hover:scale-105 transition-transform duration-500 translate-x-12">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-full" />
                <div>
                  <h4 className="font-bold">Rising Star</h4>
                  <p className="text-xs text-white/50">Trending Fast</p>
                </div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-2/3" />
              </div>
              <p className="mt-2 text-right text-xs text-indigo-400">892 Votes</p>
           </div>

           <div className="p-8 border border-white/20 rounded-2xl glass-card transform hover:scale-105 transition-transform duration-500">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
                   <Zap size={20} fill="white" />
                </div>
                <div>
                  <h4 className="font-bold">Global Hit</h4>
                  <p className="text-xs text-white/50">Promoted to Main Stage</p>
                </div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-full" />
              </div>
              <p className="mt-2 text-right text-xs text-indigo-400">15k Votes</p>
           </div>
        </div>
      </section>

      {/* SECTION 10: DISTRIBUTION (Variable Pathing) */}
      <section className="dist-section h-screen flex flex-col items-center justify-center relative bg-zinc-950 overflow-hidden">
        <h2 className="text-5xl font-bold mb-12 z-10">Universal Launchpad</h2>
        
        <div className="relative w-full max-w-4xl flex items-center justify-between px-10 z-10">
           <div className="flex flex-col items-center space-y-4">
             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl">OTTO</div>
             <p className="text-sm text-zinc-500">Origin</p>
           </div>

           {/* Animated SVG Path connecting them */}
           <svg className="absolute top-1/2 left-0 w-full h-20 -translate-y-1/2 pointer-events-none" style={{ overflow: 'visible' }}>
             <path 
               className="dist-path"
               d="M 150 10 Q 450 -50 750 10" 
               fill="none" 
               stroke="white" 
               strokeWidth="2" 
               strokeDasharray="10 10"
             />
           </svg>

           <div className="flex flex-col items-center space-y-4">
             <div className="flex space-x-4">
               <div className="w-16 h-16 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center">S</div>
               <div className="w-16 h-16 bg-red-500/20 border border-red-500 rounded-full flex items-center justify-center">A</div>
               <div className="w-16 h-16 bg-blue-500/20 border border-blue-500 rounded-full flex items-center justify-center">T</div>
             </div>
             <p className="text-sm text-zinc-500">External DSPs</p>
           </div>
        </div>
        <p className="mt-20 text-zinc-400 max-w-lg text-center">
           Start on Otto. Push to the world with one click. 
           Royalties flow back to your Otto wallet.
        </p>
      </section>

      {/* SECTION 11: SONIC EXPERIENCE (Visualizer) */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
         {/* Simple CSS animation bars simulating visualizer */}
         <div className="absolute inset-0 flex items-end justify-center space-x-1 opacity-20 pointer-events-none">
            {[...Array(40)].map((_, i) => (
               <div 
                 key={i} 
                 className="w-4 bg-white animate-pulse" 
                 style={{ 
                    height: `${Math.random() * 60 + 10}%`,
                    animationDuration: `${Math.random() * 1 + 0.5}s`
                 }} 
               />
            ))}
         </div>

         <div className="z-10 text-center space-y-8">
            <Music size={80} className="mx-auto text-white/80" />
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">
               The Sound<br/>of Sovereignty
            </h2>
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-110 transition-transform flex items-center mx-auto gap-2">
               <PlayIcon /> Start Listening
            </button>
         </div>
      </section>

      {/* SECTION 12: CTA (Footer Reveal) */}
      <section className="footer-section min-h-screen flex flex-col items-center justify-center relative bg-white text-black z-20">
         <div className="footer-content text-center space-y-8 px-6">
            <Globe size={60} className="mx-auto text-black" />
            <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mb-4">
               JOIN OTTO
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
               The era of the "Starving Artist" is over.
               <br/>
               The era of the Sovereign Creator has begun.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12">
               <button className="bg-black text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-zinc-800 transition-colors">
                  Create Account
               </button>
               <button className="px-10 py-5 rounded-full font-bold text-xl border border-black hover:bg-gray-100 transition-colors">
                  Read Whitepaper
               </button>
            </div>
            <div className="mt-32 text-sm text-gray-400">
               © 2026 Otto Music. All rights reserved.
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