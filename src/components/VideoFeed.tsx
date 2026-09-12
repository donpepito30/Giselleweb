import { useEffect } from 'react';
import { Film } from 'lucide-react';
import { VIDEOS } from '../data';
import { VideoPlayer } from './VideoPlayer';
import { usePlayback } from '../context/PlaybackContext';

export function VideoFeed() {
  const allFeedVideos = VIDEOS;
  const { activeVideoId, playVideo, pauseVideo } = usePlayback();

  // Automatically activate and play the video in the center of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const videoId = entry.target.getAttribute('data-video-id');
            if (videoId) {
              playVideo(videoId);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    const elements = document.querySelectorAll('[data-video-id]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [allFeedVideos, playVideo]);

  return (
    <section id="feed" className="relative w-full px-0 sm:px-4 md:px-6 pt-2 pb-12 sm:pb-16">
      {/* Minimalist Profile Tab Indicator (Instagram/TikTok style) */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 mb-6 sm:mb-10">
        <div className="flex items-center justify-center border-t border-zinc-900">
          <div className="flex items-center gap-2 border-t-2 border-white -mt-[1.5px] pt-3 px-6 text-white text-xs uppercase tracking-widest font-bold">
            <Film className="h-3.5 w-3.5" />
            <span>Reels</span>
          </div>
        </div>
      </div>
      
      {/* Feed List: One video at a time, adapted automatically to screen width */}
      <div className="flex flex-col items-center gap-8 sm:gap-14 w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-0">
        {allFeedVideos.map((video) => (
          <div 
            key={video.id} 
            data-video-id={video.id}
            id={`video-${video.id}`}
            className="w-full flex justify-center scroll-mt-20 sm:scroll-mt-24 min-h-[calc(100dvh-4.5rem)] sm:min-h-[86vh] md:min-h-[90vh] items-center"
          >
            <VideoPlayer 
              video={video} 
              isActive={activeVideoId === video.id}
              onPlay={() => playVideo(video.id)}
              onPause={() => pauseVideo(video.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

