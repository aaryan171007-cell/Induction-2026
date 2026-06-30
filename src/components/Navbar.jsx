import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, ExternalLink } from 'lucide-react';

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();

  //For mobile view : Checks if the drop down menu is open or close
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //Helper function to reverse the action of the mobile view drop down menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //Links to different pages
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact Us', path: '/contact' },
  ];

  //Links to IIT KGP's official website
  const externalLinks = [
    { name: 'TSG Website', url: 'https://tsg.iitkgp.ac.in/' },
    { name: 'IIT KGP Website', url: 'https://www.iitkgp.ac.in/' },
  ];

  //Cyclindrical colored box around the selected page so that the user can understad which page is active at the moment
  const activeStyle = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
      isActive
        ? 'bg-kgp-blue text-white dark:bg-kgp-gold dark:text-kgp-blue shadow-md'
        : 'text-slate-600 hover:text-kgp-blue hover:bg-slate-100 dark:text-slate-300 dark:hover:text-kgp-gold dark:hover:bg-slate-800'
    }`;

  const mobileActiveStyle = ({ isActive }) =>
    `block px-4 py-2.5 rounded-lg text-base font-semibold transition-all duration-200 ${
      isActive
        ? 'bg-kgp-blue text-white dark:bg-kgp-gold dark:text-kgp-blue shadow-md'
        : 'text-slate-600 hover:text-kgp-blue hover:bg-slate-100 dark:text-slate-300 dark:hover:text-kgp-gold dark:hover:bg-slate-800'
    }`;

  //******************************** HTML CODE ***************************************/
  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 glass border-b border-slate-200/50 dark:border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/*************************** Logo Section *******************************/}
          <Link to="/" className="flex items-center gap-2 select-none active:scale-100">
            {/********* 75 Years Logo *********/}
            <div className="bg-transparent p-1">
              <img 
                src="/Induction-2026/75logo.png" 
                alt="75 Years Logo" 
                className="h-8 w-auto object-contain" 
              />
            </div>
            {/********* IIT KGP Logo **********/}
            <div className="bg-transparent p-1 transition-all duration-300 group-hover:rotate-12">
              <img 
                src="/Induction-2026/kgp-logo.png" 
                alt="IIT KGP Logo" 
                className="h-8 w-8 object-contain pointer-events-none" 
              />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-kgp-blue to-kgp-blue-light dark:from-kgp-gold dark:to-amber-300 bg-clip-text text-transparent">
              IIT KGP Induction 2026
            </span>
          </Link>

          {/*********************** Desktop Navigation Links *****************************/}
          <div className="hidden md:flex items-center gap-4">
            {/* Navigation links using React Router NavLink*/}
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.path} className={activeStyle}>
                {link.name}
              </NavLink>
            ))}

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>

            {externalLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-500 hover:text-kgp-blue dark:text-slate-400 dark:hover:text-kgp-gold transition-colors duration-200"
              >
                {link.name}
                <ExternalLink className="h-3.5 w-3.5 opacity-80" /> 
              </a>
            ))}

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>

            {/**************************** Mode Toggle **********************************/}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200/80 bg-slate-50 text-slate-600 hover:text-kgp-blue hover:bg-slate-100 transition-all duration-200 dark:border-slate-800/80 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-kgp-gold dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700" />
              )}
            </button>
          </div>

          {/********************** Mobile Control Panel *********************/}
          <div className="flex items-center gap-2 md:hidden">
            {/**** Dark Mode Toggle for Mobile ****/}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200/80 bg-slate-50 text-slate-600 dark:border-slate-800/80 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-kgp-gold dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-slate-600" />
              )}
            </button>

            {/***** Hamburger Button : For different pages navigation and external links *****/}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-xl text-slate-600 hover:text-kgp-blue dark:text-slate-300 dark:hover:text-kgp-gold flex items-center justify-center cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className="h-6 w-6 relative flex flex-col justify-center items-center">
                <span className={`bg-current block transition-all duration-300 h-0.5 w-5 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`} />
                <span className={`bg-current block transition-all duration-300 h-0.5 w-5 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`bg-current block transition-all duration-300 h-0.5 w-5 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/******** Mobile Menu Panel from hamburger button ********/}
      {isMenuOpen && (
        <div className="md:hidden glass border-t border-slate-200/50 dark:border-slate-800/40 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={mobileActiveStyle}
              >
                {link.name}
              </NavLink>
            ))}

            <div className="border-t border-slate-200/60 dark:border-slate-800/50 my-2"></div>

            {externalLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 rounded-lg text-base font-semibold text-slate-500 hover:text-kgp-blue hover:bg-slate-100 dark:text-slate-400 dark:hover:text-kgp-gold dark:hover:bg-slate-800 transition-colors duration-200"
              >
                <span>{link.name}</span>
                <ExternalLink className="h-4 w-4 opacity-70" />
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}