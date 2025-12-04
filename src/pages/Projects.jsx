import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  Grid3X3,
  List,
  Calendar,
  Clock,
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
import { useProjectStore } from '../stores/useStore'
import { useToast } from '../components/Toast'
import EmptyState from '../components/EmptyState'
import './Projects.css'

const statusConfig = {
  'planning': { label: 'Planning', color: 'neutral', icon: Circle },
  'in-progress': { label: 'In Progress', color: 'info', icon: Clock },
  'review': { label: 'Review', color: 'warning', icon: AlertCircle },
  'completed': { label: 'Completed', color: 'success', icon: CheckCircle2 }
}

function Projects() {
  const { projects, updateProject, deleteProject } = useProjectStore()
  const [viewMode, setViewMode] = useState('grid')
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const toast = useToast()

  const filteredProjects = projects.filter(project => {
    if (filter !== 'all' && project.status !== filter) return false
    if (searchQuery && !project.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const handleStatusChange = (projectId, newStatus) => {
    updateProject(projectId, { status: newStatus })
    toast.success(`Project status updated to ${statusConfig[newStatus].label}`)
  }

  const handleDeleteProject = (projectId) => {
    deleteProject(projectId)
    setSelectedProject(null)
    toast.success('Project deleted')
  }

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
          <button className="btn btn-primary" onClick={() => toast.info('Create project modal coming soon!')}>
            <Plus size={16} />
            New Project
          </button>
        </div>
      </div>

      {/* Projects Grid/List */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          type="projects"
          title={searchQuery ? `No projects matching "${searchQuery}"` : "No projects yet"}
          description={searchQuery ? "Try different search terms" : "Create your first project to start tracking work and collaborating with clients."}
          actionLabel="Create Project"
          onAction={() => toast.info('Create project modal coming soon!')}
        />
      ) : (
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
                  <button className="btn btn-icon btn-ghost" onClick={(e) => e.stopPropagation()}>
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
      )}

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
                  <h4>Status</h4>
                  <div className="status-buttons">
                    {Object.entries(statusConfig).map(([key, config]) => (
                      <button
                        key={key}
                        className={`status-btn ${selectedProject.status === key ? 'active' : ''}`}
                        onClick={() => {
                          handleStatusChange(selectedProject.id, key)
                          setSelectedProject({ ...selectedProject, status: key })
                        }}
                      >
                        <config.icon size={14} />
                        {config.label}
                      </button>
                    ))}
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
