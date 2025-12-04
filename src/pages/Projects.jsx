import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  Calendar,
  Clock,
  Users,
  MoreVertical,
  ExternalLink,
  MessageSquare,
  Paperclip,
  CheckCircle2,
  Circle,
  AlertCircle,
  ArrowRight,
  X
} from 'lucide-react'
import './Projects.css'

const projects = [
  {
    id: 1,
    name: 'E-commerce Platform Redesign',
    description: 'Complete redesign of the online shopping experience with modern UI/UX patterns and improved conversion flow.',
    client: 'TechCorp Inc.',
    clientAvatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=TechCorp',
    status: 'in-progress',
    priority: 'high',
    progress: 65,
    dueDate: '2024-12-15',
    budget: '$15,000',
    tasks: { completed: 12, total: 18 },
    team: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan'
    ],
    tags: ['Web Design', 'E-commerce', 'React'],
    color: '#f87171'
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'Native iOS and Android app development for fitness tracking with social features.',
    client: 'StartupXYZ',
    clientAvatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=StartupXYZ',
    status: 'review',
    priority: 'high',
    progress: 90,
    dueDate: '2024-12-08',
    budget: '$28,500',
    tasks: { completed: 24, total: 26 },
    team: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor'
    ],
    tags: ['Mobile', 'iOS', 'Android'],
    color: '#34d399'
  },
  {
    id: 3,
    name: 'Brand Identity System',
    description: 'Complete brand identity including logo, typography, color palette, and brand guidelines.',
    client: 'Creative Studios',
    clientAvatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Creative',
    status: 'in-progress',
    priority: 'medium',
    progress: 40,
    dueDate: '2024-12-22',
    budget: '$8,000',
    tasks: { completed: 5, total: 12 },
    team: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey'
    ],
    tags: ['Branding', 'Design System'],
    color: '#60a5fa'
  },
  {
    id: 4,
    name: 'API Integration Suite',
    description: 'Building comprehensive API integrations for third-party services including payment gateways and CRM.',
    client: 'Enterprise Corp',
    clientAvatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Enterprise',
    status: 'planning',
    priority: 'low',
    progress: 10,
    dueDate: '2025-01-15',
    budget: '$22,000',
    tasks: { completed: 2, total: 20 },
    team: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Riley',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Drew'
    ],
    tags: ['Backend', 'API', 'Integration'],
    color: '#a78bfa'
  },
  {
    id: 5,
    name: 'Analytics Dashboard',
    description: 'Real-time analytics dashboard with customizable widgets and data visualization.',
    client: 'DataFlow Inc.',
    clientAvatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=DataFlow',
    status: 'completed',
    priority: 'medium',
    progress: 100,
    dueDate: '2024-11-30',
    budget: '$12,500',
    tasks: { completed: 15, total: 15 },
    team: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Quinn'
    ],
    tags: ['Dashboard', 'Data Viz', 'React'],
    color: '#fbbf24'
  }
]

const statusConfig = {
  'planning': { label: 'Planning', color: 'neutral', icon: Circle },
  'in-progress': { label: 'In Progress', color: 'info', icon: Clock },
  'review': { label: 'Review', color: 'warning', icon: AlertCircle },
  'completed': { label: 'Completed', color: 'success', icon: CheckCircle2 }
}

function Projects() {
  const [viewMode, setViewMode] = useState('grid')
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = projects.filter(project => {
    if (filter !== 'all' && project.status !== filter) return false
    if (searchQuery && !project.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="projects-page">
      {/* Header */}
      <div className="projects-header">
        <div className="projects-header-left">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-tabs">
            {['all', 'planning', 'in-progress', 'review', 'completed'].map((status) => (
              <button
                key={status}
                className={`filter-tab ${filter === status ? 'active' : ''}`}
                onClick={() => setFilter(status)}
              >
                {status === 'all' ? 'All' : statusConfig[status]?.label || status}
              </button>
            ))}
          </div>
        </div>
        <div className="projects-header-right">
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 size={18} />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
          </div>
          <button className="btn btn-primary">
            <Plus size={16} />
            New Project
          </button>
        </div>
      </div>

      {/* Projects Grid/List */}
      <motion.div 
        className={`projects-container ${viewMode}`}
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-card-header">
                <div className="project-card-color" style={{ background: project.color }}></div>
                <div className="project-card-info">
                  <h3 className="project-card-title">{project.name}</h3>
                  <div className="project-card-client">
                    <img src={project.clientAvatar} alt={project.client} className="client-avatar" />
                    <span>{project.client}</span>
                  </div>
                </div>
                <button className="btn btn-icon btn-ghost">
                  <MoreVertical size={16} />
                </button>
              </div>

              <p className="project-card-description">{project.description}</p>

              <div className="project-card-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="project-tag">{tag}</span>
                ))}
              </div>

              <div className="project-card-progress">
                <div className="progress-header">
                  <span>Progress</span>
                  <span className="progress-percent">{project.progress}%</span>
                </div>
                <div className="progress-bar">
                  <motion.div 
                    className="progress-fill"
                    style={{ background: project.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
                  ></motion.div>
                </div>
              </div>

              <div className="project-card-footer">
                <div className="project-card-meta">
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span>{new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="meta-item">
                    <CheckCircle2 size={14} />
                    <span>{project.tasks.completed}/{project.tasks.total}</span>
                  </div>
                </div>
                <div className="project-card-team">
                  {project.team.slice(0, 3).map((avatar, i) => (
                    <img 
                      key={i} 
                      src={avatar} 
                      alt="Team member" 
                      className="team-avatar"
                      style={{ zIndex: project.team.length - i }}
                    />
                  ))}
                  {project.team.length > 3 && (
                    <span className="team-more">+{project.team.length - 3}</span>
                  )}
                </div>
              </div>

              <div className={`project-card-status status-${project.status}`}>
                {(() => {
                  const StatusIcon = statusConfig[project.status].icon
                  return <StatusIcon size={12} />
                })()}
                <span>{statusConfig[project.status].label}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              className="project-modal"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-header-left">
                  <div className="modal-color" style={{ background: selectedProject.color }}></div>
                  <div>
                    <h2>{selectedProject.name}</h2>
                    <div className="modal-client">
                      <img src={selectedProject.clientAvatar} alt={selectedProject.client} />
                      <span>{selectedProject.client}</span>
                    </div>
                  </div>
                </div>
                <div className="modal-header-right">
                  <button className="btn btn-ghost">
                    <ExternalLink size={16} />
                    Open
                  </button>
                  <button className="btn btn-icon btn-ghost" onClick={() => setSelectedProject(null)}>
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="modal-content">
                <div className="modal-section">
                  <h4>Description</h4>
                  <p>{selectedProject.description}</p>
                </div>

                <div className="modal-grid">
                  <div className="modal-stat">
                    <span className="stat-label">Budget</span>
                    <span className="stat-value">{selectedProject.budget}</span>
                  </div>
                  <div className="modal-stat">
                    <span className="stat-label">Due Date</span>
                    <span className="stat-value">{new Date(selectedProject.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="modal-stat">
                    <span className="stat-label">Tasks</span>
                    <span className="stat-value">{selectedProject.tasks.completed} of {selectedProject.tasks.total}</span>
                  </div>
                  <div className="modal-stat">
                    <span className="stat-label">Priority</span>
                    <span className={`stat-value priority-${selectedProject.priority}`}>{selectedProject.priority}</span>
                  </div>
                </div>

                <div className="modal-section">
                  <h4>Team</h4>
                  <div className="modal-team">
                    {selectedProject.team.map((avatar, i) => (
                      <div key={i} className="team-member">
                        <img src={avatar} alt="Team member" />
                        <span>Team Member</span>
                      </div>
                    ))}
                    <button className="add-team-btn">
                      <Plus size={16} />
                      Add
                    </button>
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="btn btn-secondary">
                    <MessageSquare size={16} />
                    Messages
                  </button>
                  <button className="btn btn-secondary">
                    <Paperclip size={16} />
                    Files
                  </button>
                  <button className="btn btn-primary">
                    View Full Project
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projects

