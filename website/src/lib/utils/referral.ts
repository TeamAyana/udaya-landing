/**
 * Generate a unique 7-character referral code
 */
export function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 7; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Extract referral code from URL parameters
 */
export function extractReferralFromURL(): string | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  return params.get('ref');
}

/**
 * Store referral code in localStorage
 */
export function storeReferralCode(code: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('udaya_referral_code', code);
    // Also store timestamp for expiry (30 days)
    localStorage.setItem('udaya_referral_timestamp', Date.now().toString());
  } catch (e) {
    console.error('Failed to store referral code:', e);
  }
}

/**
 * Get stored referral code if valid (within 30 days)
 */
export function getReferralCode(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const code = localStorage.getItem('udaya_referral_code');
    const timestamp = localStorage.getItem('udaya_referral_timestamp');

    if (code && timestamp) {
      const age = Date.now() - parseInt(timestamp);
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;

      if (age < thirtyDays) {
        return code;
      } else {
        // Expired, clean up
        localStorage.removeItem('udaya_referral_code');
        localStorage.removeItem('udaya_referral_timestamp');
      }
    }
  } catch (e) {
    console.error('Failed to get referral code:', e);
  }

  return null;
}

/**
 * Initialize referral tracking on page load
 */
export function initReferralTracking(): void {
  const urlCode = extractReferralFromURL();
  if (urlCode) {
    storeReferralCode(urlCode);
  }
}