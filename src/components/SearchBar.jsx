import { useState } from 'react';
import { Search } from 'lucide-react';

function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search for a country..."
        value={value}
        onChange={handleChange}
        className="search-input w-full pl-12 pr-4 py-3"
      />
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Search size={20} />
      </div>
      {value && (
        <button 
          onClick={() => {
            setValue('');
            onSearch('');
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;
