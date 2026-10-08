import { Link } from 'react-router-dom';
import { Play, Trash2, User, Tag } from 'lucide-react';
import { usePlayer } from '../context/usePlayer';
import API from '../services/api';

export default function SermonCard({ sermon, allSermons = [], onDelete }) {
  const { playTrack } = usePlayer();
  const token = localStorage.getItem('accessToken');

  const handlePlay = (e) => {
    e.preventDefault();
    // Pass the active sermon AND the full list to enable auto-play queueing
    playTrack(sermon, allSermons);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete "${sermon.title}"?`)) return;

    try {
      await API.delete(`/sermons/${sermon.id}/`);
      if (onDelete) onDelete(sermon.id);
    } catch (err) {
      console.error('Failed to delete sermon:', err);
      alert('Error deleting sermon.');
    }
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 shadow-xl flex flex-col justify-between hover:border-slate-700/80 transition-all group">
      <div>
        {/* Card Thumbnail */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 mb-3 border border-slate-800">
          {sermon.thumbnail_url ? (
            <img
              src={sermon.thumbnail_url}
              alt={sermon.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-amber-500/80 font-bold text-xs">
              Spirit School
            </div>
          )}
          <button
            onClick={handlePlay}
            className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </div>
          </button>
        </div>

        {/* Title Link */}
        <Link to={`/sermon/${sermon.id}`} className="block group-hover:text-amber-400 transition-colors">
          <h3 className="font-bold text-slate-100 text-sm line-clamp-1 mb-1">
            {sermon.title}
          </h3>
        </Link>

        {/* Speaker & Category */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
          <span className="flex items-center gap-1 text-amber-400 font-medium">
            <User className="w-3 h-3" />
            {sermon.preacher || 'Speaker'}
          </span>
          {sermon.category && (
            <span className="flex items-center gap-1 text-slate-500">
              <Tag className="w-3 h-3" />
              {sermon.category}
            </span>
          )}
        </div>
      </div>

      {/* Card Actions */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
        <button
          onClick={handlePlay}
          className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Listen</span>
        </button>

        <div className="flex items-center gap-3">
          <Link
            to={`/sermon/${sermon.id}`}
            className="text-slate-400 hover:text-slate-200 font-medium"
          >
            Details
          </Link>

          {token && (
            <button
              onClick={handleDelete}
              className="text-rose-400 hover:text-rose-300 p-1"
              title="Delete Sermon"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}