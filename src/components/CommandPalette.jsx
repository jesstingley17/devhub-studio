import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Fuse from 'fuse.js'
import {
  Search,
  LayoutDashboard,
  FolderKanban,
  FileSignature,
  Lightbulb,
  CreditCard,
  Users,
  Settings,
  Plus,
  FileText,
  User,
  ArrowRight,
  Command,
  Hash
} from 'lucide-react'
import { useProjectStore, useClientStore, useNoteStore, useDocumentStore } from '../stores/useStore'
import './CommandPalette.css'

const navigationItems = [
  { id: 'nav-dashboard', type: 'navigation', name: 'Dashboard', icon: LayoutDashboard, path: '/', keywords: ['home', 'overview'] },
  { id: 'nav-projects', type: 'navigation', name: 'Projects', icon: FolderKanban, path: '/projects', keywords: ['work', 'tasks'] },
  { id: 'nav-documents', type: 'navigation', name: 'Documents', icon: FileSignature, path: '/documents', keywords: ['files', 'contracts', 'sign'] },
  { id: 'nav-ideas', type: 'navigation', name: 'Ideas', icon: Lightbulb, path: '/ideas', keywords: ['notes', 'thoughts'] },
  { id: 'nav-payments', type: 'navigation', name: 'Payments', icon: CreditCard, path: '/payments', keywords: ['invoices', 'money', 'billing'] },
  { id: 'nav-clients', type: 'navigation', name: 'Clients', icon: Users, path: '/clients', keywords: ['customers', 'contacts'] },
  { id: 'nav-settings', type: 'navigation', name: 'Settings', icon: Settings, path: '/settings', keywords: ['preferences', 'config'] },
]

const actionItems = [
  { id: 'action-new-project', type: 'action', name: 'Create New Project', icon: Plus, action: 'new-project', keywords: ['add'] },
  { id: 'action-new-client', type: 'action', name: 'Add New Client', icon: Plus, action: 'new-client', keywords: ['add'] },
  { id: 'action-new-invoice', type: 'action', name: 'Create Invoice', icon: Plus, action: 'new-invoice', keywords: ['add', 'bill'] },
  { id: 'action-new-note', type: 'action', name: 'Create New Note', icon: Plus, action: 'new-note', keywords: ['add', 'idea'] },
]

export default function CommandPalette({ isOpen, onClose, onAction }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()

  // Get data from stores
  const projects = useProjectStore(state => state.projects)
  const clients = useClientStore(state => state.clients)
  const notes = useNoteStore(state => state.notes)
  const documents = useDocumentStore(state => state.documents)

  // Build searchable items
  const allItems = useMemo(() => {
    const projectItems = projects.map(p => ({
      id: `project-${p.id}`,
      type: 'project',
      name: p.name,
      subtitle: p.client,
      icon: FolderKanban,
      path: '/projects',
      data: p,
      keywords: [...p.tags, p.client]
    }))

    const clientItems = clients.map(c => ({
      id: `client-${c.id}`,
      type: 'client',
      name: c.name,
      subtitle: c.contactName,
      icon: User,
      path: '/clients',
      data: c,
      keywords: c.tags
    }))

    const noteItems = notes.map(n => ({
      id: `note-${n.id}`,
      type: 'note',
      name: n.title,
      subtitle: n.tags.join(', '),
      icon: Lightbulb,
      path: '/ideas',
      data: n,
      keywords: n.tags
    }))

    const documentItems = documents.map(d => ({
      id: `doc-${d.id}`,
      type: 'document',
      name: d.name,
      subtitle: d.client,
      icon: FileText,
      path: '/documents',
      data: d,
      keywords: [d.type, d.client]
    }))

    return [
      ...navigationItems,
      ...actionItems,
      ...projectItems,
      ...clientItems,
      ...noteItems,
      ...documentItems
    ]
  }, [projects, clients, notes, documents])

  // Fuzzy search
  const fuse = useMemo(() => new Fuse(allItems, {
    keys: ['name', 'subtitle', 'keywords'],
    threshold: 0.4,
    includeScore: true
  }), [allItems])

  const results = useMemo(() => {
    if (!query.trim()) {
      // Show recent/suggested items when no query
      return [
        { title: 'Navigation', items: navigationItems },
        { title: 'Quick Actions', items: actionItems },
        { title: 'Recent Projects', items: allItems.filter(i => i.type === 'project').slice(0, 3) }
      ].filter(g => g.items.length > 0)
    }

    const searchResults = fuse.search(query).map(r => r.item)
    
    // Group results by type
    const grouped = {
      navigation: searchResults.filter(i => i.type === 'navigation'),
      action: searchResults.filter(i => i.type === 'action'),
      project: searchResults.filter(i => i.type === 'project'),
      client: searchResults.filter(i => i.type === 'client'),
      note: searchResults.filter(i => i.type === 'note'),
      document: searchResults.filter(i => i.type === 'document')
    }

    return [
      { title: 'Navigation', items: grouped.navigation },
      { title: 'Actions', items: grouped.action },
      { title: 'Projects', items: grouped.project },
      { title: 'Clients', items: grouped.client },
      { title: 'Notes', items: grouped.note },
      { title: 'Documents', items: grouped.document }
    ].filter(g => g.items.length > 0)
  }, [query, fuse, allItems])

  // Flatten results for keyboard navigation
  const flatResults = useMemo(() => 
    results.flatMap(group => group.items),
    [results]
  )

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(i => Math.min(i + 1, flatResults.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(i => Math.max(i - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (flatResults[selectedIndex]) {
            handleSelect(flatResults[selectedIndex])
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, flatResults, onClose])

  // Scroll selected item into view
  useEffect(() => {
    const selectedElement = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`)
    selectedElement?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  const handleSelect = (item) => {
    if (item.type === 'navigation') {
      navigate(item.path)
    } else if (item.type === 'action') {
      onAction?.(item.action)
    } else if (item.path) {
      navigate(item.path)
    }
    onClose()
  }

  const getTypeLabel = (type) => {
    const labels = {
      navigation: 'Page',
      action: 'Action',
      project: 'Project',
      client: 'Client',
      note: 'Note',
      document: 'Document'
    }
    return labels[type] || type
  }

  let itemIndex = -1

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="command-palette-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="command-palette"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="command-input-wrapper">
              <Search size={20} className="command-search-icon" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search projects, clients, notes, or type a command..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="command-input"
              />
              <div className="command-shortcuts">
                <kbd>↑↓</kbd>
                <span>navigate</span>
                <kbd>↵</kbd>
                <span>select</span>
                <kbd>esc</kbd>
                <span>close</span>
              </div>
            </div>

            {/* Results */}
            <div className="command-results" ref={listRef}>
              {results.length === 0 ? (
                <div className="command-empty">
                  <Search size={32} />
                  <p>No results found for "{query}"</p>
                </div>
              ) : (
                results.map((group) => (
                  <div key={group.title} className="command-group">
                    <div className="command-group-title">{group.title}</div>
                    {group.items.map((item) => {
                      itemIndex++
                      const Icon = item.icon
                      const isSelected = itemIndex === selectedIndex
                      const currentIndex = itemIndex
                      
                      return (
                        <div
                          key={item.id}
                          data-index={currentIndex}
                          className={`command-item ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setSelectedIndex(currentIndex)}
                        >
                          <Icon size={18} className="command-item-icon" />
                          <div className="command-item-content">
                            <span className="command-item-name">{item.name}</span>
                            {item.subtitle && (
                              <span className="command-item-subtitle">{item.subtitle}</span>
                            )}
                          </div>
                          <span className="command-item-type">{getTypeLabel(item.type)}</span>
                          {isSelected && <ArrowRight size={14} className="command-item-arrow" />}
                        </div>
                      )
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="command-footer">
              <div className="command-footer-hint">
                <Command size={12} />
                <span>K to open anytime</span>
              </div>
              <div className="command-footer-hint">
                <Hash size={12} />
                <span>Type # for tags</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

