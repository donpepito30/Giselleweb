import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  runOptimizationCycle, 
  startPerformanceSupervisor, 
  stopPerformanceSupervisor,
  isSupervisorActive 
} from '../lib/performanceSupervisor';
import { isRateLimited, pruneExpiredRateLimits } from '../lib/utils';

describe('Autonomous Performance & Memory Supervisor', () => {
  beforeEach(() => {
    stopPerformanceSupervisor();
  });

  afterEach(() => {
    stopPerformanceSupervisor();
    vi.restoreAllMocks();
  });

  it('runs an optimization cycle safely in the environment', () => {
    const result = runOptimizationCycle();
    expect(result).toHaveProperty('prunedTimestamps');
    expect(result).toHaveProperty('trimmedVideos');
    expect(result).toHaveProperty('tabHidden');
    expect(typeof result.prunedTimestamps).toBe('number');
    expect(typeof result.trimmedVideos).toBe('number');
  });

  it('prunes stale rate-limit timestamps to prevent memory growth', () => {
    const oldKey = `old_action_${Date.now()}`;
    isRateLimited(oldKey, 100);

    // Prune with 0 maxAgeMs (everything >= 0ms is pruned)
    const pruned = pruneExpiredRateLimits(0);
    expect(pruned).toBeGreaterThanOrEqual(1);
  });

  it('starts and stops the supervisor loop correctly', () => {
    expect(isSupervisorActive()).toBe(false);

    const stop = startPerformanceSupervisor({ intervalMs: 5000 });
    expect(isSupervisorActive()).toBe(true);

    stop();
    expect(isSupervisorActive()).toBe(false);
  });

  it('executes optimization logic with mocked DOM elements', () => {
    const mockVideos = [
      {
        paused: true,
        preload: 'auto',
        getBoundingClientRect: () => ({
          top: 2500,
          bottom: 3100,
          left: 0,
          right: 300,
          width: 300,
          height: 600,
          x: 0,
          y: 2500,
          toJSON: () => {}
        })
      }
    ];

    // Temporarily mock window and document globals
    const origWindow = globalThis.window;
    const origDocument = globalThis.document;

    (globalThis as unknown as { window: unknown }).window = { innerHeight: 800 };
    (globalThis as unknown as { document: unknown }).document = {
      visibilityState: 'visible',
      querySelectorAll: () => mockVideos,
    };

    try {
      const result = runOptimizationCycle();
      expect(mockVideos[0].preload).toBe('metadata');
      expect(result.trimmedVideos).toBe(1);
    } finally {
      globalThis.window = origWindow;
      globalThis.document = origDocument;
    }
  });
});
