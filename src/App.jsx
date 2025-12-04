import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Documents from './pages/Documents'
import Ideas from './pages/Ideas'
import Payments from './pages/Payments'
import Clients from './pages/Clients'
import Settings from './pages/Settings'

function App() {
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className={`app ${theme}`} data-theme={theme}>
      <Layout theme={theme} toggleTheme={toggleTheme}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App

