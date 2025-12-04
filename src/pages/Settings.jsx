import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Bell,
  Lock,
  CreditCard,
  Palette,
  Globe,
  Link2,
  Mail,
  Shield,
  Smartphone,
  Download,
  Trash2,
  ChevronRight,
  Check,
  Camera
} from 'lucide-react'
import './Settings.css'

const settingsSections = [
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'security', icon: Lock, label: 'Security' },
  { id: 'billing', icon: CreditCard, label: 'Billing' },
  { id: 'appearance', icon: Palette, label: 'Appearance' },
  { id: 'integrations', icon: Link2, label: 'Integrations' },
]

const integrations = [
  { id: 'stripe', name: 'Stripe', description: 'Payment processing', connected: true, icon: '💳' },
  { id: 'google', name: 'Google Calendar', description: 'Calendar sync', connected: true, icon: '📅' },
  { id: 'slack', name: 'Slack', description: 'Team notifications', connected: false, icon: '💬' },
  { id: 'github', name: 'GitHub', description: 'Repository access', connected: true, icon: '🐙' },
  { id: 'figma', name: 'Figma', description: 'Design imports', connected: false, icon: '🎨' },
  { id: 'notion', name: 'Notion', description: 'Documentation sync', connected: false, icon: '📝' },
]

function Settings() {
  const [activeSection, setActiveSection] = useState('profile')
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    projectUpdates: true,
    clientMessages: true,
    paymentAlerts: true,
    weeklyDigest: false
  })

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="settings-page">
      {/* Sidebar */}
      <div className="settings-sidebar">
        <nav className="settings-nav">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <section.icon size={18} />
              <span>{section.label}</span>
              <ChevronRight size={16} className="nav-arrow" />
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="settings-content">
        {/* Profile Section */}
        {activeSection === 'profile' && (
          <motion.div
            className="settings-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="section-header">
              <h2>Profile Settings</h2>
              <p>Manage your personal information and public profile</p>
            </div>

            <div className="profile-card">
              <div className="profile-avatar-section">
                <div className="profile-avatar">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica" alt="Profile" />
                  <button className="avatar-edit-btn">
                    <Camera size={16} />
                  </button>
                </div>
                <div className="profile-avatar-info">
                  <h3>Jessica Leetingley</h3>
                  <span>jessica@devhub.studio</span>
                </div>
              </div>
            </div>

            <div className="settings-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" defaultValue="Jessica" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" defaultValue="Leetingley" />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" defaultValue="jessica@devhub.studio" />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea defaultValue="Full-stack web developer specializing in React and Node.js. Passionate about creating beautiful, user-friendly applications."></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Website</label>
                  <input type="url" defaultValue="https://devhub.studio" />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" defaultValue="San Francisco, CA" />
                </div>
              </div>

              <div className="form-actions">
                <button className="btn btn-secondary">Cancel</button>
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Notifications Section */}
        {activeSection === 'notifications' && (
          <motion.div
            className="settings-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="section-header">
              <h2>Notification Preferences</h2>
              <p>Choose how you want to be notified</p>
            </div>

            <div className="settings-group">
              <h3>Notification Channels</h3>
              <div className="toggle-list">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <Mail size={18} />
                    <div>
                      <span className="toggle-label">Email Notifications</span>
                      <span className="toggle-desc">Receive updates via email</span>
                    </div>
                  </div>
                  <button 
                    className={`toggle-switch ${notifications.email ? 'active' : ''}`}
                    onClick={() => toggleNotification('email')}
                  >
                    <span className="toggle-knob"></span>
                  </button>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <Bell size={18} />
                    <div>
                      <span className="toggle-label">Push Notifications</span>
                      <span className="toggle-desc">Browser and desktop alerts</span>
                    </div>
                  </div>
                  <button 
                    className={`toggle-switch ${notifications.push ? 'active' : ''}`}
                    onClick={() => toggleNotification('push')}
                  >
                    <span className="toggle-knob"></span>
                  </button>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <Smartphone size={18} />
                    <div>
                      <span className="toggle-label">SMS Notifications</span>
                      <span className="toggle-desc">Text message alerts</span>
                    </div>
                  </div>
                  <button 
                    className={`toggle-switch ${notifications.sms ? 'active' : ''}`}
                    onClick={() => toggleNotification('sms')}
                  >
                    <span className="toggle-knob"></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h3>Notification Types</h3>
              <div className="toggle-list">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <div>
                      <span className="toggle-label">Project Updates</span>
                      <span className="toggle-desc">Changes to your projects</span>
                    </div>
                  </div>
                  <button 
                    className={`toggle-switch ${notifications.projectUpdates ? 'active' : ''}`}
                    onClick={() => toggleNotification('projectUpdates')}
                  >
                    <span className="toggle-knob"></span>
                  </button>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <div>
                      <span className="toggle-label">Client Messages</span>
                      <span className="toggle-desc">New messages from clients</span>
                    </div>
                  </div>
                  <button 
                    className={`toggle-switch ${notifications.clientMessages ? 'active' : ''}`}
                    onClick={() => toggleNotification('clientMessages')}
                  >
                    <span className="toggle-knob"></span>
                  </button>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <div>
                      <span className="toggle-label">Payment Alerts</span>
                      <span className="toggle-desc">Invoice and payment updates</span>
                    </div>
                  </div>
                  <button 
                    className={`toggle-switch ${notifications.paymentAlerts ? 'active' : ''}`}
                    onClick={() => toggleNotification('paymentAlerts')}
                  >
                    <span className="toggle-knob"></span>
                  </button>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <div>
                      <span className="toggle-label">Weekly Digest</span>
                      <span className="toggle-desc">Summary of your week</span>
                    </div>
                  </div>
                  <button 
                    className={`toggle-switch ${notifications.weeklyDigest ? 'active' : ''}`}
                    onClick={() => toggleNotification('weeklyDigest')}
                  >
                    <span className="toggle-knob"></span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Security Section */}
        {activeSection === 'security' && (
          <motion.div
            className="settings-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="section-header">
              <h2>Security Settings</h2>
              <p>Protect your account and data</p>
            </div>

            <div className="settings-group">
              <h3>Password</h3>
              <div className="settings-form compact">
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>New Password</label>
                    <input type="password" placeholder="••••••••" />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" placeholder="••••••••" />
                  </div>
                </div>
                <button className="btn btn-secondary">Update Password</button>
              </div>
            </div>

            <div className="settings-group">
              <h3>Two-Factor Authentication</h3>
              <div className="security-card">
                <div className="security-card-info">
                  <Shield size={24} />
                  <div>
                    <span className="security-card-title">2FA is enabled</span>
                    <span className="security-card-desc">Your account is protected with authenticator app</span>
                  </div>
                </div>
                <button className="btn btn-secondary">Manage</button>
              </div>
            </div>

            <div className="settings-group">
              <h3>Sessions</h3>
              <div className="sessions-list">
                <div className="session-item current">
                  <div className="session-info">
                    <span className="session-device">MacBook Pro • San Francisco</span>
                    <span className="session-time">Current session</span>
                  </div>
                  <span className="session-badge">Active</span>
                </div>
                <div className="session-item">
                  <div className="session-info">
                    <span className="session-device">iPhone 15 • San Francisco</span>
                    <span className="session-time">Last active 2 hours ago</span>
                  </div>
                  <button className="btn btn-ghost btn-sm">Revoke</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Billing Section */}
        {activeSection === 'billing' && (
          <motion.div
            className="settings-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="section-header">
              <h2>Billing & Subscription</h2>
              <p>Manage your subscription and payment methods</p>
            </div>

            <div className="plan-card">
              <div className="plan-info">
                <span className="plan-badge">Pro Plan</span>
                <h3>$29/month</h3>
                <p>Unlimited projects, clients, and storage</p>
              </div>
              <button className="btn btn-secondary">Upgrade Plan</button>
            </div>

            <div className="settings-group">
              <h3>Payment Method</h3>
              <div className="payment-method">
                <div className="card-icon">💳</div>
                <div className="card-info">
                  <span className="card-number">•••• •••• •••• 4242</span>
                  <span className="card-expiry">Expires 12/25</span>
                </div>
                <button className="btn btn-ghost">Edit</button>
              </div>
            </div>

            <div className="settings-group">
              <h3>Billing History</h3>
              <div className="billing-list">
                <div className="billing-item">
                  <div className="billing-info">
                    <span className="billing-date">Dec 1, 2024</span>
                    <span className="billing-desc">Pro Plan - Monthly</span>
                  </div>
                  <span className="billing-amount">$29.00</span>
                  <button className="btn btn-ghost btn-sm">
                    <Download size={14} />
                  </button>
                </div>
                <div className="billing-item">
                  <div className="billing-info">
                    <span className="billing-date">Nov 1, 2024</span>
                    <span className="billing-desc">Pro Plan - Monthly</span>
                  </div>
                  <span className="billing-amount">$29.00</span>
                  <button className="btn btn-ghost btn-sm">
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Appearance Section */}
        {activeSection === 'appearance' && (
          <motion.div
            className="settings-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="section-header">
              <h2>Appearance</h2>
              <p>Customize how DevHub looks for you</p>
            </div>

            <div className="settings-group">
              <h3>Theme</h3>
              <div className="theme-options">
                <div className="theme-option active">
                  <div className="theme-preview dark"></div>
                  <span>Dark</span>
                  <Check size={16} className="theme-check" />
                </div>
                <div className="theme-option">
                  <div className="theme-preview light"></div>
                  <span>Light</span>
                </div>
                <div className="theme-option">
                  <div className="theme-preview system"></div>
                  <span>System</span>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h3>Accent Color</h3>
              <div className="color-options">
                <button className="color-option active" style={{ background: '#6366f1' }}></button>
                <button className="color-option" style={{ background: '#8b5cf6' }}></button>
                <button className="color-option" style={{ background: '#ec4899' }}></button>
                <button className="color-option" style={{ background: '#f59e0b' }}></button>
                <button className="color-option" style={{ background: '#10b981' }}></button>
                <button className="color-option" style={{ background: '#3b82f6' }}></button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Integrations Section */}
        {activeSection === 'integrations' && (
          <motion.div
            className="settings-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="section-header">
              <h2>Integrations</h2>
              <p>Connect your favorite tools and services</p>
            </div>

            <div className="integrations-grid">
              {integrations.map((integration) => (
                <div key={integration.id} className="integration-card">
                  <div className="integration-icon">{integration.icon}</div>
                  <div className="integration-info">
                    <span className="integration-name">{integration.name}</span>
                    <span className="integration-desc">{integration.description}</span>
                  </div>
                  <button className={`btn ${integration.connected ? 'btn-secondary' : 'btn-primary'}`}>
                    {integration.connected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Settings

