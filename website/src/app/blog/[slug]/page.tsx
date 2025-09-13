import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ShareButton } from '@/components/ui/share-button'
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react'
import { getPostBySlug, getPublishedPosts, incrementPostViews } from '@/lib/blog-storage'
import { ScrollAnimation } from '@/components/ui/scroll-animation'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.focusKeyword ? [post.focusKeyword] : undefined,
    openGraph: {
      title: post.ogTitle || post.metaTitle || post.title,
      description: post.ogDescription || post.metaDescription || post.excerpt,
      images: post.ogImage || post.featuredImage ? [
        {
          url: post.ogImage || post.featuredImage,
          width: 1200,
          height: 630,
        }
      ] : undefined,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.ogTitle || post.metaTitle || post.title,
      description: post.ogDescription || post.metaDescription || post.excerpt,
      images: post.ogImage || post.featuredImage ? [post.ogImage || post.featuredImage] : undefined,
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post || post.status !== 'published') {
    notFound()
  }
  
  // Increment views
  await incrementPostViews(post.id)
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  // Get related posts
  const allPosts = await getPublishedPosts()
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3)
  
  return (
    <>
      {/* Hero Section with Featured Image */}
      <Section className="pt-32 pb-0">
        <Container>
          <ScrollAnimation animation="fade-up">
            <Button asChild variant="ghost" className="mb-8">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
            
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-2 bg-udaya-sage/10 text-udaya-sage rounded-full text-sm font-medium mb-4">
                  {post.category}
                </span>
                <h1 className="font-serif text-h1 font-bold text-udaya-charcoal mb-6">
                  {post.title}
                </h1>
                
                <div className="flex items-center justify-center gap-6 text-sm text-udaya-charcoal/60">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readingTime} min read
                  </span>
                </div>
              </div>
              
              {post.featuredImage && (
                <div className="relative h-[400px] rounded-2xl overflow-hidden mb-12 shadow-2xl">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              )}
            </div>
          </ScrollAnimation>
        </Container>
      </Section>
      
      {/* Article Content */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation animation="fade-up" delay={100}>
              <div className="grid lg:grid-cols-12 gap-12">
                {/* Main Content */}
                <article className="lg:col-span-8">
                  <div 
                    className="prose prose-lg prose-udaya max-w-none [&>*:first-child]:mt-0"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  
                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Tag className="w-5 h-5 text-udaya-sage" />
                        {post.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-3 py-1 bg-udaya-sage/10 text-udaya-sage rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Share Section */}
                  <div className="mt-8 p-6 bg-udaya-cream/50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold mb-1">Enjoyed this article?</p>
                        <p className="text-sm text-udaya-charcoal/60">Share it with others who might benefit.</p>
                      </div>
                      <ShareButton 
                        title={post.title}
                        description={post.excerpt}
                      />
                    </div>
                  </div>
                </article>
                
                {/* Sidebar */}
                <aside className="lg:col-span-4">
                  <div className="sticky top-32 space-y-8">
                    {/* Author Card */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-4">About the Author</h3>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-udaya-sage/20 rounded-full flex items-center justify-center">
                            <User className="w-8 h-8 text-udaya-sage" />
                          </div>
                          <div>
                            <p className="font-medium">{post.author}</p>
                            <p className="text-sm text-udaya-charcoal/60">Udaya Team</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Newsletter CTA */}
                    <Card className="bg-gradient-to-br from-udaya-sage/10 to-udaya-cream/50 border-0">
                      <CardContent className="p-6 text-center">
                        <h3 className="font-semibold mb-2">Stay Updated</h3>
                        <p className="text-sm text-udaya-charcoal/80 mb-4">
                          Join our community for wellness insights and updates.
                        </p>
                        <Button asChild size="sm" className="w-full">
                          <Link href="/waitlist">Join Waitlist</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </aside>
              </div>
            </ScrollAnimation>
          </div>
        </Container>
      </Section>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section variant="cream">
          <Container>
            <ScrollAnimation animation="fade-up">
              <h2 className="font-serif text-h2 font-bold text-center mb-12">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} hover3d>
                    {relatedPost.featuredImage && (
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <img 
                          src={relatedPost.featuredImage} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h3 className="font-serif text-lg font-semibold mb-2">
                        <Link 
                          href={`/blog/${relatedPost.slug}`}
                          className="hover:text-udaya-sage transition-colors"
                        >
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-udaya-charcoal/60 mb-3">
                        {formatDate(relatedPost.publishedAt)} • {relatedPost.readingTime} min read
                      </p>
                      <p className="text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollAnimation>
          </Container>
        </Section>
      )}
    </>
  )
}