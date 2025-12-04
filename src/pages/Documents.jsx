import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  FileText,
  FileSignature,
  FileCheck,
  FileClock,
  FileX,
  Upload,
  Download,
  Share2,
  MoreVertical,
  Eye,
  Trash2,
  Copy,
  Calendar,
  User,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Pen,
  Send
} from 'lucide-react'
import './Documents.css'

const documents = [
  {
    id: 1,
    name: 'Service Agreement - TechCorp',
    type: 'contract',
    client: 'TechCorp Inc.',
    status: 'signed',
    signedBy: ['Jessica L.', 'John Smith'],
    createdAt: '2024-11-28',
    signedAt: '2024-11-30',
    fileSize: '245 KB'
  },
  {
    id: 2,
    name: 'Project Proposal - E-commerce Redesign',
    type: 'proposal',
    client: 'TechCorp Inc.',
    status: 'pending',
    signedBy: ['Jessica L.'],
    createdAt: '2024-12-01',
    signedAt: null,
    fileSize: '1.2 MB'
  },
  {
    id: 3,
    name: 'NDA - StartupXYZ',
    type: 'nda',
    client: 'StartupXYZ',
    status: 'awaiting',
    signedBy: [],
    createdAt: '2024-12-02',
    signedAt: null,
    fileSize: '89 KB'
  },
  {
    id: 4,
    name: 'Invoice #2024-047',
    type: 'invoice',
    client: 'Creative Studios',
    status: 'signed',
    signedBy: ['Jessica L.', 'Mike Davis'],
    createdAt: '2024-11-15',
    signedAt: '2024-11-16',
    fileSize: '156 KB'
  },
  {
    id: 5,
    name: 'Scope of Work - Mobile App',
    type: 'contract',
    client: 'StartupXYZ',
    status: 'draft',
    signedBy: [],
    createdAt: '2024-12-03',
    signedAt: null,
    fileSize: '312 KB'
  },
  {
    id: 6,
    name: 'Privacy Policy Template',
    type: 'template',
    client: 'Internal',
    status: 'signed',
    signedBy: ['Jessica L.'],
    createdAt: '2024-10-01',
    signedAt: '2024-10-01',
    fileSize: '78 KB'
  }
]

const statusConfig = {
  'draft': { label: 'Draft', color: 'neutral', icon: FileText },
  'awaiting': { label: 'Awaiting Signature', color: 'warning', icon: FileClock },
  'pending': { label: 'Pending Review', color: 'info', icon: Clock },
  'signed': { label: 'Signed', color: 'success', icon: FileCheck },
  'expired': { label: 'Expired', color: 'error', icon: FileX }
}

const typeConfig = {
  'contract': { label: 'Contract', color: '#6366f1' },
  'proposal': { label: 'Proposal', color: '#8b5cf6' },
  'nda': { label: 'NDA', color: '#f59e0b' },
  'invoice': { label: 'Invoice', color: '#10b981' },
  'template': { label: 'Template', color: '#64748b' }
}

function Documents() {
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [showUpload, setShowUpload] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDocs = documents.filter(doc => {
    if (filter !== 'all' && doc.status !== filter) return false
    if (searchQuery && !doc.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const stats = {
    total: documents.length,
    signed: documents.filter(d => d.status === 'signed').length,
    pending: documents.filter(d => d.status === 'pending' || d.status === 'awaiting').length,
    draft: documents.filter(d => d.status === 'draft').length
  }

  return (
    <div className="documents-page">
      {/* Stats */}
      <div className="docs-stats">
        <div className="docs-stat">
          <div className="docs-stat-icon">
            <FileText size={20} />
          </div>
          <div className="docs-stat-info">
            <span className="docs-stat-value">{stats.total}</span>
            <span className="docs-stat-label">Total Documents</span>
          </div>
        </div>
        <div className="docs-stat">
          <div className="docs-stat-icon signed">
            <FileCheck size={20} />
          </div>
          <div className="docs-stat-info">
            <span className="docs-stat-value">{stats.signed}</span>
            <span className="docs-stat-label">Signed</span>
          </div>
        </div>
        <div className="docs-stat">
          <div className="docs-stat-icon pending">
            <FileClock size={20} />
          </div>
          <div className="docs-stat-info">
            <span className="docs-stat-value">{stats.pending}</span>
            <span className="docs-stat-label">Pending Signature</span>
          </div>
        </div>
        <div className="docs-stat">
          <div className="docs-stat-icon draft">
            <FileText size={20} />
          </div>
          <div className="docs-stat-info">
            <span className="docs-stat-value">{stats.draft}</span>
            <span className="docs-stat-label">Drafts</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="docs-header">
        <div className="docs-header-left">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-tabs">
            {['all', 'draft', 'awaiting', 'pending', 'signed'].map((status) => (
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
        <div className="docs-header-right">
          <button className="btn btn-secondary" onClick={() => setShowUpload(true)}>
            <Upload size={16} />
            Upload
          </button>
          <button className="btn btn-primary">
            <Plus size={16} />
            Create Document
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="docs-table-container">
        <table className="docs-table">
          <thead>
            <tr>
              <th>Document</th>
              <th>Client</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredDocs.map((doc, index) => (
                <motion.tr
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => setSelectedDoc(doc)}
                  className="doc-row"
                >
                  <td>
                    <div className="doc-name-cell">
                      <div className="doc-icon">
                        <FileSignature size={18} />
                      </div>
                      <div className="doc-name-info">
                        <span className="doc-name">{doc.name}</span>
                        <span className="doc-size">{doc.fileSize}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="doc-client">{doc.client}</span>
                  </td>
                  <td>
                    <span 
                      className="doc-type-badge" 
                      style={{ background: `${typeConfig[doc.type].color}20`, color: typeConfig[doc.type].color }}
                    >
                      {typeConfig[doc.type].label}
                    </span>
                  </td>
                  <td>
                    <div className={`doc-status status-${doc.status}`}>
                      {(() => {
                        const StatusIcon = statusConfig[doc.status].icon
                        return <StatusIcon size={14} />
                      })()}
                      <span>{statusConfig[doc.status].label}</span>
                    </div>
                  </td>
                  <td>
                    <span className="doc-date">
                      {new Date(doc.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-icon btn-ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Document Preview Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div 
            className="doc-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDoc(null)}
          >
            <motion.div 
              className="doc-modal"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="doc-modal-header">
                <div className="doc-modal-title">
                  <FileSignature size={24} />
                  <div>
                    <h2>{selectedDoc.name}</h2>
                    <span className="doc-modal-client">{selectedDoc.client}</span>
                  </div>
                </div>
                <button className="btn btn-icon btn-ghost" onClick={() => setSelectedDoc(null)}>
                  <X size={20} />
                </button>
              </div>

              <div className="doc-modal-content">
                {/* Document Preview */}
                <div className="doc-preview">
                  <div className="doc-preview-placeholder">
                    <FileText size={48} />
                    <span>Document Preview</span>
                    <p>Click to view full document</p>
                  </div>
                </div>

                {/* Document Info */}
                <div className="doc-info-panel">
                  <div className="doc-info-section">
                    <h4>Status</h4>
                    <div className={`doc-status-large status-${selectedDoc.status}`}>
                      {(() => {
                        const StatusIcon = statusConfig[selectedDoc.status].icon
                        return <StatusIcon size={18} />
                      })()}
                      <span>{statusConfig[selectedDoc.status].label}</span>
                    </div>
                  </div>

                  <div className="doc-info-section">
                    <h4>Details</h4>
                    <div className="doc-details-list">
                      <div className="doc-detail-item">
                        <Calendar size={14} />
                        <span>Created</span>
                        <strong>{new Date(selectedDoc.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>
                      </div>
                      {selectedDoc.signedAt && (
                        <div className="doc-detail-item">
                          <CheckCircle2 size={14} />
                          <span>Signed</span>
                          <strong>{new Date(selectedDoc.signedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>
                        </div>
                      )}
                      <div className="doc-detail-item">
                        <FileText size={14} />
                        <span>Size</span>
                        <strong>{selectedDoc.fileSize}</strong>
                      </div>
                    </div>
                  </div>

                  {selectedDoc.signedBy.length > 0 && (
                    <div className="doc-info-section">
                      <h4>Signatures</h4>
                      <div className="doc-signatures">
                        {selectedDoc.signedBy.map((signer, i) => (
                          <div key={i} className="signature-item">
                            <div className="signature-avatar">
                              <User size={14} />
                            </div>
                            <span>{signer}</span>
                            <CheckCircle2 size={14} className="signature-check" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="doc-actions">
                    {selectedDoc.status === 'draft' && (
                      <button className="btn btn-primary btn-full">
                        <Send size={16} />
                        Send for Signature
                      </button>
                    )}
                    {selectedDoc.status === 'awaiting' && (
                      <button className="btn btn-primary btn-full">
                        <Pen size={16} />
                        Sign Document
                      </button>
                    )}
                    {selectedDoc.status === 'pending' && (
                      <button className="btn btn-secondary btn-full">
                        <AlertCircle size={16} />
                        Send Reminder
                      </button>
                    )}
                    <div className="doc-actions-row">
                      <button className="btn btn-secondary">
                        <Eye size={16} />
                        View
                      </button>
                      <button className="btn btn-secondary">
                        <Download size={16} />
                        Download
                      </button>
                      <button className="btn btn-secondary">
                        <Share2 size={16} />
                        Share
                      </button>
                    </div>
                    <button className="btn btn-ghost btn-full danger">
                      <Trash2 size={16} />
                      Delete Document
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div 
            className="upload-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUpload(false)}
          >
            <motion.div 
              className="upload-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="upload-modal-header">
                <h3>Upload Document</h3>
                <button className="btn btn-icon btn-ghost" onClick={() => setShowUpload(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="upload-dropzone">
                <Upload size={40} />
                <h4>Drop files here</h4>
                <p>or click to browse</p>
                <span className="upload-formats">PDF, DOC, DOCX up to 10MB</span>
              </div>
              <div className="upload-actions">
                <button className="btn btn-secondary" onClick={() => setShowUpload(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary">
                  Upload
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Documents

