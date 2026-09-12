/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { Header } from './components/Header';
import { HeroProfile } from './components/HeroProfile';
import { VideoCarousel } from './components/VideoCarousel';
import { VideoFeed } from './components/VideoFeed';
import { PlaybackProvider } from './context/PlaybackContext';
import { startPerformanceSupervisor } from './lib/performanceSupervisor';

export default function App() {
  // Autonomous scheduled background optimization loop
  useEffect(() => {
    const stopSupervisor = startPerformanceSupervisor({ intervalMs: 20000 });
    return () => {
      stopSupervisor();
    };
  }, []);

  return (
    <PlaybackProvider>
      <div className="relative min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-pink-500/40 selection:text-white overflow-x-hidden">
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          
          <main className="flex-1 pt-16">
            <HeroProfile />
            <VideoCarousel />
            <VideoFeed />
          </main>

          <footer className="relative z-10 mt-16 border-t border-zinc-900 bg-zinc-950 py-12 px-4 text-center">
            <div className="mx-auto max-w-4xl flex flex-col items-center gap-3">
              <span className="font-brand text-lg font-extrabold uppercase tracking-widest text-white">
                Gisela Privé
              </span>

              <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
                Plataforma audiovisual oficial y galería de Gisela.
              </p>

              <p className="text-[11px] text-zinc-500 pt-2">
                © {new Date().getFullYear()} Gisela. Todos los derechos reservados.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </PlaybackProvider>
  );
}


