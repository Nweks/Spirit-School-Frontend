import { useEffect, useState, useCallback } from 'react';
import API from '../services/api';
import SermonCard from '../components/SermonCard';
import { Search, Filter, Loader2 } from 'lucide-react';

export default function SermonList() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchSermons = useCallback(async () => {
    setLoading(true);
    try {
      let url = '/sermons/';
      const params = new URLSearchParams();

      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory) params.append('category', selectedCategory);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await API.get(url);
      setSermons(res.data);
    } catch (err) {
      console.error('Error fetching sermons:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSermons();
    }, 300); // Debounce search requests

    return () => clearTimeout(timer);
  }, [fetchSermons]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, theme, or preacher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-auto bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-amber-500/50"
          >
            <option value="">All Categories</option>
            <option value="GDM Monthly Gathering">GDM Monthly Gathering</option>
            <option value="Sunday Service">Sunday Service</option>
            <option value="Bible Study">Bible Study</option>
          </select>
        </div>
      </div>

      {/* Sermons Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500 mb-2" />
          <p>Loading media resources...</p>
        </div>
      ) : sermons.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-400">
          <p className="text-lg">No sermons found matching your query.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sermons.map((sermon) => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </div>
      )}
    </div>
  );
}