import fs from 'fs';
import path from 'path';
import { VIDEOS } from '../src/data';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Representative high-definition portraits for video thumbnails
const fallbackThumbnails = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
];

export function generateSitemapXml(): string {
  const domain = 'https://giselleweb.pages.dev';
  const lastmod = '2026-09-12';

  const videoEntries = VIDEOS.map((video, index) => {
    const thumb = fallbackThumbnails[index % fallbackThumbnails.length];
    // Create descriptive bilingual title and sanitized description
    const shortDesc = video.description.replace(/[\n\r]+/g, ' ').slice(0, 160);
    const videoTitle = `Gisela - Reel #${index + 1} | Viral Short-Form Video (지셀라 숏폼)`;

    return `  <url>
    <loc>${domain}/#${video.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <video:video>
      <video:thumbnail_loc>${escapeXml(thumb)}</video:thumbnail_loc>
      <video:title>${escapeXml(videoTitle)}</video:title>
      <video:description>${escapeXml(shortDesc)}</video:description>
      <video:content_loc>${escapeXml(video.url)}</video:content_loc>
      <video:player_loc allow_embed="yes" autoplay="ap=1">${escapeXml(`${domain}/#${video.id}`)}</video:player_loc>
      <video:publication_date>${lastmod}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="${domain}/">Gisela (@gisela08.07)</video:uploader>
      <video:tag>Gisela</video:tag>
      <video:tag>지셀라</video:tag>
      <video:tag>숏폼</video:tag>
      <video:tag>릴스</video:tag>
      <video:tag>TikTok</video:tag>
      <video:tag>Viral Reels</video:tag>
      <video:tag>Fashion</video:tag>
      <video:tag>Dance Challenge</video:tag>
    </video:video>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${domain}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${domain}/" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${domain}/" />
    <xhtml:link rel="alternate" hreflang="ko-KR" href="${domain}/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${domain}/" />
  </url>
${videoEntries}
</urlset>
`;
}

// Generate file
const xmlContent = generateSitemapXml();
const targetPath = path.resolve(process.cwd(), 'public/sitemap.xml');
fs.writeFileSync(targetPath, xmlContent, 'utf-8');
console.log(`[SEO] Generated public/sitemap.xml with ${VIDEOS.length} Google Video objects.`);
