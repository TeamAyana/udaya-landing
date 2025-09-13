'use client'

import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { useState, useRef, useEffect } from 'react'

export function ResizableImageComponent(props: NodeViewProps) {
  const { node, updateAttributes } = props
  const [isResizing, setIsResizing] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent, direction: string) => {
    e.preventDefault()
    setIsResizing(true)

    const startX = e.clientX
    const startY = e.clientY
    const startWidth = imageRef.current?.offsetWidth || 0
    const startHeight = imageRef.current?.offsetHeight || 0

    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return

      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY

      let newWidth = startWidth
      let newHeight = startHeight

      if (direction.includes('right')) {
        newWidth = startWidth + deltaX
      }
      if (direction.includes('left')) {
        newWidth = startWidth - deltaX
      }
      if (direction.includes('bottom')) {
        newHeight = startHeight + deltaY
      }
      if (direction.includes('top')) {
        newHeight = startHeight - deltaY
      }

      // Maintain aspect ratio when resizing from corners
      if (direction.length > 6) { // corner handles
        const aspectRatio = startWidth / startHeight
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          newHeight = newWidth / aspectRatio
        } else {
          newWidth = newHeight * aspectRatio
        }
      }

      // Minimum size constraints
      newWidth = Math.max(100, newWidth)
      newHeight = Math.max(100, newHeight)

      updateAttributes({
        width: Math.round(newWidth),
        height: Math.round(newHeight)
      })
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const width = node.attrs.width || 'auto'
  const height = node.attrs.height || 'auto'

  return (
    <NodeViewWrapper className="relative inline-block">
      <div 
        ref={containerRef}
        className="relative group"
        style={{ display: 'inline-block' }}
      >
        <img
          ref={imageRef}
          src={node.attrs.src}
          alt={node.attrs.alt || ''}
          title={node.attrs.title || ''}
          width={width}
          height={height}
          className="max-w-full h-auto"
          draggable={false}
        />

        {/* Resize handles */}
        <div className="absolute inset-0 pointer-events-none group-hover:pointer-events-auto">
          {/* Corner handles */}
          <div
            className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 cursor-nw-resize opacity-0 group-hover:opacity-100"
            onMouseDown={(e) => handleMouseDown(e, 'top-left')}
          />
          <div
            className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 cursor-ne-resize opacity-0 group-hover:opacity-100"
            onMouseDown={(e) => handleMouseDown(e, 'top-right')}
          />
          <div
            className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 cursor-sw-resize opacity-0 group-hover:opacity-100"
            onMouseDown={(e) => handleMouseDown(e, 'bottom-left')}
          />
          <div
            className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 cursor-se-resize opacity-0 group-hover:opacity-100"
            onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}
          />

          {/* Edge handles */}
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 cursor-n-resize opacity-0 group-hover:opacity-100"
            onMouseDown={(e) => handleMouseDown(e, 'top')}
          />
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 cursor-s-resize opacity-0 group-hover:opacity-100"
            onMouseDown={(e) => handleMouseDown(e, 'bottom')}
          />
          <div
            className="absolute top-1/2 -left-1 -translate-y-1/2 w-3 h-3 bg-blue-500 cursor-w-resize opacity-0 group-hover:opacity-100"
            onMouseDown={(e) => handleMouseDown(e, 'left')}
          />
          <div
            className="absolute top-1/2 -right-1 -translate-y-1/2 w-3 h-3 bg-blue-500 cursor-e-resize opacity-0 group-hover:opacity-100"
            onMouseDown={(e) => handleMouseDown(e, 'right')}
          />
        </div>

        {/* Size indicator */}
        {isResizing && (
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
            {Math.round(Number(width))} × {Math.round(Number(height))}
          </div>
        )}
      </div>
    </NodeViewWrapper>
  )
}