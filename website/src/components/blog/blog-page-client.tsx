'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, Tag, Search, User, TrendingUp, Eye, Filter, X, Sparkles, BookOpen, CheckCircle, Loader2 } from 'lucide-react'
import { ScrollAnimation } from '@/components/ui/scroll-animation'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import type { BlogPost, BlogCategory } from '@/types/blog'

interface BlogPageClientProps {
  posts: BlogPost[]
  categories: BlogCategory[]
}

export function BlogPageClient({ posts, categories }: BlogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showAllCategories, setShowAllCategories] = useState(false)
  
  // Newsletter state
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [subscriptionMessage, setSubscriptionMessage] = useState('')
  
  // Get featured posts - most viewed/recent
  const featuredPosts = posts.slice(0, 3)
  const regularPosts = posts.slice(3)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    let filtered = posts

    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    return filtered
  }, [posts, searchQuery, selectedCategory])

  // Split filtered posts for better layout
  const filteredFeatured = filteredPosts.slice(0, 3)
  const filteredRegular = filteredPosts.slice(3)

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setSubscriptionStatus('error')
      setSubscriptionMessage('Please enter a valid email address')
      return
    }
    
    setIsSubscribing(true)
    setSubscriptionStatus('idle')
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSubscriptionStatus('success')
        setSubscriptionMessage(data.message || 'Successfully subscribed!')
        setEmail('')
      } else {
        setSubscriptionStatus('error')
        setSubscriptionMessage(data.message || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setSubscriptionStatus('error')
      setSubscriptionMessage('An error occurred. Please try again later.')
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <>
      {/* Hero Section - Clean & Modern */}
      <Section className="pt-24 pb-8 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation animation="fade-up">
              <Badge className="mb-4 bg-gradient-to-r from-udaya-sage/10 to-udaya-gold/10 text-udaya-sage border-0 px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1" />
                Wellness Journal
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                Stories of Healing & Discovery
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Evidence-based insights on medical cannabis, integrative wellness, 
                and transformative health journeys.
              </p>
            </ScrollAnimation>

            {/* Search Bar - Centered & Elegant */}
            <ScrollAnimation animation="fade-up" delay={100}>
              <div className="relative max-w-xl mx-auto mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input 
                  type="search"
                  placeholder="Search articles, topics, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 h-12 text-base bg-white border-gray-200 rounded-full shadow-sm focus:shadow-md focus:border-udaya-sage transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </ScrollAnimation>

            {/* Category Pills - Horizontal Scroll on Mobile */}
            <ScrollAnimation animation="fade-up" delay={200}>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === null
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  All Topics
                </button>
                {categories.slice(0, showAllCategories ? categories.length : 4).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category.name
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
                {categories.length > 4 && (
                  <button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                  >
                    {showAllCategories ? 'Show Less' : `+${categories.length - 4} More`}
                  </button>
                )}
              </div>
            </ScrollAnimation>

            {/* Results Count */}
            {(searchQuery || selectedCategory) && (
              <ScrollAnimation animation="fade-in">
                <p className="text-sm text-gray-500">
                  Found {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                  {searchQuery && ` for "${searchQuery}"`}
                  {selectedCategory && ` in ${selectedCategory}`}
                </p>
              </ScrollAnimation>
            )}
          </div>
        </Container>
      </Section>

      {/* Featured Posts - Magazine Style */}
      {filteredFeatured.length > 0 && !searchQuery && !selectedCategory && (
        <Section className="py-12 bg-white">
          <Container>
            <ScrollAnimation animation="fade-up">
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-udaya-sage" />
                  Featured Stories
                </h2>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Main Featured Post */}
                {featuredPosts[0] && (
                  <Card className="lg:row-span-2 group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
                    <Link href={`/blog/${featuredPosts[0].slug}`}>
                      <div className="relative h-64 lg:h-96 overflow-hidden">
                        {featuredPosts[0].featuredImage ? (
                          <img 
                            src={featuredPosts[0].featuredImage} 
                            alt={featuredPosts[0].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-udaya-sage/20 to-udaya-gold/20" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <Badge className="mb-3 bg-white/20 backdrop-blur-sm text-white border-white/30">
                            {featuredPosts[0].category}
                          </Badge>
                          <h3 className="text-2xl lg:text-3xl font-serif font-bold mb-2">
                            {featuredPosts[0].title}
                          </h3>
                          <p className="text-white/90 mb-3 line-clamp-2">
                            {featuredPosts[0].excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-white/80">
                            <span>{featuredPosts[0].author}</span>
                            <span>•</span>
                            <span>{formatDate(featuredPosts[0].publishedAt)}</span>
                            <span>•</span>
                            <span>{featuredPosts[0].readingTime} min read</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card>
                )}

                {/* Secondary Featured Posts */}
                <div className="grid gap-6">
                  {featuredPosts.slice(1, 3).map((post) => (
                    <Card key={post.id} className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-lg transition-all">
                      <Link href={`/blog/${post.slug}`}>
                        <div className="flex gap-4">
                          <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
                            {post.featuredImage ? (
                              <img 
                                src={post.featuredImage} 
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-udaya-sage/20 to-udaya-gold/20 flex items-center justify-center">
                                <BookOpen className="w-8 h-8 text-udaya-sage/40" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 p-4">
                            <Badge variant="secondary" className="mb-2 text-xs">
                              {post.category}
                            </Badge>
                            <h3 className="font-serif font-semibold text-lg mb-2 line-clamp-2 group-hover:text-udaya-sage transition-colors">
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span>{formatDate(post.publishedAt)}</span>
                              <span>•</span>
                              <span>{post.readingTime} min</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          </Container>
        </Section>
      )}

      {/* All Articles Grid - Clean Cards */}
      <Section className="py-12 bg-gray-50">
        <Container>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <ScrollAnimation animation="fade-up">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filters
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory(null)
                  }}
                  className="rounded-full"
                >
                  Clear all filters
                </Button>
              </ScrollAnimation>
            </div>
          ) : (
            <>
              <ScrollAnimation animation="fade-up">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-serif font-bold text-gray-900">
                    {searchQuery || selectedCategory ? 'Search Results' : 'All Articles'}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Eye className="w-4 h-4" />
                    <span>{filteredRegular.length} articles</span>
                  </div>
                </div>
              </ScrollAnimation>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {(searchQuery || selectedCategory ? filteredPosts : filteredRegular).map((post, index) => (
                  <ScrollAnimation
                    key={post.id}
                    animation="fade-up"
                    delay={index * 50}
                  >
                    <Card className="h-full flex flex-col overflow-hidden border-0 shadow-sm hover:shadow-md transition-all group bg-white">
                      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                        <div className="relative h-48 overflow-hidden">
                          {post.featuredImage ? (
                            <img 
                              src={post.featuredImage} 
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <BookOpen className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 p-6 flex flex-col">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="secondary" className="text-xs font-medium">
                              {post.category}
                            </Badge>
                            {post.tags.length > 0 && (
                              <>
                                <span className="text-gray-300">•</span>
                                <span className="text-xs text-gray-500">
                                  {post.tags[0]}
                                </span>
                              </>
                            )}
                          </div>
                          
                          <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-udaya-sage transition-colors">
                            {post.title}
                          </h3>
                          
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="w-3 h-3" />
                              </div>
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span>{formatDate(post.publishedAt)}</span>
                              <span>•</span>
                              <span>{post.readingTime} min</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Card>
                  </ScrollAnimation>
                ))}
              </div>
            </>
          )}
        </Container>
      </Section>

      {/* Newsletter CTA - Refined */}
      <Section className="py-12 bg-white border-t">
        <Container>
          <ScrollAnimation animation="fade-up">
            <div className="max-w-xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-udaya-sage/10 mb-4">
                <Sparkles className="w-6 h-6 text-udaya-sage" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
                Get Weekly Wellness Insights
              </h3>
              <p className="text-gray-600 mb-6">
                Join 5,000+ readers exploring the future of integrative health.
              </p>
              
              {subscriptionStatus === 'success' ? (
                <div className="max-w-sm mx-auto">
                  <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                    <CheckCircle className="w-5 h-5" />
                    <p className="font-medium">{subscriptionMessage}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Check your inbox for a confirmation email.
                  </p>
                </div>
              ) : (
                <>
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-3 max-w-sm mx-auto">
                    <Input 
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubscribing}
                      className="flex-1 h-11"
                    />
                    <Button 
                      type="submit"
                      disabled={isSubscribing}
                      className="h-11 px-6 rounded-full bg-gray-900 hover:bg-gray-800 disabled:opacity-50"
                    >
                      {isSubscribing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        'Subscribe'
                      )}
                    </Button>
                  </form>
                  
                  {subscriptionStatus === 'error' && (
                    <p className="text-sm text-red-600 mt-2">{subscriptionMessage}</p>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-3">
                    No spam. Unsubscribe anytime.
                  </p>
                </>
              )}
            </div>
          </ScrollAnimation>
        </Container>
      </Section>
    </>
  )
}