import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

function Navbar() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/login")
  }

  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex gap-4 items-center">
        <Link to="/" className="text-xl font-bold">🌍 Country Explorer</Link>
        {user && <Link to="/favorites" className="hover:underline">Favorites</Link>}
      </div>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-sm">{user.email}</span>
            <button onClick={handleLogout} className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-blue-100 transition">Logout</button>
          </>
        ) : (
          <Link to="/login" className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-blue-100 transition">Login</Link>
        )}
      </div>
    </nav>
  )
}
export default Navbar
