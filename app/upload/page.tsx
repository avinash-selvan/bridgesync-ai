'use client';

import {useState} from 'react';
import {supabase} from '@/lib/supabase'

export default function UploadPage() {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?. [0];

        if(file) {
            setSelectedFile(file);
        }
    }

    const handleUpload = async () => {
        if(!selectedFile) return;

        setUploading(true);

        // 1. Get Current User
        const {data: {user}, error: userError} = await supabase.auth.getUser();

        if (userError || !user) {
            alert('User Not Logged In');
            setUploading(false);
            return;
        }

        // 2. Create a path for the audio file
        const filePath = `${user.id}/${selectedFile.name}`;

        console.log("Selected File →", selectedFile);
        console.log("Type:", selectedFile?.type);
        console.log("Size (bytes):", selectedFile?.size);

        // 3. Upload to storage Bucket
        const {error: uploadError} = await supabase.storage.from('audio-files').upload(filePath, selectedFile, {upsert: true,});

        if(uploadError) {
            alert(`Upload Failed: ${uploadError.message}`);
            setUploading(false);
            return;
        }

        // 4. Get the URL of the uploaded file
        const { data: signedUrlData, error: signedUrlError } = await supabase.storage.from('audio-files').createSignedUrl(filePath, 60 * 60); // valid for 1 hour

        const signedUrl = signedUrlData?.signedUrl;

        if(signedUrlError) {
            alert(`Failed to get signed URL: ${signedUrlError.message}`);
            setUploading(false);
            return;
        }

        // 5. Insert row in audio_uploads table
        await supabase.from('audio_uploads').insert([
            {
              user_id: user.id,
              file_path: filePath, // we will rename column to file_path
            },
          ])

        alert('File uploaded successfully!');
        alert(`File URL: ${signedUrl}`);
        setSelectedFile(null);
        setUploading(false);

    }
    return(
        <div className = 'max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md'>
            <h1 className='text-2xl font-bold text-black mb=4'>Upload Your Sales Call Audio Here</h1>
            <div className='mb-4 flex flex-col items-center'>
                <input type="file" accept="audio/*" onChange={handleFileChange} className='mb-4' placeholder='Upload your audio file here'/>
                {selectedFile &&  (<p className='text-sm text-gray-500 mb-4'>Selected File: {selectedFile.name}</p>)}
                <button onClick={handleUpload} disabled={uploading} className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
                <a href="/my-uploads" className='mt-4 inline-block text-blue-600 hover:underline'>➡️ Your Uploads</a>
            </div>
        </div>
    );
}