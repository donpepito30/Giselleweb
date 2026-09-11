import { describe, it, expect } from 'vitest';
import { USER_PROFILE, VIDEOS } from '../data';

describe('Production Data Integrity & Schema Validation', () => {
  it('should have valid user profile metadata', () => {
    expect(USER_PROFILE.name).toBeDefined();
    expect(USER_PROFILE.name.trim().length).toBeGreaterThan(0);
    expect(USER_PROFILE.handle).toMatch(/^@[\w.-]+$/);
    expect(USER_PROFILE.bio.trim().length).toBeGreaterThan(10);
    expect(USER_PROFILE.avatarUrl).toMatch(/^https:\/\/.+\.mp4$/);
    expect(USER_PROFILE.followers).toBeDefined();
    expect(USER_PROFILE.likes).toBeDefined();
  });

  it('should have a populated, valid VIDEOS catalog', () => {
    expect(VIDEOS.length).toBeGreaterThanOrEqual(10);
  });

  it('every video should meet strict schema and media format requirements', () => {
    const ids = new Set<string>();

    VIDEOS.forEach((video, index) => {
      // Unique ID check
      expect(video.id).toBeDefined();
      expect(ids.has(video.id)).toBe(false);
      ids.add(video.id);

      // HTTPS and mp4 video url check
      expect(video.url).toMatch(/^https:\/\/.+\.mp4$/);

      // Metrics validation
      expect(video.baseLikes).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(video.baseLikes)).toBe(true);
      expect(video.baseComments).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(video.baseComments)).toBe(true);
      expect(video.baseShares).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(video.baseShares)).toBe(true);

      // Description
      expect(typeof video.description).toBe('string');
      expect(video.description.trim().length).toBeGreaterThan(10);

      // Comments List validation
      expect(Array.isArray(video.commentsList)).toBe(true);
      expect(video.commentsList.length).toBeGreaterThan(0);
      video.commentsList.forEach((comment) => {
        expect(comment.id).toBeDefined();
        expect(comment.user).toBeDefined();
        expect(comment.avatar).toMatch(/^https:\/\//);
        expect(comment.text.trim().length).toBeGreaterThan(0);
        expect(comment.time).toBeDefined();
      });
    });
  });

  it('Hero video reference must exist in data catalog', () => {
    const heroTarget = VIDEOS.find(v => v.url.includes('1775107671455'));
    expect(heroTarget).toBeDefined();
    expect(heroTarget?.url).toBe(USER_PROFILE.avatarUrl);
  });
});
