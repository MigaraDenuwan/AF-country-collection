import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CountryPage from './pages/CountryPage';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import Stars from './components/Stars';
import { AuthProvider } from './context/AuthContext';
import EarthGlobe from './components/EarthGlobe';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen relative text-gray-100">
          <Stars />
          <EarthGlobe />
          <Navbar />
          <main className="page-transition">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/country/:code" element={<CountryPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center pt-20">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404</h1>
                    <p className="text-xl mb-6">Page Not Found</p>
                    <a href="/" className="btn-primary">Return Home</a>
                  </div>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;