import { useEffect } from 'react';
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
    <section id="feed" className="relative w-full px-0 sm:px-4 md:px-6 py-8 sm:py-14">
      {/* Feed Header */}
      <div className="mb-8 sm:mb-12 flex flex-col items-center text-center gap-3 px-4 max-w-3xl mx-auto">
        <h2 className="font-brand text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
          Archivo de Video
        </h2>

        <p className="text-zinc-400 text-xs sm:text-sm max-w-lg leading-relaxed">
          Desliza para explorar cada pieza en formato vertical cinematográfico. Toca sobre el video para pausar o reproducir.
        </p>
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

