import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  rectSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import './DraggableList.css'

// Sortable Item wrapper
export function SortableItem({ id, children, handle = false }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto'
  }

  if (handle) {
    return (
      <div ref={setNodeRef} style={style} className="sortable-item">
        <div className="drag-handle" {...attributes} {...listeners}>
          <GripVertical size={16} />
        </div>
        {children}
      </div>
    )
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className="sortable-item"
    >
      {children}
    </div>
  )
}

// Drag handle component
export function DragHandle({ listeners, attributes }) {
  return (
    <div className="drag-handle" {...listeners} {...attributes}>
      <GripVertical size={16} />
    </div>
  )
}

// Main DraggableList component
export default function DraggableList({
  items,
  onReorder,
  renderItem,
  keyExtractor = (item) => item.id,
  strategy = 'vertical', // 'vertical' or 'grid'
  handle = false,
  className = ''
}) {
  const [activeId, setActiveId] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8 // Require 8px of movement before starting drag
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const sortingStrategy = strategy === 'grid' 
    ? rectSortingStrategy 
    : verticalListSortingStrategy

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveId(null)

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex(item => keyExtractor(item) === active.id)
      const newIndex = items.findIndex(item => keyExtractor(item) === over.id)
      const newItems = arrayMove(items, oldIndex, newIndex)
      onReorder(newItems)
    }
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  const activeItem = activeId 
    ? items.find(item => keyExtractor(item) === activeId)
    : null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={items.map(keyExtractor)}
        strategy={sortingStrategy}
      >
        <div className={`draggable-list ${strategy} ${className}`}>
          {items.map((item) => (
            <SortableItem 
              key={keyExtractor(item)} 
              id={keyExtractor(item)}
              handle={handle}
            >
              {renderItem(item, keyExtractor(item) === activeId)}
            </SortableItem>
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeItem ? (
          <div className="drag-overlay">
            {renderItem(activeItem, true)}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

// Grid variant
export function DraggableGrid(props) {
  return <DraggableList {...props} strategy="grid" />
}

