/**
 * Input sanitization utilities for user-generated content
 * Helps prevent XSS attacks and malicious input
 */

/**
 * Sanitize plain text input (removes HTML tags and special characters)
 * Use for: names, emails, phone numbers, short text fields
 */
export function sanitizePlainText(input: string): string {
  if (typeof input !== 'string') return ''

  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>]/g, '') // Remove any remaining angle brackets
    .trim()
    .slice(0, 500) // Limit length for security
}

/**
 * Sanitize email address
 * Use for: email fields
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') return ''

  return email
    .toLowerCase()
    .trim()
    .replace(/[<>'"]/g, '') // Remove potentially dangerous characters
    .slice(0, 254) // Max email length per RFC 5321
}

/**
 * Sanitize phone number (keep only numbers, spaces, +, -, (, ))
 * Use for: phone number fields
 */
export function sanitizePhone(phone: string): string {
  if (typeof phone !== 'string') return ''

  return phone
    .replace(/[^0-9+\-() ]/g, '') // Keep only valid phone characters
    .trim()
    .slice(0, 20) // Reasonable max phone length
}

/**
 * Sanitize URL (basic validation and cleanup)
 * Use for: URL fields
 */
export function sanitizeUrl(url: string): string {
  if (typeof url !== 'string') return ''

  const trimmed = url.trim()

  // Check if URL starts with valid protocol
  if (!/^https?:\/\//i.test(trimmed)) {
    return ''
  }

  try {
    const urlObj = new URL(trimmed)
    // Only allow http and https protocols
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return ''
    }
    return urlObj.toString().slice(0, 2048) // Max URL length
  } catch {
    return ''
  }
}

/**
 * Sanitize multiline text (textarea content)
 * Removes HTML but preserves line breaks
 * Use for: messages, descriptions, comments
 */
export function sanitizeMultilineText(input: string): string {
  if (typeof input !== 'string') return ''

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]*>/g, '') // Remove other HTML tags
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .slice(0, 5000) // Limit length
}

/**
 * Sanitize rich text HTML (for blog posts, etc.)
 * Allows safe HTML tags but removes dangerous ones
 * Use for: blog post content, rich text editor output
 */
export function sanitizeRichText(html: string): string {
  if (typeof html !== 'string') return ''

  // Remove dangerous tags and attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframes
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '') // Remove objects
    .replace(/<embed\b[^<]*>/gi, '') // Remove embeds
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '') // Remove inline event handlers
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:text\/html/gi, '') // Remove data URLs
    .trim()
}

/**
 * Sanitize form data object
 * Applies appropriate sanitization to each field
 */
export function sanitizeFormData(data: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {}

  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) {
      sanitized[key] = value
      continue
    }

    // Apply specific sanitization based on field name patterns
    if (key.toLowerCase().includes('email')) {
      sanitized[key] = sanitizeEmail(String(value))
    } else if (key.toLowerCase().includes('phone')) {
      sanitized[key] = sanitizePhone(String(value))
    } else if (key.toLowerCase().includes('url') || key.toLowerCase().includes('website')) {
      sanitized[key] = sanitizeUrl(String(value))
    } else if (key.toLowerCase().includes('message') || key.toLowerCase().includes('description') || key.toLowerCase().includes('comment')) {
      sanitized[key] = sanitizeMultilineText(String(value))
    } else if (key.toLowerCase().includes('content') || key.toLowerCase().includes('body')) {
      // Rich text fields - be more permissive but still safe
      sanitized[key] = sanitizeRichText(String(value))
    } else if (typeof value === 'string') {
      // Default: sanitize as plain text
      sanitized[key] = sanitizePlainText(String(value))
    } else if (typeof value === 'boolean' || typeof value === 'number') {
      // Keep booleans and numbers as-is
      sanitized[key] = value
    } else if (Array.isArray(value)) {
      // Recursively sanitize arrays
      sanitized[key] = value.map(item =>
        typeof item === 'string' ? sanitizePlainText(item) : item
      )
    } else if (typeof value === 'object') {
      // Recursively sanitize nested objects
      sanitized[key] = sanitizeFormData(value)
    } else {
      sanitized[key] = value
    }
  }

  return sanitized
}

/**
 * Validate and sanitize common field types
 */
export const validators = {
  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  /**
   * Validate phone format (loose validation)
   */
  isValidPhone(phone: string): boolean {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/
    return phoneRegex.test(phone)
  },

  /**
   * Validate URL format
   */
  isValidUrl(url: string): boolean {
    try {
      const urlObj = new URL(url)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
    }
  },

  /**
   * Check if string contains suspicious patterns
   */
  containsSuspiciousPatterns(input: string): boolean {
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i, // Event handlers
      /<iframe/i,
      /eval\(/i,
      /expression\(/i,
      /vbscript:/i,
      /data:text\/html/i
    ]

    return suspiciousPatterns.some(pattern => pattern.test(input))
  }
}

/**
 * Escape HTML entities for display
 * Use when displaying user content in HTML
 */
export function escapeHtml(text: string): string {
  if (typeof text !== 'string') return ''

  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  }

  return text.replace(/[&<>"'/]/g, char => htmlEscapes[char] || char)
}
