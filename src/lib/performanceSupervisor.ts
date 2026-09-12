import { pruneExpiredRateLimits } from './utils';

interface SupervisorConfig {
  intervalMs?: number;
  offscreenDistancePx?: number;
}

let isSupervisorRunning = false;
let intervalId: ReturnType<typeof setInterval> | null = null;

interface SupervisorStats {
  active: boolean;
  intervalMs: number;
  cyclesCompleted: number;
  lastRunTime: string | null;
  totalVideosTrimmed: number;
  totalTimestampsPruned: number;
}

const stats: SupervisorStats = {
  active: false,
  intervalMs: 20000,
  cyclesCompleted: 0,
  lastRunTime: null,
  totalVideosTrimmed: 0,
  totalTimestampsPruned: 0,
};

export function getSupervisorStats(): SupervisorStats {
  return {
    ...stats,
    active: isSupervisorRunning,
  };
}

/**
 * Autonomous memory & performance routine.
 * Runs in a scheduled background loop to ensure the application stays ultralight
 * regardless of how many videos exist or how long the user remains on the page.
 */
export function runOptimizationCycle(): {
  prunedTimestamps: number;
  trimmedVideos: number;
  tabHidden: boolean;
} {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { prunedTimestamps: 0, trimmedVideos: 0, tabHidden: false };
  }

  // 1. Prune expired rate-limit timestamps to prevent memory growth
  const prunedTimestamps = pruneExpiredRateLimits();

  // 2. Check tab visibility state
  const isTabHidden = document.visibilityState === 'hidden';

  // 3. Inspect video elements and release dormant decoding buffers
  let trimmedVideos = 0;
  const videos = document.querySelectorAll<HTMLVideoElement>('video');
  const viewportHeight = window.innerHeight || 800;

  videos.forEach((video) => {
    // If the entire tab is hidden, pause all playing media to conserve battery and CPU
    if (isTabHidden && !video.paused) {
      video.pause();
      trimmedVideos++;
      return;
    }

    // Skip the currently playing or targeted active video
    if (!video.paused) return;

    // Check vertical distance from viewport
    const rect = video.getBoundingClientRect();
    const isFarAway = rect.bottom < -600 || rect.top > viewportHeight + 600;

    // For videos located far off-screen, ensure they do not retain heavy memory buffers
    if (isFarAway) {
      // If the video was left with preload="auto", downgrade it to save bandwidth and RAM
      if (video.preload === 'auto') {
        video.preload = 'metadata';
        trimmedVideos++;
      }
    }
  });

  // 4. Update internal metrics
  stats.cyclesCompleted++;
  stats.lastRunTime = new Date().toLocaleTimeString();
  stats.totalVideosTrimmed += trimmedVideos;
  stats.totalTimestampsPruned += prunedTimestamps;

  return {
    prunedTimestamps,
    trimmedVideos,
    tabHidden: isTabHidden,
  };
}

/**
 * Starts the autonomous performance supervisor loop.
 * Operates during browser idle periods (requestIdleCallback) or scheduled fallback intervals.
 */
export function startPerformanceSupervisor(config: SupervisorConfig = {}): () => void {
  if (isSupervisorRunning) {
    return stopPerformanceSupervisor;
  }

  const intervalMs = config.intervalMs ?? 20000; // Run every 20 seconds
  stats.intervalMs = intervalMs;
  isSupervisorRunning = true;

  // Expose global diagnostics for devtools & transparency
  if (typeof window !== 'undefined') {
    (window as unknown as { __PERFORMANCE_SUPERVISOR__: unknown }).__PERFORMANCE_SUPERVISOR__ = {
      isActive: () => isSupervisorRunning,
      getStats: getSupervisorStats,
      runNow: runOptimizationCycle,
      stop: stopPerformanceSupervisor,
    };
    console.info(
      `%c[Performance Supervisor]%c Activo ⚡ Optimización en segundo plano cada ${Math.round(intervalMs / 1000)}s`,
      'color: #ec4899; font-weight: bold;',
      'color: #a1a1aa;'
    );
  }

  const executeScheduledOptimization = () => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
        runOptimizationCycle();
      });
    } else {
      runOptimizationCycle();
    }
  };

  // Run first cycle shortly after boot
  const initialTimer = setTimeout(executeScheduledOptimization, 5000);

  // Set recurring autonomous loop
  intervalId = setInterval(executeScheduledOptimization, intervalMs);

  // Tab visibility listener: trigger optimization instantly when the user switches tabs
  let removeVisibilityListener: (() => void) | null = null;
  if (typeof document !== 'undefined') {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        runOptimizationCycle();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });
    removeVisibilityListener = () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }

  return () => {
    clearTimeout(initialTimer);
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    if (removeVisibilityListener) {
      removeVisibilityListener();
    }
    isSupervisorRunning = false;
  };
}

export function stopPerformanceSupervisor(): void {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  isSupervisorRunning = false;
}

export function isSupervisorActive(): boolean {
  return isSupervisorRunning;
}
