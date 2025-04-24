import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Trash2, Heart } from "lucide-react";

function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        try {
          const snapshot = await getDocs(collection(db, "users", user.uid, "favorites"));
          setFavorites(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
          console.error("Error fetching favorites:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, [user]);

  const removeFavorite = async (id) => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "favorites", id));
      setFavorites(prev => prev.filter(f => f.id !== id));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 animate-fadeIn">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-4">
            <Heart size={64} className="text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Sign in to see your favorites</h2>
          <p className="text-gray-400 mb-6">You need to be logged in to view and manage your favorite countries.</p>
          <Link to="/login" className="btn-primary inline-block">
            Sign In Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4 min-h-screen animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-glow mb-2">Your Favorite Countries</h2>
            <p className="text-gray-400">
              {favorites.length > 0 
                ? `You have ${favorites.length} favorite ${favorites.length === 1 ? 'country' : 'countries'}.`
                : 'Start exploring and add countries to your favorites!'}
            </p>
          </div>
          <Link to="/" className="btn-primary">
            Explore More Countries
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : favorites.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <Heart size={48} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">No favorites yet</h3>
            <p className="text-gray-400 mb-6">
              Start exploring countries and add them to your favorites list!
            </p>
            <Link to="/" className="btn-primary inline-block">
              Explore Countries
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {favorites.map((fav, index) => (
              <div 
                key={fav.id} 
                className="country-card opacity-0"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative group">
                  <Link to={`/country/${fav.code}`}>
                    <img 
                      src={fav.flag} 
                      alt={`${fav.name} flag`} 
                      className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70"></div>
                  </Link>
                  <button
                    onClick={() => removeFavorite(fav.id)}
                    className="absolute top-3 right-3 p-2 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    aria-label="Remove from favorites"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <Link to={`/country/${fav.code}`} className="block p-5">
                  <h3 className="text-xl font-bold mb-3 text-gray-100">{fav.name}</h3>
                  <div className="space-y-1 text-gray-300">
                    <p className="flex justify-between">
                      <span className="text-gray-400">Population:</span> 
                      <span>{fav.population.toLocaleString()}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-400">Region:</span>
                      <span>{fav.region}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-400">Capital:</span>
                      <span>{fav.capital || 'N/A'}</span>
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;