'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ResizableImage } from '@/lib/tiptap/resizable-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import CodeBlock from '@tiptap/extension-code-block'
import Placeholder from '@tiptap/extension-placeholder'
import FontFamily from '@tiptap/extension-font-family'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Underline as UnderlineIcon,
  Highlighter,
  Code,
  Palette,
  Type,
  ChevronDown,
  FileCode
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState, useRef } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showFontPicker, setShowFontPicker] = useState(false)
  const [showHtmlEditor, setShowHtmlEditor] = useState(false)
  const [htmlContent, setHtmlContent] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: 'font-serif'
          }
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false
        },
        listItem: {},
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-udaya-sage/30 pl-4 italic'
          }
        },
        code: {
          HTMLAttributes: {
            class: 'bg-gray-100 px-1 py-0.5 rounded text-sm'
          }
        },
        codeBlock: false // We'll use the extension below
      }),
      ResizableImage.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg cursor-move'
        },
        inline: false,
        allowBase64: true
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-udaya-sage underline hover:text-udaya-sage/80'
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: 'px-1 py-0.5 rounded'
        }
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-900 text-gray-100 rounded p-4 font-mono text-sm overflow-x-auto'
        }
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Start writing your post...'
      }),
      FontFamily.configure({
        types: ['textStyle']
      })
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-udaya max-w-none min-h-[500px] p-6 focus:outline-none cursor-text'
      }
    },
    immediatelyRender: false
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter URL:', previousUrl)
    
    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        editor.chain().focus().setImage({ src: data.url }).run()
      }
    } catch (error) {
      console.error('Upload failed:', error)
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const setColor = (color: string) => {
    editor.chain().focus().setColor(color).run()
    setShowColorPicker(false)
  }

  const setHighlight = (color: string) => {
    editor.chain().focus().toggleHighlight({ color }).run()
    setShowColorPicker(false)
  }

  const changeFontStyle = (fontFamily: string) => {
    editor.chain().focus().setFontFamily(fontFamily).run()
    setShowFontPicker(false)
  }

  // Theme-aligned colors
  const colors = [
    { name: 'Default', value: '#2B2B2B' }, // charcoal
    { name: 'Sage', value: '#5C7B65' }, // sage
    { name: 'Gold', value: '#D9A441' }, // gold
    { name: 'Terracotta', value: '#C98A6D' }, // terracotta
    { name: 'Dark Sage', value: '#4A6353' }, // dark sage
    { name: 'Dark Gold', value: '#B8860B' }, // dark gold
    { name: 'Red', value: '#DC2626' },
    { name: 'Blue', value: '#2563EB' },
    { name: 'Green', value: '#16A34A' },
    { name: 'Purple', value: '#9333EA' }
  ]
  
  const highlightColors = [
    { name: 'Gold', value: '#D9A44140', code: 'gold' },
    { name: 'Sage', value: '#5C7B6540', code: 'sage' },
    { name: 'Cream', value: '#F6F2E6', code: 'cream' },
    { name: 'Terra', value: '#C98A6D40', code: 'terracotta' },
    { name: 'Yellow', value: '#FEF08A', code: 'yellow' }
  ]
  
  const fonts = [
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Playfair Display', value: 'Playfair Display, serif' },
    { name: 'Space Grotesk', value: 'Space Grotesk, sans-serif' },
    { name: 'Arial', value: 'Arial, sans-serif' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Times New Roman', value: 'Times New Roman, serif' },
    { name: 'Courier New', value: 'Courier New, monospace' },
    { name: 'Verdana', value: 'Verdana, sans-serif' }
  ]

  return (
    <div className="border rounded-lg overflow-hidden bg-white rich-text-editor">
      {/* Enhanced Toolbar */}
      <div className="border-b bg-gray-50 p-2 flex flex-wrap gap-1 sticky top-0 z-10">
        {/* Text Format */}
        <div className="relative">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowFontPicker(!showFontPicker)}
            className="flex items-center gap-1"
          >
            <Type className="w-4 h-4" />
            <ChevronDown className="w-3 h-3" />
          </Button>
          {showFontPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-2 z-20 max-h-64 overflow-y-auto">
              {fonts.map(font => (
                <button
                  key={font.name}
                  type="button"
                  onClick={() => changeFontStyle(font.value)}
                  className="block w-full text-left px-3 py-1 hover:bg-gray-100 rounded text-sm"
                  style={{ fontFamily: font.value }}
                >
                  {font.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Headings */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={cn(editor.isActive('heading', { level: 1 }) && 'bg-gray-200')}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn(editor.isActive('heading', { level: 2 }) && 'bg-gray-200')}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={cn(editor.isActive('heading', { level: 3 }) && 'bg-gray-200')}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Text Styling */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(editor.isActive('bold') && 'bg-gray-200')}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(editor.isActive('italic') && 'bg-gray-200')}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(editor.isActive('underline') && 'bg-gray-200')}
          title="Underline"
        >
          <UnderlineIcon className="w-4 h-4" />
        </Button>
        
        {/* Colors */}
        <div className="relative">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowColorPicker(!showColorPicker)}
            title="Colors"
          >
            <Palette className="w-4 h-4" />
          </Button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-3 z-20 w-64">
              <div className="text-xs font-medium mb-2">Text Color</div>
              <div className="grid grid-cols-5 gap-1 mb-3">
                {colors.map(color => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setColor(color.value)}
                    className="w-10 h-10 rounded border-2 border-gray-200 hover:border-gray-400 hover:scale-110 transition-all"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
              <div className="text-xs font-medium mb-2">Highlight</div>
              <div className="flex flex-wrap gap-1">
                {highlightColors.map((color) => (
                  <button
                    key={color.code}
                    type="button"
                    onClick={() => setHighlight(color.code)}
                    className="px-3 py-1 text-xs rounded border hover:scale-105 transition-transform"
                    style={{ 
                      backgroundColor: color.value,
                      borderColor: color.value === '#F6F2E6' ? '#e5e7eb' : 'transparent'
                    }}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Alignment */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={cn(editor.isActive({ textAlign: 'left' }) && 'bg-gray-200')}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={cn(editor.isActive({ textAlign: 'center' }) && 'bg-gray-200')}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={cn(editor.isActive({ textAlign: 'right' }) && 'bg-gray-200')}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={cn(editor.isActive({ textAlign: 'justify' }) && 'bg-gray-200')}
          title="Justify"
        >
          <AlignJustify className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Lists */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(editor.isActive('bulletList') && 'bg-gray-200')}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(editor.isActive('orderedList') && 'bg-gray-200')}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(editor.isActive('blockquote') && 'bg-gray-200')}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={cn(editor.isActive('codeBlock') && 'bg-gray-200')}
          title="Code Block"
        >
          <Code className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Media */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addLink}
          title="Add Link"
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
        
        <label className="cursor-pointer">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            asChild
            title="Upload Image"
          >
            <span>
              <ImageIcon className="w-4 h-4" />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={uploadImage}
                className="hidden"
              />
            </span>
          </Button>
        </label>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* History */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* HTML Editor */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            if (showHtmlEditor) {
              editor.commands.setContent(htmlContent)
              setShowHtmlEditor(false)
            } else {
              setHtmlContent(editor.getHTML())
              setShowHtmlEditor(true)
            }
          }}
          className={cn(showHtmlEditor && 'bg-gray-200')}
          title="HTML View"
        >
          <FileCode className="w-4 h-4" />
        </Button>
      </div>

      {/* Editor */}
      <div className="relative" style={{ minHeight: '500px' }}>
        {showHtmlEditor ? (
          <textarea
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            className="w-full min-h-[500px] p-6 font-mono text-sm border-0 focus:outline-none resize-none"
            placeholder="Edit HTML directly..."
          />
        ) : (
          <EditorContent 
            editor={editor} 
            className="min-h-[500px] [&_.ProseMirror]:min-h-[500px] [&_.ProseMirror]:outline-none [&_.ProseMirror]:p-6 [&_.ProseMirror.ProseMirror-focused]:outline-none"
          />
        )}
      </div>
    </div>
  )
}