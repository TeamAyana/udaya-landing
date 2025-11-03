import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-firebase'
import { getAllCategoriesAdmin, createCategoryAdmin } from '@/lib/blog-storage-admin'

export async function GET(request: NextRequest) {
  try {
    const categories = await getAllCategoriesAdmin()
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
    
    const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
    const newCategory = await createCategoryAdmin({ name: data.name, slug })
    
    return NextResponse.json({ category: newCategory })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}