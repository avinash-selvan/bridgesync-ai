'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // 1. Sign up user (email, password only)
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (signUpError || !data.user) {
      setError(signUpError?.message || 'Signup failed');
      setLoading(false);
      return;
    }
    setLoading(false);
    // 2. Redirect to complete-profile page
    router.push('/complete-profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="max-w-md w-full p-8 bg-white border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Sign Up</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Email</label>
            <input
              type="email"
              className="input input-bordered w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">Password</label>
            <input
              type="password"
              className="input input-bordered w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-600 text-sm font-semibold">{error}</div>}
          <Button type="submit" loading={loading} className="w-full">Sign Up</Button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-700">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline font-semibold">Sign In</a>
        </div>
      </Card>
    </div>
  );
} 