import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Church, Upload, LogIn, LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  // Calling hook directly ensures re-evaluation on navigation without unused variable warnings
  useLocation(); 

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Read auth token dynamically
  const token = localStorage.getItem('accessToken');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/admin/login');
  };

  return (
    <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/10 group-hover:scale-105 transition-transform">
              <Church className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-slate-100 tracking-tight group-hover:text-amber-400 transition-colors">
                Spirit School
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest -mt-1 font-semibold">
                Media Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
            <Link to="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <a href="#sermons-list" className="hover:text-amber-400 transition-colors">
              Sermons & Audio
            </a>
            <a href="#sermons-list" className="hover:text-amber-400 transition-colors">
              Categories
            </a>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {token ? (
              <>
                <Link
                  to="/upload"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Sermon</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/admin/login"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border border-slate-700"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-slate-100 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-3 text-sm font-medium">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-amber-400 py-1"
          >
            Home
          </Link>
          <a
            href="#sermons-list"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-amber-400 py-1"
          >
            Sermons & Audio
          </a>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            {token ? (
              <>
                <Link
                  to="/upload"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-amber-500 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Sermon</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-slate-800 text-slate-300 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-slate-800 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700"
              >
                <LogIn className="w-4 h-4" />
                <span>Admin Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}