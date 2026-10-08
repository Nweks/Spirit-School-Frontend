import { Play, Sparkles, Radio, ArrowRight } from 'lucide-react';
import { usePlayer } from '../context/usePlayer';

export default function Hero({ latestSermon }) {
  const { playTrack } = usePlayer();

  return (
    <div className="relative overflow-hidden bg-slate-950 border-b border-slate-800/80 mb-10">
      {/* Background Glow Overlay */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Welcome to Spirit School Media</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight">
              Experience God's Word, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-200">
                Anytime & Anywhere
              </span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Stream powerful audio recordings, prayer sessions, and anointed teachings from our services. Be uplifted and transformed by the Word of Truth.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              {latestSermon && (
                <button
                  onClick={() => playTrack(latestSermon)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 text-sm"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Listen to Latest Message</span>
                </button>
              )}
              <a
                href="#sermons-list"
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-slate-100 px-6 py-3.5 rounded-xl transition-all text-sm font-semibold flex items-center gap-2"
              >
                <span>Browse All Sermons</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Featured Sermon Card */}
          {latestSermon && (
            <div className="lg:col-span-5">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl relative backdrop-blur-sm group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                    <Radio className="w-3 h-3 animate-pulse text-amber-400" />
                    Latest Message
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {latestSermon.category || 'Sermon'}
                  </span>
                </div>

                {/* Thumbnail Image */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 mb-4 border border-slate-800">
                  {latestSermon.thumbnail_url ? (
                    <img
                      src={latestSermon.thumbnail_url}
                      alt={latestSermon.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-amber-500 font-bold text-lg">
                      Sprit School Media
                    </div>
                  )}
                  <button
                    onClick={() => playTrack(latestSermon)}
                    className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                  </button>
                </div>

                <h3 className="font-bold text-slate-100 text-lg line-clamp-1 mb-1">
                  {latestSermon.title}
                </h3>
                <p className="text-xs text-amber-500 font-medium">{latestSermon.preacher}</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}