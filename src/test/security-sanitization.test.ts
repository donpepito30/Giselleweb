import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { sanitizeInput, validateCommentInput, isRateLimited, fallbackCopyText, safeCopyText, formatNumber } from '../lib/utils';

describe('Security & Sanitization Tests for Real User Input', () => {
  it('strips dangerous HTML tags (<script>, <img>, <iframe>)', () => {
    const maliciousInput = '<script>alert("hack")</script>Hola Gisela!';
    expect(sanitizeInput(maliciousInput)).toBe('alert("hack")Hola Gisela!');

    const imgPayload = '<img src=x onerror=alert(1)>Hermoso look!';
    expect(sanitizeInput(imgPayload)).toBe('Hermoso look!');

    const iframePayload = '<iframe src="evil.com"></iframe>Excelente video';
    expect(sanitizeInput(iframePayload)).toBe('Excelente video');
  });

  it('neutralizes javascript: pseudoprotocol attempts', () => {
    const jsUrl = 'javascript:void(document.cookie)';
    expect(sanitizeInput(jsUrl)).toBe('void(document.cookie)');

    const vbUrl = 'vbscript:msgbox("hello")';
    expect(sanitizeInput(vbUrl)).toBe('msgbox("hello")');
  });

  it('removes non-printable control characters and zero-width exploit spaces', () => {
    const hiddenExploit = 'Hola\u200B\u200C\uFEFF Gisela\u0000\u0007!';
    expect(sanitizeInput(hiddenExploit)).toBe('Hola Gisela!');
  });

  it('enforces 280 character maximum length limit', () => {
    const longInput = 'A'.repeat(350);
    const sanitized = sanitizeInput(longInput);
    expect(sanitized.length).toBe(280);
  });

  it('handles empty or null-like values gracefully', () => {
    expect(sanitizeInput('')).toBe('');
    expect(sanitizeInput('   ')).toBe('');
  });

  it('validateCommentInput rejects empty, too short, or malicious only content', () => {
    const tooShort = validateCommentInput('a');
    expect(tooShort.valid).toBe(false);
    expect(tooShort.error).toBeDefined();

    const valid = validateCommentInput('¡Increíble video, me encantó!');
    expect(valid.valid).toBe(true);
    expect(valid.cleanText).toBe('¡Increíble video, me encantó!');
  });

  it('isRateLimited enforces cooldown interval to prevent flood spam', () => {
    const testKey = `test_flood_${Date.now()}`;
    // First attempt should not be rate limited
    const firstCall = isRateLimited(testKey, 1000);
    expect(firstCall).toBe(false);

    // Immediate second attempt MUST be blocked
    const secondCall = isRateLimited(testKey, 1000);
    expect(secondCall).toBe(true);
  });

  it('formatNumber handles different scales accurately', () => {
    expect(formatNumber(500)).toBe('500');
    expect(formatNumber(1200)).toBe('1.2K');
    expect(formatNumber(100000)).toBe('100.0K');
    expect(formatNumber(1500000)).toBe('1.5M');
  });

  it('clipboard fallback handles environment gracefully without crashing', async () => {
    const result = await safeCopyText('https://example.com');
    expect(typeof result).toBe('boolean');
  });

  it('verifies Content-Security-Policy and security meta tags exist in index.html', () => {
    const htmlPath = join(process.cwd(), 'index.html');
    const htmlContent = readFileSync(htmlPath, 'utf-8');

    expect(htmlContent).toContain('Content-Security-Policy');
    expect(htmlContent).toContain("media-src 'self' https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev");
    expect(htmlContent).toContain('X-Content-Type-Options');
    expect(htmlContent).toContain('Permissions-Policy');
    expect(htmlContent).toContain('strict-origin-when-cross-origin');
  });
});
