// src/app/page.tsx
'use client';

import {useState} from 'react';


export default function HomePage() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count+1);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-600 text-center">
        Counter example
      </h1>
      <p className='text-center text-2xl font-bold text-gray-700'>
        Count: {count}
      </p>
      <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 rounded-md">
        Click me
      </button>      
    </div>
  );
}