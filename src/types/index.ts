// User roles
export type UserRole = 'sales' | 'pm' | 'dev';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  created_at: string;
}

// Audio upload interface
export interface AudioUpload {
  id: string;
  user_id: string;
  file_url: string;
  filename: string;
  status: 'uploading' | 'transcribing' | 'completed' | 'error';
  created_at: string;
}

// Summary interface
export interface Summary {
  id: string;
  audio_id: string;
  summary_text: string;
  action_points: string[];
  created_at: string;
}

// Task interface
export interface Task {
  id: string;
  title: string;
  description: string;
  assigned_to: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
}

// API response types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// File upload response
export interface FileUploadResponse {
  url: string;
  filename: string;
} 