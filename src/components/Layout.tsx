'use client';

import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
  userRole?: 'sales' | 'pm' | 'dev';
  userName?: string;
}

export default function Layout({ children, userRole = 'sales', userName = 'User' }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userRole={userRole} userName={userName} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
} 