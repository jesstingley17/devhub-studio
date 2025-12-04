import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  Mail,
  Phone,
  MapPin,
  Building2,
  DollarSign,
  FolderKanban,
  MoreVertical,
  Star,
  StarOff,
  Edit,
  Trash2,
  ExternalLink,
  Calendar,
  Clock,
  X,
  Send
} from 'lucide-react'
import './Clients.css'

const clients = [
  {
    id: 1,
    name: 'TechCorp Inc.',
    contactName: 'John Smith',
    email: 'john@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=TechCorp',
    status: 'active',
    starred: true,
    totalRevenue: 28500,
    activeProjects: 2,
    joinedAt: '2024-06-15',
    lastContact: '2024-12-02',
    tags: ['enterprise', 'tech']
  },
  {
    id: 2,
    name: 'StartupXYZ',
    contactName: 'Sarah Johnson',
    email: 'sarah@startupxyz.io',
    phone: '+1 (555) 234-5678',
    company: 'StartupXYZ',
    location: 'Austin, TX',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=StartupXYZ',
    status: 'active',
    starred: true,
    totalRevenue: 42000,
    activeProjects: 1,
    joinedAt: '2024-03-20',
    lastContact: '2024-12-01',
    tags: ['startup', 'mobile']
  },
  {
    id: 3,
    name: 'Creative Studios',
    contactName: 'Mike Davis',
    email: 'mike@creativestudios.co',
    phone: '+1 (555) 345-6789',
    company: 'Creative Studios',
    location: 'New York, NY',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Creative',
    status: 'active',
    starred: false,
    totalRevenue: 15200,
    activeProjects: 1,
    joinedAt: '2024-08-10',
    lastContact: '2024-11-28',
    tags: ['design', 'branding']
  },
  {
    id: 4,
    name: 'Enterprise Corp',
    contactName: 'Lisa Chen',
    email: 'lchen@enterprisecorp.com',
    phone: '+1 (555) 456-7890',
    company: 'Enterprise Corp',
    location: 'Chicago, IL',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Enterprise',
    status: 'pending',
    starred: false,
    totalRevenue: 0,
    activeProjects: 0,
    joinedAt: '2024-12-01',
    lastContact: '2024-12-03',
    tags: ['enterprise', 'api']
  },
  {
    id: 5,
    name: 'DataFlow Inc.',
    contactName: 'Alex Turner',
    email: 'alex@dataflow.io',
    phone: '+1 (555) 567-8901',
    company: 'DataFlow Inc.',
    location: 'Seattle, WA',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=DataFlow',
    status: 'inactive',
    starred: false,
    totalRevenue: 18500,
    activeProjects: 0,
    joinedAt: '2024-01-05',
    lastContact: '2024-11-15',
    tags: ['data', 'analytics']
  }
]

function Clients() {
  const [selectedClient, setSelectedClient] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredClients = clients.filter(client => {
    if (filter === 'starred' && !client.starred) return false
    if (filter === 'active' && client.status !== 'active') return false
    if (searchQuery && !client.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !client.contactName.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    totalRevenue: clients.reduce((sum, c) => sum + c.totalRevenue, 0)
  }

  return (
    <div className="clients-page">
      {/* Header Stats */}
      <div className="clients-stats">
        <div className="client-stat">
          <span className="client-stat-value">{stats.total}</span>
          <span className="client-stat-label">Total Clients</span>
        </div>
        <div className="client-stat">
          <span className="client-stat-value">{stats.active}</span>
          <span className="client-stat-label">Active</span>
        </div>
        <div className="client-stat">
          <span className="client-stat-value">{formatCurrency(stats.totalRevenue)}</span>
          <span className="client-stat-label">Total Revenue</span>
        </div>
      </div>

      {/* Header */}
      <div className="clients-header">
        <div className="clients-header-left">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-btns">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'starred' ? 'active' : ''}`}
              onClick={() => setFilter('starred')}
            >
              <Star size={14} />
              Starred
            </button>
            <button 
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          Add Client
        </button>
      </div>

      {/* Clients Grid */}
      <div className="clients-grid">
        <AnimatePresence>
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              className="client-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedClient(client)}
            >
              <div className="client-card-header">
                <div className="client-avatar">
                  <img src={client.avatar} alt={client.name} />
                </div>
                <div className="client-card-actions">
                  <button className={`star-btn ${client.starred ? 'starred' : ''}`}>
                    {client.starred ? <Star size={16} fill="currentColor" /> : <StarOff size={16} />}
                  </button>
                  <button className="btn btn-icon btn-ghost">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              <div className="client-card-body">
                <h3 className="client-name">{client.name}</h3>
                <span className="client-contact">{client.contactName}</span>
                
                <div className="client-details">
                  <div className="client-detail">
                    <Mail size={14} />
                    <span>{client.email}</span>
                  </div>
                  <div className="client-detail">
                    <MapPin size={14} />
                    <span>{client.location}</span>
                  </div>
                </div>

                <div className="client-tags">
                  {client.tags.map((tag, i) => (
                    <span key={i} className="client-tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="client-card-footer">
                <div className="client-metric">
                  <DollarSign size={14} />
                  <span>{formatCurrency(client.totalRevenue)}</span>
                </div>
                <div className="client-metric">
                  <FolderKanban size={14} />
                  <span>{client.activeProjects} projects</span>
                </div>
                <div className={`client-status status-${client.status}`}>
                  {client.status}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Client Detail Modal */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div 
            className="client-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedClient(null)}
          >
            <motion.div 
              className="client-modal"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="client-modal-header">
                <button className="btn btn-icon btn-ghost" onClick={() => setSelectedClient(null)}>
                  <X size={20} />
                </button>
              </div>

              <div className="client-modal-profile">
                <div className="client-modal-avatar">
                  <img src={selectedClient.avatar} alt={selectedClient.name} />
                </div>
                <h2>{selectedClient.name}</h2>
                <span className="client-modal-contact">{selectedClient.contactName}</span>
                <div className={`client-status-large status-${selectedClient.status}`}>
                  {selectedClient.status}
                </div>
              </div>

              <div className="client-modal-stats">
                <div className="modal-stat">
                  <span className="modal-stat-value">{formatCurrency(selectedClient.totalRevenue)}</span>
                  <span className="modal-stat-label">Total Revenue</span>
                </div>
                <div className="modal-stat">
                  <span className="modal-stat-value">{selectedClient.activeProjects}</span>
                  <span className="modal-stat-label">Active Projects</span>
                </div>
              </div>

              <div className="client-modal-details">
                <div className="modal-detail">
                  <Mail size={16} />
                  <div>
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{selectedClient.email}</span>
                  </div>
                </div>
                <div className="modal-detail">
                  <Phone size={16} />
                  <div>
                    <span className="detail-label">Phone</span>
                    <span className="detail-value">{selectedClient.phone}</span>
                  </div>
                </div>
                <div className="modal-detail">
                  <Building2 size={16} />
                  <div>
                    <span className="detail-label">Company</span>
                    <span className="detail-value">{selectedClient.company}</span>
                  </div>
                </div>
                <div className="modal-detail">
                  <MapPin size={16} />
                  <div>
                    <span className="detail-label">Location</span>
                    <span className="detail-value">{selectedClient.location}</span>
                  </div>
                </div>
                <div className="modal-detail">
                  <Calendar size={16} />
                  <div>
                    <span className="detail-label">Client Since</span>
                    <span className="detail-value">
                      {new Date(selectedClient.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </div>
                <div className="modal-detail">
                  <Clock size={16} />
                  <div>
                    <span className="detail-label">Last Contact</span>
                    <span className="detail-value">
                      {new Date(selectedClient.lastContact).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="client-modal-actions">
                <button className="btn btn-secondary">
                  <Edit size={16} />
                  Edit
                </button>
                <button className="btn btn-secondary">
                  <Send size={16} />
                  Message
                </button>
                <button className="btn btn-primary">
                  <FolderKanban size={16} />
                  View Projects
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Client Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div 
            className="add-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddModal(false)}
          >
            <motion.div 
              className="add-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="add-modal-header">
                <h2>Add New Client</h2>
                <button className="btn btn-icon btn-ghost" onClick={() => setShowAddModal(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="add-modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>Company Name</label>
                    <input type="text" placeholder="Acme Inc." />
                  </div>
                  <div className="form-group">
                    <label>Contact Name</label>
                    <input type="text" placeholder="John Doe" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="john@acme.com" />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input type="text" placeholder="City, State" />
                </div>

                <div className="form-group">
                  <label>Tags</label>
                  <input type="text" placeholder="enterprise, tech, etc." />
                </div>

                <div className="form-group">
                  <label>Notes</label>
                  <textarea placeholder="Add any notes about this client..."></textarea>
                </div>
              </div>

              <div className="add-modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary">
                  <Plus size={16} />
                  Add Client
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Clients

