import { useEffect, useState } from 'react';
import { fetchAllCountries, fetchByName, fetchByRegion } from '../api';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import CountryCard from '../components/CountryCard';
import EarthGlobe from '../components/EarthGlobe';

function Home() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    const fetchData = async () => {
      try {
        let data;
        
        if (query) {
          data = await fetchByName(query);
        } else if (region) {
          data = await fetchByRegion(region);
        } else {
          data = await fetchAllCountries();
        }
        
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };
    
    // Add a small delay to show loading animation
    const timer = setTimeout(fetchData, 300);
    
    return () => clearTimeout(timer);
  }, [query, region]);

  return (
    <div className="pt-20 pb-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-glow">
            Earth Explorer
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our beautiful planet and explore countries from space
          </p>
        </div>
        
        <EarthGlobe />
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-12 animate-fadeIn">
          <SearchBar onSearch={setQuery} />
          <Filter onFilter={setRegion} />
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : countries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {countries.map((country, index) => (
              <CountryCard key={country.cca3} country={country} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-300 mb-2">No countries found</h2>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;