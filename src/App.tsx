/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from './components/Header';
import { HeroProfile } from './components/HeroProfile';
import { VideoFeed } from './components/VideoFeed';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans selection:bg-pink-500/30">
      <Header />
      
      <main className="pt-16">
        <HeroProfile />
        <VideoFeed />
      </main>

      <footer className="mt-12 border-t border-zinc-900 bg-zinc-950 py-12 text-center text-sm text-zinc-500">
        <p>© {new Date().getFullYear()} Gisela. All rights reserved.</p>
        <p className="mt-2 text-xs">Desarrollado para rendimiento y experiencia premium.</p>
      </footer>
    </div>
  );
}

