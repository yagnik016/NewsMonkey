'use client';
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import UserMenu from './UserMenu';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/news', label: 'News' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <Disclosure as="nav" className="bg-white dark:bg-[#1e2633] rounded-b-2xl shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-[var(--border)] transition-colors">
      {({ open }) => (
        <>
          {/* Hide main navbar content when mobile menu is open */}
          <div className={`${open ? 'hidden' : ''}`}> 
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
              <div className="flex items-center justify-between py-4 gap-1 flex-wrap">
                {/* Left: Logo */}
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 truncate">NewsMonkey</span>
                </div>
                {/* Center: Nav Links (hidden on mobile) */}
                <div className="hidden lg:flex gap-2 ml-2">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${pathname === link.href ? 'bg-blue-100 text-blue-700 dark:bg-gray-900 dark:text-white' : 'text-gray-900 hover:bg-blue-50 hover:text-blue-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white'}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                {/* Right: Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="hidden lg:inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-cyan-500 transition">
                    + Subscribe
                  </button>
                  <ThemeToggle />
                  <UserMenu />
                  {/* Hamburger for mobile */}
                  <div className="flex items-center lg:hidden flex-shrink-0">
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-white hover:bg-blue-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Menu */}
          <Disclosure.Panel className="lg:hidden bg-white dark:bg-[#1e2633] rounded-b-2xl shadow-lg px-4 pt-4 pb-6 border-b border-gray-200 dark:border-[var(--border)]">
            {/* Top row: logo and close button */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">NewsMonkey</span>
              <Disclosure.Button className="text-3xl text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                &times;
              </Disclosure.Button>
            </div>
            {/* Nav links */}
            <nav className="flex flex-col gap-3 mb-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block w-full text-center px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${pathname === link.href ? 'bg-blue-100 text-blue-700 dark:bg-gray-900 dark:text-white' : 'text-gray-900 hover:bg-blue-50 hover:text-blue-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white'}`}
                  onClick={() => document.activeElement && (document.activeElement as HTMLElement).blur()}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            {/* Subscribe button */}
            <button className="w-full mb-8 bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-4 py-3 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-cyan-500 transition text-lg">
              + Subscribe
            </button>
            {/* User actions at the bottom */}
            <div className="flex gap-4 justify-center">
              <ThemeToggle />
              <UserMenu />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
} 