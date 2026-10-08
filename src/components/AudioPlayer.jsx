import { usePlayer } from '../context/usePlayer';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

export default function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    volume,
    isMuted,
    togglePlay,
    playNext,
    playPrev,
    changeSpeed,
    handleSeek,
    handleVolumeChange,
    toggleMute,
    closePlayer,
  } = usePlayer();

  if (!currentTrack) return null;

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-4 py-3 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Track Metadata */}
        <div className="flex items-center gap-3 w-full sm:w-1/4 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <span className="text-amber-500 font-bold text-xs">🎵</span>
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-slate-100 font-semibold text-xs truncate">
              {currentTrack.title}
            </h4>
            <p className="text-slate-400 text-[11px] truncate">
              {currentTrack.preacher || 'Spirit School'}
            </p>
          </div>
        </div>

        {/* Player Controls & Timeline */}
        <div className="flex flex-col items-center gap-1.5 w-full sm:w-2/4">
          <div className="flex items-center gap-4">
            <button
              onClick={playPrev}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center hover:bg-amber-400 transition-colors shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={playNext}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full text-[10px] text-slate-400">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => handleSeek(Number(e.target.value))}
              className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Speed, Volume & Close Controls */}
        <div className="flex items-center justify-end gap-3 w-full sm:w-1/4">
          <button
            onClick={() => {
              const speeds = [1, 1.25, 1.5, 2];
              const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
              changeSpeed(speeds[nextIndex]);
            }}
            className="text-[10px] font-bold px-2 py-1 rounded bg-slate-800 text-amber-400 hover:bg-slate-700"
          >
            {playbackSpeed}x
          </button>

          <button
            onClick={toggleMute}
            className="text-slate-400 hover:text-slate-200"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(Number(e.target.value))}
            className="w-16 accent-amber-500 h-1 bg-slate-800 rounded-lg cursor-pointer hidden sm:block"
          />

          {/* Close Player Button */}
          <button
            onClick={closePlayer}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors ml-2"
            title="Close Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}