# BridgeSync AI 🚀

AI-powered workflow management platform that transforms client calls into actionable insights and tasks.

## 🎯 Project Overview

BridgeSync AI is a comprehensive platform that bridges the gap between sales calls and development tasks. It uses AI to transcribe client calls, generate actionable summaries, and create tasks for development teams.

### Key Features

- **🎤 Audio Upload**: Sales team uploads client call recordings
- **🤖 AI Transcription**: AssemblyAI converts audio to accurate text
- **📊 AI Summaries**: OpenAI generates actionable insights and key points
- **✅ Task Management**: PMs create and assign tasks to developers
- **👥 Role-Based Access**: Different interfaces for Sales, PM, and Dev teams
- **📈 Analytics Dashboard**: Track progress and productivity

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, DaisyUI
- **Backend**: Supabase (Database, Auth, Storage)
- **AI Services**: AssemblyAI (Transcription), OpenAI (Summaries)
- **UI/UX**: React Hot Toast, Responsive Design

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- AssemblyAI account
- OpenAI account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bridgesync-ai.git
   cd bridgesync-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # AssemblyAI Configuration
   ASSEMBLYAI_API_KEY=your_assemblyai_api_key

   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key

   # Next.js Configuration
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Project Structure

```
bridgesync-ai/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── dashboard/         # Dashboard page
│   │   ├── summaries/         # AI summaries page
│   │   ├── tasks/            # Task management page
│   │   ├── upload/           # Audio upload page
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Homepage
│   ├── components/           # Reusable components
│   │   ├── ui/              # UI components (Button, Card, etc.)
│   │   ├── Layout.tsx       # Main layout component
│   │   └── Navigation.tsx   # Navigation component
│   ├── lib/                 # Utility libraries
│   │   └── supabase.ts      # Supabase client configuration
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── public/                  # Static assets
└── package.json            # Dependencies and scripts
```

## 🎭 User Roles

### Sales Team
- Upload client call recordings
- Track upload history and processing status
- View completed summaries

### Project Managers
- Review AI-generated summaries
- Create tasks from action points
- Assign tasks to development team
- Monitor project progress

### Developers
- View assigned tasks
- Update task status (pending, in-progress, completed)
- Track personal productivity

## 🔄 Workflow

1. **Sales Upload**: Sales team uploads audio file via `/upload`
2. **AI Processing**: 
   - File stored in Supabase Storage
   - AssemblyAI transcribes audio to text
   - OpenAI generates summary and action points
3. **PM Review**: PM reviews summaries at `/summaries`
4. **Task Creation**: PM creates tasks from action points
5. **Dev Work**: Developers view and update tasks at `/tasks`

## 🗄️ Database Schema

### Tables

- **users**: User accounts with roles (sales, pm, dev)
- **audio_uploads**: Uploaded audio files and metadata
- **summaries**: AI-generated summaries and action points
- **tasks**: Task management with assignments and status

## 🎨 UI Components

### Built with DaisyUI
- Responsive navigation with role-based menus
- Card layouts for content organization
- Form components for data input
- Toast notifications for user feedback
- Stats cards for analytics display

### Custom Components
- `Layout`: Main layout wrapper with navigation
- `Navigation`: Role-based navigation menu
- `Card`: Reusable content cards
- `Button`: Customizable button component

## 🚧 Development Status

### ✅ Completed (Phase 1-2)
- [x] Next.js 14 project setup with TypeScript
- [x] Supabase, DaisyUI, React Hot Toast integration
- [x] Basic project structure and components
- [x] Role-based navigation system
- [x] Homepage with role-based content
- [x] Upload page for Sales team
- [x] Summaries page for PMs
- [x] Tasks page for PMs and Devs
- [x] Dashboard with role-based views

### 🔄 In Progress (Phase 3)
- [ ] Supabase database setup
- [ ] Authentication system
- [ ] API integration

### 📋 Planned (Phase 4-6)
- [ ] AssemblyAI integration
- [ ] OpenAI integration
- [ ] File upload to Supabase Storage
- [ ] Real-time processing workflow
- [ ] Advanced analytics and charts
- [ ] Deployment to Vercel

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [DaisyUI](https://daisyui.com/) for the beautiful UI components
- [AssemblyAI](https://www.assemblyai.com/) for speech-to-text
- [OpenAI](https://openai.com/) for AI-powered summaries

---

**Built with ❤️ for better team collaboration**
