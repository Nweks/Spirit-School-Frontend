import {  useState, useRef, useEffect } from 'react';
import { PlayerContext } from './PlayerContextObject';



export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(null);

  const playTrack = (track, trackList = []) => {
    setCurrentTrack(track);
    if (trackList.length > 0) {
      setPlaylist(trackList);
    }
    setIsPlaying(true);
  };

  // Close player and stop playing
  const closePlayer = () => {
    setIsPlaying(false);
    setCurrentTrack(null);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const togglePlay = () => {
    if (!currentTrack) return;
    setIsPlaying((prev) => !prev);
  };

  const playNext = () => {
    if (!currentTrack || playlist.length === 0) return;
    const currentIndex = playlist.findIndex((item) => item.id === currentTrack.id);
    if (currentIndex !== -1 && currentIndex + 1 < playlist.length) {
      setCurrentTrack(playlist[currentIndex + 1]);
      setIsPlaying(true);
    }
  };

  const playPrev = () => {
    if (!currentTrack || playlist.length === 0) return;
    const currentIndex = playlist.findIndex((item) => item.id === currentTrack.id);
    if (currentIndex > 0) {
      setCurrentTrack(playlist[currentIndex - 1]);
      setIsPlaying(true);
    }
  };

  const changeSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const targetMute = !isMuted;
      setIsMuted(targetMute);
      audioRef.current.muted = targetMute;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.error('Audio play error:', err));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed, currentTrack]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        playbackSpeed,
        volume,
        isMuted,
        playlist,
        playTrack,
        closePlayer,
        togglePlay,
        playNext,
        playPrev,
        changeSpeed,
        handleSeek,
        handleVolumeChange,
        toggleMute,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src={currentTrack?.audio_url || currentTrack?.audio_file}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => {
          setDuration(audioRef.current?.duration || 0);
          if (audioRef.current) {
            audioRef.current.playbackRate = playbackSpeed;
          }
        }}
        onEnded={playNext}
      />
    </PlayerContext.Provider>
  );
}