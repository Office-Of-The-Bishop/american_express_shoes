import React, { useEffect } from 'react'
import logo from "../assets/American Shoe Logo - transparent.png"
import ShoppingCart from './ShoppingCart';

export const Navbar: React.FC = () => {
  const handleTabClick = (tabValue: string): void => {
    try {
      localStorage.setItem('selected', tabValue);
      console.log(`Stored tab "${tabValue}" in localStorage`);
    } catch (error) {
      console.error('Error storing tab in localStorage:', error);
    }
  };

  useEffect(() => {
    const menuBtn = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('icon-open');
    const iconClose = document.getElementById('icon-close');

    const handleMenuClick = (): void => {
      if (!menuBtn || !mobileMenu || !iconOpen || !iconClose) return;
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.classList.toggle('invisible');
      mobileMenu.classList.toggle('opacity-0');
      mobileMenu.classList.toggle('pointer-events-none');
      iconOpen.classList.toggle('hidden');
      iconClose.classList.toggle('hidden');
    };

    menuBtn?.addEventListener('click', handleMenuClick);

    const dropdowns = document.querySelectorAll('[data-dropdown]');
    const dropdownHandlers: Array<{ trigger: Element; documentClick: (e: Event) => void }> = [];

    dropdowns?.forEach((dd) => {
      const trigger = dd.querySelector('[data-trigger]');
      const menu = dd.querySelector('[data-menu]');
      if (!trigger || !menu) return;

      const open = (): void => {
        trigger.setAttribute('aria-expanded', 'true');
        menu.classList.remove('invisible', 'opacity-0', 'pointer-events-none');
      };
      const close = (): void => {
        trigger.setAttribute('aria-expanded', 'false');
        menu.classList.add('invisible', 'opacity-0', 'pointer-events-none');
      };

      const handleTriggerClick = (e: Event): void => {
        e.stopPropagation();
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        isOpen ? close() : open();
      };

      const handleDocumentClick = (e: Event): void => {
        if (!dd.contains(e.target as Node)) close();
      };

      const handleKeydown = (e: KeyboardEvent): void => {
        const items = Array.from(menu.querySelectorAll('[role="menuitem"]'));
        if (e.key === 'Escape') { 
          close(); 
          (trigger as HTMLElement).focus(); 
        }
        if (!items.length) return;
        const currentIndex = items.indexOf(document.activeElement as Element);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (trigger === document.activeElement && items[0]) { 
            open(); 
            (items[0] as HTMLElement).focus(); 
            return; 
          }
          const next = items[currentIndex + 1] || items[0];
          (next as HTMLElement).focus();
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = items[currentIndex - 1] || items[items.length - 1];
          (prev as HTMLElement).focus();
        }
      };

      const handleFocusout = (): void => {
        setTimeout(() => { 
          if (!dd.contains(document.activeElement)) close(); 
        }, 0);
      };

      trigger.addEventListener('click', handleTriggerClick);
      document.addEventListener('click', handleDocumentClick);
      dd.addEventListener('keydown', handleKeydown as EventListener);
      menu.addEventListener('focusout', handleFocusout);

      dropdownHandlers.push({
        trigger,
        documentClick: handleDocumentClick
      });
    });

    return () => {
      menuBtn?.removeEventListener('click', handleMenuClick);
      dropdownHandlers.forEach(({ documentClick }) => {
        document.removeEventListener('click', documentClick);
      });
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-black/10 dark:border-white/10 bg-white/90 dark:bg-neutral-900/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="flex h-16 items-center justify-between gap-4
                 pl-[max(1rem,env(safe-area-inset-left))]
                 pr-[max(1rem,env(safe-area-inset-right))]">

         
          <a href="#" className="shrink-0 inline-flex items-center gap-2" aria-label="Home">
          
          <img src={logo} className='w-21 h-16 absolute left-[7%]'/>
            {/* <span className="text-sm font-semibold leading-none">YourBrand</span> */}
          </a>

          
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center ml-[95px]">
            <a href="#men" onClick={() => handleTabClick('Men')} className="inline-flex h-10 items-center px-2 text-sm font-medium leading-none hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded">Men</a>
            <a href="#womens" onClick={() => handleTabClick('Womens')} className="inline-flex h-10 items-center px-2 text-sm font-medium leading-none hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded">Womens</a>
            <a href="#unisex" onClick={() => handleTabClick('Unisex')} className="inline-flex h-10 items-center px-2 text-sm font-medium leading-none hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded">Unisex</a>
            <a href="#children" onClick={() => handleTabClick('Children')} className="inline-flex h-10 items-center px-2 text-sm font-medium leading-none hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded">Children</a>
            <a href="#teen" onClick={() => handleTabClick('Teen')} className="inline-flex h-10 items-center px-2 text-sm font-medium leading-none hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded">Teen</a>
            <a href="#sneakers" onClick={() => handleTabClick('Sneakers')} className="inline-flex h-10 items-center px-2 text-sm font-medium leading-none hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded text-red-700">Sneakers</a>
            <a href="#dress" onClick={() => handleTabClick('Dress')} className="inline-flex h-10 items-center px-2 text-sm font-medium leading-none hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded  text-red-700">Dress</a>
            <a href="#sandals" onClick={() => handleTabClick('Sandals')} className="inline-flex h-10 items-center px-2 text-sm font-medium leading-none hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded text-red-700">Sandals</a>
            <a href="#boots" onClick={() => handleTabClick('Boots')} className="inline-flex h-10 items-center px-2 text-sm font-medium leading-none hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded text-red-700">Boots</a>
            <a href="#boots" onClick={() => handleTabClick('Boots')} className="inline-flex h-10 items-center px-2 text-sm font-medium leading-none hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded">Filter</a>
          </div>

         
          <div className="hidden md:flex items-center gap-3 w-75 ml-[30px] pl-[90px]">
            <div className="relative flex gap-4">
              <input 
                type="search" 
                placeholder="Search..." 
                className="inline-flex h-10 items-center rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-4 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 w-64"
                aria-label="Search"
              />
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 dark:text-neutral-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd"/>
              </svg>
              <div className='flex items-center gap-[3px]'>

              <a href="#children" onClick={() => handleTabClick('Children')} className="inline-flex h-10 items-center px-2 text-sm font-medium leading-none hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded">MY CART</a>

              <ShoppingCart/>
              </div>
            </div>
          </div>

      
          <div className="md:hidden flex items-center">
            <button id="menu-toggle" type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" aria-expanded="false" aria-controls="mobile-menu" aria-label="Toggle menu">
              <svg id="icon-open" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
              <svg id="icon-close" className="hidden h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      </div>

      
      <div id="mobile-menu" className="md:hidden invisible opacity-0 pointer-events-none transition-opacity duration-150" role="dialog" aria-modal="true">
        <div className="border-t border-black/10 dark:border-white/10 bg-white/95 dark:bg-neutral-900/95">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="mb-4">
              <div className="absolute">
                <input 
                  type="search" 
                  placeholder="Search..." 
                  className="w-full absolute right-[3%] h-10 items-center rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-4 pr-10 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  aria-label="Search"
                />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 dark:text-neutral-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
            <ul className="grid gap-1">
              <li><a className="block rounded px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800" href="#men" onClick={() => handleTabClick('Men')}>Men</a></li>
              <li><a className="block rounded px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800" href="#womens" onClick={() => handleTabClick('Womens')}>Womens</a></li>
              <li><a className="block rounded px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800" href="#unisex" onClick={() => handleTabClick('Unisex')}>Unisex</a></li>
              <li><a className="block rounded px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800" href="#children" onClick={() => handleTabClick('Children')}>Children</a></li>
              <li><a className="block rounded px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800" href="#teen" onClick={() => handleTabClick('Teen')}>Teen</a></li>
              <li><a className="block rounded px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800" href="#sneakers" onClick={() => handleTabClick('Sneakers')}>Sneakers</a></li>
              <li><a className="block rounded px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800" href="#dress" onClick={() => handleTabClick('Dress')}>Dress</a></li>
              <li><a className="block rounded px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800" href="#sandals" onClick={() => handleTabClick('Sandals')}>Sandals</a></li>
              <li><a className="block rounded px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800" href="#boots" onClick={() => handleTabClick('Boots')}>Boots</a></li>
              <li><a className="block rounded px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800" href="#boots" onClick={() => handleTabClick('Boots')}>Filter</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

