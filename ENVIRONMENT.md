# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# AssemblyAI Configuration
ASSEMBLYAI_API_KEY=your_assemblyai_api_key_here

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## How to get these API keys:

### Supabase:
1. Go to https://supabase.com
2. Create a new project
3. Go to Settings > API
4. Copy the URL and anon key

### AssemblyAI:
1. Go to https://www.assemblyai.com/
2. Sign up for an account
3. Get your API key from the dashboard

### OpenAI:
1. Go to https://platform.openai.com/
2. Create an account
3. Get your API key from the API keys section 