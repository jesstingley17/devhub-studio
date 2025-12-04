import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  Filter,
  Download,
  Send,
  Eye,
  MoreVertical,
  DollarSign,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  FileText,
  X,
  Copy,
  ExternalLink
} from 'lucide-react'
import './Payments.css'

const invoices = [
  {
    id: 'INV-2024-047',
    client: 'TechCorp Inc.',
    clientEmail: 'billing@techcorp.com',
    project: 'E-commerce Platform Redesign',
    amount: 5500,
    status: 'paid',
    dueDate: '2024-11-30',
    paidDate: '2024-11-28',
    createdAt: '2024-11-15'
  },
  {
    id: 'INV-2024-048',
    client: 'StartupXYZ',
    clientEmail: 'finance@startupxyz.io',
    project: 'Mobile App Development - Phase 2',
    amount: 8500,
    status: 'pending',
    dueDate: '2024-12-10',
    paidDate: null,
    createdAt: '2024-11-25'
  },
  {
    id: 'INV-2024-049',
    client: 'Creative Studios',
    clientEmail: 'accounts@creativestudios.co',
    project: 'Brand Identity System',
    amount: 3200,
    status: 'overdue',
    dueDate: '2024-12-01',
    paidDate: null,
    createdAt: '2024-11-20'
  },
  {
    id: 'INV-2024-050',
    client: 'Enterprise Corp',
    clientEmail: 'ap@enterprisecorp.com',
    project: 'API Integration Suite',
    amount: 12000,
    status: 'draft',
    dueDate: '2024-12-20',
    paidDate: null,
    createdAt: '2024-12-03'
  },
  {
    id: 'INV-2024-046',
    client: 'DataFlow Inc.',
    clientEmail: 'billing@dataflow.io',
    project: 'Analytics Dashboard',
    amount: 6800,
    status: 'paid',
    dueDate: '2024-11-20',
    paidDate: '2024-11-18',
    createdAt: '2024-11-05'
  }
]

const transactions = [
  { id: 1, type: 'incoming', description: 'Payment from TechCorp Inc.', amount: 5500, date: '2024-11-28' },
  { id: 2, type: 'incoming', description: 'Payment from DataFlow Inc.', amount: 6800, date: '2024-11-18' },
  { id: 3, type: 'outgoing', description: 'Stripe Processing Fee', amount: -165, date: '2024-11-28' },
  { id: 4, type: 'outgoing', description: 'Adobe Creative Cloud', amount: -54.99, date: '2024-11-15' },
  { id: 5, type: 'incoming', description: 'Partial Payment - StartupXYZ', amount: 4250, date: '2024-11-10' }
]

const statusConfig = {
  'draft': { label: 'Draft', color: 'neutral', icon: FileText },
  'pending': { label: 'Pending', color: 'warning', icon: Clock },
  'paid': { label: 'Paid', color: 'success', icon: CheckCircle2 },
  'overdue': { label: 'Overdue', color: 'error', icon: AlertCircle },
  'cancelled': { label: 'Cancelled', color: 'neutral', icon: XCircle }
}

function Payments() {
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const filteredInvoices = invoices.filter(invoice => {
    if (filter !== 'all' && invoice.status !== filter) return false
    if (searchQuery && !invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !invoice.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const stats = {
    totalRevenue: invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0),
    pending: invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0),
    overdue: invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0),
    thisMonth: invoices.filter(i => i.status === 'paid' && new Date(i.paidDate).getMonth() === 10).reduce((sum, i) => sum + i.amount, 0)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="payments-page">
      {/* Stats Cards */}
      <div className="payments-stats">
        <motion.div 
          className="payment-stat-card primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="stat-card-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-card-content">
            <span className="stat-card-label">Total Revenue</span>
            <span className="stat-card-value">{formatCurrency(stats.totalRevenue)}</span>
            <div className="stat-card-change positive">
              <TrendingUp size={14} />
              <span>+18.2% from last month</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="payment-stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-card-icon pending">
            <Clock size={24} />
          </div>
          <div className="stat-card-content">
            <span className="stat-card-label">Pending</span>
            <span className="stat-card-value">{formatCurrency(stats.pending)}</span>
            <span className="stat-card-subtitle">{invoices.filter(i => i.status === 'pending').length} invoices</span>
          </div>
        </motion.div>

        <motion.div 
          className="payment-stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-card-icon overdue">
            <AlertCircle size={24} />
          </div>
          <div className="stat-card-content">
            <span className="stat-card-label">Overdue</span>
            <span className="stat-card-value">{formatCurrency(stats.overdue)}</span>
            <span className="stat-card-subtitle">{invoices.filter(i => i.status === 'overdue').length} invoices</span>
          </div>
        </motion.div>

        <motion.div 
          className="payment-stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-card-icon success">
            <CreditCard size={24} />
          </div>
          <div className="stat-card-content">
            <span className="stat-card-label">This Month</span>
            <span className="stat-card-value">{formatCurrency(stats.thisMonth)}</span>
            <div className="stat-card-change positive">
              <TrendingUp size={14} />
              <span>On track</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="payments-content">
        {/* Invoices Section */}
        <div className="invoices-section">
          <div className="section-header">
            <h3>Invoices</h3>
            <div className="section-actions">
              <div className="search-wrapper">
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search invoices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
                <Plus size={16} />
                Create Invoice
              </button>
            </div>
          </div>

          <div className="filter-pills">
            {['all', 'draft', 'pending', 'paid', 'overdue'].map((status) => (
              <button
                key={status}
                className={`filter-pill ${filter === status ? 'active' : ''}`}
                onClick={() => setFilter(status)}
              >
                {status === 'all' ? 'All' : statusConfig[status]?.label || status}
                {status !== 'all' && (
                  <span className="filter-count">
                    {invoices.filter(i => i.status === status).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="invoices-list">
            <AnimatePresence>
              {filteredInvoices.map((invoice, index) => (
                <motion.div
                  key={invoice.id}
                  className="invoice-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => setSelectedInvoice(invoice)}
                >
                  <div className="invoice-main">
                    <div className="invoice-info">
                      <div className="invoice-header">
                        <span className="invoice-id">{invoice.id}</span>
                        <div className={`invoice-status status-${invoice.status}`}>
                          {(() => {
                            const StatusIcon = statusConfig[invoice.status].icon
                            return <StatusIcon size={12} />
                          })()}
                          <span>{statusConfig[invoice.status].label}</span>
                        </div>
                      </div>
                      <span className="invoice-client">{invoice.client}</span>
                      <span className="invoice-project">{invoice.project}</span>
                    </div>
                    <div className="invoice-amount">
                      <span className="amount-value">{formatCurrency(invoice.amount)}</span>
                      <span className="amount-due">
                        Due {new Date(invoice.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="invoice-actions">
                    {invoice.status === 'draft' && (
                      <button className="btn btn-sm btn-primary">
                        <Send size={14} />
                        Send
                      </button>
                    )}
                    {invoice.status === 'pending' && (
                      <button className="btn btn-sm btn-secondary">
                        <AlertCircle size={14} />
                        Remind
                      </button>
                    )}
                    {invoice.status === 'overdue' && (
                      <button className="btn btn-sm btn-secondary">
                        <Send size={14} />
                        Resend
                      </button>
                    )}
                    <button className="btn btn-sm btn-ghost">
                      <Eye size={14} />
                    </button>
                    <button className="btn btn-sm btn-ghost">
                      <Download size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="transactions-section">
          <div className="section-header">
            <h3>Recent Transactions</h3>
            <button className="btn btn-ghost btn-sm">View All</button>
          </div>
          <div className="transactions-list">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                className="transaction-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={`transaction-icon ${transaction.type}`}>
                  {transaction.type === 'incoming' ? (
                    <ArrowDownRight size={16} />
                  ) : (
                    <ArrowUpRight size={16} />
                  )}
                </div>
                <div className="transaction-info">
                  <span className="transaction-desc">{transaction.description}</span>
                  <span className="transaction-date">
                    {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <span className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'incoming' ? '+' : ''}{formatCurrency(transaction.amount)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      <AnimatePresence>
        {selectedInvoice && (
          <motion.div 
            className="invoice-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedInvoice(null)}
          >
            <motion.div 
              className="invoice-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <div className="modal-title-row">
                    <Receipt size={24} />
                    <h2>{selectedInvoice.id}</h2>
                    <div className={`invoice-status status-${selectedInvoice.status}`}>
                      {statusConfig[selectedInvoice.status].label}
                    </div>
                  </div>
                  <p className="modal-subtitle">{selectedInvoice.client}</p>
                </div>
                <button className="btn btn-icon btn-ghost" onClick={() => setSelectedInvoice(null)}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body">
                <div className="invoice-preview">
                  <div className="invoice-preview-header">
                    <div className="invoice-from">
                      <strong>From</strong>
                      <span>DevHub Studio</span>
                      <span>jessica@devhub.studio</span>
                    </div>
                    <div className="invoice-to">
                      <strong>To</strong>
                      <span>{selectedInvoice.client}</span>
                      <span>{selectedInvoice.clientEmail}</span>
                    </div>
                  </div>

                  <div className="invoice-details-grid">
                    <div className="invoice-detail">
                      <span className="detail-label">Invoice Date</span>
                      <span className="detail-value">
                        {new Date(selectedInvoice.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="invoice-detail">
                      <span className="detail-label">Due Date</span>
                      <span className="detail-value">
                        {new Date(selectedInvoice.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    {selectedInvoice.paidDate && (
                      <div className="invoice-detail">
                        <span className="detail-label">Paid Date</span>
                        <span className="detail-value">
                          {new Date(selectedInvoice.paidDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="invoice-line-items">
                    <div className="line-item-header">
                      <span>Description</span>
                      <span>Amount</span>
                    </div>
                    <div className="line-item">
                      <span>{selectedInvoice.project}</span>
                      <span>{formatCurrency(selectedInvoice.amount)}</span>
                    </div>
                    <div className="line-item-total">
                      <span>Total</span>
                      <span>{formatCurrency(selectedInvoice.amount)}</span>
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="btn btn-secondary">
                    <Copy size={16} />
                    Copy Link
                  </button>
                  <button className="btn btn-secondary">
                    <Download size={16} />
                    Download PDF
                  </button>
                  {selectedInvoice.status === 'draft' && (
                    <button className="btn btn-primary">
                      <Send size={16} />
                      Send Invoice
                    </button>
                  )}
                  {(selectedInvoice.status === 'pending' || selectedInvoice.status === 'overdue') && (
                    <button className="btn btn-primary">
                      <ExternalLink size={16} />
                      View Payment Page
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Invoice Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div 
            className="create-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div 
              className="create-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Create Invoice</h2>
                <button className="btn btn-icon btn-ghost" onClick={() => setShowCreateModal(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label>Client</label>
                  <select>
                    <option>Select a client...</option>
                    <option>TechCorp Inc.</option>
                    <option>StartupXYZ</option>
                    <option>Creative Studios</option>
                    <option>Enterprise Corp</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Project</label>
                  <input type="text" placeholder="Project name or description" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Amount</label>
                    <div className="input-with-prefix">
                      <span className="input-prefix">$</span>
                      <input type="number" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Due Date</label>
                    <input type="date" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Notes (Optional)</label>
                  <textarea placeholder="Add any notes or payment terms..."></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-secondary">
                  Save as Draft
                </button>
                <button className="btn btn-primary">
                  <Send size={16} />
                  Create & Send
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Payments

