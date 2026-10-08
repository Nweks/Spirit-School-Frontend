import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Upload, Music, Image as ImageIcon, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function UploadSermon() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [preacher, setPreacher] = useState('Pastor');
  
  // Exact defaults matching your Django models.py
  const [category, setCategory] = useState('GDM Monthly Gathering');
  
  const [audioFile, setAudioFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Matches Category(models.TextChoices) in Django
  const CATEGORY_CHOICES = [
    { label: 'GDM Monthly Gathering', value: 'GDM Monthly Gathering' },
    { label: 'Prayer Session', value: 'Prayer Session' },
    { label: 'Worship & Praise', value: 'Worship & Praise' },
    { label: 'Special Exhortation', value: 'Special Exhortation' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioFile) {
      setError('Please select an audio file to upload.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('preacher', preacher || 'Pastor');
    formData.append('category', category);
    formData.append('media_type', 'sermon_audio'); // Matches MediaType.SERMON_AUDIO
    formData.append('audio_file', audioFile);

    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    formData.append('description', '');

    try {
      await API.post('/sermons/', formData);
      setSuccess(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error('Validation Error Details:', err.response?.data);
      const backendError = err.response?.data
        ? JSON.stringify(err.response.data)
        : 'Failed to upload sermon.';
      setError(backendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100">Upload New Sermon</h1>
            <p className="text-xs text-slate-400">Add new audio recordings to Cloudinary media storage</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-rose-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-400 text-xs">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>Sermon uploaded successfully! Redirecting...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Sermon Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. In the pursuit of God"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          {/* Preacher & Category Dropdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Preacher / Speaker
              </label>
              <input
                type="text"
                required
                value={preacher}
                onChange={(e) => setPreacher(e.target.value)}
                placeholder="e.g. Pastor Ayomide"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/50 cursor-pointer"
              >
                {CATEGORY_CHOICES.map((choice) => (
                  <option key={choice.value} value={choice.value} className="bg-slate-900 text-slate-100">
                    {choice.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Audio File Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Audio File (.mp3, .m4a, .wav)
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer bg-slate-950 border border-slate-800 hover:border-slate-700 px-4 py-2.5 rounded-xl text-xs font-medium text-amber-500 flex items-center gap-2 transition-colors">
                <Music className="w-4 h-4" />
                <span>Choose File</span>
                <input
                  type="file"
                  accept="audio/*"
                  required
                  onChange={(e) => setAudioFile(e.target.files[0])}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-slate-400 truncate max-w-xs">
                {audioFile ? audioFile.name : 'No file chosen'}
              </span>
            </div>
          </div>

          {/* Thumbnail File Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Cover Image / Thumbnail (Optional)
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer bg-slate-950 border border-slate-800 hover:border-slate-700 px-4 py-2.5 rounded-xl text-xs font-medium text-amber-500 flex items-center gap-2 transition-colors">
                <ImageIcon className="w-4 h-4" />
                <span>Choose File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-slate-400 truncate max-w-xs">
                {thumbnail ? thumbnail.name : 'No file chosen'}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing Sermon...</span>
              </>
            ) : (
              <span>Publish Sermon</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}