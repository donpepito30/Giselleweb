import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Metric numbers formatting for social views/likes
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

// In-memory rate limiter registry for anti-spam & abuse prevention
const rateLimitStore = new Map<string, number>();

/**
 * Security: Multi-layer sanitization for user input against XSS, script injection, and control exploits
 */
export function sanitizeInput(text: string): string {
  if (!text) return '';
  return text
    // Strip control characters & zero-width exploit spaces (preserve standard whitespace)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, '')
    // Strip HTML tags
    .replace(/<[^>]*>?/gm, '')
    // Strip pseudo-protocols and script execution schemes
    .replace(/javascript\s*:/gi, '')
    .replace(/vbscript\s*:/gi, '')
    .replace(/data\s*:\s*text\/html/gi, '')
    .trim()
    .slice(0, 280);
}

/**
 * Validate user comment input for length, content, and security
 */
export function validateCommentInput(text: string): { valid: boolean; error?: string; cleanText: string } {
  const clean = sanitizeInput(text);
  if (!clean || clean.length < 2) {
    return { valid: false, error: 'El comentario debe tener al menos 2 caracteres.', cleanText: '' };
  }
  if (clean.length > 280) {
    return { valid: false, error: 'El comentario no puede superar los 280 caracteres.', cleanText: clean.slice(0, 280) };
  }
  return { valid: true, cleanText: clean };
}

/**
 * Client-side rate-limiting to prevent spam and flood attacks
 */
export function isRateLimited(actionKey: string, cooldownMs = 3000): boolean {
  const now = Date.now();
  const lastAction = rateLimitStore.get(actionKey) || 0;
  if (now - lastAction < cooldownMs) {
    return true; // Still within cooldown period
  }
  rateLimitStore.set(actionKey, now);
  return false;
}

/**
 * Maintenance: Prune stale rate-limit keys to avoid long-term memory growth
 */
export function pruneExpiredRateLimits(maxAgeMs = 60000): number {
  const now = Date.now();
  let prunedCount = 0;
  for (const [key, timestamp] of rateLimitStore.entries()) {
    if (now - timestamp >= maxAgeMs) {
      rateLimitStore.delete(key);
      prunedCount++;
    }
  }
  return prunedCount;
}

/**
 * Copy text fallback for legacy browsers or restricted iframe environments
 */
export function fallbackCopyText(text: string): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}

/**
 * Robust cross-browser clipboard copy with fallback
 */
export async function safeCopyText(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof window !== 'undefined' && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return fallbackCopyText(text);
    }
  }
  return fallbackCopyText(text);
}

