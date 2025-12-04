import { useState } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import {
  Plus,
  Search,
  MoreHorizontal,
  Star,
  StarOff,
  Trash2,
  Copy,
  Share2,
  GripVertical,
  Type,
  Heading1,
  Heading2,
  List,
  ListChecks,
  Quote,
  Code,
  Image,
  Link2,
  Sparkles,
  Calendar,
  Clock,
  Tag,
  ChevronRight,
  X
} from 'lucide-react'
import './Ideas.css'

const initialNotes = [
  {
    id: 1,
    title: 'Project Architecture Ideas',
    emoji: '🏗️',
    starred: true,
    color: '#6366f1',
    createdAt: '2024-12-01',
    updatedAt: '2024-12-03',
    tags: ['development', 'architecture'],
    blocks: [
      { id: 'b1', type: 'heading1', content: 'Microservices Architecture' },
      { id: 'b2', type: 'text', content: 'Consider breaking down the monolith into smaller, manageable services.' },
      { id: 'b3', type: 'checklist', content: 'API Gateway setup', checked: true },
      { id: 'b4', type: 'checklist', content: 'Service mesh implementation', checked: false },
      { id: 'b5', type: 'checklist', content: 'Database per service pattern', checked: false },
      { id: 'b6', type: 'quote', content: 'Start with a modular monolith, evolve to microservices when needed.' }
    ]
  },
  {
    id: 2,
    title: 'Client Meeting Notes - TechCorp',
    emoji: '📝',
    starred: false,
    color: '#10b981',
    createdAt: '2024-12-02',
    updatedAt: '2024-12-02',
    tags: ['meeting', 'client'],
    blocks: [
      { id: 'b1', type: 'heading1', content: 'Meeting Summary' },
      { id: 'b2', type: 'text', content: 'Discussed the new e-commerce platform requirements. Client wants a modern, fast, and scalable solution.' },
      { id: 'b3', type: 'heading2', content: 'Key Requirements' },
      { id: 'b4', type: 'list', content: 'Real-time inventory management' },
      { id: 'b5', type: 'list', content: 'Multi-currency support' },
      { id: 'b6', type: 'list', content: 'Mobile-first approach' }
    ]
  },
  {
    id: 3,
    title: 'Design System Components',
    emoji: '🎨',
    starred: true,
    color: '#f59e0b',
    createdAt: '2024-11-28',
    updatedAt: '2024-12-01',
    tags: ['design', 'components'],
    blocks: [
      { id: 'b1', type: 'heading1', content: 'Core Components' },
      { id: 'b2', type: 'checklist', content: 'Button variants', checked: true },
      { id: 'b3', type: 'checklist', content: 'Input fields', checked: true },
      { id: 'b4', type: 'checklist', content: 'Modal system', checked: true },
      { id: 'b5', type: 'checklist', content: 'Toast notifications', checked: false },
      { id: 'b6', type: 'checklist', content: 'Data tables', checked: false },
      { id: 'b7', type: 'code', content: 'const Button = ({ variant = "primary" }) => ...' }
    ]
  },
  {
    id: 4,
    title: 'Q1 2025 Goals',
    emoji: '🎯',
    starred: false,
    color: '#ec4899',
    createdAt: '2024-11-20',
    updatedAt: '2024-11-25',
    tags: ['planning', 'goals'],
    blocks: [
      { id: 'b1', type: 'heading1', content: 'Business Goals' },
      { id: 'b2', type: 'checklist', content: 'Reach $50k monthly revenue', checked: false },
      { id: 'b3', type: 'checklist', content: 'Onboard 5 new clients', checked: false },
      { id: 'b4', type: 'checklist', content: 'Launch portfolio redesign', checked: false },
      { id: 'b5', type: 'heading1', content: 'Personal Goals' },
      { id: 'b6', type: 'checklist', content: 'Learn Rust basics', checked: false },
      { id: 'b7', type: 'checklist', content: 'Contribute to open source', checked: false }
    ]
  }
]

const blockTypes = [
  { type: 'text', icon: Type, label: 'Text' },
  { type: 'heading1', icon: Heading1, label: 'Heading 1' },
  { type: 'heading2', icon: Heading2, label: 'Heading 2' },
  { type: 'list', icon: List, label: 'Bullet List' },
  { type: 'checklist', icon: ListChecks, label: 'Checklist' },
  { type: 'quote', icon: Quote, label: 'Quote' },
  { type: 'code', icon: Code, label: 'Code' },
]

function Ideas() {
  const [notes, setNotes] = useState(initialNotes)
  const [selectedNote, setSelectedNote] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showBlockMenu, setShowBlockMenu] = useState(false)

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const starredNotes = filteredNotes.filter(n => n.starred)
  const recentNotes = filteredNotes.filter(n => !n.starred)

  const toggleStar = (noteId) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId ? { ...note, starred: !note.starred } : note
    ))
  }

  const toggleCheck = (noteId, blockId) => {
    setNotes(prev => prev.map(note => {
      if (note.id === noteId) {
        return {
          ...note,
          blocks: note.blocks.map(block =>
            block.id === blockId ? { ...block, checked: !block.checked } : block
          )
        }
      }
      return note
    }))
    if (selectedNote?.id === noteId) {
      setSelectedNote(prev => ({
        ...prev,
        blocks: prev.blocks.map(block =>
          block.id === blockId ? { ...block, checked: !block.checked } : block
        )
      }))
    }
  }

  const renderBlock = (block, noteId) => {
    switch (block.type) {
      case 'heading1':
        return <h2 className="block-h1">{block.content}</h2>
      case 'heading2':
        return <h3 className="block-h2">{block.content}</h3>
      case 'text':
        return <p className="block-text">{block.content}</p>
      case 'list':
        return (
          <div className="block-list-item">
            <span className="list-bullet">•</span>
            <span>{block.content}</span>
          </div>
        )
      case 'checklist':
        return (
          <div 
            className={`block-checklist ${block.checked ? 'checked' : ''}`}
            onClick={() => toggleCheck(noteId, block.id)}
          >
            <div className="checklist-box">
              {block.checked && <span>✓</span>}
            </div>
            <span>{block.content}</span>
          </div>
        )
      case 'quote':
        return <blockquote className="block-quote">{block.content}</blockquote>
      case 'code':
        return <pre className="block-code"><code>{block.content}</code></pre>
      default:
        return <p>{block.content}</p>
    }
  }

  return (
    <div className="ideas-page">
      {/* Sidebar */}
      <div className="ideas-sidebar">
        <div className="ideas-search">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button className="new-note-btn">
          <Plus size={18} />
          <span>New Note</span>
        </button>

        {starredNotes.length > 0 && (
          <div className="notes-section">
            <div className="notes-section-header">
              <Star size={14} />
              <span>Starred</span>
            </div>
            <div className="notes-list">
              {starredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  className={`note-item ${selectedNote?.id === note.id ? 'active' : ''}`}
                  onClick={() => setSelectedNote(note)}
                  whileHover={{ x: 4 }}
                >
                  <span className="note-emoji">{note.emoji}</span>
                  <span className="note-title">{note.title}</span>
                  <ChevronRight size={14} className="note-arrow" />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="notes-section">
          <div className="notes-section-header">
            <Clock size={14} />
            <span>Recent</span>
          </div>
          <div className="notes-list">
            {recentNotes.map((note) => (
              <motion.div
                key={note.id}
                className={`note-item ${selectedNote?.id === note.id ? 'active' : ''}`}
                onClick={() => setSelectedNote(note)}
                whileHover={{ x: 4 }}
              >
                <span className="note-emoji">{note.emoji}</span>
                <span className="note-title">{note.title}</span>
                <ChevronRight size={14} className="note-arrow" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ideas-content">
        <AnimatePresence mode="wait">
          {selectedNote ? (
            <motion.div
              key={selectedNote.id}
              className="note-editor"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Note Header */}
              <div className="note-header">
                <div className="note-header-left">
                  <div 
                    className="note-header-emoji"
                    style={{ background: `${selectedNote.color}20` }}
                  >
                    {selectedNote.emoji}
                  </div>
                  <div className="note-header-info">
                    <input 
                      type="text" 
                      className="note-title-input"
                      value={selectedNote.title}
                      onChange={(e) => setSelectedNote({...selectedNote, title: e.target.value})}
                    />
                    <div className="note-meta">
                      <span>
                        <Calendar size={12} />
                        {new Date(selectedNote.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span>•</span>
                      <span>
                        <Clock size={12} />
                        Updated {new Date(selectedNote.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="note-header-actions">
                  <button 
                    className={`btn btn-icon btn-ghost ${selectedNote.starred ? 'starred' : ''}`}
                    onClick={() => toggleStar(selectedNote.id)}
                  >
                    {selectedNote.starred ? <Star size={18} fill="currentColor" /> : <StarOff size={18} />}
                  </button>
                  <button className="btn btn-icon btn-ghost">
                    <Share2 size={18} />
                  </button>
                  <button className="btn btn-icon btn-ghost">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="note-tags">
                {selectedNote.tags.map((tag, i) => (
                  <span key={i} className="note-tag">
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
                <button className="add-tag-btn">
                  <Plus size={12} />
                  Add tag
                </button>
              </div>

              {/* Blocks */}
              <div className="note-blocks">
                {selectedNote.blocks.map((block, index) => (
                  <motion.div
                    key={block.id}
                    className="block-wrapper"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <div className="block-handle">
                      <GripVertical size={14} />
                    </div>
                    <div className="block-content">
                      {renderBlock(block, selectedNote.id)}
                    </div>
                    <div className="block-actions">
                      <button className="btn btn-icon btn-ghost">
                        <Plus size={14} />
                      </button>
                      <button className="btn btn-icon btn-ghost">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}

                {/* Add Block Button */}
                <div className="add-block-wrapper">
                  <button 
                    className="add-block-btn"
                    onClick={() => setShowBlockMenu(!showBlockMenu)}
                  >
                    <Plus size={16} />
                    <span>Add a block</span>
                  </button>

                  <AnimatePresence>
                    {showBlockMenu && (
                      <motion.div
                        className="block-menu"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {blockTypes.map((type) => (
                          <button 
                            key={type.type}
                            className="block-menu-item"
                            onClick={() => setShowBlockMenu(false)}
                          >
                            <type.icon size={16} />
                            <span>{type.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="no-note-selected"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="no-note-content">
                <Sparkles size={48} />
                <h3>Select a note or create a new one</h3>
                <p>Your ideas and notes will appear here</p>
                <button className="btn btn-primary">
                  <Plus size={16} />
                  Create New Note
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Ideas

