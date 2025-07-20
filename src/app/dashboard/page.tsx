'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
  const [userRole] = useState<'sales' | 'pm' | 'dev'>('pm'); // This will come from auth

  const getDashboardContent = (role: string) => {
    switch (role) {
      case 'sales':
        return {
          title: 'Sales Dashboard',
          subtitle: 'Track your uploads and client interactions',
          stats: [
            { label: 'Files Uploaded', value: '24', change: '+12%', color: 'text-blue-600' },
            { label: 'Processing Time', value: '2.3 min', change: '-15%', color: 'text-green-600' },
            { label: 'Client Calls', value: '18', change: '+8%', color: 'text-purple-600' },
            { label: 'Success Rate', value: '94%', change: '+3%', color: 'text-cyan-600' }
          ],
          charts: [
            { title: 'Upload Activity', type: 'line', data: 'Weekly upload trends' },
            { title: 'Processing Status', type: 'pie', data: 'Completed vs Processing' }
          ]
        };
      case 'pm':
        return {
          title: 'Project Management Dashboard',
          subtitle: 'Monitor team productivity and project progress',
          stats: [
            { label: 'Active Tasks', value: '12', change: '+3', color: 'text-blue-600' },
            { label: 'Completed This Week', value: '8', change: '+2', color: 'text-green-600' },
            { label: 'Team Velocity', value: '85%', change: '+5%', color: 'text-purple-600' },
            { label: 'On-Time Delivery', value: '92%', change: '+2%', color: 'text-cyan-600' }
          ],
          charts: [
            { title: 'Task Status Distribution', type: 'pie', data: 'Pending, In Progress, Completed' },
            { title: 'Team Performance', type: 'bar', data: 'Individual developer metrics' }
          ]
        };
      case 'dev':
        return {
          title: 'Developer Dashboard',
          subtitle: 'Track your tasks and productivity',
          stats: [
            { label: 'Assigned Tasks', value: '6', change: '+1', color: 'text-blue-600' },
            { label: 'Completed Today', value: '2', change: '+1', color: 'text-green-600' },
            { label: 'Hours Worked', value: '6.5', change: '+0.5', color: 'text-purple-600' },
            { label: 'Code Quality', value: 'A+', change: 'Stable', color: 'text-cyan-600' }
          ],
          charts: [
            { title: 'Task Completion Rate', type: 'line', data: 'Daily completion trends' },
            { title: 'Time Distribution', type: 'doughnut', data: 'Coding, Testing, Documentation' }
          ]
        };
      default:
        return {
          title: 'Dashboard',
          subtitle: 'Overview of your activities',
          stats: [],
          charts: []
        };
    }
  };

  const content = getDashboardContent(userRole);

  return (
    <Layout userRole={userRole} userName={userRole === 'pm' ? 'Project Manager' : userRole === 'dev' ? 'Developer' : 'Sales'}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
          <p className="text-gray-600">{content.subtitle}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {content.stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-green-600">↗︎ {stat.change}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {content.charts.map((chart, index) => (
            <Card key={index} title={chart.title}>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-gray-600">{chart.data}</p>
                  <p className="text-sm text-gray-500">Chart visualization will be implemented</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Role-Specific Content */}
        {userRole === 'sales' && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card title="Recent Uploads">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <div>
                    <p className="font-semibold">client_call_2024_01_15.mp3</p>
                    <p className="text-sm text-gray-600">Uploaded 2 hours ago</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <div>
                    <p className="font-semibold">sales_demo_2024_01_14.mp3</p>
                    <p className="text-sm text-gray-600">Uploaded 1 day ago</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Processing</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <div>
                    <p className="font-semibold">client_feedback_2024_01_13.mp3</p>
                    <p className="text-sm text-gray-600">Uploaded 2 days ago</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>
                </div>
              </div>
            </Card>

            <Card title="Quick Actions">
              <div className="space-y-3">
                <Button className="w-full justify-start">
                  📤 Upload New Audio
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  📋 View Upload History
                </Button>
                <Button variant="accent" className="w-full justify-start">
                  📊 View Analytics
                </Button>
              </div>
            </Card>
          </div>
        )}

        {userRole === 'pm' && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card title="Team Overview">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Alice Developer</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">3 completed</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">2 in progress</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Bob Developer</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">2 completed</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">1 pending</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Charlie Developer</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">4 completed</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">1 in progress</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Quick Actions">
              <div className="space-y-3">
                <Button className="w-full justify-start">
                  ✅ Create New Task
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  📊 View Summaries
                </Button>
                <Button variant="accent" className="w-full justify-start">
                  👥 Team Management
                </Button>
              </div>
            </Card>
          </div>
        )}

        {userRole === 'dev' && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card title="My Tasks">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <div>
                    <p className="font-semibold">Implement Dark Mode</p>
                    <p className="text-sm text-gray-600">Due: Jan 22, 2024</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">In Progress</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <div>
                    <p className="font-semibold">Fix Search Bug</p>
                    <p className="text-sm text-gray-600">Due: Jan 20, 2024</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <div>
                    <p className="font-semibold">Add Export Feature</p>
                    <p className="text-sm text-gray-600">Due: Jan 25, 2024</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Pending</span>
                </div>
              </div>
            </Card>

            <Card title="Quick Actions">
              <div className="space-y-3">
                <Button className="w-full justify-start">
                  ✅ Update Task Status
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  📝 View Task Details
                </Button>
                <Button variant="accent" className="w-full justify-start">
                  📈 View Progress
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Recent Activity */}
        <Card title="Recent Activity">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">PM</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold">New task created</p>
                <p className="text-sm text-gray-600">Implement dark mode toggle - Assigned to Alice Developer</p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">DEV</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Task completed</p>
                <p className="text-sm text-gray-600">Add advanced search filters - Charlie Developer</p>
              </div>
              <span className="text-sm text-gray-500">4 hours ago</span>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
              <div className="w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">S</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Audio file uploaded</p>
                <p className="text-sm text-gray-600">client_call_2024_01_15.mp3 - John Doe</p>
              </div>
              <span className="text-sm text-gray-500">6 hours ago</span>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
} 