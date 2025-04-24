import { useState } from 'react';
import { Globe } from 'lucide-react';

function Filter({ onFilter }) {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleChange = (e) => {
    setSelectedRegion(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="relative">
      <select
        value={selectedRegion}
        onChange={handleChange}
        className="search-input appearance-none pl-12 pr-10 py-3 min-w-[200px]"
      >
        <option value="">All Regions</option>
        {regions.map((region) => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Globe size={20} />
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

export default Filter;