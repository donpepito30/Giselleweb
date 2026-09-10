import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand / Logo */}
        <a href="#" className="flex flex-col group">
          <span className="font-brand text-lg sm:text-xl font-extrabold tracking-[0.18em] text-white uppercase group-hover:text-pink-400 transition-colors">
            Gisela Privé
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-pink-400 font-bold -mt-0.5">
            OFICIAL
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a 
            href="#feed" 
            className="text-xs uppercase tracking-wider font-semibold text-zinc-300 hover:text-pink-400 transition-colors"
          >
            Videos
          </a>
          <a 
            href="#bio" 
            className="text-xs uppercase tracking-wider font-semibold text-zinc-300 hover:text-pink-400 transition-colors"
          >
            Biografía
          </a>
        </nav>

        {/* Menu Button (Properly positioned on the right) */}
        <div className="flex items-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/90 p-2 sm:px-3.5 sm:py-2 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all active:scale-95 shadow-sm"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-pink-400" /> : <Menu className="h-5 w-5 text-zinc-200" />}
            <span className="hidden sm:inline-block ml-2 text-xs font-bold uppercase tracking-wider">Menú</span>
          </button>
        </div>
      </div>

      {/* Mobile / Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-800 bg-zinc-950/98 px-5 py-4 backdrop-blur-2xl">
          <div className="mx-auto max-w-6xl space-y-2">
            <a 
              href="#feed" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-zinc-200 hover:bg-zinc-900 hover:text-pink-400 transition-colors"
            >
              <span>Videos & Archivo</span>
              <span className="text-xs text-zinc-500">Explorar</span>
            </a>
            <a 
              href="#bio" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-zinc-200 hover:bg-zinc-900 hover:text-pink-400 transition-colors"
            >
              <span>Biografía</span>
              <span className="text-xs text-zinc-500">Perfil</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
