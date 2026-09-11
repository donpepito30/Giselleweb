import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

interface PlaybackContextType {
  activeVideoId: string | null;
  playVideo: (id: string) => void;
  pauseVideo: (id?: string) => void;
  toggleVideo: (id: string) => void;
  isHeroInView: boolean;
  setIsHeroInView: (inView: boolean) => void;
}

const PlaybackContext = createContext<PlaybackContextType | null>(null);

export function PlaybackProvider({ children }: { children: React.ReactNode }) {
  // Start with 'hero' as the initial active video since the page loads at the top
  const [activeVideoId, setActiveVideoId] = useState<string | null>('hero');
  const [isHeroInView, setIsHeroInView] = useState<boolean>(true);
  const activeVideoIdRef = useRef(activeVideoId);
  activeVideoIdRef.current = activeVideoId;

  // Global coordination listener:
  // - If any feed video starts playing, pause all other videos (Hero, Profile, and other feed videos)
  // - If Hero or Profile starts playing, pause all feed videos (Hero and Profile can play simultaneously in #bio)
  useEffect(() => {
    const handleGlobalPlay = (e: Event) => {
      const targetVideo = e.target as HTMLVideoElement;
      if (!targetVideo || targetVideo.tagName !== 'VIDEO') return;

      const isTargetInBio = targetVideo.closest('#bio') !== null;

      const allVideos = document.querySelectorAll('video');
      allVideos.forEach((v) => {
        if (v === targetVideo || v.paused) return;

        const isVInBio = v.closest('#bio') !== null;
        if (!isTargetInBio) {
          // A feed video played -> pause all other videos everywhere
          v.pause();
        } else if (!isVInBio) {
          // A bio video played -> pause any playing feed video
          v.pause();
        }
      });
    };

    window.addEventListener('play', handleGlobalPlay, true);
    return () => {
      window.removeEventListener('play', handleGlobalPlay, true);
    };
  }, []);

  const playVideo = useCallback((id: string) => {
    setActiveVideoId(id);
  }, []);

  const pauseVideo = useCallback((id?: string) => {
    setActiveVideoId((prev) => {
      if (!id || prev === id) {
        return null;
      }
      return prev;
    });
  }, []);

  const toggleVideo = useCallback((id: string) => {
    setActiveVideoId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <PlaybackContext.Provider
      value={{
        activeVideoId,
        playVideo,
        pauseVideo,
        toggleVideo,
        isHeroInView,
        setIsHeroInView,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
}

export function usePlayback() {
  const context = useContext(PlaybackContext);
  if (!context) {
    throw new Error('usePlayback must be used within a PlaybackProvider');
  }
  return context;
}
