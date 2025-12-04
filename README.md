# DevHub Studio

A beautiful, Notion-inspired organizational workspace for web developers to collaborate with clients, manage projects, sign documents, share ideas, and process payments.

![DevHub Studio](https://api.dicebear.com/7.x/shapes/svg?seed=DevHub)

## ✨ Features

- **Dashboard** - Overview of projects, tasks, revenue, and recent activity
- **Projects** - Kanban-style project management with client collaboration
- **Documents** - Document management with e-signature capabilities
- **Ideas** - Notion-style note-taking with blocks, checklists, and formatting
- **Payments** - Invoice generation, tracking, and payment processing
- **Clients** - Client relationship management with contact details and history
- **Settings** - Customizable preferences, integrations, and security

## 🎨 Design Features

- **Dark/Light Mode** - Beautiful themes with smooth transitions
- **Notion-Inspired UI** - Clean, minimal interface with sidebar navigation
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Framer Motion powered transitions
- **Custom Typography** - Crimson Pro (display), DM Sans (body), JetBrains Mono (code)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **date-fns** - Date utilities

## 📁 Project Structure

```
src/
├── components/
│   └── Layout.jsx          # Main layout with sidebar
├── pages/
│   ├── Dashboard.jsx       # Dashboard overview
│   ├── Projects.jsx        # Project management
│   ├── Documents.jsx       # Document signing
│   ├── Ideas.jsx           # Notes & ideas
│   ├── Payments.jsx        # Invoicing
│   ├── Clients.jsx         # Client management
│   └── Settings.jsx        # App settings
├── styles/
│   └── index.css           # Global styles & design system
├── App.jsx                 # Root component
└── main.jsx                # Entry point
```

## 🎯 Roadmap

- [ ] Real-time collaboration
- [ ] File uploads & storage
- [ ] Email notifications
- [ ] Stripe payment integration
- [ ] DocuSign integration
- [ ] Calendar sync
- [ ] Mobile app

## 📄 License

MIT License - feel free to use this for your own projects!

---

Built with ❤️ by DevHub Studio

