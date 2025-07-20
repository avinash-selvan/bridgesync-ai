'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type UserRole = 'sales' | 'pm' | 'dev';

interface NavigationProps {
  userRole?: UserRole;
  userName?: string;
}

export default function Navigation({ userRole = 'sales', userName = 'User' }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const getMenuItems = (role: UserRole) => {
    switch (role) {
      case 'sales':
        return [
          { href: '/', label: 'Home', icon: '🏠' },
          { href: '/upload', label: 'Upload Audio', icon: '📤' },
          { href: '/history', label: 'Upload History', icon: '📋' },
        ];
      case 'pm':
        return [
          { href: '/', label: 'Home', icon: '🏠' },
          { href: '/summaries', label: 'AI Summaries', icon: '📊' },
          { href: '/tasks', label: 'Task Management', icon: '✅' },
          { href: '/dashboard', label: 'Dashboard', icon: '📈' },
        ];
      case 'dev':
        return [
          { href: '/', label: 'Home', icon: '🏠' },
          { href: '/tasks', label: 'My Tasks', icon: '✅' },
          { href: '/dashboard', label: 'Dashboard', icon: '📈' },
        ];
      default:
        return [{ href: '/', label: 'Home', icon: '🏠' }];
    }
  };

  const menuItems = getMenuItems(userRole);

  return (
    <div className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                <span className="text-2xl mr-2">🚀</span>
                BridgeSync AI
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>
          </div>

          {/* User dropdown */}
          <div className="hidden lg:ml-4 lg:flex lg:items-center">
            <div className="relative">
              <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}