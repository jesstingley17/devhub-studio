import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect, lazy, Suspense } from 'react'
import Layout from './components/Layout'
import { ToastProvider, useToast } from './components/Toast'
import CommandPalette from './components/CommandPalette'
import { DashboardSkeleton, ProjectsSkeleton } from './components/Skeleton'
import { useUIStore } from './stores/useStore'

// Lazy load pages for code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Projects = lazy(() => import('./pages/Projects'))
const Documents = lazy(() => import('./pages/Documents'))
const Ideas = lazy(() => import('./pages/Ideas'))
const Payments = lazy(() => import('./pages/Payments'))
const Clients = lazy(() => import('./pages/Clients'))
const Settings = lazy(() => import('./pages/Settings'))

// Loading fallback component
function PageLoader({ type = 'default' }) {
  if (type === 'dashboard') return <DashboardSkeleton />
  if (type === 'projects') return <ProjectsSkeleton />
  return (
    <div className="page-loader">
      <div className="page-loader-spinner"></div>
    </div>
  )
}

function AppContent() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const { theme, toggleTheme } = useUIStore()
  const navigate = useNavigate()
  const toast = useToast()

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Command/Ctrl + K - Open command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(true)
      }
      
      // Command/Ctrl + Number - Navigate to pages
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case '1':
            e.preventDefault()
            navigate('/')
            break
          case '2':
            e.preventDefault()
            navigate('/projects')
            break
          case '3':
            e.preventDefault()
            navigate('/documents')
            break
          case '4':
            e.preventDefault()
            navigate('/ideas')
            break
          case '5':
            e.preventDefault()
            navigate('/payments')
            break
          case '6':
            e.preventDefault()
            navigate('/clients')
            break
        }
      }

      // Escape - Close command palette
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  // Handle actions from command palette
  const handleAction = (action) => {
    switch (action) {
      case 'new-project':
        navigate('/projects')
        toast.success('Create a new project')
        break
      case 'new-client':
        navigate('/clients')
        toast.success('Add a new client')
        break
      case 'new-invoice':
        navigate('/payments')
        toast.success('Create a new invoice')
        break
      case 'new-note':
        navigate('/ideas')
        toast.success('Create a new note')
        break
      default:
        break
    }
  }

  return (
    <div className={`app ${theme}`} data-theme={theme}>
      <Layout 
        theme={theme} 
        toggleTheme={toggleTheme}
        onSearchClick={() => setCommandPaletteOpen(true)}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<DashboardSkeleton />}>
                <Dashboard />
              </Suspense>
            } />
            <Route path="/projects" element={
              <Suspense fallback={<ProjectsSkeleton />}>
                <Projects />
              </Suspense>
            } />
            <Route path="/documents" element={<Documents />} />
            <Route path="/ideas" element={<Ideas />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </Layout>

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onAction={handleAction}
      />
    </div>
  )
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  )
}

export default App
