import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        const snapshot = await getDocs(collection(db, "users", user.uid, "favorites"));
        setFavorites(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      };
      fetchFavorites();
    }
  }, [user]);

  const removeFavorite = async (id) => {
    await deleteDoc(doc(db, "users", user.uid, "favorites", id));
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  if (!user) return <p className="p-6 text-red-500">You need to login to view favorites.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Favorite Countries</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {favorites.map(fav => (
            <div key={fav.id} className="border p-4 rounded shadow">
              <img src={fav.flag} alt="flag" className="w-full h-32 object-cover rounded" />
              <h3 className="font-bold text-lg mt-2">{fav.name}</h3>
              <p>Capital: {fav.capital}</p>
              <p>Region: {fav.region}</p>
              <p>Population: {fav.population.toLocaleString()}</p>
              <button onClick={() => removeFavorite(fav.id)} className="mt-2 bg-red-600 text-white px-3 py-1 rounded">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
