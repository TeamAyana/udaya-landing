import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const AUTHORS_COLLECTION = 'authors'

export async function GET(request: NextRequest) {
  try {
    const authorsCol = collection(db, AUTHORS_COLLECTION)
    const snapshot = await getDocs(authorsCol)
    
    const authors = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return NextResponse.json({ authors })
  } catch (error) {
    console.error('Error fetching authors:', error)
    return NextResponse.json({ error: 'Failed to fetch authors' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const data = await request.json()
    
    if (!data.name || !data.email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }
    
    const docRef = doc(collection(db, AUTHORS_COLLECTION))
    const newAuthor = {
      name: data.name,
      email: data.email,
      bio: data.bio || '',
      avatar: data.avatar || '',
      createdAt: new Date().toISOString()
    }
    
    await setDoc(docRef, newAuthor)
    
    return NextResponse.json({ 
      author: {
        id: docRef.id,
        ...newAuthor
      }
    })
  } catch (error) {
    console.error('Error creating author:', error)
    return NextResponse.json({ error: 'Failed to create author' }, { status: 500 })
  }
}