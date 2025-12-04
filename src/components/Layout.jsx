import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  FolderKanban,
  FileSignature,
  Lightbulb,
  CreditCard,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Sun,
  Moon,
  Sparkles,
  Plus,
  Command
} from 'lucide-react'
import './Layout.css'

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard', shortcut: '⌘1' },
  { path: '/projects', icon: FolderKanban, label: 'Projects', shortcut: '⌘2' },
  { path: '/documents', icon: FileSignature, label: 'Documents', shortcut: '⌘3' },
  { path: '/ideas', icon: Lightbulb, label: 'Ideas', shortcut: '⌘4' },
  { path: '/payments', icon: CreditCard, label: 'Payments', shortcut: '⌘5' },
  { path: '/clients', icon: Users, label: 'Clients', shortcut: '⌘6' },
]

const secondaryNav = [
  { path: '/settings', icon: Settings, label: 'Settings' },
]

function Layout({ children, theme, toggleTheme }) {
  const [collapsed, setCollapsed] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  const pageTitle = navItems.find(item => item.path === location.pathname)?.label 
    || secondaryNav.find(item => item.path === location.pathname)?.label 
    || 'DevHub'

  return (
    <div className={`layout ${collapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <Sparkles size={20} />
            </div>
            {!collapsed && (
              <motion.span 
                className="logo-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                DevHub
              </motion.span>
            )}
          </div>
          <button 
            className="collapse-btn btn-icon"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Quick Actions */}
        {!collapsed && (
          <motion.div 
            className="quick-actions"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button className="quick-action-btn" onClick={() => setSearchOpen(true)}>
              <Search size={14} />
              <span>Quick Search</span>
              <kbd><Command size={10} />K</kbd>
            </button>
          </motion.div>
        )}

        {/* Main Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            {!collapsed && <span className="nav-section-title">Workspace</span>}
            <ul className="nav-list">
              {navItems.map((item, index) => (
                <li key={item.path}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <item.icon size={18} className="nav-icon" />
                    {!collapsed && (
                      <>
                        <span className="nav-label">{item.label}</span>
                        <span className="nav-shortcut">{item.shortcut}</span>
                      </>
                    )}
                    {collapsed && (
                      <div className="nav-tooltip">{item.label}</div>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Favorites Section */}
          {!collapsed && (
            <div className="nav-section">
              <span className="nav-section-title">Favorites</span>
              <ul className="nav-list favorites-list">
                <li className="favorite-item">
                  <span className="favorite-dot" style={{ background: '#f87171' }}></span>
                  <span>Brand Redesign</span>
                </li>
                <li className="favorite-item">
                  <span className="favorite-dot" style={{ background: '#34d399' }}></span>
                  <span>Client Portal MVP</span>
                </li>
                <li className="favorite-item">
                  <span className="favorite-dot" style={{ background: '#60a5fa' }}></span>
                  <span>Q4 Invoices</span>
                </li>
              </ul>
            </div>
          )}

          {/* Secondary Nav */}
          <div className="nav-section nav-section-bottom">
            <ul className="nav-list">
              {secondaryNav.map((item) => (
                <li key={item.path}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  >
                    <item.icon size={18} className="nav-icon" />
                    {!collapsed && <span className="nav-label">{item.label}</span>}
                    {collapsed && (
                      <div className="nav-tooltip">{item.label}</div>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* User Section */}
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica" alt="User" />
            </div>
            {!collapsed && (
              <div className="user-info">
                <span className="user-name">Jessica</span>
                <span className="user-role">Developer</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <h1 className="page-title">{pageTitle}</h1>
          </div>
          <div className="header-right">
            <button className="btn btn-ghost btn-icon" onClick={() => setSearchOpen(true)}>
              <Search size={18} />
            </button>
            <button className="btn btn-ghost btn-icon notification-btn">
              <Bell size={18} />
              <span className="notification-dot"></span>
            </button>
            <button className="btn btn-ghost btn-icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="btn btn-primary">
              <Plus size={16} />
              <span>New</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-content">
          <div className="page-background"></div>
          {children}
        </div>
      </main>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            className="search-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.div 
              className="search-modal"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="search-input-wrapper">
                <Search size={20} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search projects, documents, clients..."
                  autoFocus
                  className="search-input"
                />
                <kbd className="search-kbd">ESC</kbd>
              </div>
              <div className="search-results">
                <div className="search-section">
                  <span className="search-section-title">Recent</span>
                  <div className="search-items">
                    <div className="search-item">
                      <FolderKanban size={16} />
                      <span>E-commerce Platform Redesign</span>
                      <span className="search-item-type">Project</span>
                    </div>
                    <div className="search-item">
                      <FileSignature size={16} />
                      <span>Service Agreement - TechCorp</span>
                      <span className="search-item-type">Document</span>
                    </div>
                    <div className="search-item">
                      <Users size={16} />
                      <span>Sarah Miller</span>
                      <span className="search-item-type">Client</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Layout

