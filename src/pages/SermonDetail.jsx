import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { usePlayer } from '../context/usePlayer';
import {
  Play,
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Download,
  Loader2,
  Share2,
  BookOpen,
} from 'lucide-react';

export default function SermonDetail() {
  const { id } = useParams();
  const { playTrack } = usePlayer();
  const [sermon, setSermon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchSermonDetail = async () => {
      try {
      const res = await API.get(`/sermons/${id}/`);
      setSermon(res.data);
      } catch (err) {
        console.error('Failed to fetch sermon detail:', err);
      } finally {
        setLoading(false);
      }
    };


    fetchSermonDetail();
  }, [id]);

 
  

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (!sermon) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-100">Sermon Not Found</h2>
        <p className="text-slate-400 text-sm">
          The requested message may have been removed or does not exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-amber-400 hover:underline text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Media Library</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 pt-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sermons</span>
        </Link>

        {/* Hero Detail Section */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Thumbnail */}
          <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group">
            {sermon.thumbnail_url ? (
              <img
                src={sermon.thumbnail_url}
                alt={sermon.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-amber-500 font-bold text-xl">
                Spirit School
              </div>
            )}
            <button
              onClick={() => playTrack(sermon)}
              className="absolute inset-0 bg-slate-950/40 flex items-center justify-center transition-opacity"
            >
              <div className="w-16 h-16 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
            </button>
          </div>

          {/* Details & Actions */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <Tag className="w-3 h-3" />
                <span>{sermon.category || 'Sermon'}</span>
              </span>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
                {sermon.title}
              </h1>
            </div>

            {/* Metadata Tags */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-y border-slate-800/80 py-4">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-amber-500" />
                <span>{sermon.preacher || 'Speaker'}</span>
              </div>
              {sermon.date_preached && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span>{new Date(sermon.date_preached).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => playTrack(sermon)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 text-xs"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Play Sermon Audio</span>
              </button>

              {sermon.audio_url && (
                <a
                  href={sermon.audio_url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-4 py-3 rounded-xl transition-all flex items-center gap-2 text-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download MP3</span>
                </a>
              )}

              <button
                onClick={handleShare}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-semibold p-3 rounded-xl transition-all text-xs"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {copied && (
                <span className="text-[11px] text-amber-400 font-medium">Link copied!</span>
              )}
            </div>
          </div>
        </div>

        {/* Sermon Notes / Description Block */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-slate-200 font-bold text-base border-b border-slate-800/80 pb-3">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span>Sermon Notes & Outline</span>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
            {sermon.description ||
              'No written outline or sermon notes provided for this audio recording. Stream the full audio above to listen to the message.'}
          </p>
        </div>

      </div>
    </div>
  );
}