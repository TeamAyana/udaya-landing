declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Track an event to Google Analytics
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Track page view
 */
export function trackPageView(url: string): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
}

/**
 * Track form submission
 */
export function trackFormSubmit(
  formName: string,
  additionalData?: Record<string, any>
): void {
  trackEvent(`${formName}_submitted`, additionalData);
}