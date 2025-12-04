import './Skeleton.css'

// Basic skeleton shapes
export function Skeleton({ width, height, borderRadius = 'var(--radius-md)', className = '' }) {
  return (
    <div 
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius }}
    />
  )
}

// Card skeleton
export function SkeletonCard({ className = '' }) {
  return (
    <div className={`skeleton-card ${className}`}>
      <div className="skeleton-card-header">
        <Skeleton width={48} height={48} borderRadius="var(--radius-lg)" />
        <div className="skeleton-card-header-text">
          <Skeleton width="60%" height={16} />
          <Skeleton width="40%" height={12} />
        </div>
      </div>
      <Skeleton width="100%" height={14} />
      <Skeleton width="80%" height={14} />
      <div className="skeleton-card-footer">
        <Skeleton width={80} height={24} borderRadius="var(--radius-full)" />
        <Skeleton width={60} height={24} borderRadius="var(--radius-full)" />
      </div>
    </div>
  )
}

// Table row skeleton
export function SkeletonTableRow() {
  return (
    <tr className="skeleton-table-row">
      <td>
        <div className="skeleton-cell-flex">
          <Skeleton width={40} height={40} borderRadius="var(--radius-md)" />
          <div>
            <Skeleton width={150} height={14} />
            <Skeleton width={80} height={10} />
          </div>
        </div>
      </td>
      <td><Skeleton width={100} height={14} /></td>
      <td><Skeleton width={70} height={24} borderRadius="var(--radius-full)" /></td>
      <td><Skeleton width={90} height={24} borderRadius="var(--radius-full)" /></td>
      <td><Skeleton width={80} height={14} /></td>
      <td><Skeleton width={24} height={24} borderRadius="var(--radius-md)" /></td>
    </tr>
  )
}

// Stats card skeleton
export function SkeletonStat() {
  return (
    <div className="skeleton-stat">
      <Skeleton width={44} height={44} borderRadius="var(--radius-md)" />
      <div className="skeleton-stat-content">
        <Skeleton width={80} height={28} />
        <Skeleton width={100} height={12} />
      </div>
    </div>
  )
}

// Note item skeleton
export function SkeletonNoteItem() {
  return (
    <div className="skeleton-note-item">
      <Skeleton width={24} height={24} borderRadius="var(--radius-sm)" />
      <Skeleton width="70%" height={14} />
    </div>
  )
}

// List skeleton
export function SkeletonList({ count = 5, children }) {
  return (
    <div className="skeleton-list">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ animationDelay: `${i * 100}ms` }}>
          {children}
        </div>
      ))}
    </div>
  )
}

// Dashboard skeleton
export function DashboardSkeleton() {
  return (
    <div className="dashboard-skeleton">
      {/* Welcome section */}
      <div className="skeleton-welcome">
        <Skeleton width={200} height={16} />
        <Skeleton width={350} height={32} />
        <Skeleton width={280} height={14} />
      </div>
      
      {/* Stats */}
      <div className="skeleton-stats-grid">
        <SkeletonStat />
        <SkeletonStat />
        <SkeletonStat />
        <SkeletonStat />
      </div>
      
      {/* Content */}
      <div className="skeleton-content-grid">
        <div className="skeleton-projects">
          <Skeleton width={120} height={18} />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <div className="skeleton-schedule">
          <Skeleton width={140} height={18} />
          <SkeletonList count={4}>
            <SkeletonNoteItem />
          </SkeletonList>
        </div>
      </div>
    </div>
  )
}

// Projects page skeleton
export function ProjectsSkeleton() {
  return (
    <div className="projects-skeleton">
      <div className="skeleton-header">
        <Skeleton width={280} height={40} borderRadius="var(--radius-md)" />
        <div className="skeleton-filters">
          <Skeleton width={60} height={32} borderRadius="var(--radius-md)" />
          <Skeleton width={80} height={32} borderRadius="var(--radius-md)" />
          <Skeleton width={90} height={32} borderRadius="var(--radius-md)" />
        </div>
      </div>
      <div className="skeleton-projects-grid">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  )
}

