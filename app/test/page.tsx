'use client'

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('users_test').select('*');
      if (error) console.error(error);
      else setData(data);
    };

    fetchData()
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Test Supabase Connection</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
