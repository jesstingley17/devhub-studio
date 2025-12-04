import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
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
import { useUIStore } from '../stores/useStore'
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

function Layout({ children, theme, toggleTheme, onSearchClick }) {
  const { sidebarCollapsed, toggleSidebar } = useUIStore()
  const location = useLocation()

  const pageTitle = navItems.find(item => item.path === location.pathname)?.label 
    || secondaryNav.find(item => item.path === location.pathname)?.label 
    || 'DevHub'

  return (
    <div className={`layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <Sparkles size={20} />
            </div>
            {!sidebarCollapsed && (
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
            onClick={toggleSidebar}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Quick Actions */}
        {!sidebarCollapsed && (
          <motion.div 
            className="quick-actions"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button className="quick-action-btn" onClick={onSearchClick}>
              <Search size={14} />
              <span>Quick Search</span>
              <kbd><Command size={10} />K</kbd>
            </button>
          </motion.div>
        )}

        {/* Main Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            {!sidebarCollapsed && <span className="nav-section-title">Workspace</span>}
            <ul className="nav-list">
              {navItems.map((item, index) => (
                <li key={item.path}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <item.icon size={18} className="nav-icon" />
                    {!sidebarCollapsed && (
                      <>
                        <span className="nav-label">{item.label}</span>
                        <span className="nav-shortcut">{item.shortcut}</span>
                      </>
                    )}
                    {sidebarCollapsed && (
                      <div className="nav-tooltip">{item.label}</div>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Favorites Section */}
          {!sidebarCollapsed && (
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
                    {!sidebarCollapsed && <span className="nav-label">{item.label}</span>}
                    {sidebarCollapsed && (
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
            {!sidebarCollapsed && (
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
            <button className="btn btn-ghost btn-icon" onClick={onSearchClick}>
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
    </div>
  )
}

export default Layout
