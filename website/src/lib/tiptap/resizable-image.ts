import Image from '@tiptap/extension-image'
import { mergeAttributes, nodeInputRule } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

export interface ImageOptions {
  inline: boolean
  allowBase64: boolean
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      setImage: (options: { src: string; alt?: string; title?: string; width?: number; height?: number }) => ReturnType
    }
  }
}

const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/

export const ResizableImage = Image.extend<ImageOptions>({
  name: 'image',

  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
    }
  },

  inline() {
    return this.options.inline
  },

  group() {
    return this.options.inline ? 'inline' : 'block'
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
      style: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: this.options.allowBase64
          ? 'img[src]'
          : 'img[src]:not([src^="data:"])',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addCommands() {
    return {
      setImage: options => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        })
      },
    }
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: match => {
          const [, , alt, src, title] = match

          return { src, alt, title }
        },
      }),
    ]
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('imageResize'),
        props: {
          decorations(state) {
            const { doc, selection } = state
            const decorations: Decoration[] = []
            const { from, to } = selection

            doc.nodesBetween(from, to, (node, pos) => {
              if (node.type.name === 'image') {
                decorations.push(
                  Decoration.node(pos, pos + node.nodeSize, {
                    class: 'image-resizable',
                  })
                )
              }
            })

            return DecorationSet.create(doc, decorations)
          },
          handleDOMEvents: {
            mousedown(view, event) {
              const target = event.target as HTMLElement
              
              if (target.nodeName === 'IMG' && target.classList.contains('image-resizable')) {
                const startX = event.clientX
                const startY = event.clientY
                const startWidth = target.offsetWidth
                const startHeight = target.offsetHeight
                const aspectRatio = startWidth / startHeight

                const handleMouseMove = (e: MouseEvent) => {
                  const width = startWidth + (e.clientX - startX)
                  const height = width / aspectRatio
                  
                  target.style.width = `${width}px`
                  target.style.height = `${height}px`
                }

                const handleMouseUp = (e: MouseEvent) => {
                  const width = startWidth + (e.clientX - startX)
                  const height = width / aspectRatio
                  
                  const pos = view.posAtDOM(target, 0)
                  const node = view.state.doc.nodeAt(pos)
                  
                  if (node && node.type.name === 'image') {
                    const transaction = view.state.tr.setNodeMarkup(pos, null, {
                      ...node.attrs,
                      width: Math.round(width),
                      height: Math.round(height),
                      style: `width: ${Math.round(width)}px; height: ${Math.round(height)}px;`
                    })
                    
                    view.dispatch(transaction)
                  }
                  
                  document.removeEventListener('mousemove', handleMouseMove)
                  document.removeEventListener('mouseup', handleMouseUp)
                }

                // Check if resize handle was clicked
                const rect = target.getBoundingClientRect()
                const cornerSize = 20
                const isCorner = (
                  (event.clientX >= rect.right - cornerSize && event.clientY >= rect.bottom - cornerSize) ||
                  (event.clientX >= rect.right - cornerSize && event.clientY <= rect.top + cornerSize) ||
                  (event.clientX <= rect.left + cornerSize && event.clientY >= rect.bottom - cornerSize) ||
                  (event.clientX <= rect.left + cornerSize && event.clientY <= rect.top + cornerSize)
                )

                if (isCorner) {
                  event.preventDefault()
                  document.addEventListener('mousemove', handleMouseMove)
                  document.addEventListener('mouseup', handleMouseUp)
                  return true
                }
              }
              
              return false
            },
          },
        },
      }),
    ]
  },
})