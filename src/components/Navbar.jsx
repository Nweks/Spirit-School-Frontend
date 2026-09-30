// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import { Church, Radio } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
            <Church className="w-6 h-6 text-amber-500" />
          </div>
          <span className="font-bold text-lg tracking-wide text-slate-100">
            GDM <span className="text-amber-500">Media Hub</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> API Connected
          </span>
        </div>
      </div>
    </nav>
  );
}