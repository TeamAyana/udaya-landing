import { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { getPublishedPosts } from '@/lib/blog-storage'
import { ScrollAnimation } from '@/components/ui/scroll-animation'
import { SectionDivider } from '@/components/ui/section-divider'

export const metadata: Metadata = {
  title: 'Blog - Wellness Insights & Medical Cannabis Education',
  description: 'Explore articles on medical cannabis, wellness practices, and healing journeys from the Udaya community.',
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-16 bg-gradient-to-b from-udaya-cream to-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <ScrollAnimation animation="fade-up">
              <h1 className="font-serif text-h1 font-bold text-udaya-charcoal mb-6">
                Wellness Insights & Stories
              </h1>
              <p className="text-body-lg text-udaya-charcoal/80">
                Discover the latest in medical cannabis research, patient stories, 
                and wellness practices from the Udaya community.
              </p>
            </ScrollAnimation>
          </div>
        </Container>
      </Section>

      <SectionDivider variant="wave" color="#FFFFFF" />

      {/* Blog Posts Grid */}
      <Section>
        <Container>
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-udaya-charcoal/60">
                No blog posts available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <ScrollAnimation
                  key={post.id}
                  animation="fade-up"
                  delay={index * 100}
                >
                  <Card 
                    hover3d
                    className="h-full flex flex-col overflow-hidden group"
                  >
                    {post.featuredImage && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-udaya-sage text-sm font-medium rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <CardHeader className="flex-1">
                      <h3 className="text-xl font-serif font-semibold mb-2 group-hover:text-udaya-sage transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-udaya-charcoal/60 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readingTime} min read
                        </span>
                      </div>
                      <p className="text-udaya-charcoal/80 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span 
                              key={tag}
                              className="text-xs px-2 py-1 bg-udaya-sage/10 text-udaya-sage rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <Button asChild variant="link" className="p-0 h-auto">
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="flex items-center gap-2 text-udaya-sage hover:gap-3 transition-all"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* Newsletter CTA */}
      <Section variant="cream">
        <Container>
          <ScrollAnimation animation="fade-up">
            <Card className="bg-gradient-to-br from-white to-udaya-cream/50 border-0 shadow-xl">
              <CardContent className="text-center p-12">
                <h2 className="font-serif text-h2 font-bold text-udaya-charcoal mb-4">
                  Stay Informed
                </h2>
                <p className="text-body-lg text-udaya-charcoal/80 mb-8 max-w-2xl mx-auto">
                  Join our mailing list to receive the latest articles, research updates, 
                  and wellness tips from the Udaya community.
                </p>
                <Button asChild size="lg">
                  <Link href="/waitlist">
                    Join Our Community
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </Container>
      </Section>
    </>
  )
}