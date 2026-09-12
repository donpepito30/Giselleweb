import { useState } from 'react';
import { Menu, X, PlayCircle, User, Sparkles } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-2xl transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      {/* Subtle top rainbow/aurora accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 opacity-80" />

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-pink-600 via-rose-500 to-purple-600 p-[1px] shadow-lg shadow-pink-500/20 group-hover:shadow-pink-500/40 transition-all duration-300 group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-zinc-950">
              <span className="font-brand text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-300">
                G
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-brand text-lg sm:text-xl font-extrabold tracking-[0.16em] text-white uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:via-rose-300 group-hover:to-amber-300 transition-all">
                Gisela Privé
              </span>
              <Sparkles className="h-3 w-3 text-pink-400 animate-pulse hidden sm:block" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-pink-400 font-bold -mt-0.5">
              OFICIAL
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          <a 
            href="#feed" 
            className="flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-wider font-bold text-zinc-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-pink-500/30 transition-all duration-300"
          >
            <PlayCircle className="h-4 w-4 text-pink-400" />
            <span>Videos</span>
          </a>
          <a 
            href="#bio" 
            className="flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-wider font-bold text-zinc-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-purple-500/30 transition-all duration-300"
          >
            <User className="h-4 w-4 text-purple-400" />
            <span>Biografía</span>
          </a>
        </nav>

        {/* Menu Button for Mobile & Quick Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center rounded-xl border border-white/10 bg-zinc-900/90 p-2 sm:px-3.5 sm:py-2 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-pink-500/40 transition-all active:scale-95 shadow-md group"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-pink-400" />
            ) : (
              <Menu className="h-5 w-5 text-zinc-200 group-hover:text-pink-400 transition-colors" />
            )}
            <span className="hidden sm:inline-block ml-2 text-xs font-bold uppercase tracking-wider">
              Menú
            </span>
          </button>
        </div>
      </div>

      {/* Mobile / Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-zinc-950/98 px-5 py-5 backdrop-blur-2xl transition-all duration-300 shadow-2xl">
          <div className="mx-auto max-w-6xl space-y-2.5">
            <a 
              href="#feed" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-xl p-3 text-sm font-semibold text-zinc-200 bg-zinc-900/50 hover:bg-gradient-to-r hover:from-pink-950/40 hover:to-purple-950/30 hover:text-white border border-transparent hover:border-pink-500/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-pink-500/15 text-pink-400">
                  <PlayCircle className="h-4 w-4" />
                </div>
                <span>Videos</span>
              </div>
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">Ver</span>
            </a>

            <a 
              href="#bio" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-xl p-3 text-sm font-semibold text-zinc-200 bg-zinc-900/50 hover:bg-gradient-to-r hover:from-purple-950/40 hover:to-indigo-950/30 hover:text-white border border-transparent hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/15 text-purple-400">
                  <User className="h-4 w-4" />
                </div>
                <span>Biografía</span>
              </div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Ver</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

