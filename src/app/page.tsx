import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function HomePage() {
  // For now, we'll simulate different roles - later this will come from authentication
  const mockUserRole = 'sales'; // This will be dynamic based on user authentication
  const mockUserName = 'John Doe';

  const getRoleContent = (role: string) => {
    switch (role) {
      case 'sales':
        return {
          title: 'Welcome, Sales Team! 🎯',
          subtitle: 'Upload your client calls and let AI transform them into actionable insights.',
          features: [
            { icon: '📤', title: 'Upload Audio', description: 'Upload client call recordings' },
            { icon: '⏱️', title: 'Quick Processing', description: 'AI processes your files in minutes' },
            { icon: '📋', title: 'Track History', description: 'View all your uploads and summaries' }
          ],
          primaryAction: { href: '/upload', label: 'Upload Audio File' },
          secondaryAction: { href: '/history', label: 'View History' }
        };
      case 'pm':
        return {
          title: 'Welcome, Project Manager! 📊',
          subtitle: 'Review AI summaries and create tasks for your development team.',
          features: [
            { icon: '📊', title: 'AI Summaries', description: 'Review processed call summaries' },
            { icon: '✅', title: 'Task Management', description: 'Create and assign tasks to developers' },
            { icon: '📈', title: 'Dashboard', description: 'Monitor project progress and insights' }
          ],
          primaryAction: { href: '/summaries', label: 'View Summaries' },
          secondaryAction: { href: '/tasks', label: 'Manage Tasks' }
        };
      case 'dev':
        return {
          title: 'Welcome, Developer! 💻',
          subtitle: 'View your assigned tasks and track your progress.',
          features: [
            { icon: '✅', title: 'My Tasks', description: 'View tasks assigned to you' },
            { icon: '🔄', title: 'Update Status', description: 'Mark tasks as in-progress or completed' },
            { icon: '📈', title: 'Dashboard', description: 'Track your productivity and progress' }
          ],
          primaryAction: { href: '/tasks', label: 'View My Tasks' },
          secondaryAction: { href: '/dashboard', label: 'View Dashboard' }
        };
      default:
        return {
          title: 'Welcome to BridgeSync AI! 🚀',
          subtitle: 'AI-powered workflow management for your team.',
          features: [
            { icon: '🎯', title: 'Smart Processing', description: 'AI transforms audio into insights' },
            { icon: '👥', title: 'Team Collaboration', description: 'Seamless workflow between roles' },
            { icon: '📊', title: 'Analytics', description: 'Track progress and productivity' }
          ],
          primaryAction: { href: '/upload', label: 'Get Started' },
          secondaryAction: { href: '/dashboard', label: 'View Dashboard' }
        };
    }
  };

  const content = getRoleContent(mockUserRole);

  return (
    <Layout userRole={mockUserRole as any} userName={mockUserName}>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{content.subtitle}</p>
          
          <div className="flex gap-4 justify-center mb-8">
            <Link href={content.primaryAction.href}>
              <Button size="lg" className="btn-primary">
                {content.primaryAction.label}
              </Button>
            </Link>
            <Link href={content.secondaryAction.href}>
              <Button variant="secondary" size="lg">
                {content.secondaryAction.label}
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {content.features.map((feature, index) => (
            <Card key={index} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <Card title="Quick Stats" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2,847</div>
              <div className="text-sm text-gray-600">Files Processed</div>
              <div className="text-xs text-green-600">↗︎ 400 (22%)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">1,234</div>
              <div className="text-sm text-gray-600">Tasks Created</div>
              <div className="text-xs text-green-600">↗︎ 90 (14%)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600">98%</div>
              <div className="text-sm text-gray-600">Completion Rate</div>
              <div className="text-xs text-green-600">↗︎ 2% (1%)</div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card title="Recent Activity">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">JD</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold">New audio file uploaded</p>
                <p className="text-sm text-gray-600">client_call_2024_01_15.mp3</p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">PM</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Task assigned to development team</p>
                <p className="text-sm text-gray-600">Implement new feature based on client feedback</p>
              </div>
              <span className="text-sm text-gray-500">4 hours ago</span>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
              <div className="w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">DEV</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Task completed</p>
                <p className="text-sm text-gray-600">Bug fix for user authentication</p>
              </div>
              <span className="text-sm text-gray-500">6 hours ago</span>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
