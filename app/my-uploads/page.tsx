'use client';

import {useState, useEffect} from 'react';
import {supabase} from '@/lib/supabase';
import Link from 'next/link';

type Upload = {
    id: string;
    file_path: string;
    timestamp: string;
}

export default function MyUploadsPage() {

    type UploadWithURL = Upload & {signed_url:string};

    const [uploads, setUploads] = useState<UploadWithURL[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUploads = async () => {
            const {data : {user}, error: userError} = await supabase.auth.getUser();

            if(userError || !user) {
                alert('You must be logged in!');
                return;
            }

            const {data, error} = await supabase.from('audio_uploads').select('*').eq('user_id', user.id).order('timestamp', {ascending: false});

            if(error){
                alert('Failed to fetch uploads: ${error.message}');
                return;
            }

            if(!data){
                alert('No Uploads Found');
                return;
            }

            const uploadWithURLS: UploadWithURL[] = await Promise.all(
                data.map(async (upload: Upload) => {
                    // Correct usage: get the bucket and then call createSignedUrl
                    const { data: signedUrlData, error: signedUrlError } = await supabase
                        .storage
                        .from('audio-files')
                        .createSignedUrl(upload.file_path, 60 * 60);

                    return {
                        ...upload,
                        signed_url: signedUrlData?.signedUrl || "",
                    };
                })
            );

            setUploads(uploadWithURLS);
            setLoading(false);

        };

        fetchUploads();
    }, []);

    return(
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">🎧 Your Audio Uploads</h1>

        <Link href="/upload">
            <p className="text-blue-600 hover:underline mb-6">← Back to Upload</p>
        </Link>

        {loading ? (
            <p>Loading uploads...</p>
        ) : uploads.length === 0 ? (
            <p>No uploads yet.</p>
        ) : (
            <ul className="space-y-4">
            {uploads.map((item) => (
                <li
                key={item.id}
                className="p-4 border rounded shadow-sm bg-gray-50"
                >
                <p className="font-semibold text-blue-700">
                    {decodeURIComponent(item.signed_url.split('/').pop()?.split('?')[0] || 'Unknown File')}
                </p>
                <p className="text-sm text-gray-500">
                    Uploaded: {new Date(item.timestamp).toLocaleString()}
                </p>
                <audio controls className="mt-2 w-full">
                    <source src={item.signed_url} />
                </audio>
                </li>
            ))}
            </ul>
        )}
        </div>
    )
}