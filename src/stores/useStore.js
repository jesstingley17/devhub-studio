import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Projects Store
export const useProjectStore = create(
  persist(
    (set, get) => ({
      projects: [
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
          team: ['https://api.dicebear.com/7.x/avataaars/svg?seed=Casey'],
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
          team: ['https://api.dicebear.com/7.x/avataaars/svg?seed=Quinn'],
          tags: ['Dashboard', 'Data Viz', 'React'],
          color: '#fbbf24'
        }
      ],
      
      addProject: (project) => set((state) => ({
        projects: [...state.projects, { ...project, id: Date.now() }]
      })),
      
      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map(p => p.id === id ? { ...p, ...updates } : p)
      })),
      
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter(p => p.id !== id)
      })),
      
      reorderProjects: (newOrder) => set({ projects: newOrder })
    }),
    { name: 'devhub-projects' }
  )
)

// Clients Store
export const useClientStore = create(
  persist(
    (set) => ({
      clients: [
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
      ],
      
      addClient: (client) => set((state) => ({
        clients: [...state.clients, { ...client, id: Date.now() }]
      })),
      
      updateClient: (id, updates) => set((state) => ({
        clients: state.clients.map(c => c.id === id ? { ...c, ...updates } : c)
      })),
      
      deleteClient: (id) => set((state) => ({
        clients: state.clients.filter(c => c.id !== id)
      })),
      
      toggleStarClient: (id) => set((state) => ({
        clients: state.clients.map(c => c.id === id ? { ...c, starred: !c.starred } : c)
      }))
    }),
    { name: 'devhub-clients' }
  )
)

// Invoices Store
export const useInvoiceStore = create(
  persist(
    (set) => ({
      invoices: [
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
      ],
      
      addInvoice: (invoice) => set((state) => ({
        invoices: [...state.invoices, { ...invoice, id: `INV-${Date.now()}` }]
      })),
      
      updateInvoice: (id, updates) => set((state) => ({
        invoices: state.invoices.map(i => i.id === id ? { ...i, ...updates } : i)
      })),
      
      deleteInvoice: (id) => set((state) => ({
        invoices: state.invoices.filter(i => i.id !== id)
      }))
    }),
    { name: 'devhub-invoices' }
  )
)

// Notes Store
export const useNoteStore = create(
  persist(
    (set) => ({
      notes: [
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
      ],
      
      addNote: (note) => set((state) => ({
        notes: [...state.notes, { ...note, id: Date.now() }]
      })),
      
      updateNote: (id, updates) => set((state) => ({
        notes: state.notes.map(n => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : n)
      })),
      
      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter(n => n.id !== id)
      })),
      
      toggleStarNote: (id) => set((state) => ({
        notes: state.notes.map(n => n.id === id ? { ...n, starred: !n.starred } : n)
      })),
      
      toggleBlockCheck: (noteId, blockId) => set((state) => ({
        notes: state.notes.map(note => {
          if (note.id === noteId) {
            return {
              ...note,
              blocks: note.blocks.map(block =>
                block.id === blockId ? { ...block, checked: !block.checked } : block
              )
            }
          }
          return note
        })
      })),
      
      addBlock: (noteId, block) => set((state) => ({
        notes: state.notes.map(note => {
          if (note.id === noteId) {
            return {
              ...note,
              blocks: [...note.blocks, { ...block, id: `b${Date.now()}` }]
            }
          }
          return note
        })
      })),
      
      reorderBlocks: (noteId, newBlocks) => set((state) => ({
        notes: state.notes.map(note => 
          note.id === noteId ? { ...note, blocks: newBlocks } : note
        )
      }))
    }),
    { name: 'devhub-notes' }
  )
)

// Documents Store
export const useDocumentStore = create(
  persist(
    (set) => ({
      documents: [
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
      ],
      
      addDocument: (doc) => set((state) => ({
        documents: [...state.documents, { ...doc, id: Date.now() }]
      })),
      
      updateDocument: (id, updates) => set((state) => ({
        documents: state.documents.map(d => d.id === id ? { ...d, ...updates } : d)
      })),
      
      deleteDocument: (id) => set((state) => ({
        documents: state.documents.filter(d => d.id !== id)
      }))
    }),
    { name: 'devhub-documents' }
  )
)

// UI Store (for global UI state)
export const useUIStore = create((set) => ({
  sidebarCollapsed: false,
  searchOpen: false,
  theme: 'dark',
  
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSearchOpen: (open) => set({ searchOpen: open }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setTheme: (theme) => set({ theme })
}))

