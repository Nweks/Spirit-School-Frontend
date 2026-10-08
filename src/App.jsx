import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';
import SermonList from './pages/SermonList';
import SermonDetail from './pages/SermonDetail';
import UploadSermon from './pages/UploadSermon';
import AdminLogin from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { PlayerProvider } from './context/PlayerContext';

export default function App() {
  return (
    <PlayerProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
          <div>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<SermonList />} />
                <Route path="/sermon/:id" element={<SermonDetail />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/upload"
                  element={
                    <ProtectedRoute>
                      <UploadSermon />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
          <Footer />
          <AudioPlayer />
        </div>
      </Router>
    </PlayerProvider>
  );
}