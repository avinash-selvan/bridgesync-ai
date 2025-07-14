'use client';

import {useState} from 'react';
import {supabase} from '@/lib/supabase';
import {useRouter} from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, serPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        const {error} = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if(error) {
            setError(error.message);
        } else{
            router.push('/upload');
        }
    }

    return(
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h1>Login</h1>
            {error && <p className="text-red-500">{error}</p>}

            <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />

            <input type="password" placeholder='password' value={password} onChange={(e) => serPassword(e.target.value)} />

            <button onClick={handleLogin}>Login</button>
        </div>
    )
}