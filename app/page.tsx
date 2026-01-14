'use client';

import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Disc, Globe, Mic, Music, Radio, Share2, Users, Zap, Layers, Activity, CreditCard } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Hero: Cinematic Entry
      const tl = gsap.timeline();
      tl.from('.hero-word', {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: 'power3.out',
      })
      .to('.hero-container', {
        scale: 0.8,
        opacity: 0,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
        },
      });

      // 2. The Conflict: Text Reveal
      gsap.from('.conflict-text', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: '.conflict-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // 3. The Glass Box: Parallax Reveal
      gsap.to('.glass-reveal-bg', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.glass-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 4. Feature Sections: Pinning & Stacking
      const features = gsap.utils.toArray('.feature-section');
      features.forEach((feature: any) => {
        ScrollTrigger.create({
          trigger: feature,
          start: 'top top',
          pin: true,
          pinSpacing: true,
          end: '+=100%',
        });
        
        gsap.from(feature.querySelector('.feature-content'), {
          y: 100,
          opacity: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: feature,
            start: 'top center',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // 5. Tribunal: Horizontal Scroll
      const tribunalCards = gsap.utils.toArray('.tribunal-card');
      gsap.to(tribunalCards, {
        xPercent: -100 * (tribunalCards.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: '.tribunal-section',
          pin: true,
          scrub: 1,
          snap: 1 / (tribunalCards.length - 1),
          end: () => '+=' + (document.querySelector('.tribunal-section') as HTMLElement).offsetWidth,
        },
      });
      
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="w-full relative bg-[var(--color-void)]">
      
      {/* SECTION 1: HERO (The Vision) */}
      <section className="hero-section h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 cinematic-bg opacity-50" />
        <div className="hero-container z-10 text-center px-4">
          <h1 className="text-fluid-h1 font-bold leading-none tracking-tighter text-white mix-blend-overlay">
            <span className="hero-word block">MUSIC</span>
            <span className="hero-word block">SET</span>
            <span className="hero-word block text-shimmer">FREE.</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-white/50 max-w-xl mx-auto font-light hero-word">
            The Final Operating System for the Music Industry.
          </p>
        </div>
        <div className="absolute bottom-12 w-full flex justify-center animate-bounce">
           <ArrowRight className="rotate-90 text-white/30" />
        </div>
      </section>

      {/* SECTION 2: THE CONFLICT (Black Box) */}
      <section className="conflict-section min-h-[80vh] flex flex-col justify-center px-6 md:px-32 py-20 relative z-10 bg-black">
        <div className="max-w-4xl mx-auto space-y-12">
           <h2 className="conflict-text text-fluid-h2 text-white font-medium text-balance">
             The industry is a <span className="text-zinc-600 line-through decoration-red-500/50">Black Box</span>.
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <p className="conflict-text text-fluid-body text-zinc-500 text-balance">
                Opaque royalties. Hidden data. 
                Creators left in the dark waiting months for a check that never explains itself.
              </p>
              <p className="conflict-text text-fluid-body text-zinc-500 text-balance">
                Fans have no voice. 
                Algorithms dictate culture. 
                Great songs die at the hands of gatekeepers.
              </p>
           </div>
        </div>
      </section>

      {/* SECTION 3: THE REVEAL (Glass Box) */}
      <section className="glass-section min-h-screen relative flex items-center justify-center overflow-hidden py-32">
        {/* Abstract Background Form */}
        <div className="glass-reveal-bg absolute top-0 left-0 w-full h-[150%] bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
           <div className="glass-panel p-12 md:p-24 rounded-[3rem] text-center border-t border-white/20 shadow-[0_0_100px_rgba(255,255,255,0.05)]">
              <h2 className="text-fluid-h2 font-bold mb-8 text-white tracking-tighter">
                Enter the <br/><span className="text-shimmer">Glass Box</span>.
              </h2>
              <p className="text-fluid-body text-white/70 max-w-3xl mx-auto leading-relaxed text-balance">
                Transparent. Decentralized. Infinitely Creative.
                <br/><br/>
                We are building a complete ecosystem where Human Artistry and AI Innovation live in harmony. 
                Not just a streaming platform—a <strong>Digital Nation for Sound</strong>.
              </p>
           </div>
        </div>
      </section>

      {/* FEATURE 1: SMART SPLITS (The DNA Engine) */}
      <section className="feature-section min-h-screen flex items-center bg-[#050505] relative overflow-hidden">
         <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-900/10 to-transparent" />
         <div className="container mx-auto px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="feature-content space-y-8 z-10">
               <div className="flex items-center space-x-4 mb-4">
                  <Activity className="text-blue-500" />
                  <span className="text-xs font-mono uppercase tracking-widest text-blue-500">The DNA Engine</span>
               </div>
               <h3 className="text-fluid-h2 font-medium leading-none">
                  Paid in <br/>Seconds.
               </h3>
               <p className="text-fluid-body text-zinc-400">
                  Every song is a Smart Contract. The moment revenue is generated, it's split.
                  No waiting 6 months.
               </p>
               <ul className="space-y-4 pt-8 border-t border-white/10">
                  <li className="flex justify-between text-zinc-300 font-mono text-sm">
                     <span>Original Artist</span>
                     <span className="text-white">35%</span>
                  </li>
                  <li className="flex justify-between text-zinc-300 font-mono text-sm">
                     <span>Producer</span>
                     <span className="text-white">35%</span>
                  </li>
                  <li className="flex justify-between text-zinc-300 font-mono text-sm">
                     <span>AI Model Pool</span>
                     <span className="text-white">10%</span>
                  </li>
                   <li className="flex justify-between text-zinc-300 font-mono text-sm">
                     <span>DAO Treasury</span>
                     <span className="text-white">20%</span>
                  </li>
               </ul>
            </div>
            {/* Abstract Visual */}
            <div className="feature-content relative aspect-square flex items-center justify-center">
               <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
               <div className="absolute inset-4 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
               <div className="absolute inset-12 border border-blue-500/20 rounded-full animate-[pulse_4s_ease-in-out_infinite]" />
               <div className="text-4xl font-bold text-white font-mono">$1,000</div>
            </div>
         </div>
      </section>

      {/* FEATURE 2: PERMISSIONLESS CREATIVITY */}
      <section className="feature-section min-h-screen flex items-center bg-[#080808] relative overflow-hidden">
         <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-purple-900/10 to-transparent" />
         <div className="container mx-auto px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
             {/* Visual first on desktop */}
            <div className="feature-content order-2 md:order-1 relative aspect-video glass-panel rounded-2xl overflow-hidden flex items-center justify-center border border-white/10">
               <div className="absolute inset-0 bg-purple-500/5" />
               <div className="text-center space-y-4">
                  <div className="inline-block p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                     <Layers size={40} className="text-purple-400" />
                  </div>
                  <div className="flex items-center gap-8 text-xl font-mono text-white/50">
                     <span>User A (Fan)</span>
                     <ArrowRight size={16} />
                     <span>User B (Star)</span>
                  </div>
               </div>
            </div>

            <div className="feature-content order-1 md:order-2 space-y-8 z-10">
               <div className="flex items-center space-x-4 mb-4">
                  <Mic className="text-purple-500" />
                  <span className="text-xs font-mono uppercase tracking-widest text-purple-500">Cover Revolution</span>
               </div>
               <h3 className="text-fluid-h2 font-medium leading-none">
                  Remix. Cover.<br/><span className="text-shimmer">Earn.</span>
               </h3>
               <p className="text-fluid-body text-zinc-400">
                  Permissionless creativity. You don't need to ask to cover a song. 
                  The license is built into the protocol.
               </p>
               <div className="p-6 bg-white/5 rounded-xl border-l-2 border-purple-500">
                  <p className="text-lg text-white font-medium mb-2">The 50/50 Standard</p>
                  <p className="text-sm text-zinc-400">
                     Composition (Original Artist) gets 50%. <br/>
                     Performance (Cover Artist) gets 50%.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* FEATURE 3: THE TRIBUNAL (Horizontal Scroll) */}
      <section className="tribunal-section h-screen w-full bg-[#020202] flex flex-nowrap overflow-hidden relative">
         <div className="absolute top-10 left-10 z-20">
            <h3 className="text-3xl font-bold text-white mb-2">The Tribunal</h3>
            <p className="text-sm text-zinc-500">Curate to Earn. You are the Label.</p>
         </div>

         {/* Card 1: Intro */}
         <div className="tribunal-card w-screen h-full flex-shrink-0 flex items-center justify-center border-r border-white/5 relative">
            <div className="max-w-4xl px-8 text-center">
               <Users size={80} className="mx-auto mb-8 text-amber-500" />
               <h2 className="text-fluid-h2 font-bold mb-6">Democracy in Sound</h2>
               <p className="text-2xl text-zinc-400 font-light">
                  We don't use secret algorithms. We use the "Golden Ear."
               </p>
            </div>
         </div>

         {/* Card 2: Mechanics */}
         <div className="tribunal-card w-screen h-full flex-shrink-0 flex items-center justify-center border-r border-white/5 bg-zinc-900/50">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl px-8">
               <div className="glass-panel p-10 rounded-2xl">
                  <h4 className="text-2xl font-bold mb-4 text-amber-400">1. Scout</h4>
                  <p className="text-zinc-400">Listen to the "New Arrivals" feed. Find hidden gems before they blow up.</p>
               </div>
               <div className="glass-panel p-10 rounded-2xl">
                  <h4 className="text-2xl font-bold mb-4 text-amber-400">2. Vote</h4>
                  <p className="text-zinc-400">Stake tokens on tracks you believe in. Your vote pushes them to the Main Stage.</p>
               </div>
             </div>
         </div>

         {/* Card 3: Rewards */}
         <div className="tribunal-card w-screen h-full flex-shrink-0 flex items-center justify-center bg-zinc-900">
            <div className="text-center">
               <div className="text-[10rem] font-bold text-amber-500/20 leading-none">REWARD</div>
               <p className="text-3xl text-white mt-[-4rem] relative z-10">Earn $OTTO when you spot a hit.</p>
            </div>
         </div>
      </section>

      {/* FEATURE 4: UNIVERSAL LAUNCHPAD */}
      <section className="feature-section min-h-screen flex flex-col items-center justify-center bg-[#050505] py-20 relative">
         <div className="text-center max-w-4xl px-6 mb-20 z-10">
            <Globe className="mx-auto mb-8 text-cyan-500" size={48} />
            <h2 className="text-fluid-h2 font-bold mb-6">Launchpad to the World</h2>
            <p className="text-xl text-zinc-400">
               Start on Otto. Push to Spotify, Apple, and everywhere else with one click.
               Royalties flow back to your Sovereign Wallet.
            </p>
         </div>
         
         {/* Network Visual */}
         <div className="relative w-full max-w-6xl h-[400px] border-t border-b border-white/5 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,rgba(255,255,255,0.05)_50%,transparent_51%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_49%,rgba(255,255,255,0.05)_50%,transparent_51%)]" />
            
            <div className="flex items-center gap-12 md:gap-32 z-10">
               <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center bg-black">
                  <span className="font-bold text-2xl">OTTO</span>
               </div>
               <div className="flex gap-2 animate-pulse">
                  <div className="w-3 h-3 bg-white rounded-full" />
                  <div className="w-3 h-3 bg-white rounded-full" />
                  <div className="w-3 h-3 bg-white rounded-full" />
               </div>
               <div className="grid grid-cols-2 gap-4 opacity-50">
                  <div className="w-16 h-16 border border-white/10 rounded-lg flex items-center justify-center">S</div>
                  <div className="w-16 h-16 border border-white/10 rounded-lg flex items-center justify-center">A</div>
                  <div className="w-16 h-16 border border-white/10 rounded-lg flex items-center justify-center">Y</div>
                  <div className="w-16 h-16 border border-white/10 rounded-lg flex items-center justify-center">T</div>
               </div>
            </div>
         </div>
      </section>

      {/* FOOTER MANIFESTO */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-white text-black relative z-10 p-6">
         <div className="max-w-5xl w-full text-center space-y-12">
            <h2 className="text-fluid-h1 font-bold tracking-tighter leading-none">
               THE FINAL <br/> SYSTEM.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-black/10 pt-12">
               <div>
                  <h4 className="font-bold mb-4">Connect Creators.</h4>
                  <p className="text-gray-500">To their fair share. No middlemen.</p>
               </div>
               <div>
                  <h4 className="font-bold mb-4">Connect AI.</h4>
                  <p className="text-gray-500">To ethical attribution. Build responsibly.</p>
               </div>
               <div>
                  <h4 className="font-bold mb-4">Connect Fans.</h4>
                  <p className="text-gray-500">To the governance of the music they love.</p>
               </div>
            </div>
            
            <div className="pt-20">
               <button className="bg-black text-white px-12 py-6 rounded-full text-xl font-bold hover:scale-105 transition-transform">
                  Join the Ecosystem
               </button>
            </div>
         </div>
      </section>

    </main>
  );
}
