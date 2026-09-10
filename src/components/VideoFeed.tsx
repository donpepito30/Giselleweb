import { useState, useEffect } from 'react';
import { VIDEOS } from '../data';
import { VideoPlayer } from './VideoPlayer';
import type { Video } from '../types';

export function VideoFeed() {
  const allFeedVideos = VIDEOS;
  const [activeCategory, setActiveCategory] = useState<'all' | 'looks' | 'exclusive' | 'lifestyle'>('all');
  const [playingId, setPlayingId] = useState<string | null>(allFeedVideos[0]?.id || null);

  const filteredVideos = allFeedVideos.filter(video => {
    const desc = video.description.toLowerCase();
    if (activeCategory === 'looks') {
      return desc.includes('look') || desc.includes('outfit') || desc.includes('vestido') || desc.includes('estilo');
    }
    if (activeCategory === 'exclusive') {
      return desc.includes('exclusiv') || desc.includes('sesión') || desc.includes('pieza') || desc.includes('contrastes');
    }
    if (activeCategory === 'lifestyle') {
      return desc.includes('vibra') || desc.includes('energía') || desc.includes('genial') || desc.includes('calma') || desc.includes('olas');
    }
    return true;
  });

  // Automatically activate and play the video in the center of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const videoId = entry.target.getAttribute('data-video-id');
            if (videoId) {
              setPlayingId(videoId);
            }
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    const elements = document.querySelectorAll('[data-video-id]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredVideos]);

  return (
    <section id="feed" className="w-full px-0 sm:px-4 md:px-6 py-8 sm:py-12">
      {/* Feed Header */}
      <div className="mb-8 sm:mb-10 flex flex-col items-center text-center gap-3 px-4 max-w-3xl mx-auto">
        <h2 className="font-brand text-2xl sm:text-4xl font-extrabold text-white tracking-wide uppercase">
          Archivo de Video
        </h2>

        <p className="text-zinc-400 text-xs sm:text-sm max-w-md">
          Desliza para ver cada video en tamaño completo. Audio e interacciones activas.
        </p>

        {/* Category Filter Pills */}
        <div className="mt-4 flex flex-wrap justify-center gap-2 p-1 bg-zinc-900/70 rounded-full border border-zinc-800">
          <button 
            onClick={() => setActiveCategory('all')}
            className={`rounded-full px-5 py-2 text-xs uppercase tracking-wider font-bold transition-all ${
              activeCategory === 'all' 
                ? 'bg-white text-black shadow-md' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            Todos ({allFeedVideos.length})
          </button>
          <button 
            onClick={() => setActiveCategory('looks')}
            className={`rounded-full px-5 py-2 text-xs uppercase tracking-wider font-bold transition-all ${
              activeCategory === 'looks' 
                ? 'bg-white text-black shadow-md' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            Looks & Estilo
          </button>
          <button 
            onClick={() => setActiveCategory('exclusive')}
            className={`rounded-full px-5 py-2 text-xs uppercase tracking-wider font-bold transition-all ${
              activeCategory === 'exclusive' 
                ? 'bg-white text-black shadow-md' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            Sesiones
          </button>
          <button 
            onClick={() => setActiveCategory('lifestyle')}
            className={`rounded-full px-5 py-2 text-xs uppercase tracking-wider font-bold transition-all ${
              activeCategory === 'lifestyle' 
                ? 'bg-white text-black shadow-md' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            Lifestyle & Mood
          </button>
        </div>
      </div>
      
      {/* Feed List: One video at a time, adapted automatically to screen width */}
      <div className="flex flex-col items-center gap-6 sm:gap-12 w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-0">
        {filteredVideos.map((video) => (
          <div 
            key={video.id} 
            data-video-id={video.id}
            id={`video-${video.id}`}
            className="w-full flex justify-center scroll-mt-16 sm:scroll-mt-20 min-h-[calc(100dvh-4.5rem)] sm:min-h-[86vh] md:min-h-[90vh] items-center"
          >
            <VideoPlayer 
              video={video} 
              isActive={playingId === video.id}
              onPlay={() => setPlayingId(video.id)}
            />
          </div>
        ))}

        {filteredVideos.length === 0 && (
          <div className="py-16 text-center text-zinc-500 text-sm">
            No hay videos en esta categoría por el momento.
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="mt-20 border-t border-zinc-900 pt-10 pb-8 text-center text-zinc-600 text-xs px-4">
        <p className="font-brand uppercase tracking-widest text-zinc-400 font-semibold mb-1">
          Gisela Privé &copy; {new Date().getFullYear()}
        </p>
        <p>Todos los derechos reservados. Galería oficial y contenido audiovisual.</p>
      </div>
    </section>
  );
}
