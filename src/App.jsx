import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CountryPage from './pages/CountryPage'
import Login from './pages/Login'
import Favorites from './pages/Favorites'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<CountryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<div className="p-6 text-center text-xl">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  )
}
export default App
