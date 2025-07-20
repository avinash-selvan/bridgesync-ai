'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  dueDate?: string;
  summary?: string;
}

export default function TasksPage() {
  const [userRole] = useState<'pm' | 'dev'>('pm'); // This will come from auth
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high' | 'urgent'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data - this will come from Supabase
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Implement Dark Mode Toggle',
      description: 'Add a dark mode toggle to the user interface based on client feedback from TechCorp call.',
      assignedTo: 'Alice Developer',
      assignedBy: 'Project Manager',
      status: 'in-progress',
      priority: 'high',
      createdAt: 'Jan 15, 2024',
      dueDate: 'Jan 22, 2024',
      summary: 'Client Feedback Call - TechCorp'
    },
    {
      id: '2',
      title: 'Optimize Mobile Responsiveness',
      description: 'Improve mobile responsiveness across all pages, especially the dashboard and forms.',
      assignedTo: 'Bob Developer',
      assignedBy: 'Project Manager',
      status: 'pending',
      priority: 'medium',
      createdAt: 'Jan 15, 2024',
      dueDate: 'Jan 25, 2024',
      summary: 'Client Feedback Call - TechCorp'
    },
    {
      id: '3',
      title: 'Add Advanced Search Filters',
      description: 'Implement advanced search functionality with filters for better user experience.',
      assignedTo: 'Charlie Developer',
      assignedBy: 'Project Manager',
      status: 'completed',
      priority: 'high',
      createdAt: 'Jan 14, 2024',
      dueDate: 'Jan 20, 2024',
      summary: 'Client Feedback Call - TechCorp'
    },
    {
      id: '4',
      title: 'Create CRM Integration Module',
      description: 'Develop a custom integration module for the StartupXYZ CRM system.',
      assignedTo: 'David Developer',
      assignedBy: 'Project Manager',
      status: 'pending',
      priority: 'urgent',
      createdAt: 'Jan 14, 2024',
      dueDate: 'Jan 18, 2024',
      summary: 'Sales Demo - StartupXYZ'
    },
    {
      id: '5',
      title: 'Enhance Export Options',
      description: 'Add PDF and Excel export functionality to the reporting module.',
      assignedTo: 'Eve Developer',
      assignedBy: 'Project Manager',
      status: 'in-progress',
      priority: 'medium',
      createdAt: 'Jan 13, 2024',
      dueDate: 'Jan 23, 2024',
      summary: 'Product Feedback - Enterprise Client'
    }
  ];

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filter === 'all' || task.status === filter;
    const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-yellow-100 text-yellow-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = (taskId: string, newStatus: Task['status']) => {
    // TODO: Update task status in Supabase
    console.log(`Updating task ${taskId} to status ${newStatus}`);
  };

  return (
    <Layout userRole={userRole} userName={userRole === 'pm' ? 'Project Manager' : 'Developer'}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Task Management</h1>
          <p className="text-gray-600">
            {userRole === 'pm' 
              ? 'Create and manage tasks for your development team.' 
              : 'View and update your assigned tasks.'
            }
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select 
                value={priorityFilter} 
                onChange={(e) => setPriorityFilter(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {userRole === 'pm' && (
              <div className="ml-auto">
                <Button onClick={() => setShowCreateModal(true)}>
                  + Create Task
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Task List */}
        <div className="grid gap-6">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{task.description}</p>
                  
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>Assigned to: {task.assignedTo}</span>
                    <span>Due: {task.dueDate}</span>
                    <span>From: {task.summary}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {userRole === 'dev' && task.status !== 'completed' && (
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusUpdate(task.id, e.target.value as Task['status'])}
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  )}
                  
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <Card title="Task Statistics" className="mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
              <div className="text-sm text-gray-600">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{tasks.filter(t => t.status === 'pending').length}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{tasks.filter(t => t.status === 'in-progress').length}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{tasks.filter(t => t.status === 'completed').length}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
} 