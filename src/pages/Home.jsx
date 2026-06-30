import React, { useState, useEffect } from 'react';
import { campusHighlights, clubsData, welcomeData } from '../data/mockData';

export default function Home() {
  // Using a global window property to ensure landing page loads only once when a user arrives on website
  // A browser reload completely wipes window custom properties, meaning it will show again on refresh!
  const isSplashSeen = typeof window !== 'undefined' && window.__splashSeen === true;

  //Landing/Splash page states initialization
  const [showLogoText, setShowLogoText] = useState(isSplashSeen);
  const [dismissSplash, setDismissSplash] = useState(isSplashSeen);
  const [destroySplash, setDestroySplash] = useState(isSplashSeen);
  
  //logo url processed on client side
  const [logoUrl, setLogoUrl] = useState('./kgp-logo.png');

  //Selected club for club popup card 
  const [selectedClub, setSelectedClub] = useState(null);

  //Active category filter for clubs grid to show the list of all clubs and socities
  const [activeCategory, setActiveCategory] = useState('All');
  
  //Socities and club categories
  const categories = ['All', 'Technical', 'Cultural', 'Welfare', 'Sports'];

  // Hero Section Background Slideshow images:
  const heroBackgrounds = [
    './mainbuilding.jpg',
    './clocktower.jpg',
    './adda.jpg',
    './stadium.png'
  ];
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Campus Pulse section card images : 
  const campusImages = [
    './tsg.avif',
    './halls.png',
    './fest.jpg',
    './illu.png'
  ];

  // Mapping categories to display categories
  const mapCategory = (category) => {
    return category;
  };

  //Filtering the clubs as per the category button selected above
  const filteredClubs = activeCategory === 'All'
    ? clubsData
    : clubsData.filter(club => mapCategory(club.category) === activeCategory);

  // Hero section background image loop which changes every 2.75 secs
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % heroBackgrounds.length);
    }, 2750);

    return () => clearInterval(bgTimer);
  }, [heroBackgrounds.length]);

  //Landing page KGP-Logo adjustments
  useEffect(() => {
    const img = new Image();
    img.src = './kgp-logo.png';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i+1];
          const b = data[i+2];
          const brightness = (r + g + b) / 3;
          
          if (brightness > 240) {
            const factor = (255 - brightness) / (255 - 240);
            data[i+3] = Math.max(0, Math.min(255, Math.floor(factor * 255)));
          }
        }
        ctx.putImageData(imgData, 0, 0);
        setLogoUrl(canvas.toDataURL());
      } catch (err) {
        console.error('ERROR', err);
      }
    };
  }, []);

  // Splash Screen Timing Sequence - remains for only 4.5 secs on the screen
  useEffect(() => {
    if (isSplashSeen) return; // Completely skiping if the site is already opened

    document.body.style.overflow = 'hidden';

    //Logo appears after 0.5 secs of loading the landing page
    const logoTextTimer = setTimeout(() => {
      setShowLogoText(true);
    }, 500);

    const fadeOutTimer = setTimeout(() => {
      setDismissSplash(true);
      document.body.style.overflow = 'auto';

      // Setting the global window flag so it survives router changes but resets on refresh
      if (typeof window !== 'undefined') {
        window.__splashSeen = true;
      }
    }, 4500);

    const destroyTimer = setTimeout(() => {
      setDestroySplash(true);
    }, 5000);

    return () => {
      clearTimeout(logoTextTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(destroyTimer);
      document.body.style.overflow = 'auto';
    };
  }, [isSplashSeen]);

  // Smooth Scroll Handler Function
  const handleSmoothScroll = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 grid-bg pb-16">
      
      {/************************ LANDING PAGE (ONLY ONCE) **************************/}
      {!destroySplash && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-700 ease-out select-none ${
            dismissSplash ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            backgroundImage: "url('/kgp-nehru-museum.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-slate-950/60 dark:bg-slate-950/70"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(241,196,15,0.22)_0%,rgba(13,59,102,0.25)_50%,rgba(15,23,42,0.85)_100%)]"></div>

          <div className="relative z-10 max-w-6xl w-full px-6 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div
              className={`flex-shrink-0 transition-all duration-1000 transform ease-out delay-150 order-1 md:order-1 ${
                showLogoText ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 -rotate-12'
              }`}
            >
              <div className="p-0 max-w-[220px] sm:max-w-[300px]">
                <img
                  src={logoUrl}
                  alt="IIT Kharagpur Logo"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            <div
              className={`flex-1 transition-all duration-1000 transform ease-out order-2 md:order-2 md:pl-10 ${
                showLogoText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-none uppercase">
                Welcome <br />
                <span className="text-kgp-gold">
                  Freshers 2026
                </span>
              </h1>
              <p className="mt-4 text-white text-base sm:text-lg max-w-md font-normal leading-relaxed">
                Step into a journey of academic rigor and legacy. Technology Students' Gymkhana welcomes you.
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-kgp-gold to-yellow-300 transition-all duration-[4500ms] ease-out w-full"
               style={{ width: dismissSplash ? '100%' : '0%' }}></div>
        </div>
      )}
      {/***********************************************************************************/}

      {/****************************** HOME HERO BANNER ******************************/}
      <section className="relative overflow-hidden py-20 md:py-28 lg:py-32 border-b border-slate-200/50 dark:border-slate-800/40">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          {/* BG Image looping */}
          {heroBackgrounds.map((bgUrl, index) => (
            <div
              key={bgUrl}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentBgIndex ? 'opacity-80' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url('${bgUrl}')` }}
            />
          ))}
          <div className="absolute inset-0 bg-white/10 dark:bg-slate-950/20 backdrop-blur-[0.5px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center justify-center">
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white drop-shadow-sm">
            IIT Kharagpur UG Induction Portal
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-850 dark:text-slate-200 max-w-xl mx-auto font-semibold drop-shadow-sm">
            Your comprehensive student guide for the academic session 2026-27 managed by the Technology Students' Gymkhana
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => handleSmoothScroll('campus-life')}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850 shadow-sm transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Campus
            </button>
            <button
              onClick={() => handleSmoothScroll('clubs-grid')}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850 shadow-sm transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Societies
            </button>
            <button
              onClick={() => handleSmoothScroll('welcome-messages')}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850 shadow-sm transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Welcome
            </button>
          </div>
        </div>
      </section>
      {/***********************************************************************************/}

      {/**************************** CAMPUS PILLARS SECTION ******************************/}
      <section id="campus-life" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Discover the Campus Pulse
          </h3>
          <div className="mt-2 h-1 w-12 bg-kgp-blue dark:bg-kgp-gold mx-auto rounded-full"></div>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Familiarize yourself with life inside India's oldest and most prestigious technological playground.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Campus card images and description mapping */}
          {campusHighlights.map((highlight, index) => (
            <div
              key={highlight.id}
              className={`bg-white dark:bg-slate-900/60 backdrop-blur-sm border ${highlight.borderColor} rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row overflow-hidden group min-h-[220px]`}
            >
              <div className="w-full md:w-2/5 min-h-[180px] md:min-h-full bg-slate-100 dark:bg-slate-800/50 relative overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200/60 dark:border-slate-800/40">
                <img 
                  src={campusImages[index % campusImages.length]} 
                  alt={highlight.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              </div>

              <div className="w-full md:w-3/5 p-6 sm:p-8 flex flex-col justify-center text-left">
                <h4 className="font-display font-black text-lg sm:text-xl text-slate-900 dark:text-white mb-3 group-hover:text-kgp-blue dark:group-hover:text-kgp-gold transition-colors duration-200">
                  {highlight.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-normal">
                  {highlight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/***********************************************************************************/}

      {/************************* CLUBS & SOCIETIES SECTION *******************************/}
      <section id="clubs-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Clubs & Societies 
          </h3>
          <div className="mt-2 h-1 w-12 bg-kgp-blue dark:bg-kgp-gold mx-auto rounded-full"></div>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Click on the name or logo of any club or society below to open details and respective information.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5 mb-8">
          {/* Clubs card mapping as per category */}
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === category
                  ? 'bg-kgp-blue text-white dark:bg-kgp-gold dark:text-kgp-blue shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-kgp-blue dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-850 dark:hover:text-kgp-gold'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Individual socirty card logo mapping */}
          {filteredClubs.map((club, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedClub(club)}
              className="p-4 bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800/40 rounded-2xl hover:border-kgp-blue dark:hover:border-kgp-gold hover:shadow-md cursor-pointer transition-all duration-250 flex flex-col items-center text-center justify-center gap-3.5 group hover:-translate-y-0.5"
            >
              <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-slate-800 text-kgp-blue dark:text-kgp-gold font-display font-extrabold flex items-center justify-center text-xs shadow-inner group-hover:scale-105 transition-transform duration-250 overflow-hidden">
                <img 
                    src={club.logoImg} 
                    alt={`${club.name} logo`} 
                    className="w-full h-full object-cover"
                />
              </div>

              <h4 className="font-display font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 group-hover:text-kgp-blue dark:group-hover:text-kgp-gold transition-colors duration-200 leading-snug">
                {club.name}
              </h4>
              
              <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500">
                {mapCategory(club.category)}
              </span>
            </div>
          ))}
        </div>
      </section>
      {/***********************************************************************************/}

      {/***************************** CLUB DETAIL POPUP CARDS *****************************/}
      {selectedClub && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedClub(null)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300"
          ></div>

          <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">

                <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-kgp-blue dark:text-kgp-gold font-display font-extrabold flex items-center justify-center text-xs shadow-inner overflow-hidden">
                  <img 
                      src={selectedClub.logoImg} 
                      alt={`${selectedClub.name} logo`} 
                      className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                    {selectedClub.name}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {mapCategory(selectedClub.category)}
                  </span>
                </div>

              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800/60">
              <div className="bg-slate-50 dark:bg-slate-950/60 p-4.5 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-left">
                <p className="text-xs font-bold text-slate-450 dark:text-slate-550 uppercase tracking-widest mb-1.5">
                  Overview
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {selectedClub.description}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2.5">
              <button
                onClick={() => setSelectedClub(null)}
                className="px-4 py-2 border border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-350 text-xs font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
      {/***********************************************************************************/}

      {/******************************* WELCOME MSGS **************************************/}
      <section id="welcome-messages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/50 dark:border-slate-800/40 scroll-mt-16">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Welcome Messages
          </h3>
          <div className="mt-2 h-1 w-12 bg-kgp-blue dark:bg-kgp-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Welcome msgs mapping */}
          {welcomeData.map((t) => (
            <div
              key={t.id}
              className="relative p-6 bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800/40 rounded-2xl shadow-sm flex flex-col justify-between"
            >
              <span className="absolute top-2 right-4 text-5xl font-serif text-slate-100 dark:text-slate-850 select-none">
                “
              </span>

              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-350 leading-relaxed italic z-10 mb-6 font-normal">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3">

                <div className="h-9 w-9 rounded-full overflow-hidden bg-kgp-blue dark:bg-kgp-gold flex items-center justify-center p-1">
                  <img 
                    src="./iitkgp.png" 
                    alt={t.name} 
                    className="h-full w-full object-contain" 
                  />
                </div>

                <div>
                  <h5 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {t.name}
                  </h5>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    {t.role}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>
      {/***********************************************************************************/}

    </div>
  );
}