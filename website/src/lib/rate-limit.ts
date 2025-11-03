/**
 * Simple in-memory rate limiter
 * For production, consider using Redis or a dedicated rate limiting service
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 10 * 60 * 1000)

export interface RateLimitConfig {
  /**
   * Maximum number of requests allowed in the time window
   */
  maxRequests: number
  /**
   * Time window in milliseconds
   */
  windowMs: number
  /**
   * Optional identifier (defaults to IP address)
   */
  identifier?: string
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

/**
 * Check if a request is within rate limits
 * @param identifier Unique identifier (usually IP address or user ID)
 * @param config Rate limit configuration
 * @returns RateLimitResult indicating if request is allowed
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now()
  const key = `${identifier}:${config.windowMs}`

  let entry = rateLimitStore.get(key)

  // Create new entry if doesn't exist or has expired
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 0,
      resetTime: now + config.windowMs
    }
    rateLimitStore.set(key, entry)
  }

  // Increment count
  entry.count++

  // Check if over limit
  const isAllowed = entry.count <= config.maxRequests

  return {
    success: isAllowed,
    limit: config.maxRequests,
    remaining: Math.max(0, config.maxRequests - entry.count),
    reset: entry.resetTime
  }
}

/**
 * Get IP address from Next.js request
 * Handles various proxy headers
 */
export function getClientIp(request: Request): string {
  // Try various headers in order of preference
  const headers = request.headers

  const forwardedFor = headers.get('x-forwarded-for')
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim()
  }

  const realIp = headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  const cfConnectingIp = headers.get('cf-connecting-ip')
  if (cfConnectingIp) {
    return cfConnectingIp
  }

  // Fallback
  return 'unknown'
}

/**
 * Preset rate limit configurations
 */
export const RateLimitPresets = {
  /**
   * For form submissions - 5 requests per 15 minutes
   */
  FORM_SUBMISSION: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000 // 15 minutes
  },

  /**
   * For API endpoints - 100 requests per minute
   */
  API_ENDPOINT: {
    maxRequests: 100,
    windowMs: 60 * 1000 // 1 minute
  },

  /**
   * For authentication - 5 attempts per 15 minutes
   */
  AUTH_ATTEMPT: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000 // 15 minutes
  },

  /**
   * Strict rate limit for sensitive operations - 3 per hour
   */
  STRICT: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000 // 1 hour
  }
}
