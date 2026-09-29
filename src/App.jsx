import  { useEffect, useState } from 'react';
import API from './services/api';
import { Church, ShieldCheck } from 'lucide-react';

function App() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/sermons/')
      .then((res) => {
        setSermons(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Error:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
          <Church className="w-8 h-8 text-amber-500" />
          <h1 className="text-2xl font-bold tracking-wide">
            Global Direct Mission (GDM) Media Hub
          </h1>
        </header>

        <section className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
          <div className="flex items-center gap-2 mb-4 text-emerald-400 font-medium">
            <ShieldCheck className="w-5 h-5" />
            <span>Frontend connected to Django REST API</span>
          </div>

          {loading ? (
            <p className="text-slate-400">Loading media library...</p>
          ) : (
            <div className="space-y-4">
              <p className="text-slate-300">
                Fetched <span className="font-bold text-amber-400">{sermons.length}</span> sermon(s) from backend:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {sermons.map((sermon) => (
                  <div key={sermon.id} className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                    <h3 className="font-semibold text-amber-300">{sermon.title}</h3>
                    <p className="text-sm text-slate-400">Preacher: {sermon.preacher}</p>
                    <p className="text-xs text-slate-500 mt-2">Category: {sermon.category}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;