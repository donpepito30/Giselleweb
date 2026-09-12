import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2, Link2, MapPin, CalendarDays, Sparkles, Heart, Users, Compass, MessageCircle, X, Send, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { USER_PROFILE, VIDEOS } from '../data';
import { usePlayback } from '../context/PlaybackContext';
import { cn, sanitizeInput, isRateLimited } from '../lib/utils';

export function HeroProfile() {
  const bannerVideo = VIDEOS.find(v => v.url.includes('1775107671455')) || VIDEOS[0];
  const { activeVideoId, playVideo, pauseVideo } = usePlayback();
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const profileVideoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [messageError, setMessageError] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [isHeroMuted, setIsHeroMuted] = useState(true);

  const isHeroActive = activeVideoId === 'hero';
  const activeVideoIdRef = useRef(activeVideoId);
  activeVideoIdRef.current = activeVideoId;

  // Synchronize Hero and Profile videos with active zone coordination:
  // When activeVideoId is 'hero', both Hero banner and Profile avatar play automatically.
  // When a feed video becomes active, both Hero banner and Profile avatar pause immediately.
  useEffect(() => {
    const heroVideo = heroVideoRef.current;
    const profileVideo = profileVideoRef.current;

    if (isHeroActive) {
      if (heroVideo && heroVideo.paused) {
        heroVideo.play().catch(() => {});
      }
      if (profileVideo && profileVideo.paused) {
        profileVideo.play().catch(() => {});
      }
    } else {
      if (heroVideo && !heroVideo.paused) {
        heroVideo.pause();
      }
      if (profileVideo && !profileVideo.paused) {
        profileVideo.pause();
      }
    }
  }, [isHeroActive]);

  // Observe Hero section: when scrolled into view, activate 'hero'; when scrolled completely out, pause
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            playVideo('hero');
          } else if (!entry.isIntersecting || entry.intersectionRatio < 0.05) {
            if (activeVideoIdRef.current === 'hero') {
              pauseVideo('hero');
            }
          }
        });
      },
      { threshold: [0, 0.05, 0.2, 0.5] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [playVideo, pauseVideo]);

  const toggleHeroPlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    const heroVideo = heroVideoRef.current;
    if (!heroVideo) return;
    if (heroVideo.paused) {
      playVideo('hero');
      heroVideo.play().catch(() => {});
    } else {
      heroVideo.pause();
    }
  };

  const toggleProfilePlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    const profileVideo = profileVideoRef.current;
    if (!profileVideo) return;
    if (profileVideo.paused) {
      profileVideo.play().catch(() => {});
    } else {
      profileVideo.pause();
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageError(null);

    if (isRateLimited('dm_message', 4000)) {
      setMessageError('Espera unos segundos antes de enviar otro mensaje.');
      setTimeout(() => setMessageError(null), 4000);
      return;
    }

    const clean = sanitizeInput(messageText);
    if (!clean || clean.length < 2) {
      setMessageError('El mensaje debe tener al menos 2 caracteres.');
      setTimeout(() => setMessageError(null), 4000);
      return;
    }

    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setMessageText('');
      setShowMessageModal(false);
    }, 2000);
  };

  return (
    <section ref={sectionRef} id="bio" className="relative bg-zinc-950 pb-12 overflow-hidden">
      {/* Cover Banner (Strictly 16:9 on all screens, crystal clear, autoplaying, without any play icon) */}
      <div 
        className="relative w-full aspect-video bg-zinc-900 overflow-hidden shadow-2xl cursor-pointer select-none group"
        onClick={toggleHeroPlayback}
        onContextMenu={(e) => e.preventDefault()}
      >
        <video 
          ref={heroVideoRef}
          src={`${bannerVideo.url}#t=0.001`}
          autoPlay
          loop 
          muted={isHeroMuted}
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
          style={{ filter: 'none', backdropFilter: 'none' }}
        />

        {/* Audio control button for Hero */}
        <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsHeroMuted(!isHeroMuted);
            }}
            aria-label={isHeroMuted ? "Activar sonido" : "Silenciar"}
            title={isHeroMuted ? "Activar sonido" : "Silenciar"}
            className="rounded-full bg-black/80 border border-white/20 p-2.5 text-white transition-all hover:bg-black hover:border-pink-500 hover:scale-105 active:scale-95 shadow-lg"
          >
            {isHeroMuted ? <VolumeX className="h-4 w-4 text-zinc-300" /> : <Volume2 className="h-4 w-4 text-pink-400" />}
          </button>
        </div>
      </div>

      {/* Profile Details Container */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          
          {/* Avatar with Crisp Frame (Autoplaying, crystal clear, no play icon overlay) */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-end -mt-16 sm:-mt-20 md:-mt-24 relative z-10">
            <div className="relative shrink-0 self-start sm:self-auto group">
              {/* Clean crisp Avatar Frame */}
              <div 
                onClick={toggleProfilePlayback}
                title="Video de perfil"
                className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44 overflow-hidden rounded-full p-[3px] bg-zinc-800 shadow-2xl ring-2 ring-zinc-700/50 hover:ring-pink-500/50 cursor-pointer transition-all duration-300"
              >
                <div className="h-full w-full overflow-hidden rounded-full border-2 border-zinc-950 bg-zinc-900 relative">
                  <video 
                    ref={profileVideoRef}
                    src={`${USER_PROFILE.avatarUrl}#t=0.001`}
                    autoPlay
                    loop 
                    muted 
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                    className="h-full w-full object-cover pointer-events-none"
                    style={{ filter: 'none', backdropFilter: 'none' }}
                  />
                </div>
              </div>

              {/* Live status badge */}
              <div className="absolute bottom-2 right-2 rounded-full border-4 border-zinc-950 bg-emerald-500 p-1.5 shadow-lg">
                <div className="h-2.5 w-2.5 rounded-full bg-white" />
              </div>
            </div>
            
            <div className="pb-1 sm:pb-3">
              <div className="flex items-center gap-2">
                <h1 className="font-brand text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                  {USER_PROFILE.name}
                </h1>
                <CheckCircle2 className="h-5 w-5 sm:h-7 sm:w-7 text-pink-500 shrink-0" fill="currentColor" stroke="black" />
              </div>

              <p className="font-medium text-sm sm:text-base tracking-wide mt-1 text-pink-400">
                {USER_PROFILE.handle}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pb-2 sm:pb-3 pt-2 sm:pt-0">
            <button 
              onClick={() => setShowMessageModal(true)}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800 px-5 py-2.5 text-xs uppercase tracking-wider font-bold text-zinc-200 transition-all hover:bg-zinc-800 hover:text-white hover:border-zinc-700 active:scale-95 shadow-md"
            >
              <MessageCircle className="h-4 w-4 text-pink-400" />
              <span>Mensaje</span>
            </button>

            <a 
              href="#feed"
              className="inline-flex items-center gap-2 rounded-full bg-pink-600 hover:bg-pink-500 px-7 py-2.5 text-xs uppercase tracking-wider font-bold text-white transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-pink-600/20"
            >
              <Sparkles className="h-4 w-4 fill-white" />
              <span>Ver Videos</span>
            </a>
          </div>
        </div>

        {/* Bio & Details */}
        <div className="mt-7 max-w-2xl">
          <p className="whitespace-pre-line text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
            {USER_PROFILE.bio}
          </p>
          
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-zinc-400 font-medium">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-zinc-500" />
              <span>Moda & Estilo de Vida</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-zinc-500" />
              <span>Activa hoy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Link2 className="h-3.5 w-3.5 text-zinc-500" />
              <span>@gisela08.07</span>
            </div>
          </div>

          {/* Clean Stats Grid (No gradients) */}
          <div className="mt-7 grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-zinc-900">
            {/* Likes */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3 sm:p-4 transition-all hover:border-zinc-700">
              <div className="flex items-center gap-1.5 text-pink-400 mb-1">
                <Heart className="h-4 w-4 fill-pink-500/20" />
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-zinc-400">Me Gusta</span>
              </div>
              <span className="text-lg sm:text-2xl font-black text-white">
                {USER_PROFILE.likes}
              </span>
            </div>

            {/* Followers */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3 sm:p-4 transition-all hover:border-zinc-700">
              <div className="flex items-center gap-1.5 text-purple-400 mb-1">
                <Users className="h-4 w-4" />
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-zinc-400">Seguidores</span>
              </div>
              <span className="text-lg sm:text-2xl font-black text-white">
                {USER_PROFILE.followers}
              </span>
            </div>

            {/* Following */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3 sm:p-4 transition-all hover:border-zinc-700">
              <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                <Compass className="h-4 w-4" />
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-zinc-400">Siguiendo</span>
              </div>
              <span className="text-lg sm:text-2xl font-black text-white">
                {USER_PROFILE.following}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive In-App Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-pink-500/15 text-pink-400">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Enviar Mensaje</h3>
                  <p className="text-xs text-zinc-400">Contacto directo con Gisela</p>
                </div>
              </div>
              <button 
                onClick={() => setShowMessageModal(false)}
                className="rounded-full bg-zinc-900 p-2 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            {messageSent ? (
              <div className="py-8 text-center space-y-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold text-white">¡Mensaje Enviado!</h4>
                <p className="text-xs text-zinc-400">Gracias por tu mensaje respetuoso y cariñoso.</p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="pt-4 space-y-4">
                {messageError && (
                  <div className="flex items-center gap-1.5 rounded-lg bg-rose-950/60 border border-rose-500/40 px-3 py-2 text-xs text-rose-200">
                    <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
                    <span>{messageError}</span>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Tu Mensaje</label>
                  <textarea
                    rows={4}
                    required
                    maxLength={300}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Escribe un mensaje respetuoso..."
                    className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/90 p-3.5 text-xs text-white placeholder-zinc-500 focus:border-pink-500 focus:outline-none transition-colors resize-none"
                  />
                  <div className="text-right text-[10px] text-zinc-500 mt-1">
                    {messageText.length}/300
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowMessageModal(false)}
                    className="rounded-full px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={!messageText.trim()}
                    className="inline-flex items-center gap-1.5 rounded-full bg-pink-600 hover:bg-pink-500 px-6 py-2 text-xs font-bold text-white shadow-lg disabled:opacity-50 transition-all active:scale-95"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Enviar</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

