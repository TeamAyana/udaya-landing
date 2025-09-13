'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import CodeBlock from '@tiptap/extension-code-block'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import Youtube from '@tiptap/extension-youtube'
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
  Table as TableIcon,
  Youtube as YoutubeIcon,
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
          levels: [1, 2, 3]
        }
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg'
        }
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
        multicolor: true
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-100 rounded p-4 font-mono text-sm'
        }
      }),
      Table.configure({
        resizable: true
      }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube.configure({
        width: 640,
        height: 480
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
        class: 'prose prose-lg max-w-none min-h-[500px] p-6 focus:outline-none cursor-text',
        style: 'position: relative; z-index: 1;'
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

  const addYoutubeVideo = () => {
    const url = window.prompt('Enter YouTube URL:')
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, Math.min(1024, 640)),
        height: Math.max(180, Math.min(720, 480))
      })
    }
  }

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  const setColor = (color: string) => {
    editor.chain().focus().setColor(color).run()
    setShowColorPicker(false)
  }

  const setHighlight = (color: string) => {
    editor.chain().focus().toggleHighlight({ color }).run()
    setShowColorPicker(false)
  }

  const setFontFamily = (font: string) => {
    editor.chain().focus().setFontFamily(font).run()
    setShowFontPicker(false)
  }

  // Theme-aligned colors
  const colors = [
    '#2B2B2B', // charcoal
    '#5C7B65', // sage
    '#D9A441', // gold
    '#C98A6D', // terracotta
    '#F6F2E6', // cream
    '#6B8E7F', // sage variant
    '#E5B55B', // gold variant
    '#8B4513', // brown
    '#4A6353', // dark sage
    '#B8860B'  // dark gold
  ]
  
  const fonts = [
    'Inter',
    'Playfair Display', 
    'Space Grotesk',
    'Arial',
    'Georgia',
    'Times New Roman',
    'Courier New',
    'Verdana'
  ]

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
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
                  key={font}
                  type="button"
                  onClick={() => setFontFamily(font)}
                  className="block w-full text-left px-3 py-1 hover:bg-gray-100 rounded text-sm"
                  style={{ fontFamily: font }}
                >
                  {font}
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
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn(editor.isActive('heading', { level: 2 }) && 'bg-gray-200')}
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={cn(editor.isActive('heading', { level: 3 }) && 'bg-gray-200')}
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
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(editor.isActive('italic') && 'bg-gray-200')}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(editor.isActive('underline') && 'bg-gray-200')}
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
          >
            <Palette className="w-4 h-4" />
          </Button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-2 z-20">
              <div className="text-xs font-medium mb-2">Text Color</div>
              <div className="grid grid-cols-5 gap-1 mb-2">
                {colors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setColor(color)}
                    className="w-6 h-6 rounded border hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="text-xs font-medium mb-2">Highlight</div>
              <div className="flex flex-wrap gap-1">
                {['#D9A44140', '#5C7B6540', '#F6F2E640', '#C98A6D40', '#FFFF0040'].map((color, idx) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setHighlight(['gold', 'sage', 'cream', 'terracotta', 'yellow'][idx])}
                    className="px-2 py-1 text-xs rounded"
                    style={{ backgroundColor: color }}
                  >
                    {['gold', 'sage', 'cream', 'terra', 'yellow'][idx]}
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
        >
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={cn(editor.isActive({ textAlign: 'center' }) && 'bg-gray-200')}
        >
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={cn(editor.isActive({ textAlign: 'right' }) && 'bg-gray-200')}
        >
          <AlignRight className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={cn(editor.isActive({ textAlign: 'justify' }) && 'bg-gray-200')}
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
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(editor.isActive('orderedList') && 'bg-gray-200')}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(editor.isActive('blockquote') && 'bg-gray-200')}
        >
          <Quote className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={cn(editor.isActive('codeBlock') && 'bg-gray-200')}
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
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
        
        <label className="cursor-pointer">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            asChild
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

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addYoutubeVideo}
        >
          <YoutubeIcon className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertTable}
        >
          <TableIcon className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* History */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
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
            className="min-h-[500px] [&_.ProseMirror]:min-h-[500px] [&_.ProseMirror]:outline-none [&_.ProseMirror]:p-6 [&_.ProseMirror.ProseMirror-focused]:outline-none [&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mb-4 [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mb-3 [&_.ProseMirror_h3]:text-xl [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_h3]:mb-2"
          />
        )}
      </div>
    </div>
  )
}