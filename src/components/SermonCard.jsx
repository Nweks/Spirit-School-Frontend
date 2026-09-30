
import { Play, FileText,  User, Calendar, Tag } from 'lucide-react';

export default function SermonCard({ sermon }) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-700 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Thumbnail or Fallback Header */}
        <div className="relative h-48 w-full bg-slate-800 overflow-hidden">
          {sermon.thumbnail_url ? (
            <img 
              src={sermon.thumbnail_url} 
              alt={sermon.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-800/50">
              <Play className="w-12 h-12 text-slate-600" />
            </div>
          )}
          <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-800">
            {sermon.media_type || 'Audio'}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-amber-500 font-medium mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>{sermon.category}</span>
          </div>

          <h3 className="text-xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
            {sermon.title}
          </h3>

          {sermon.theme && (
            <p className="text-sm text-slate-400 italic mt-1">"{sermon.theme}"</p>
          )}

          <p className="text-sm text-slate-400 mt-3 line-clamp-2">
            {sermon.description}
          </p>

          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-500" /> {sermon.preacher}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" /> {sermon.date_preached}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 pt-0 flex items-center gap-2">
        {sermon.audio_url && (
          <a
            href={sermon.audio_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold py-2 px-3 rounded-lg text-sm transition-colors"
          >
            <Play className="w-4 h-4 fill-current" /> Listen
          </a>
        )}

        {sermon.pdf_notes_url && (
          <a
            href={sermon.pdf_notes_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm border border-slate-700 transition-colors"
            title="Download Study Notes"
          >
            <FileText className="w-4 h-4 text-amber-400" />
          </a>
        )}
      </div>
    </div>
  );
}