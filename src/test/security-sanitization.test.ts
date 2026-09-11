import { describe, it, expect } from 'vitest';
import { sanitizeInput, fallbackCopyText, safeCopyText, formatNumber } from '../lib/utils';

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

  it('formatNumber handles different scales accurately', () => {
    expect(formatNumber(500)).toBe('500');
    expect(formatNumber(1200)).toBe('1.2K');
    expect(formatNumber(100000)).toBe('100.0K');
    expect(formatNumber(1500000)).toBe('1.5M');
  });

  it('clipboard fallback handles environment gracefully without crashing', async () => {
    // In node environment without DOM, should safely return false without throwing
    const result = await safeCopyText('https://example.com');
    expect(typeof result).toBe('boolean');
  });
});
