import React, { useState } from 'react';
import { faqsData } from '../data/mockData';
import { Search, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

export default function FAQ() {

  //Search bar components initialization
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState(null);

  //Expanding and closing faq box logic
  const toggleFaq = (id) => {
    if (openFaqId === id) {
      setOpenFaqId(null);
    } else {
      setOpenFaqId(id);
    }
  };

  //Search bar faqqs filter logic
  const filteredFaqs = faqsData.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //********************************** HTML CODE **************************************/
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 grid-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/******************** Header ************************/}
        <div className="text-center mb-12">

          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h1>

          <div className="mt-2 h-1.5 w-16 bg-kgp-blue dark:bg-kgp-gold mx-auto rounded-full"></div>

          <p className="mt-4 text-slate-500 dark:text-slate-400">
            Find answers to common questions about ERP registrations, hostels, academics, grading system, and life at IIT Kharagpur.
          </p>

        </div>

        {/******************** Search Bar ************************/}
        <div className="relative max-w-xl mx-auto mb-10">

          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 dark:text-slate-500" />
          </div>

          <input
            type="text"
            placeholder="Search FAQs (e.g., ERP, Hall, grading, bicycle)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-kgp-blue dark:focus:ring-kgp-gold transition-all duration-200 text-sm shadow-sm"
          />

        </div>

        {/*********************** FAQ list mapping as per search bar ********************/}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id; //verifying whether the answer box is open or not
              return (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800/40 rounded-2xl overflow-hidden shadow-sm hover:border-slate-350 dark:hover:border-slate-700 transition-colors duration-250"
                >
                  {/******** FAQ Question container ********/}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 cursor-pointer"
                  >

                    <span className="font-display font-extrabold text-slate-900 dark:text-white text-base sm:text-lg leading-snug">
                      {faq.question}
                    </span>

                    <div className="flex-shrink-0 p-1.5 rounded-lg bg-slate-50 text-slate-400 dark:bg-slate-800 dark:text-slate-300">
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>

                  </button>
                  
                  {/******** Expandable Answer container ********/}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[500px] border-t border-slate-100 dark:border-slate-800/50' : 'max-h-0'
                    } overflow-hidden`}
                  >

                    <div className="px-6 py-5 text-sm sm:text-base text-slate-600 dark:text-slate-350 leading-relaxed font-normal bg-slate-50/40 dark:bg-slate-950/20">
                      {faq.answer}
                    </div>

                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center p-12 bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-255 dark:border-slate-800 rounded-3xl max-w-md mx-auto">
              <AlertCircle className="h-10 w-10 text-slate-400 mx-auto mb-3" />

              <h3 className="font-display font-bold text-slate-900 dark:text-white mb-1">
                No FAQs found
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                We couldn't find any questions matching "{searchQuery}". Try searching for other keywords like "TSG" or "Sports".
              </p>
            </div>
          )}
        </div>

        {/***************** End note *****************/}
        <div className="mt-12 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 font-medium">
            Still have unanswered academic or logistics questions? Feel free to contact the Student Council or Gymkhana representatives directly on our <a href="/contact" className="underline font-bold text-kgp-blue dark:text-kgp-gold">Contacts Page</a>.
          </p>
        </div>

      </div>
    </div>
  );
  //*************************************************************************************/
}
