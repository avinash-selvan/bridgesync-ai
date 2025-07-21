'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const ROLES = [
  { value: 'sales', label: 'Sales' },
  { value: 'pm', label: 'Project Manager' },
  { value: 'dev', label: 'Developer' },
];

export default function CompleteProfilePage() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('sales');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      }
    };
    checkAuth();
  }, [router]);

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }
    // Upsert profile
    const { error: upsertError } = await supabase.from('profiles').upsert([
      {
        id: user.id,
        name,
        email: user.email,
        role,
      },
    ]);
    if (upsertError) {
      setError(upsertError.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="max-w-md w-full p-8 bg-white border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Complete Your Profile</h1>
        <form onSubmit={handleCompleteProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Name</label>
            <input
              type="text"
              className="input input-bordered w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Role</label>
            <select
              className="input input-bordered w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={role}
              onChange={e => setRole(e.target.value)}
              required
            >
              {ROLES.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
          {error && <div className="text-red-600 text-sm font-semibold">{error}</div>}
          <Button type="submit" loading={loading} className="w-full">Save Profile</Button>
        </form>
      </Card>
    </div>
  );
} 