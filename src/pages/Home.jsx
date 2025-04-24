import { useEffect, useState } from 'react';
import { fetchAllCountries, fetchByName, fetchByRegion } from '../api';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import CountryCard from '../components/CountryCard';

function Home() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(true);

  const [totalCountries, setTotalCountries] = useState(0);
  const [totalPopulation, setTotalPopulation] = useState(0);
  const [totalLanguages, setTotalLanguages] = useState(0);
  const [regions, setRegions] = useState(new Set());

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
        setTotalCountries(data.length);

        // Calculate total population
        const population = data.reduce((sum, country) => sum + (country.population || 0), 0);
        setTotalPopulation(population);

        // Calculate unique languages
        const languageSet = new Set();
        data.forEach((country) => {
          const langs = Object.values(country.languages || {});
          langs.forEach((lang) => languageSet.add(lang));
        });
        setTotalLanguages(languageSet.size);

        // Collect unique regions
        const regionSet = new Set(data.map((c) => c.region));
        setRegions(regionSet);

      } catch (error) {
        console.error('Error fetching countries:', error);
        setCountries([]);
        setTotalCountries(0);
        setTotalPopulation(0);
        setTotalLanguages(0);
        setRegions(new Set());
      } finally {
        setLoading(false);
      }
    };

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

        <div className="flex flex-col md:flex-row gap-1 items-center justify-center mb-12 animate-fadeIn">
          <SearchBar onSearch={setQuery} />
          <Filter onFilter={setRegion} />
        </div>

        {!loading && !query && !region && (
          <div className="mb-16 animate-fadeIn">            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="glass-card p-6 rounded-2xl text-center group hover:border-indigo-500/50 transition-all duration-500">
                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  1
                </div>
                <div className="text-gray-400 font-medium">World</div>
              </div>

              <div className="glass-card p-6 rounded-2xl text-center group hover:border-indigo-500/50 transition-all duration-500">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  {regions.size}
                </div>
                <div className="text-gray-400 font-medium">Regions</div>
              </div>

              <div className="glass-card p-6 rounded-2xl text-center group hover:border-indigo-500/50 transition-all duration-500">
                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  {totalCountries}
                </div>
                <div className="text-gray-400 font-medium">Countries</div>
              </div>
              
              <div className="glass-card p-6 rounded-2xl text-center group hover:border-indigo-500/50 transition-all duration-500">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  {totalLanguages}
                </div>
                <div className="text-gray-400 font-medium">Languages</div>
              </div>
              
              <div className="glass-card py-6 px-3 rounded-2xl text-center group hover:border-indigo-500/50 transition-all duration-500">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  {totalPopulation}
                </div>
                <div className="text-gray-400 font-medium">People</div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : countries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {[...countries]
              .sort((a, b) => a.name.common.localeCompare(b.name.common))
              .map((country, index) => (
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
