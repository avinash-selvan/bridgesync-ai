'use client'

import Link from 'next/link'

export default function SummariesPage() {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-black-600">📄 Meeting Summaries</h1>

      <Link href="/upload">
        <p className="text-blue-600 hover:underline mb-6">← Back to Upload</p>
      </Link>

      <div className="space-y-4">
        {/* 🧪 Dummy summary item */}
        <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Audio: <b>sales-call-01.mp3</b></p>
          <p className="text-gray-800 mb-2">
            <b>Summary:</b> The client is interested in our premium plan. They want a follow-up next Tuesday to finalize contract terms. Mentioned feature requests around team access and billing integrations.
          </p>
          <audio controls className="w-full mb-2">
            <source src="#" />
            Your browser does not support audio playback.
          </audio>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
            + Create Tasks
          </button>
        </div>

        {/* You can copy the above block to simulate multiple summaries */}
      </div>
    </div>
  )
}
