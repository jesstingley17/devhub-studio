import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  FolderKanban,
  FileCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  Circle,
  AlertCircle,
  Calendar,
  MoreHorizontal,
  Sparkles
} from 'lucide-react'
import './Dashboard.css'

const stats = [
  {
    label: 'Revenue This Month',
    value: '$12,450',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'success'
  },
  {
    label: 'Active Projects',
    value: '8',
    change: '+2',
    trend: 'up',
    icon: FolderKanban,
    color: 'info'
  },
  {
    label: 'Documents Pending',
    value: '3',
    change: '-1',
    trend: 'down',
    icon: FileCheck,
    color: 'warning'
  },
  {
    label: 'Active Clients',
    value: '12',
    change: '+3',
    trend: 'up',
    icon: Users,
    color: 'accent'
  },
]

const recentProjects = [
  {
    id: 1,
    name: 'E-commerce Platform Redesign',
    client: 'TechCorp Inc.',
    status: 'In Progress',
    progress: 65,
    dueDate: 'Dec 15, 2024',
    color: '#f87171'
  },
  {
    id: 2,
    name: 'Mobile App Development',
    client: 'StartupXYZ',
    status: 'Review',
    progress: 90,
    dueDate: 'Dec 8, 2024',
    color: '#34d399'
  },
  {
    id: 3,
    name: 'Brand Identity System',
    client: 'Creative Studios',
    status: 'In Progress',
    progress: 40,
    dueDate: 'Dec 22, 2024',
    color: '#60a5fa'
  },
]

const upcomingTasks = [
  {
    id: 1,
    title: 'Client call - TechCorp',
    time: '10:00 AM',
    type: 'meeting',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Review design mockups',
    time: '2:00 PM',
    type: 'task',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Send project proposal',
    time: '4:30 PM',
    type: 'task',
    priority: 'high'
  },
  {
    id: 4,
    title: 'Team standup',
    time: '5:00 PM',
    type: 'meeting',
    priority: 'low'
  },
]

const recentActivity = [
  {
    id: 1,
    action: 'Document signed',
    details: 'Service Agreement - TechCorp',
    time: '2 hours ago',
    icon: FileCheck,
    color: 'success'
  },
  {
    id: 2,
    action: 'Payment received',
    details: '$3,500 from StartupXYZ',
    time: '5 hours ago',
    icon: DollarSign,
    color: 'success'
  },
  {
    id: 3,
    action: 'New client added',
    details: 'Sarah Miller - Freelance',
    time: 'Yesterday',
    icon: Users,
    color: 'info'
  },
  {
    id: 4,
    action: 'Project milestone',
    details: 'E-commerce - Phase 2 complete',
    time: 'Yesterday',
    icon: CheckCircle2,
    color: 'accent'
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

function Dashboard() {
  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <motion.div 
        className="welcome-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="welcome-content">
          <div className="welcome-text">
            <span className="welcome-greeting">Good morning, Jessica ✨</span>
            <h2 className="welcome-headline">Here's your workspace overview</h2>
            <p className="welcome-subtitle">
              You have <strong>3 tasks</strong> due today and <strong>2 meetings</strong> scheduled
            </p>
          </div>
          <div className="welcome-actions">
            <button className="btn btn-primary">
              <Sparkles size={16} />
              Quick Create
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="stats-grid"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            className={`stat-card stat-${stat.color}`}
            variants={item}
          >
            <div className="stat-header">
              <div className={`stat-icon stat-icon-${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className={`stat-change ${stat.trend}`}>
                {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.change}
              </span>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Recent Projects */}
        <motion.div 
          className="dashboard-card projects-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="card-header">
            <h3>Active Projects</h3>
            <button className="btn btn-ghost">
              View all <ArrowRight size={14} />
            </button>
          </div>
          <div className="projects-list">
            {recentProjects.map((project) => (
              <div key={project.id} className="project-item">
                <div className="project-color" style={{ background: project.color }}></div>
                <div className="project-info">
                  <div className="project-header">
                    <span className="project-name">{project.name}</span>
                    <span className={`project-status status-${project.status.toLowerCase().replace(' ', '-')}`}>
                      {project.status}
                    </span>
                  </div>
                  <span className="project-client">{project.client}</span>
                  <div className="project-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${project.progress}%`, background: project.color }}
                      ></div>
                    </div>
                    <span className="progress-text">{project.progress}%</span>
                  </div>
                </div>
                <div className="project-meta">
                  <Clock size={12} />
                  <span>{project.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Today's Schedule */}
        <motion.div 
          className="dashboard-card schedule-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="card-header">
            <h3>Today's Schedule</h3>
            <div className="today-date">
              <Calendar size={14} />
              <span>December 4, 2024</span>
            </div>
          </div>
          <div className="tasks-list">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="task-item">
                <div className={`task-priority priority-${task.priority}`}>
                  {task.type === 'meeting' ? (
                    <Circle size={16} />
                  ) : (
                    <CheckCircle2 size={16} />
                  )}
                </div>
                <div className="task-info">
                  <span className="task-title">{task.title}</span>
                  <span className="task-time">{task.time}</span>
                </div>
                <button className="btn btn-icon btn-ghost">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            ))}
          </div>
          <button className="btn btn-secondary add-task-btn">
            Add Task
          </button>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          className="dashboard-card activity-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="card-header">
            <h3>Recent Activity</h3>
            <button className="btn btn-ghost">
              See all <ArrowRight size={14} />
            </button>
          </div>
          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-icon activity-icon-${activity.color}`}>
                  <activity.icon size={14} />
                </div>
                <div className="activity-info">
                  <span className="activity-action">{activity.action}</span>
                  <span className="activity-details">{activity.details}</span>
                </div>
                <span className="activity-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="dashboard-card quick-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="quick-actions-grid">
            <button className="quick-action-item">
              <div className="quick-action-icon">
                <FolderKanban size={20} />
              </div>
              <span>New Project</span>
            </button>
            <button className="quick-action-item">
              <div className="quick-action-icon">
                <FileCheck size={20} />
              </div>
              <span>Create Invoice</span>
            </button>
            <button className="quick-action-item">
              <div className="quick-action-icon">
                <Users size={20} />
              </div>
              <span>Add Client</span>
            </button>
            <button className="quick-action-item">
              <div className="quick-action-icon">
                <AlertCircle size={20} />
              </div>
              <span>Send Reminder</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard

