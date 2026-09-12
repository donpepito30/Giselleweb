import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Play } from 'lucide-react';
import { VIDEOS } from '../data';
import { usePlayback } from '../context/PlaybackContext';
import { formatNumber } from '../lib/utils';
import type { Video } from '../types';

interface VideoCardProps {
  video: Video;
  isActive: boolean;
  onSelect: (videoId: string) => void;
}

function CarouselCard({ video, isActive, onSelect }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isFrameLoaded, setIsFrameLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // High-performance visibility observer
  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { rootMargin: '400px' }
    );

    observer.observe(cardEl);
    return () => observer.disconnect();
  }, []);

  // Hover micro-playback on desktop; resets back to cover frame on mouse leave
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !isInView) return;

    if (isHovered) {
      videoEl.play().catch(() => {});
    } else {
      videoEl.pause();
      // Reset back to the 0.5s frame so it remains crisp as a cover
      if (videoEl.currentTime !== 0.5) {
        try {
          videoEl.currentTime = 0.5;
        } catch {
          // Ignored if video not ready
        }
      }
    }
  }, [isHovered, isInView]);

  const handleLoadedMetadata = () => {
    const videoEl = videoRef.current;
    if (videoEl) {
      try {
        videoEl.currentTime = 0.5;
      } catch {
        // Ignored
      }
    }
    setIsFrameLoaded(true);
  };

  return (
    <div
      ref={cardRef}
      id={`carousel-card-${video.id}`}
      onClick={() => onSelect(video.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative shrink-0 w-36 sm:w-44 md:w-48 aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer select-none transition-all duration-300 transform-gpu ${
        isActive 
          ? 'ring-2 ring-pink-500 scale-[1.02] shadow-xl shadow-pink-500/20' 
          : 'ring-1 ring-zinc-800/80 hover:ring-zinc-600 hover:scale-[1.02] shadow-md'
      } bg-zinc-950`}
    >
      {/* Visual Placeholder while video frame extracts metadata */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-zinc-850 via-zinc-900 to-zinc-950 transition-opacity duration-500 flex items-center justify-center ${
          isFrameLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <Play className="h-4 w-4 text-white/40 fill-white/20 ml-0.5" />
        </div>
      </div>

      {/* Dynamic Video Frame Cover (Extracts frame at 0.5s with preload metadata) */}
      {isInView && (
        <video
          ref={videoRef}
          src={`${video.url}#t=0.5`}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onLoadedData={() => setIsFrameLoaded(true)}
          onSeeked={() => setIsFrameLoaded(true)}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
            isFrameLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Subtle Play Button Overlay on Hover */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none ${
        isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}>
        <div className="h-10 w-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center shadow-lg border border-white/20">
          <Play className="h-4 w-4 fill-current ml-0.5" />
        </div>
      </div>

      {/* Bottom Information Overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12 pb-3 px-3 flex flex-col justify-end pointer-events-none">
        <p className="text-[11px] font-medium text-white/95 line-clamp-2 leading-snug drop-shadow-sm">
          {video.description}
        </p>

        <div className="mt-1.5 flex items-center justify-between text-[10px] text-zinc-300">
          <span className="inline-flex items-center gap-1 font-medium">
            <Heart className="h-3 w-3 fill-white/80 text-white" />
            {formatNumber(video.baseLikes)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function VideoCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { activeVideoId, playVideo } = usePlayback();

  const checkScrollBounds = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScrollBounds();
    el.addEventListener('scroll', checkScrollBounds, { passive: true });
    window.addEventListener('resize', checkScrollBounds);
    return () => {
      el.removeEventListener('scroll', checkScrollBounds);
      window.removeEventListener('resize', checkScrollBounds);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = Math.max(el.clientWidth * 0.75, 260);
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleSelectVideo = (videoId: string) => {
    const targetElement = document.getElementById(`video-${videoId}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      playVideo(videoId);
    }
  };

  return (
    <section className="relative w-full py-4 sm:py-6 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative group/carousel">
          {/* Subtle Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => handleScroll('left')}
              aria-label="Anterior"
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-black/75 hover:bg-black border border-white/20 text-white flex items-center justify-center shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Subtle Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => handleScroll('right')}
              aria-label="Siguiente"
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-black/75 hover:bg-black border border-white/20 text-white flex items-center justify-center shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {/* Horizontal Track */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto scroll-smooth py-1 snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {VIDEOS.map((video) => (
              <div key={video.id} className="snap-start shrink-0">
                <CarouselCard
                  video={video}
                  isActive={activeVideoId === video.id}
                  onSelect={handleSelectVideo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
