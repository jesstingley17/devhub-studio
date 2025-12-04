import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  Plus,
  Search,
  MoreHorizontal,
  Star,
  StarOff,
  Trash2,
  Share2,
  GripVertical,
  Type,
  Heading1,
  Heading2,
  List,
  ListChecks,
  Quote,
  Code,
  Sparkles,
  Calendar,
  Clock,
  Tag,
  ChevronRight
} from 'lucide-react'
import { useNoteStore } from '../stores/useStore'
import { useToast } from '../components/Toast'
import EmptyState from '../components/EmptyState'
import './Ideas.css'

const blockTypes = [
  { type: 'text', icon: Type, label: 'Text' },
  { type: 'heading1', icon: Heading1, label: 'Heading 1' },
  { type: 'heading2', icon: Heading2, label: 'Heading 2' },
  { type: 'list', icon: List, label: 'Bullet List' },
  { type: 'checklist', icon: ListChecks, label: 'Checklist' },
  { type: 'quote', icon: Quote, label: 'Quote' },
  { type: 'code', icon: Code, label: 'Code' },
]

// Sortable Block Component
function SortableBlock({ block, noteId, onToggleCheck, renderBlock }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div ref={setNodeRef} style={style} className="block-wrapper">
      <div className="block-handle" {...attributes} {...listeners}>
        <GripVertical size={14} />
      </div>
      <div className="block-content">
        {renderBlock(block, noteId, onToggleCheck)}
      </div>
      <div className="block-actions">
        <button className="btn btn-icon btn-ghost">
          <Plus size={14} />
        </button>
        <button className="btn btn-icon btn-ghost">
          <MoreHorizontal size={14} />
        </button>
      </div>
    </div>
  )
}

function Ideas() {
  const { notes, toggleStarNote, toggleBlockCheck, addNote, addBlock, reorderBlocks, deleteNote } = useNoteStore()
  const [selectedNote, setSelectedNote] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showBlockMenu, setShowBlockMenu] = useState(false)
  const toast = useToast()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const starredNotes = filteredNotes.filter(n => n.starred)
  const recentNotes = filteredNotes.filter(n => !n.starred)

  const handleToggleStar = (noteId) => {
    toggleStarNote(noteId)
    const note = notes.find(n => n.id === noteId)
    toast.success(note?.starred ? 'Removed from favorites' : 'Added to favorites')
  }

  const handleToggleCheck = (noteId, blockId) => {
    toggleBlockCheck(noteId, blockId)
    // Update selected note if it's the same
    if (selectedNote?.id === noteId) {
      const updatedNote = notes.find(n => n.id === noteId)
      setSelectedNote({ ...updatedNote })
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    
    if (over && active.id !== over.id && selectedNote) {
      const oldIndex = selectedNote.blocks.findIndex(b => b.id === active.id)
      const newIndex = selectedNote.blocks.findIndex(b => b.id === over.id)
      const newBlocks = arrayMove(selectedNote.blocks, oldIndex, newIndex)
      
      reorderBlocks(selectedNote.id, newBlocks)
      setSelectedNote({ ...selectedNote, blocks: newBlocks })
      toast.info('Block reordered')
    }
  }

  const handleAddBlock = (type) => {
    if (!selectedNote) return
    
    const newBlock = {
      type,
      content: type === 'checklist' ? 'New item' : 'New content',
      checked: false
    }
    
    addBlock(selectedNote.id, newBlock)
    setShowBlockMenu(false)
    
    // Update local state
    const updatedNote = notes.find(n => n.id === selectedNote.id)
    if (updatedNote) {
      setSelectedNote({ ...updatedNote })
    }
    
    toast.success('Block added')
  }

  const handleCreateNote = () => {
    const newNote = {
      title: 'Untitled Note',
      emoji: '📝',
      starred: false,
      color: '#6366f1',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      tags: [],
      blocks: [
        { id: `b${Date.now()}`, type: 'heading1', content: 'New Note' },
        { id: `b${Date.now() + 1}`, type: 'text', content: 'Start writing...' }
      ]
    }
    
    addNote(newNote)
    toast.success('Note created!')
  }

  const handleDeleteNote = (noteId) => {
    deleteNote(noteId)
    if (selectedNote?.id === noteId) {
      setSelectedNote(null)
    }
    toast.success('Note deleted')
  }

  const renderBlock = (block, noteId, onToggleCheck) => {
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
            onClick={() => onToggleCheck(noteId, block.id)}
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

  // Sync selectedNote with store
  const currentNote = selectedNote ? notes.find(n => n.id === selectedNote.id) : null

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

        <button className="new-note-btn" onClick={handleCreateNote}>
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
                  className={`note-item ${currentNote?.id === note.id ? 'active' : ''}`}
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
            {recentNotes.length === 0 && starredNotes.length === 0 ? (
              <div className="notes-empty">
                <p>No notes yet</p>
              </div>
            ) : (
              recentNotes.map((note) => (
                <motion.div
                  key={note.id}
                  className={`note-item ${currentNote?.id === note.id ? 'active' : ''}`}
                  onClick={() => setSelectedNote(note)}
                  whileHover={{ x: 4 }}
                >
                  <span className="note-emoji">{note.emoji}</span>
                  <span className="note-title">{note.title}</span>
                  <ChevronRight size={14} className="note-arrow" />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ideas-content">
        <AnimatePresence mode="wait">
          {currentNote ? (
            <motion.div
              key={currentNote.id}
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
                    style={{ background: `${currentNote.color}20` }}
                  >
                    {currentNote.emoji}
                  </div>
                  <div className="note-header-info">
                    <input 
                      type="text" 
                      className="note-title-input"
                      value={currentNote.title}
                      readOnly
                    />
                    <div className="note-meta">
                      <span>
                        <Calendar size={12} />
                        {new Date(currentNote.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span>•</span>
                      <span>
                        <Clock size={12} />
                        Updated {new Date(currentNote.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="note-header-actions">
                  <button 
                    className={`btn btn-icon btn-ghost ${currentNote.starred ? 'starred' : ''}`}
                    onClick={() => handleToggleStar(currentNote.id)}
                  >
                    {currentNote.starred ? <Star size={18} fill="currentColor" /> : <StarOff size={18} />}
                  </button>
                  <button className="btn btn-icon btn-ghost">
                    <Share2 size={18} />
                  </button>
                  <button 
                    className="btn btn-icon btn-ghost"
                    onClick={() => handleDeleteNote(currentNote.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="note-tags">
                {currentNote.tags.map((tag, i) => (
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

              {/* Draggable Blocks */}
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={currentNote.blocks.map(b => b.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="note-blocks">
                    {currentNote.blocks.map((block, index) => (
                      <motion.div
                        key={block.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <SortableBlock
                          block={block}
                          noteId={currentNote.id}
                          onToggleCheck={handleToggleCheck}
                          renderBlock={renderBlock}
                        />
                      </motion.div>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

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
                          onClick={() => handleAddBlock(type.type)}
                        >
                          <type.icon size={16} />
                          <span>{type.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <EmptyState
              type="ideas"
              title="Select a note or create a new one"
              description="Your ideas and notes will appear here. Start by creating your first note!"
              actionLabel="Create New Note"
              onAction={handleCreateNote}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Ideas
