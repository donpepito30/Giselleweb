import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { VIDEOS } from '../data';

describe('Google Search Console & International SEO Integrity', () => {
  const publicDir = path.resolve(process.cwd(), 'public');
  const indexHtmlPath = path.resolve(process.cwd(), 'index.html');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  const robotsPath = path.join(publicDir, 'robots.txt');

  it('validates that public/robots.txt contains essential crawlers and sitemap directive', () => {
    expect(fs.existsSync(robotsPath)).toBe(true);
    const robots = fs.readFileSync(robotsPath, 'utf-8');

    expect(robots).toContain('User-agent: Googlebot');
    expect(robots).toContain('User-agent: Googlebot-Video');
    expect(robots).toContain('User-agent: Yeti'); // Naver (South Korea)
    expect(robots).toContain('User-agent: Daumoa'); // Daum/Kakao (South Korea)
    expect(robots).toContain('Sitemap: https://giselleweb.pages.dev/sitemap.xml');
  });

  it('validates that public/sitemap.xml exists and conforms to Google Video specifications', () => {
    expect(fs.existsSync(sitemapPath)).toBe(true);
    const sitemap = fs.readFileSync(sitemapPath, 'utf-8');

    // XML Namespaces
    expect(sitemap).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(sitemap).toContain('xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"');
    expect(sitemap).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');

    // Multi-regional hreflang tags in sitemap
    expect(sitemap).toContain('hreflang="es"');
    expect(sitemap).toContain('hreflang="en-US"');
    expect(sitemap).toContain('hreflang="ko-KR"');
    expect(sitemap).toContain('hreflang="x-default"');

    // Full catalog indexing
    const videoMatches = sitemap.match(/<video:video>/g);
    expect(videoMatches?.length).toBe(VIDEOS.length);
    expect(videoMatches?.length).toBe(39);

    // South Korea keywords in video tags
    expect(sitemap).toContain('<video:tag>지셀라</video:tag>');
    expect(sitemap).toContain('<video:tag>숏폼</video:tag>');
  });

  it('validates index.html contains verification hooks, multi-region hreflang, and OpenGraph', () => {
    expect(fs.existsSync(indexHtmlPath)).toBe(true);
    const html = fs.readFileSync(indexHtmlPath, 'utf-8');

    // Multi-region hreflang
    expect(html).toContain('rel="alternate" hreflang="es"');
    expect(html).toContain('rel="alternate" hreflang="en-US"');
    expect(html).toContain('rel="alternate" hreflang="ko-KR"');
    expect(html).toContain('rel="alternate" hreflang="x-default"');

    // Webmaster verification hooks
    expect(html).toContain('name="google-site-verification"');
    expect(html).toContain('name="naver-site-verification"');

    // Multi-region OpenGraph tags
    expect(html).toContain('property="og:locale" content="es_ES"');
    expect(html).toContain('property="og:locale:alternate" content="en_US"');
    expect(html).toContain('property="og:locale:alternate" content="ko_KR"');

    // Korean and English keywords
    expect(html).toContain('지셀라');
    expect(html).toContain('숏폼');
    expect(html).toContain('TikTok');
  });

  it('validates index.html contains valid Schema.org JSON-LD with VideoObjects', () => {
    const html = fs.readFileSync(indexHtmlPath, 'utf-8');
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(jsonLdMatch).not.toBeNull();

    const jsonText = jsonLdMatch![1];
    const parsed = JSON.parse(jsonText);

    expect(parsed).toHaveProperty('@context', 'https://schema.org');
    expect(parsed).toHaveProperty('@graph');
    expect(Array.isArray(parsed['@graph'])).toBe(true);

    const types = parsed['@graph'].flatMap((item: any) => {
      const res = [item['@type']];
      if (item.mainEntity && item.mainEntity['@type']) {
        res.push(item.mainEntity['@type']);
      }
      return res;
    });
    expect(types).toContain('WebSite');
    expect(types).toContain('ProfilePage');
    expect(types).toContain('Person');
    expect(types).toContain('ItemList');
  });
});
