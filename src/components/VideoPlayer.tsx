import React, { useEffect, useRef, useState } from 'react';
import { Heart, MessageCircle, Play, Share2, Volume2, VolumeX, X, Send, Check, Copy } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Video, Comment } from '../types';

interface VideoPlayerProps {
  video: Video;
  isActive: boolean;
  onPlay: () => void;
  onOpenModal?: () => void;
  isModal?: boolean;
}

function formatNumber(num: number) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function fallbackCopyText(text: string): boolean {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}

async function safeCopyText(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return fallbackCopyText(text);
    }
  }
  return fallbackCopyText(text);
}

export function VideoPlayer({ video, isActive, onPlay, onOpenModal, isModal = false }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(isModal);
  const [isMuted, setIsMuted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  
  // Real-time comment list state
  const [comments, setComments] = useState<Comment[]>(video.commentsList);
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});

  // Dynamic interaction emulator
  const [likes, setLikes] = useState(video.baseLikes);
  const [commentsCount, setCommentsCount] = useState(video.baseComments);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    // Emulator: subtle periodic increase in likes to simulate active community
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setLikes(prev => prev + 1);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isModal && videoRef.current) {
      videoRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  }, [isModal]);

  useEffect(() => {
    if (!isActive && isPlaying && videoRef.current && !isModal) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive, isPlaying, isModal]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setHasLiked(true);
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
    if (!newComment.trim()) return;

    const added: Comment = {
      id: `new_${Date.now()}`,
      user: 'tu_usuario',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      text: newComment.trim(),
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
    } else {
      onPlay();
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-black flex flex-col group transition-all duration-300 w-full",
        isModal 
          ? "w-full h-full rounded-2xl shadow-2xl ring-1 ring-zinc-800" 
          : "w-full rounded-none sm:rounded-3xl shadow-2xl sm:ring-1 sm:ring-zinc-800/80 sm:hover:ring-zinc-700/80"
      )}
    >
      {/* Video Container adapted automatically to full width of screen */}
      <div 
        className="relative w-full cursor-pointer overflow-hidden bg-black flex items-center justify-center select-none h-[calc(100dvh-5rem)] sm:h-[86vh] md:h-[90vh] max-h-[96vh]"
        onClick={togglePlay}
      >
        {/* Ambient blurred backdrop video to fill any widescreen periphery */}
        <video
          src={`${video.url}#t=0.001`}
          loop
          playsInline
          muted
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-35 pointer-events-none"
        />

        {/* Foreground sharp video automatically adapted to 100% of the screen width */}
        <video
          ref={videoRef}
          src={`${video.url}#t=0.001`}
          loop
          playsInline
          muted={isMuted}
          preload="metadata"
          controlsList="nodownload"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          className={cn(
            "relative z-1 w-full h-full object-cover pointer-events-none transition-transform duration-500",
            !isPlaying && "scale-[1.01]"
          )}
        />
        
        {/* Soft Vignette Gradients */}
        <div className="absolute inset-0 z-2 bg-gradient-to-b from-black/40 via-transparent to-black/85 pointer-events-none" />

        {/* Play indicator button */}
        <div className={cn(
          "absolute inset-0 z-5 flex items-center justify-center bg-black/25 transition-opacity duration-300 pointer-events-none",
          isPlaying ? "opacity-0" : "opacity-100"
        )}>
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-pink-500/90 shadow-[0_0_35px_rgba(219,39,119,0.6)] backdrop-blur-md transition-transform scale-100 group-hover:scale-105">
            <Play className="h-8 w-8 sm:h-10 sm:w-10 text-white fill-white ml-1.5" />
          </div>
        </div>

        {/* Top Controls: Sound toggle */}
        <div className="absolute top-4 right-4 z-10 pointer-events-auto">
          {/* Sound toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
            title={isMuted ? "Activar sonido" : "Silenciar"}
            className="rounded-full bg-black/55 border border-white/10 p-2.5 text-white backdrop-blur-md transition-all hover:bg-black/80 hover:scale-105 active:scale-95 shadow-md"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>

        {/* Floating Copied Notification Toast */}
        {shareCopied && (
          <div className="absolute top-16 inset-x-0 mx-auto w-fit z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-2xl backdrop-blur-md pointer-events-none transition-all">
            <Check className="h-4 w-4 stroke-[3]" />
            <span>¡Enlace copiado al portapapeles!</span>
          </div>
        )}

        {/* Bottom Content (Natural Description) */}
        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 flex flex-col justify-end z-10 pointer-events-none">
          <div className="w-[80%] sm:w-[82%] max-w-lg pointer-events-auto">
            <p className="text-sm sm:text-base font-normal text-white drop-shadow leading-snug">
              {video.description}
            </p>
          </div>
        </div>

        {/* Side Interaction Bar */}
        <div className="absolute bottom-5 right-3.5 sm:right-5 flex flex-col items-center gap-4 sm:gap-5 z-10 pointer-events-auto">
          {/* Like */}
          <button onClick={handleLike} className="flex flex-col items-center gap-1 group/btn focus:outline-none">
            <div className={cn(
              "rounded-full p-3 backdrop-blur-xl border border-white/10 transition-all shadow-xl",
              hasLiked ? "bg-pink-600/30 border-pink-500/50 scale-110" : "bg-black/50 hover:bg-zinc-850"
            )}>
              <Heart className={cn("h-6 w-6 transition-transform active:scale-75", hasLiked ? "text-pink-500 fill-pink-500" : "text-white")} />
            </div>
            <span className="text-[11px] font-bold text-white drop-shadow tracking-wide">{formatNumber(likes)}</span>
          </button>
          
          {/* Comments */}
          <button 
            onClick={(e) => { e.stopPropagation(); setShowComments(true); }}
            className="flex flex-col items-center gap-1 group/btn focus:outline-none"
          >
            <div className="rounded-full bg-black/50 border border-white/10 p-3 backdrop-blur-xl transition-all shadow-xl hover:bg-zinc-800">
              <MessageCircle className="h-6 w-6 text-white transition-transform active:scale-75" />
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
            <div className="rounded-full bg-black/50 border border-white/10 p-3 backdrop-blur-xl transition-all shadow-xl hover:bg-zinc-800">
              {shareCopied ? (
                <Check className="h-6 w-6 text-emerald-400" />
              ) : (
                <Share2 className="h-6 w-6 text-white transition-transform active:scale-75" />
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
        "absolute inset-x-0 bottom-0 z-30 bg-zinc-950/98 backdrop-blur-2xl border-t border-zinc-800/90 rounded-t-3xl transition-transform duration-300 ease-out flex flex-col shadow-2xl",
        showComments ? "translate-y-0 h-[65%]" : "translate-y-full h-0 pointer-events-none"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/70 shrink-0">
          <div className="flex items-center gap-2">
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-white">Comentarios</h3>
            <span className="text-xs font-semibold text-pink-400">({formatNumber(commentsCount)})</span>
          </div>
          <button 
            type="button"
            onClick={() => setShowComments(false)} 
            className="rounded-full bg-zinc-900 p-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3 group/comment">
              <img 
                src={comment.avatar} 
                alt={comment.user} 
                className="h-8 w-8 rounded-full bg-zinc-800 object-cover shrink-0 border border-zinc-700/50" 
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold text-zinc-200">@{comment.user}</span>
                  <span className="text-[10px] text-zinc-400">{comment.time}</span>
                </div>
                <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">{comment.text}</p>
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

        {/* New Comment Input */}
        <form onSubmit={handleAddComment} className="p-3.5 border-t border-zinc-800/80 bg-zinc-950 shrink-0">
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario respetuoso..." 
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-pink-500/70 transition-colors"
            />
            <button 
              type="submit"
              disabled={!newComment.trim()}
              className="rounded-full bg-pink-600 p-2 text-white disabled:opacity-40 hover:bg-pink-500 transition-colors active:scale-95"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Slide-up Share Drawer (100% in-app, completely prevents blank screen/flicker) */}
      <div className={cn(
        "absolute inset-x-0 bottom-0 z-35 bg-zinc-950/98 backdrop-blur-2xl border-t border-zinc-800/90 rounded-t-3xl transition-transform duration-300 ease-out flex flex-col shadow-2xl overflow-hidden",
        showShareModal ? "translate-y-0 max-h-[80%]" : "translate-y-full h-0 pointer-events-none"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/70 shrink-0">
          <div className="flex items-center gap-2">
            <Share2 className="h-4 w-4 text-pink-500" />
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
              Enlace del video
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/90 p-1.5 pr-2">
              <input 
                type="text" 
                readOnly 
                value={typeof window !== 'undefined' ? window.location.href : ''}
                className="flex-1 bg-transparent px-2.5 text-xs text-zinc-300 focus:outline-none select-all"
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
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all shrink-0",
                  shareCopied 
                    ? "bg-emerald-600 text-white" 
                    : "bg-pink-600 text-white hover:bg-pink-500 active:scale-95"
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
              Compartir directamente
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button 
                type="button"
                onClick={() => {
                  const url = typeof window !== 'undefined' ? window.location.href : '';
                  const text = `Mira este video de Gisela: ${url}`;
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
                }}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-900/50 bg-emerald-950/40 p-2.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-900/50 transition-colors"
              >
                <span>WhatsApp</span>
              </button>

              <button 
                type="button"
                onClick={() => {
                  const url = typeof window !== 'undefined' ? window.location.href : '';
                  window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Gisela Privé Oficial')}`, '_blank', 'noopener,noreferrer');
                }}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-sky-900/50 bg-sky-950/40 p-2.5 text-xs font-semibold text-sky-400 hover:bg-sky-900/50 transition-colors"
              >
                <span>Telegram</span>
              </button>

              <button 
                type="button"
                onClick={() => {
                  const url = typeof window !== 'undefined' ? window.location.href : '';
                  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Gisela Privé ✨')}`, '_blank', 'noopener,noreferrer');
                }}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/80 p-2.5 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 transition-colors"
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
