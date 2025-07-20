'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed' | 'error'>('idle');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setSelectedFile(file);
    } else {
      alert('Please select an audio file');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an audio file');
      return;
    }

    setIsUploading(true);
    setUploadStatus('uploading');
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadStatus('completed');
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    // Simulate processing
    setTimeout(() => {
      setUploadStatus('processing');
    }, 3000);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadStatus('idle');
  };

  const getStatusMessage = () => {
    switch (uploadStatus) {
      case 'uploading':
        return 'Uploading your audio file...';
      case 'processing':
        return 'Processing audio with AI...';
      case 'completed':
        return 'Upload completed successfully!';
      case 'error':
        return 'Upload failed. Please try again.';
      default:
        return 'Ready to upload';
    }
  };

  return (
    <Layout userRole="sales" userName="John Doe">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Audio</h1>
          <p className="text-gray-600">
            Upload your client call recordings and let AI transform them into actionable insights.
          </p>
        </div>

        <Card title="Upload Audio" subtitle="Drag and drop or click to select">
          <div className="space-y-6">
            {/* File Upload Area */}
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className={`cursor-pointer block ${
                  selectedFile ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
                }`}
              >
                <div className="space-y-4">
                  <div className="text-4xl">📁</div>
                  <div>
                    <p className="text-lg font-medium">
                      {selectedFile ? selectedFile.name : 'Click to select audio file'}
                    </p>
                    <p className="text-gray-600">
                      {selectedFile ? 'File selected successfully' : 'Supports MP3, WAV, M4A files'}
                    </p>
                  </div>
                </div>
              </label>
            </div>

            {/* Upload Progress */}
            {uploadStatus === 'uploading' && (
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{getStatusMessage()}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleUpload}
                loading={isUploading}
                disabled={!selectedFile || isUploading}
                className="flex-1"
              >
                {uploadStatus === 'completed' ? 'Upload Again' : 'Upload File'}
              </Button>
              <Button
                variant="ghost"
                onClick={handleReset}
                disabled={isUploading}
              >
                Reset
              </Button>
            </div>
          </div>
        </Card>

        <Card title="How it works" subtitle="Your audio file goes through this process" className="mt-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                1
              </div>
              <h3 className="font-semibold mb-1">Upload</h3>
              <p className="text-sm text-gray-600">
                Select your audio file and upload it securely
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                2
              </div>
              <h3 className="font-semibold mb-1">Process</h3>
              <p className="text-sm text-gray-600">
                AI transcribes and analyzes your audio content
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                3
              </div>
              <h3 className="font-semibold mb-1">Summarize</h3>
              <p className="text-sm text-gray-600">
                Generate key insights and action items
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                4
              </div>
              <h3 className="font-semibold mb-1">Deliver</h3>
              <p className="text-sm text-gray-600">
                Get your processed results in minutes
              </p>
            </div>
          </div>
        </Card>

        <Card title="Recent Uploads" className="mt-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <p className="font-medium">client_call_2024_01_15.mp3</p>
                  <p className="text-sm text-gray-600">Uploaded 2 hours ago</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-sm">⏳</span>
                </div>
                <div>
                  <p className="font-medium">sales_meeting_2024_01_14.mp3</p>
                  <p className="text-sm text-gray-600">Uploaded 4 hours ago</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Processing</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <p className="font-medium">demo_call_2024_01_13.mp3</p>
                  <p className="text-sm text-gray-600">Uploaded 1 day ago</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
} 