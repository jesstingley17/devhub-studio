import { motion } from 'framer-motion'
import {
  FolderKanban,
  FileSignature,
  Lightbulb,
  CreditCard,
  Users,
  Search,
  Plus,
  Inbox
} from 'lucide-react'
import './EmptyState.css'

const illustrations = {
  projects: FolderKanban,
  documents: FileSignature,
  ideas: Lightbulb,
  payments: CreditCard,
  clients: Users,
  search: Search,
  inbox: Inbox,
  default: Inbox
}

export default function EmptyState({
  type = 'default',
  icon: CustomIcon,
  title,
  description,
  action,
  actionLabel,
  onAction
}) {
  const Icon = CustomIcon || illustrations[type] || illustrations.default

  const defaultContent = {
    projects: {
      title: 'No projects yet',
      description: 'Create your first project to start tracking work and collaborating with clients.'
    },
    documents: {
      title: 'No documents found',
      description: 'Upload or create documents to manage contracts, proposals, and agreements.'
    },
    ideas: {
      title: 'Start capturing ideas',
      description: 'Create notes to organize your thoughts, meeting notes, and project ideas.'
    },
    payments: {
      title: 'No invoices yet',
      description: 'Create your first invoice to start tracking payments and revenue.'
    },
    clients: {
      title: 'No clients added',
      description: 'Add your first client to manage contacts and track project history.'
    },
    search: {
      title: 'No results found',
      description: 'Try adjusting your search or filters to find what you\'re looking for.'
    },
    default: {
      title: 'Nothing here yet',
      description: 'Get started by adding some content.'
    }
  }

  const content = defaultContent[type] || defaultContent.default

  return (
    <motion.div
      className="empty-state"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="empty-state-icon"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
      >
        <Icon size={48} />
      </motion.div>
      
      <motion.h3
        className="empty-state-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title || content.title}
      </motion.h3>
      
      <motion.p
        className="empty-state-description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {description || content.description}
      </motion.p>
      
      {(action || onAction) && (
        <motion.button
          className="btn btn-primary empty-state-action"
          onClick={onAction}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={16} />
          {actionLabel || action || 'Get Started'}
        </motion.button>
      )}
    </motion.div>
  )
}

// Inline empty state for smaller areas
export function InlineEmptyState({ icon: Icon = Inbox, message }) {
  return (
    <div className="inline-empty-state">
      <Icon size={20} />
      <span>{message}</span>
    </div>
  )
}

// Search empty state
export function SearchEmptyState({ query }) {
  return (
    <EmptyState
      type="search"
      title={`No results for "${query}"`}
      description="Try different keywords or check your spelling."
    />
  )
}

