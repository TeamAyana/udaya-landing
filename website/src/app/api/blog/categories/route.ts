import { NextRequest, NextResponse } from 'next/server'
import { getAllCategories } from '@/lib/blog-storage'

export async function GET(request: NextRequest) {
  try {
    const categories = await getAllCategories()
    return NextResponse.json({ categories })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}