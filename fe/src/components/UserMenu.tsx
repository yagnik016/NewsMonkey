"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "@/components/AuthProvider";

export default function UserMenu() {
  const { user, logout } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  // Generate initials from user name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate a color based on user name
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-green-500 to-green-600',
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-pink-500 to-pink-600',
      'bg-gradient-to-br from-indigo-500 to-indigo-600',
      'bg-gradient-to-br from-red-500 to-red-600',
      'bg-gradient-to-br from-yellow-500 to-yellow-600',
      'bg-gradient-to-br from-teal-500 to-teal-600',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (user) {
    return (
      <div className="relative">
        {/* User Avatar/Profile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-3 p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
        >
          {/* Profile Image or Initials */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg ${getAvatarColor(user.name)}`}>
            {user.profileImage ? (
              <Image 
                src={user.profileImage} 
                alt={user.name}
                width={32}
                height={32}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              getInitials(user.name)
            )}
          </div>
          
          {/* User Info */}
          <div className="hidden sm:block text-left">
            <div className="text-sm font-medium text-[var(--foreground)] group-hover:text-blue-600 dark:group-hover:text-blue-400">{user.name}</div>
            <div className="text-xs text-[var(--muted-foreground)] group-hover:text-blue-500 dark:group-hover:text-blue-300">Logged in</div>
          </div>
          
          {/* Dropdown Arrow */}
          <svg className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-[var(--card-bg)] rounded-xl shadow-lg border border-[var(--border)] py-2 z-50">
            <div className="px-4 py-2 border-b border-[var(--border)]">
              <div className="text-sm font-medium text-[var(--foreground)]">{user.name}</div>
              <div className="text-xs text-[var(--muted-foreground)]">{user.email}</div>
            </div>
            
            <Link 
              href="/profile" 
              className="block px-4 py-2 text-sm text-[var(--foreground)] hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
            
            <Link 
              href="/bookmarks" 
              className="block px-4 py-2 text-sm text-[var(--foreground)] hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Bookmarks
            </Link>
            
            <button 
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Link 
        href="/login" 
        className="px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        Login
      </Link>
      
      <Link 
        href="/register" 
        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-white rounded-xl font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        Register
      </Link>
    </div>
  );
} 