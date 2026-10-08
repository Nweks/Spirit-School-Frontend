import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import SermonCard from '../components/SermonCard';
import { usePlayer } from '../context/usePlayer';
import {
  Loader2,
  Search,
  SlidersHorizontal,
  Play,
  Sparkles,
  BookOpen,
  Heart,
  Radio,
  UserCheck,
} from 'lucide-react';

export default function SermonList() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { playTrack } = usePlayer();

  useEffect(() => {
     const fetchSermons = async () => {
    try {
      const res = await API.get('/sermons/');
      setSermons(res.data);
    } catch (err) {
      console.error('Failed to fetch sermons:', err);
    } finally {
      setLoading(false);
    }
  };
    fetchSermons();
  }, []);

  const featuredSermon = sermons.find((s) => s.is_featured) || sermons[0];
  const categories = ['All', ...new Set(sermons.map((s) => s.category).filter(Boolean))];

  const filteredSermons = sermons.filter((sermon) => {
    const matchesSearch =
      sermon.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.preacher?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || sermon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO SPOTLIGHT SECTION */}
      {featuredSermon && (
        <section className="relative overflow-hidden bg-slate-900/80 border-b border-slate-800/80 pt-10 pb-12 sm:pt-16 sm:pb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-purple-500/10 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Hero Text */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Message</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
                  {featuredSermon.title}
                </h1>

                <p className="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed line-clamp-3">
                  {featuredSermon.description ||
                    'Stream and listen to powerful spiritual teachings from Spirit School. Equip your heart with God’s Word.'}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => playTrack(featuredSermon, sermons)}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 text-xs"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Listen Now</span>
                  </button>

                  <Link
                    to={`/sermon/${featuredSermon.id}`}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-5 py-3 rounded-xl transition-all text-xs"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* Hero Banner / Thumbnail */}
              <div className="lg:col-span-5 relative">
                <div className="aspect-video sm:aspect-square rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl relative group">
                  {featuredSermon.thumbnail_url ? (
                    <img
                      src={featuredSermon.thumbnail_url}
                      alt={featuredSermon.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-amber-500 font-bold text-lg">
                      Spirit School Spotlight
                    </div>
                  )}
                  <button
                    onClick={() => playTrack(featuredSermon, sermons)}
                    className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="w-16 h-16 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. ABOUT SPIRIT SCHOOL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Logo Badge */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-slate-950/60 border border-slate-800/80 rounded-2xl">
              <div className="w-24 h-24 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-inner mb-4 overflow-hidden p-2">
                <img
                  src="/logo.jpeg"
                  alt="Spirit School Logo"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-100">Spirit School</h3>
              <p className="text-amber-400/90 text-xs font-medium mt-1">
                Media & Discipleship Hub
              </p>
            </div>

            {/* Note & Core Pillars */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>About Our Ministry</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
                Empowering Believers Through the Uncompromised Word
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Spirit School is dedicated to raising believers equipped with deep spiritual insight, authentic faith, and practical understanding of God's Kingdom. Through anointed audio sermons, monthly gathering sessions, and continuous discipled teaching, we aim to nurture believer growth across the globe.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-950/40 border border-slate-800/60 p-3.5 rounded-xl flex items-center gap-3">
                  <Radio className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Anointed Media</h4>
                    <p className="text-[11px] text-slate-400">High quality audio messages</p>
                  </div>
                </div>

                <div className="bg-slate-950/40 border border-slate-800/60 p-3.5 rounded-xl flex items-center gap-3">
                  <Heart className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">GDM Monthly</h4>
                    <p className="text-[11px] text-slate-400">General Discipleship Meetings</p>
                  </div>
                </div>

                <div className="bg-slate-950/40 border border-slate-800/60 p-3.5 rounded-xl flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Spiritual Growth</h4>
                    <p className="text-[11px] text-slate-400">Structured word teachings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MEET THE LEAD PASTOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Pastor Photo Container */}
            <div className="lg:col-span-4 order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl relative group">
                <img
                  src="/pastor.jpeg"
                  alt="Lead Pastor"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Pastor Bio & Message */}
            <div className="lg:col-span-8 order-1 lg:order-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">
                <span>Leadership</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
                Meet Our Lead Pastor
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Led by a passion for truth and spiritual transformation, our lead pastor serves to guide believers into an intimate relationship with God through prayer, discipleship, and systematic preaching of the Scriptures.
              </p>

              <blockquote className="border-l-2 border-amber-500 pl-4 py-1 my-3 text-slate-300 italic text-xs sm:text-sm bg-slate-950/30 rounded-r-lg">
                "Our prayer is that every sermon heard on this hub brings clarity, spiritual strength, and a deeper hunger for the presence of God."
              </blockquote>

              <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
                <span className="font-semibold text-slate-200">Service Focus:</span>
                <span className="bg-slate-800 px-3 py-1 rounded-full text-[11px]">
                  Prayer & Exhortation
                </span>
                <span className="bg-slate-800 px-3 py-1 rounded-full text-[11px]">
                  Discipleship
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MEDIA LIBRARY / SERMONS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-100">Message Archives</h3>
            <p className="text-xs text-slate-400">Browse and listen to recent sermon releases</p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search messages or speakers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sermons Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          </div>
        ) : filteredSermons.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-sm">
            No sermons found matching your filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSermons.map((sermon) => (
              <SermonCard
                key={sermon.id}
                sermon={sermon}
                allSermons={filteredSermons}
                onDelete={(deletedId) =>
                  setSermons((prev) => prev.filter((s) => s.id !== deletedId))
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}