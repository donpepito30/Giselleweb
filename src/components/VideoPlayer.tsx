import React, { useEffect, useRef, useState } from 'react';
import { Heart, MessageCircle, Play, Share2, Volume2, VolumeX, X, Send, Check, Copy, Music2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn, sanitizeInput, validateCommentInput, isRateLimited, safeCopyText, formatNumber } from '../lib/utils';
import type { Video, Comment } from '../types';
import { USER_PROFILE } from '../data';

interface VideoPlayerProps {
  video: Video;
  isActive: boolean;
  onPlay: () => void;
  onPause?: () => void;
  onOpenModal?: () => void;
  isModal?: boolean;
}

export function VideoPlayer({ video, isActive, onPlay, onPause, isModal = false }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(isModal);
  const [isMuted, setIsMuted] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  
  // Real-time comment list state
  const [comments, setComments] = useState<Comment[]>(video.commentsList);
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});

  // Dynamic interaction emulator
  const [likes, setLikes] = useState(video.baseLikes);
  const [commentsCount, setCommentsCount] = useState(video.baseComments);
  const [hasLiked, setHasLiked] = useState(false);

  // Performance: Lazy-observe player proximity to avoid decoding 39 videos at once
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
      },
      { rootMargin: '300px 0px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Community simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.75) {
        setLikes(prev => prev + 1);
      }
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isModal && videoRef.current) {
      videoRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  }, [isModal]);

  // Clean-up playback if scrolled far away from viewport to save hardware resources
  useEffect(() => {
    if (!isNearViewport && isPlaying && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isNearViewport, isPlaying]);

  useEffect(() => {
    if (!isActive && isPlaying && videoRef.current && !isModal) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else if (isActive && !isPlaying && videoRef.current && isNearViewport) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          });
      }
    }
  }, [isActive, isNearViewport, isPlaying, isModal]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 900);
    }
  };

  const handleToggleCommentLike = (commentId: string) => {
    setLikedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    setCommentError(null);

    // Rate-limiting check: max 1 comment per 3 seconds per video
    if (isRateLimited(`comment_${video.id}`, 3000)) {
      setCommentError('Por favor espera unos segundos antes de enviar otro comentario.');
      setTimeout(() => setCommentError(null), 4000);
      return;
    }

    const { valid, error, cleanText } = validateCommentInput(newComment);
    if (!valid || !cleanText) {
      if (error) {
        setCommentError(error);
        setTimeout(() => setCommentError(null), 4000);
      }
      return;
    }

    const added: Comment = {
      id: `new_${Date.now()}`,
      user: 'fan_vip',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      text: cleanText,
      time: 'Ahora'
    };

    setComments(prev => [added, ...prev]);
    setCommentsCount(prev => prev + 1);
    setNewComment('');
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    await safeCopyText(shareUrl);
    setShareCopied(true);
    setShowShareModal(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      onPause?.();
    } else {
      onPlay();
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-zinc-950 flex flex-col group w-full",
        isModal 
          ? "w-full h-full rounded-2xl shadow-2xl ring-1 ring-zinc-800" 
          : "w-full rounded-none sm:rounded-3xl shadow-2xl border-0 sm:border sm:border-zinc-850"
      )}
    >
      {/* Video Container adapted automatically to full width of screen */}
      <div 
        className="relative w-full cursor-pointer overflow-hidden bg-black flex items-center justify-center select-none h-[calc(100dvh-5rem)] sm:h-[86vh] md:h-[90vh] max-h-[96vh]"
        onClick={togglePlay}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Foreground crystal-clear video with 0 blur and 0 difuminado */}
        {isNearViewport ? (
          <video
            ref={videoRef}
            src={`${video.url}#t=0.5`}
            loop
            playsInline
            muted={isMuted}
            preload={isActive ? "auto" : "metadata"}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            title={`Gisela Privé - ${video.description.slice(0, 60)}`}
            aria-label={`Video de Gisela: ${video.description.slice(0, 60)}`}
            onContextMenu={(e) => e.preventDefault()}
            className="relative z-1 w-full h-full object-cover pointer-events-none"
            style={{ filter: 'none', backdropFilter: 'none' }}
          />
        ) : (
          /* Placeholder while far away from viewport for instant 60fps scrolling */
          <div className="relative z-1 w-full h-full bg-zinc-900 flex items-center justify-center">
            <div className="h-10 w-10 rounded-full border-2 border-pink-500/30 border-t-pink-500 animate-spin" />
          </div>
        )}

        {/* Double-tap / Like heart burst animation */}
        {showHeartBurst && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none animate-in zoom-in-50 fade-in duration-300">
            <div className="p-6 rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.8)] scale-125">
              <Heart className="h-16 w-16 text-white fill-white animate-bounce" />
            </div>
          </div>
        )}

        {/* Crisp play indicator button when paused */}
        <div className={cn(
          "absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-opacity duration-200 pointer-events-none",
          isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-pink-600 text-white shadow-2xl transition-transform hover:scale-105 active:scale-95">
            <Play className="h-8 w-8 sm:h-10 sm:w-10 fill-white ml-1" />
          </div>
        </div>

        {/* Top Controls: Sound toggle with Equalizer Bar */}
        <div className="absolute top-4 right-4 z-20 pointer-events-auto flex items-center gap-2">
          {/* Audio Equalizer visualizer when sound is unmuted and video is playing */}
          {!isMuted && isPlaying && (
            <div className="flex items-end gap-0.5 h-6 px-2.5 py-1 rounded-full bg-black/80 border border-white/20">
              <span className="w-1 bg-pink-400 rounded-full animate-[equalizer_0.7s_ease-in-out_infinite_alternate]" style={{ height: '60%' }} />
              <span className="w-1 bg-purple-400 rounded-full animate-[equalizer_0.5s_ease-in-out_infinite_alternate_0.2s]" style={{ height: '90%' }} />
              <span className="w-1 bg-amber-400 rounded-full animate-[equalizer_0.8s_ease-in-out_infinite_alternate_0.4s]" style={{ height: '75%' }} />
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
            title={isMuted ? "Activar sonido" : "Silenciar"}
            className="rounded-full bg-black/80 border border-white/20 p-2.5 text-white transition-all hover:bg-black hover:border-pink-500 hover:scale-105 active:scale-95 shadow-lg"
          >
            {isMuted ? <VolumeX className="h-4 w-4 text-zinc-300" /> : <Volume2 className="h-4 w-4 text-pink-400" />}
          </button>
        </div>

        {/* Floating Copied Notification Toast */}
        {shareCopied && (
          <div className="absolute top-16 inset-x-0 mx-auto w-fit z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-2xl pointer-events-none transition-all">
            <Check className="h-4 w-4 stroke-[3]" />
            <span>¡Enlace copiado al portapapeles!</span>
          </div>
        )}

        {/* Bottom Content: Clean, professional alignment without any black background */}
        <div className="absolute bottom-5 sm:bottom-6 left-4 sm:left-6 z-20 pointer-events-auto max-w-[70%] sm:max-w-[75%] text-left">
          {/* Creator Profile Handle & Verified Badge */}
          <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
            <span className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] [text-shadow:_0_1px_3px_rgba(0,0,0,0.95)] select-text">
              {USER_PROFILE.handle}
            </span>
            <CheckCircle2 className="h-4 w-4 text-pink-500 fill-pink-500/20 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" />
          </div>

          {/* Description text: pure video background, crystal clear readability via typography text shadows */}
          <div className="relative text-left" onClick={(e) => e.stopPropagation()}>
            <p 
              className={cn(
                "text-xs sm:text-sm text-white/95 leading-relaxed font-normal select-text transition-all duration-200",
                "drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] [text-shadow:_0_1px_3px_rgba(0,0,0,0.95),_0_2px_8px_rgba(0,0,0,0.9)]",
                !isExpanded && "line-clamp-2"
              )}
            >
              {video.description}
            </p>
            {video.description.length > 75 && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-1 inline-block text-xs font-semibold text-white/90 hover:text-white underline underline-offset-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] [text-shadow:_0_1px_3px_rgba(0,0,0,0.95)] transition-colors focus:outline-none cursor-pointer"
              >
                {isExpanded ? "Ver menos" : "Ver más"}
              </button>
            )}
          </div>

          {/* Audio track info line */}
          <div className="mt-2.5 flex items-center gap-2 text-[11px] sm:text-xs text-white/90 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] [text-shadow:_0_1px_3px_rgba(0,0,0,0.95)]">
            <Music2 className="h-3.5 w-3.5 shrink-0 text-pink-400 animate-[spin_4s_linear_infinite]" />
            <span className="truncate tracking-wide">Sonido original — {USER_PROFILE.name}</span>
          </div>
        </div>

        {/* Side Interaction Bar with Crisp Buttons (No blur) */}
        <div className="absolute bottom-5 right-3.5 sm:right-5 flex flex-col items-center gap-4 sm:gap-5 z-20 pointer-events-auto">
          {/* Like */}
          <button onClick={handleLike} className="flex flex-col items-center gap-1 group/btn focus:outline-none">
            <div className={cn(
              "rounded-full p-3 border transition-all duration-200 shadow-xl",
              hasLiked 
                ? "bg-pink-600 border-pink-400 text-white scale-105 shadow-pink-600/40" 
                : "bg-black/80 border-white/20 hover:bg-black hover:border-pink-500"
            )}>
              <Heart className={cn("h-6 w-6 transition-transform active:scale-75", hasLiked ? "text-white fill-white" : "text-white group-hover/btn:text-pink-400")} />
            </div>
            <span className={cn("text-[11px] font-bold drop-shadow tracking-wide", hasLiked ? "text-pink-400" : "text-white")}>
              {formatNumber(likes)}
            </span>
          </button>
          
          {/* Comments */}
          <button 
            onClick={(e) => { e.stopPropagation(); setShowComments(true); }}
            className="flex flex-col items-center gap-1 group/btn focus:outline-none"
          >
            <div className="rounded-full bg-black/80 border border-white/20 p-3 transition-all duration-200 shadow-xl hover:bg-black hover:border-purple-500 group-hover/btn:scale-105">
              <MessageCircle className="h-6 w-6 text-white group-hover/btn:text-purple-400 transition-colors active:scale-75" />
            </div>
            <span className="text-[11px] font-bold text-white drop-shadow tracking-wide">{formatNumber(commentsCount)}</span>
          </button>

          {/* Share */}
          <button 
            type="button" 
            onClick={handleShare} 
            className="flex flex-col items-center gap-1 group/btn focus:outline-none"
            aria-label="Compartir video"
          >
            <div className="rounded-full bg-black/80 border border-white/20 p-3 transition-all duration-200 shadow-xl hover:bg-black hover:border-amber-500 group-hover/btn:scale-105">
              {shareCopied ? (
                <Check className="h-6 w-6 text-emerald-400" />
              ) : (
                <Share2 className="h-6 w-6 text-white group-hover/btn:text-amber-400 transition-colors active:scale-75" />
              )}
            </div>
            <span className="text-[11px] font-bold text-white drop-shadow tracking-wide">
              {shareCopied ? "Listo" : formatNumber(video.baseShares)}
            </span>
          </button>
        </div>
      </div>

      {/* Slide-up Comments Drawer */}
      <div className={cn(
        "absolute inset-x-0 bottom-0 z-30 bg-zinc-950 border-t border-zinc-800 rounded-t-3xl transition-transform duration-300 ease-out flex flex-col shadow-2xl",
        showComments ? "translate-y-0 h-[68%]" : "translate-y-full h-0 pointer-events-none"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-white">Comentarios</h3>
            <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              ({formatNumber(commentsCount)})
            </span>
          </div>
          <button 
            type="button"
            onClick={() => setShowComments(false)} 
            className="rounded-full bg-zinc-900 p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3 group/comment rounded-2xl p-2 transition-colors hover:bg-white/5">
              <img 
                src={comment.avatar} 
                alt={comment.user} 
                loading="lazy"
                className="h-8 w-8 rounded-full bg-zinc-800 object-cover shrink-0 border border-pink-500/30" 
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold text-zinc-200">@{comment.user}</span>
                  <span className="text-[10px] text-zinc-500">{comment.time}</span>
                </div>
                <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed break-words">{comment.text}</p>
              </div>
              <button 
                type="button"
                onClick={() => handleToggleCommentLike(comment.id)}
                className="self-center p-1.5 text-zinc-400 hover:text-pink-500 transition-colors"
              >
                <Heart className={cn(
                  "h-3.5 w-3.5 transition-transform active:scale-125",
                  likedComments[comment.id] ? "text-pink-500 fill-pink-500" : ""
                )} />
              </button>
            </div>
          ))}
        </div>

        {/* New Comment Input with Sanitization & Gradient Button */}
        <form onSubmit={handleAddComment} className="p-3.5 border-t border-white/10 bg-zinc-950 shrink-0">
          {commentError && (
            <div className="mb-2 flex items-center gap-1.5 rounded-lg bg-rose-950/60 border border-rose-500/40 px-3 py-1.5 text-[11px] text-rose-200">
              <AlertCircle className="h-3.5 w-3.5 text-rose-400 shrink-0" />
              <span>{commentError}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              maxLength={280}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario respetuoso..." 
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 transition-colors"
            />
            <button 
              type="submit"
              disabled={!newComment.trim()}
              className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-2.5 text-white disabled:opacity-40 hover:opacity-90 shadow-md shadow-pink-500/25 transition-all active:scale-95"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Slide-up Share Drawer */}
      <div className={cn(
        "absolute inset-x-0 bottom-0 z-35 bg-zinc-950 border-t border-zinc-800 rounded-t-3xl transition-transform duration-300 ease-out flex flex-col shadow-2xl overflow-hidden",
        showShareModal ? "translate-y-0 max-h-[80%]" : "translate-y-full h-0 pointer-events-none"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-pink-500/15 text-pink-400">
              <Share2 className="h-4 w-4" />
            </div>
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-white">Compartir video</h3>
          </div>
          <button 
            type="button"
            onClick={() => setShowShareModal(false)} 
            className="rounded-full bg-zinc-900 p-1.5 text-zinc-400 hover:text-white transition-colors"
            aria-label="Cerrar compartir"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Direct Link Copy */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              Enlace directo
            </label>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/90 p-1.5 pr-2">
              <input 
                type="text" 
                readOnly 
                value={typeof window !== 'undefined' ? window.location.href : ''}
                className="flex-1 bg-transparent px-3 text-xs text-zinc-300 focus:outline-none select-all"
              />
              <button 
                type="button"
                onClick={async () => {
                  const url = typeof window !== 'undefined' ? window.location.href : '';
                  await safeCopyText(url);
                  setShareCopied(true);
                  setTimeout(() => setShareCopied(false), 2500);
                }}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all shrink-0",
                  shareCopied 
                    ? "bg-emerald-600 text-white" 
                    : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 active:scale-95"
                )}
              >
                {shareCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{shareCopied ? "¡Copiado!" : "Copiar"}</span>
              </button>
            </div>
          </div>

          {/* Social Quick Share Buttons */}
          <div className="space-y-1.5 pt-1">
            <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              Compartir en redes
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button 
                type="button"
                onClick={() => {
                  const url = typeof window !== 'undefined' ? window.location.href : '';
                  const text = `Mira este video oficial de Gisela Privé: ${url}`;
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
                }}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-2.5 text-xs font-bold text-emerald-400 hover:bg-emerald-900/50 transition-colors shadow-sm"
              >
                <span>WhatsApp</span>
              </button>

              <button 
                type="button"
                onClick={() => {
                  const url = typeof window !== 'undefined' ? window.location.href : '';
                  window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Gisela Privé Oficial')}`, '_blank', 'noopener,noreferrer');
                }}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-950/40 p-2.5 text-xs font-bold text-sky-400 hover:bg-sky-900/50 transition-colors shadow-sm"
              >
                <span>Telegram</span>
              </button>

              <button 
                type="button"
                onClick={() => {
                  const url = typeof window !== 'undefined' ? window.location.href : '';
                  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Gisela Privé ✨')}`, '_blank', 'noopener,noreferrer');
                }}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-950/40 p-2.5 text-xs font-bold text-purple-300 hover:bg-purple-900/50 transition-colors shadow-sm"
              >
                <span>X / Twitter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

