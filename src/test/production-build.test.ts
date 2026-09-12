import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

describe('Production Build Output Verification', () => {
  const distDir = path.resolve(process.cwd(), 'dist');

  beforeAll(() => {
    if (!fs.existsSync(distDir) || !fs.existsSync(path.join(distDir, 'index.html'))) {
      execSync('npm run build', { stdio: 'pipe' });
    }
  });

  it('dist directory and index.html exist', () => {
    expect(fs.existsSync(distDir)).toBe(true);
    const indexPath = path.join(distDir, 'index.html');
    expect(fs.existsSync(indexPath)).toBe(true);

    const htmlContent = fs.readFileSync(indexPath, 'utf-8');
    expect(htmlContent).toContain('<title>GISELA PRIVÉ</title>');
    expect(htmlContent).toContain('<div id="root">');
    expect(htmlContent).toContain('<!doctype html>');
  });

  it('verifies bundled CSS and JS assets are generated and non-empty', () => {
    const assetsDir = path.join(distDir, 'assets');
    expect(fs.existsSync(assetsDir)).toBe(true);

    const files = fs.readdirSync(assetsDir);
    const jsFiles = files.filter(f => f.endsWith('.js'));
    const cssFiles = files.filter(f => f.endsWith('.css'));

    expect(jsFiles.length).toBeGreaterThan(0);
    expect(cssFiles.length).toBeGreaterThan(0);

    // Verify all chunks are greater than 0 bytes
    files.forEach(file => {
      const stats = fs.statSync(path.join(assetsDir, file));
      expect(stats.size).toBeGreaterThan(0);
    });
  });
});
