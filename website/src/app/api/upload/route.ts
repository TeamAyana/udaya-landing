import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-firebase'
import { put } from '@vercel/blob'

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file found' }, { status: 400 })
    }

    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, '')
    const finalFilename = `${uniqueSuffix}-${filename}`
    
    // Upload to Vercel Blob
    const blob = await put(finalFilename, file, {
      access: 'public',
    })
    
    // Return blob URL
    const url = blob.url

    return NextResponse.json({ 
      url,
      filename: finalFilename
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}