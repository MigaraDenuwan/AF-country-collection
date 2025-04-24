import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchByCode } from '../api';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { Heart, ArrowLeft, Globe, Users, Map } from 'lucide-react';

function CountryPage() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth();
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    const fetchCountry = async () => {
      setLoading(true);
      try {
        const data = await fetchByCode(code);
        setCountry(data[0]);
        
        // Fetch border countries if available
        if (data[0]?.borders?.length > 0) {
          const borderData = await fetchByCode(data[0].borders.join(','));
          setBorderCountries(borderData);
        }
        
        // Check if country is in favorites
        if (user) {
          const favoriteRef = doc(db, "users", user.uid, "favorites", data[0].cca3);
          const docSnap = await getDoc(favoriteRef);
          setIsFavorite(docSnap.exists());
        }
      } catch (error) {
        console.error('Error fetching country:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (code) {
      fetchCountry();
    }
  }, [code, user]);

  const toggleFavorite = async () => {
    if (!user) return;
    
    const favoriteRef = doc(db, "users", user.uid, "favorites", country.cca3);
    
    if (isFavorite) {
      await deleteDoc(favoriteRef);
      setIsFavorite(false);
    } else {
      await setDoc(favoriteRef, {
        name: country.name.common,
        flag: country.flags.svg,
        capital: country.capital?.[0],
        region: country.region,
        population: country.population,
        code: country.cca3
      });
      setIsFavorite(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center pt-20">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen flex justify-center items-center flex-col pt-20 px-4">
        <h2 className="text-2xl font-bold mb-4">Country not found</h2>
        <Link to="/" className="btn-primary">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4 min-h-screen animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center space-x-2 text-gray-300 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} />
          <span>Back to all countries</span>
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="overflow-hidden rounded-2xl shadow-2xl animate-fadeIn">
            <img 
              src={country.flags.svg} 
              alt={`Flag of ${country.name.common}`} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div className="space-y-6 animate-slideUp">
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold">{country.name.common}</h1>
              
              {user && (
                <button 
                  onClick={toggleFavorite}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isFavorite 
                      ? 'bg-red-500 text-white' 
                      : 'bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700'
                  }`}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart size={20} fill={isFavorite ? "white" : "none"} />
                </button>
              )}
            </div>
            
            {country.name.nativeName && (
              <p className="text-gray-400">
                Native name: {Object.values(country.name.nativeName)[0]?.common}
              </p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Users size={20} className="text-indigo-400" />
                  <p>
                    <span className="text-gray-400">Population: </span>
                    <span className="font-medium">{country.population.toLocaleString()}</span>
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Globe size={20} className="text-indigo-400" />
                  <p>
                    <span className="text-gray-400">Region: </span>
                    <span className="font-medium">{country.region}</span>
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Map size={20} className="text-indigo-400" />
                  <p>
                    <span className="text-gray-400">Sub Region: </span>
                    <span className="font-medium">{country.subregion || 'N/A'}</span>
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center text-indigo-400">🏙️</div>
                  <p>
                    <span className="text-gray-400">Capital: </span>
                    <span className="font-medium">{country.capital?.[0] || 'N/A'}</span>
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                {country.currencies && (
                  <p>
                    <span className="text-gray-400">Currencies: </span>
                    <span className="font-medium">
                      {Object.values(country.currencies)
                        .map(currency => `${currency.name} (${currency.symbol})`)
                        .join(', ')}
                    </span>
                  </p>
                )}
                
                {country.languages && (
                  <p>
                    <span className="text-gray-400">Languages: </span>
                    <span className="font-medium">
                      {Object.values(country.languages).join(', ')}
                    </span>
                  </p>
                )}
                
                {country.timezones && (
                  <p>
                    <span className="text-gray-400">Timezones: </span>
                    <span className="font-medium">
                      {country.timezones[0]}{country.timezones.length > 1 && ` (+${country.timezones.length - 1} more)`}
                    </span>
                  </p>
                )}
              </div>
            </div>
            
            {borderCountries.length > 0 && (
              <div className="pt-4">
                <h3 className="font-semibold mb-3 text-gray-300">Border Countries:</h3>
                <div className="flex flex-wrap gap-3">
                  {borderCountries.map(border => (
                    <Link 
                      key={border.cca3}
                      to={`/country/${border.cca3}`}
                      className="glass-card px-4 py-2 rounded-md hover:border-indigo-400 transition-all"
                    >
                      {border.name.common}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {!user && (
              <div className="mt-6 p-4 glass-card rounded-lg">
                <p className="text-gray-300">
                  <Link to="/login" className="text-indigo-400 hover:underline">Login</Link> to add this country to your favorites.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryPage;