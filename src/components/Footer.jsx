import { Church, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs py-10 mt-20 mb-20 md:mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center">
              <Church className="w-5 h-5" />
            </div>
            <span>Spirit School Media</span>
          </div>
          <p className="text-slate-400 leading-relaxed max-w-sm">
            Empowering believer growth through God's Word, anointed audio sermons, and spiritual resources.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h4 className="text-slate-200 font-semibold text-sm">Service Focus</h4>
          <ul className="space-y-1.5 text-slate-400">
            <li>GDM Monthly Gathering</li>
            <li>Prayer Session</li>
            <li>Worship & Praise</li>
            <li>Special Exhortation</li>
          </ul>
        </div>

        {/* Worship Hours / Info */}
        <div className="space-y-2">
          <h4 className="text-slate-200 font-semibold text-sm">Worship & Ministry</h4>
          <p className="text-slate-400 leading-relaxed">
            Join our Monthly General Discipleship Meeting (GDM) every month.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <p>© {new Date().getFullYear()} Spirt School Media Platform. All rights reserved.</p>
        <p className="flex items-center gap-1">
          <span>Built with</span>
          <Heart className="w-3 h-3 text-amber-500 fill-current" />
          <span>for kingdom impact.</span>
        </p>
      </div>
    </footer>
  );
}