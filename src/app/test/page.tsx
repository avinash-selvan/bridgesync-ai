'use client';

import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';

export default function TestPage() {
  return (
    <Layout userRole="pm" userName="Sarah Johnson">
      <div className="max-w-4xl mx-auto">
        <Card title="Navigation Test Page" className="mb-8">
          <p className="text-gray-600 mb-4">
            This page demonstrates the navigation component with different user roles and styling.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold mb-2">Sales Role</h3>
              <p className="text-sm text-gray-600">
                Upload audio files and track history
              </p>
            </div>
            
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold mb-2">PM Role</h3>
              <p className="text-sm text-gray-600">
                Review summaries and manage tasks
              </p>
            </div>
            
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold mb-2">Dev Role</h3>
              <p className="text-sm text-gray-600">
                View assigned tasks and track progress
              </p>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Current Features">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Responsive navigation with mobile menu
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Role-based menu items
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Active page highlighting
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                User avatar with dropdown
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Standard Tailwind styling
              </li>
            </ul>
          </Card>

          <Card title="Navigation Components">
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-700">Navbar</h4>
                <p className="text-sm text-gray-600">
                  Main navigation bar with logo and menu items
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-700">Mobile Menu</h4>
                <p className="text-sm text-gray-600">
                  Collapsible menu for mobile devices
                </p>
              </div>
              
              <div className="p-3 bg-cyan-50 rounded-lg">
                <h4 className="font-medium text-cyan-700">User Dropdown</h4>
                <p className="text-sm text-gray-600">
                  User profile with role display and logout
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
} 