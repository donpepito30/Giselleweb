import { CheckCircle2, Link2, MapPin, CalendarDays } from 'lucide-react';
import { USER_PROFILE, VIDEOS } from '../data';

export function HeroProfile() {
  const bannerVideo = VIDEOS.find(v => v.url.includes('1775107671455')) || VIDEOS[0]; // Sunset video for banner

  return (
    <section id="bio" className="bg-zinc-950 pb-10">
      {/* Cover Banner (Strictly 16:9 on all screens) */}
      <div 
        className="relative w-full aspect-video bg-zinc-900 overflow-hidden"
        onContextMenu={(e) => e.preventDefault()}
      >
        <video 
          src={`${bannerVideo.url}#t=0.001`}
          autoPlay 
          loop 
          muted 
          playsInline
          disablePictureInPicture
          controlsList="nodownload"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%] pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Profile Details Container */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          
          {/* Avatar (Direct frame loop from the Hero video) & Name */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-end -mt-16 sm:-mt-20 md:-mt-24 relative z-10">
            <div className="relative shrink-0 self-start sm:self-auto">
              <div className="h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44 overflow-hidden rounded-full border-4 border-zinc-950 bg-zinc-900 shadow-2xl ring-2 ring-pink-500/30">
                {/* Real video frame from the hero video */}
                <video 
                  src={`${bannerVideo.url}#t=0.001`}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  disablePictureInPicture
                  controlsList="nodownload"
                  onContextMenu={(e) => e.preventDefault()}
                  className="h-full w-full object-cover pointer-events-none"
                />
              </div>
              <div className="absolute bottom-2 right-2 rounded-full border-4 border-zinc-950 bg-emerald-500 p-1.5 shadow-md">
                <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
              </div>
            </div>
            
            <div className="pb-1 sm:pb-3">
              <div className="flex items-center gap-2">
                <h1 className="font-brand text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                  {USER_PROFILE.name}
                </h1>
                <CheckCircle2 className="h-5 w-5 sm:h-7 sm:w-7 text-pink-500" fill="currentColor" stroke="black" />
              </div>
              <p className="text-pink-400 font-semibold text-sm sm:text-base tracking-wide mt-0.5">
                {USER_PROFILE.handle}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2.5 pb-2 sm:pb-3 pt-2 sm:pt-0">
            <button className="rounded-full bg-zinc-900 border border-zinc-800 px-5 py-2.5 text-xs uppercase tracking-wider font-bold text-zinc-200 transition-colors hover:bg-zinc-800 hover:text-white">
              Mensaje
            </button>
            <a 
              href="#feed"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-2.5 text-xs uppercase tracking-wider font-extrabold text-black shadow-lg transition-all hover:bg-zinc-200 hover:scale-[1.02] active:scale-95"
            >
              Ver Videos
            </a>
          </div>
        </div>

        {/* Bio & Stats */}
        <div className="mt-6 max-w-2xl">
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
            <div className="flex items-center gap-1.5 text-zinc-400 font-medium">
              <Link2 className="h-3.5 w-3.5 text-zinc-500" />
              <span>@gisela08.07</span>
            </div>
          </div>

          <div className="mt-6 flex gap-6 sm:gap-8 border-t border-zinc-900 pt-5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-white">{USER_PROFILE.likes}</span>
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">Me Gusta</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-white">{USER_PROFILE.followers}</span>
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">Seguidores</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-white">{USER_PROFILE.following}</span>
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">Siguiendo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
