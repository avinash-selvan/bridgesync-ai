'use client';

import { useState, useRef } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('audio/')) {
        alert('Please select an audio file');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setUploadStatus('uploading');
    setUploadProgress(0);

    // 1. Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      alert('User not logged in');
      setIsUploading(false);
      setUploadStatus('error');
      return;
    }

    // 2. Create file path: user_id/filename
    const filePath = `${user.id}/${selectedFile.name}`;

    // 3. Upload to storage bucket (private bucket recommended)
    const { error: uploadError } = await supabase.storage
      .from('audio-files')
      .upload(filePath, selectedFile);
    if (uploadError) {
      alert('Upload failed: ' + uploadError.message);
      setIsUploading(false);
      setUploadStatus('error');
      return;
    }

    // 4. Insert row in audio_uploads table (store file_path, not public URL)
    const { error: insertError } = await supabase.from('audio_uploads').insert([
      {
        user_id: user.id,
        file_path: filePath,
        filename: selectedFile.name,
        status: 'processing',
      },
    ]);
    if (insertError) {
      alert('Insert failed: ' + insertError.message);
      setIsUploading(false);
      setUploadStatus('error');
      return;
    }

    alert('Upload successful!');
    setSelectedFile(null);
    setIsUploading(false);
    setUploadStatus('completed');
    setUploadProgress(100);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const getStatusMessage = () => {
    switch (uploadStatus) {
      case 'uploading':
        return 'Uploading your audio file...';
      case 'processing':
        return 'Processing with AI...';
      case 'completed':
        return 'Upload completed! Your file is being processed.';
      case 'error':
        return 'Upload failed. Please try again.';
      default:
        return 'Select an audio file to upload';
    }
  };

  return (
    <Layout userRole="sales" userName="John Doe">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Audio File</h1>
          <p className="text-base-content/70">
            Upload your client call recordings and let AI transform them into actionable insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Area */}
          <Card title="Upload Audio" subtitle="Drag and drop or click to select">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                selectedFile ? 'border-primary bg-primary/5' : 'border-base-300 hover:border-primary'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-6xl mb-4">🎤</div>
              <p className="text-lg font-semibold mb-2">
                {selectedFile ? selectedFile.name : 'Drop audio file here'}
              </p>
              <p className="text-base-content/70 mb-4">
                {selectedFile 
                  ? `File size: ${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                  : 'or click to browse'
                }
              </p>
              
              {uploadStatus === 'uploading' && (
                <div className="w-full bg-base-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}

              <p className="text-sm text-base-content/70">{getStatusMessage()}</p>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            <div className="flex gap-4 mt-6">
              <Button
                onClick={handleUpload}
                loading={isUploading}
                disabled={!selectedFile || isUploading}
                className="flex-1"
              >
                {uploadStatus === 'completed' ? 'Upload Complete' : 'Upload & Process'}
              </Button>
              
              {selectedFile && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSelectedFile(null);
                    setUploadStatus('idle');
                    setUploadProgress(0);
                  }}
                  disabled={isUploading}
                >
                  Clear
                </Button>
              )}
            </div>
          </Card>

          {/* Instructions */}
          <Card title="How it works" subtitle="Your audio file goes through this process">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Upload Audio</h4>
                  <p className="text-sm text-base-content/70">
                    Upload your client call recording (MP3, WAV, M4A supported)
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-secondary text-secondary-content rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">AI Transcription</h4>
                  <p className="text-sm text-base-content/70">
                    AssemblyAI converts your audio to accurate text
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-accent text-accent-content rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">AI Summary</h4>
                  <p className="text-sm text-base-content/70">
                    OpenAI creates actionable insights and key points
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-success text-success-content rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold">Task Creation</h4>
                  <p className="text-sm text-base-content/70">
                    PMs can create tasks from the generated insights
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Uploads */}
        <Card title="Recent Uploads" className="mt-8">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Upload Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>client_call_2024_01_15.mp3</td>
                  <td>Jan 15, 2024</td>
                  <td>
                    <span className="badge badge-success">Completed</span>
                  </td>
                  <td>
                    <Button variant="ghost" size="sm">View Summary</Button>
                  </td>
                </tr>
                <tr>
                  <td>sales_demo_2024_01_14.mp3</td>
                  <td>Jan 14, 2024</td>
                  <td>
                    <span className="badge badge-warning">Processing</span>
                  </td>
                  <td>
                    <Button variant="ghost" size="sm" disabled>View Summary</Button>
                  </td>
                </tr>
                <tr>
                  <td>client_feedback_2024_01_13.mp3</td>
                  <td>Jan 13, 2024</td>
                  <td>
                    <span className="badge badge-success">Completed</span>
                  </td>
                  <td>
                    <Button variant="ghost" size="sm">View Summary</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
} 