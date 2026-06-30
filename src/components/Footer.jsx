import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/************************* Logo & Gymkhana Info ***************************/}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              
              <div className="bg-transparent p-1">
                <img 
                  src="/Induction-2026/kgp-logo.png" 
                  alt="IIT KGP Logo" 
                  className="h-8 w-8 object-contain" 
                />
              </div>

              <span className="font-display font-extrabold text-xl tracking-tight text-kgp-blue dark:text-kgp-gold">
                IIT KGP Induction Portal
              </span>

            </Link>

            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
              Technology Students' Gymkhana extends a very warm welcome to all the freshers into their campus life!
            </p>

            <div className="space-y-2 pt-2 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                {/*** PLACEHOLDER: Map  Icon ***/}
                <img src="" alt="" className="h-4 w-4 object-contain empty:hidden" />
                <span>Gymkhana Office, IIT Kharagpur, West Bengal, 721302</span>
              </div>
            </div>
          </div>

          {/**************************** Quick Links ***************************/}
          <div>
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link to="/" className="text-slate-500 hover:text-kgp-blue dark:text-slate-400 dark:hover:text-kgp-gold">
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-500 hover:text-kgp-blue dark:text-slate-400 dark:hover:text-kgp-gold">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-500 hover:text-kgp-blue dark:text-slate-400 dark:hover:text-kgp-gold">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/******************** Links to other important IIT KGP's websites ********************/}
          <div>
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Official Portals
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <a href="https://setu.iitkgp.ac.in/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-kgp-blue dark:text-slate-400 dark:hover:text-kgp-gold">
                  SETU
                </a>
              </li>
              <li>
                <a href="https://hmc.iitkgp.ac.in/web/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-kgp-blue dark:text-slate-400 dark:hover:text-kgp-gold">
                  HMC
                </a>
              </li>
              <li>
                <a href="https://wiki.metakgp.org/w/Yellow_pages" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-kgp-blue dark:text-slate-400 dark:hover:text-kgp-gold">
                  YELLOW PAGES
                </a>
              </li>
              <li>
                <a href="https://erp.iitkgp.ac.in/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-kgp-blue dark:text-slate-400 dark:hover:text-kgp-gold">
                  ERP PORTAL 
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Technology Students' Gymkhana, IIT Kharagpur. All rights reserved.
          </div>

          {/************ Back to Top Button *************/}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-kgp-blue hover:bg-slate-100 dark:hover:text-kgp-gold dark:hover:bg-slate-800 transition-all duration-200"
          >
            <span>Back to Top</span>
            {/*** PLACEHOLDER: Arrow Up Icon ***/}
            <img src="" alt="" className="h-3 w-3 object-contain empty:hidden" />
          </button>

        </div>
      </div>
    </footer>
  );
}