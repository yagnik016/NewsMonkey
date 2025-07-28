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
    <Disclosure as="nav" className="bg-[var(--card-bg)]/95 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] transition-all duration-300">
      {({ open }) => (
        <>
          {/* Hide main navbar content when mobile menu is open */}
          <div className={`${open ? 'hidden' : ''}`}> 
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Left: Logo */}
                <div className="flex items-center">
                  <span className="text-2xl font-extrabold text-[var(--primary)] transition-colors duration-300">
                    NewsMonkey
                  </span>
                </div>
                
                {/* Center: Nav Links (hidden on mobile) */}
                <div className="hidden md:flex items-center space-x-1">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 relative overflow-hidden group ${
                        pathname === link.href 
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg' 
                          : 'text-[var(--foreground)] hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                
                {/* Right: Actions */}
                <div className="flex items-center space-x-3">
                  {/* Subscribe Button */}
                  <button className="hidden lg:inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Subscribe
                  </button>
                  
                  {/* User Menu */}
                  <UserMenu />
                  
                  {/* Theme Toggle */}
                  <div className="flex items-center">
                    <ThemeToggle />
                  </div>
                  
                  {/* Mobile Menu Button */}
                  <div className="md:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-xl text-[var(--foreground)] hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <Disclosure.Panel className="md:hidden bg-[var(--card-bg)]/95 backdrop-blur-md shadow-lg border-b border-[var(--border)] transition-all duration-300">
            <div className="px-4 py-6 space-y-6">
              {/* Logo and Close */}
              <div className="flex items-center justify-between">
                <span className="text-2xl font-extrabold text-[var(--primary)] transition-colors duration-300">NewsMonkey</span>
                <Disclosure.Button className="p-2 rounded-xl text-[var(--foreground)] hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Disclosure.Button>
              </div>
              
              {/* Navigation Links */}
              <nav className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      pathname === link.href 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg' 
                        : 'text-[var(--foreground)] hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => document.activeElement && (document.activeElement as HTMLElement).blur()}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              
              {/* Subscribe Button */}
              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Subscribe
              </button>
              
              {/* User Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                <UserMenu />
                <ThemeToggle />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
} 