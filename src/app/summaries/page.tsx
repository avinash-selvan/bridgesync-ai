'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Summary {
  id: string;
  title: string;
  audioFile: string;
  uploadedBy: string;
  uploadDate: string;
  summary: string;
  actionPoints: string[];
  status: 'completed' | 'processing' | 'error';
}

export default function SummariesPage() {
  const [selectedSummary, setSelectedSummary] = useState<Summary | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'processing'>('all');

  // Mock data - this will come from Supabase
  const summaries: Summary[] = [
    {
      id: '1',
      title: 'Client Feedback Call - TechCorp',
      audioFile: 'client_call_2024_01_15.mp3',
      uploadedBy: 'John Doe (Sales)',
      uploadDate: 'Jan 15, 2024',
      summary: 'The client expressed concerns about the current user interface and requested several new features including dark mode, mobile responsiveness, and improved search functionality. They also mentioned performance issues with the current dashboard.',
      actionPoints: [
        'Implement dark mode toggle',
        'Optimize mobile responsiveness',
        'Add advanced search filters',
        'Improve dashboard performance',
        'Add user preference settings'
      ],
      status: 'completed'
    },
    {
      id: '2',
      title: 'Sales Demo - StartupXYZ',
      audioFile: 'sales_demo_2024_01_14.mp3',
      uploadedBy: 'Sarah Smith (Sales)',
      uploadDate: 'Jan 14, 2024',
      summary: 'Demonstrated the platform to a potential client who showed interest in the analytics features and automation capabilities. They requested a custom integration with their existing CRM system.',
      actionPoints: [
        'Create CRM integration module',
        'Develop custom analytics dashboard',
        'Build automation workflow templates',
        'Prepare pricing proposal',
        'Schedule follow-up meeting'
      ],
      status: 'completed'
    },
    {
      id: '3',
      title: 'Product Feedback - Enterprise Client',
      audioFile: 'product_feedback_2024_01_13.mp3',
      uploadedBy: 'Mike Johnson (Sales)',
      uploadDate: 'Jan 13, 2024',
      summary: 'Client provided detailed feedback on the new reporting module. They found it useful but suggested improvements to the export functionality and requested additional chart types.',
      actionPoints: [
        'Enhance export options (PDF, Excel)',
        'Add new chart types (heatmap, scatter)',
        'Improve report scheduling',
        'Add custom report builder',
        'Implement data filtering improvements'
      ],
      status: 'processing'
    }
  ];

  const filteredSummaries = summaries.filter(summary => {
    if (filter === 'all') return true;
    return summary.status === filter;
  });

  const handleCreateTask = (summary: Summary) => {
    // TODO: Implement task creation modal
    console.log('Creating task from summary:', summary);
  };

  return (
    <Layout userRole="pm" userName="Project Manager">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Summaries</h1>
          <p className="text-gray-600">
            Review AI-generated summaries from client calls and create actionable tasks for your development team.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="font-semibold">Filter by status:</span>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All ({summaries.length})
              </Button>
              <Button
                variant={filter === 'completed' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('completed')}
              >
                Completed ({summaries.filter(s => s.status === 'completed').length})
              </Button>
              <Button
                variant={filter === 'processing' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('processing')}
              >
                Processing ({summaries.filter(s => s.status === 'processing').length})
              </Button>
            </div>
          </div>
        </Card>

        {/* Summaries Grid */}
        <div className="grid gap-6">
          {filteredSummaries.map((summary) => (
            <Card key={summary.id} className="hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{summary.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      summary.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {summary.status}
                    </span>
                  </div>
                  
                  <div className="flex gap-4 text-sm text-gray-600 mb-3">
                    <span>📁 {summary.audioFile}</span>
                    <span>👤 {summary.uploadedBy}</span>
                    <span>📅 {summary.uploadDate}</span>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">{summary.summary}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Action Points:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {summary.actionPoints.map((point, index) => (
                        <li key={index} className="text-gray-700">{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button 
                    size="sm" 
                    onClick={() => handleCreateTask(summary)}
                    disabled={summary.status !== 'completed'}
                  >
                    Create Task
                  </Button>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredSummaries.length === 0 && (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">No summaries found</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'No summaries have been generated yet.'
                : `No ${filter} summaries found.`
              }
            </p>
          </Card>
        )}

        {/* Stats */}
        <Card title="Summary Statistics" className="mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{summaries.length}</div>
              <div className="text-sm text-gray-600">Total Summaries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{summaries.filter(s => s.status === 'completed').length}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{summaries.filter(s => s.status === 'processing').length}</div>
              <div className="text-sm text-gray-600">Processing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600">24</div>
              <div className="text-sm text-gray-600">Hours Saved</div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
} 