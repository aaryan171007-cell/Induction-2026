import React, { useState } from 'react';
import { contactsData } from '../data/mockData';
import { Phone, Mail, MapPin, ShieldAlert, Award, Landmark } from 'lucide-react';

export default function Contact() {
  const [activeCategory, setActiveCategory] = useState('All');

  //Contact categories 
  const categories = ['All', 'Emergency & Medical', 'Student Council'];

  //Filtering the contacts as per the selected category
  const filteredContacts = contactsData.filter((contact) => {
    const matchesCategory = activeCategory === 'All' || contact.category === activeCategory;
    return matchesCategory;
  });

  //Assigning individual category icon 
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Emergency & Medical':
        return <ShieldAlert className="h-4.5 w-4.5 text-rose-500" />;
      case 'Student Council':
        return <Award className="h-4.5 w-4.5 text-emerald-500" />;
      case 'Institute Administration':
        return <Landmark className="h-4.5 w-4.5 text-blue-500" />;
      default:
        return <Phone className="h-4.5 w-4.5 text-slate-400" />;
    }
  };

  //Emergency contacts data
  const emergencyLandlines = [
    { label: 'Security Control Room', numbers: ['03222282751', '03222281002'] },
    { label: 'Quick Response Room', numbers: ['03222281002', '03222281003'] },
    { label: 'Fire Emergency', numbers: ['03222285709'] },
    { label: 'Local Police (Hijli Outpost)', numbers: ['03222288060'] },
    { label: '24×7 Women Helpline', numbers: ['03222281010'] },
  ];

  //******************************* HTML CODE ***********************************/
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 grid-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/******************** Header **********************/}
        <div className="text-center mb-12">
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
            Key Institute Contacts
          </h1>

          <div className="mt-2 h-1.5 w-16 bg-kgp-blue dark:bg-kgp-gold mx-auto rounded-full"></div>

          <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Quick directory of emergency lines, hospital services, student gymkhana senate representatives, and administration coordinators.
          </p>
        </div>

        {/**************** Filter contacts buttons ******************/}
        <div className="flex items-center justify-center mb-8 bg-white dark:bg-slate-900/60 backdrop-blur-sm p-4 rounded-3xl border border-slate-200/60 dark:border-slate-800/40 shadow-sm max-w-2xl mx-auto">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-kgp-blue text-white dark:bg-kgp-gold dark:text-kgp-blue shadow-sm'
                    : 'bg-slate-50 border border-slate-200/85 hover:bg-slate-100 text-slate-600 dark:bg-slate-850 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-kgp-gold'
                }`}
              >
                {cat.split(' ')[0]} {cat !== 'All' && cat.split(' ').slice(1).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {/*************** Contacts Grid ***************/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/***** 1. Standard cards except the last one ******/}
          {filteredContacts.map((contact, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800/40 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5 group"
            >
              <div>
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">

                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    {getCategoryIcon(contact.category)}
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    {contact.category.split(' ')[0]}
                  </span>

                </div>

                {/* Contact's name and role */}
                <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-kgp-blue dark:group-hover:text-kgp-gold transition-colors duration-200">
                  {contact.name}
                </h3>

                <p className="text-sm font-semibold text-slate-500 dark:text-slate-450 mb-5">
                  {contact.role}
                </p>

                {/* Contact Details */}
                <div className="space-y-3.5 text-sm font-normal text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/50 pt-4">
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-kgp-blue dark:text-kgp-gold" />
                    <a href={`tel:${contact.phone}`} className="hover:underline hover:text-slate-900 dark:hover:text-white">
                      {contact.phone}
                    </a>
                  </div>

                  {contact.email && (
                    <div className="flex items-center gap-2.5">
                      <Mail className="h-4 w-4 text-kgp-blue dark:text-kgp-gold" />
                      <a href={`mailto:${contact.email}`} className="hover:underline hover:text-slate-900 dark:hover:text-white break-all">
                        {contact.email}
                      </a>
                    </div>
                  )}

                  <div className="flex items-center gap-2.5">
                    <MapPin className="h-4 w-4 text-kgp-blue dark:text-kgp-gold" />
                    <span>{contact.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* 2. Custom 24/7 Card containing only emergency contacts */}
          {(activeCategory === 'All' || activeCategory === 'Emergency & Medical') && (
            <div className="p-6 bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800/40 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <ShieldAlert className="h-4.5 w-4.5 text-rose-500" />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    24/7 Hotline
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white mb-4 hover:text-rose-600 dark:hover:text-rose-400 transition-colors duration-200 cursor-default inline-block">
                  24/7 Emergency Contacts
                </h3>

                {/* Landlines directory layout */}
                <div className="space-y-3.5 text-sm font-normal text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/50 pt-4">
                  {emergencyLandlines.map((item, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 pb-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 text-xs">
                        {item.label}:
                      </span>

                      <div className="flex flex-wrap gap-1 sm:justify-end text-slate-500 dark:text-slate-400 font-medium text-xs">
                        {item.numbers.map((num, idx) => (
                          <React.Fragment key={idx}>
                            <a href={`tel:${num}`} className="hover:text-kgp-blue dark:hover:text-kgp-gold hover:underline">
                              {num}
                            </a>
                            {idx < item.numbers.length - 1 && <span className="text-slate-300 dark:text-slate-700 mx-0.5 select-none">,</span>}
                          </React.Fragment>
                        ))}
                      </div>
                      
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
  //************************************************************************************/
}