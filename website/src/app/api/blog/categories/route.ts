import { NextRequest, NextResponse } from 'next/server'
import { getAllCategories, createCategory } from '@/lib/blog-storage'
import { getSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const categories = await getAllCategories()
    return NextResponse.json({ categories })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const data = await request.json()
    
    if (!data.name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 })
    }
    
    const newCategory = await createCategory(data.name)
    
    return NextResponse.json({ category: newCategory })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}