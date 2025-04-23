import { Link } from 'react-router-dom';

function CountryCard({ country }) {
  return (
    <Link to={`/country/${country.cca3}`} className="block border rounded-xl shadow-md p-4 hover:shadow-xl transition bg-white dark:bg-gray-800 min-h-[400px]">
      <img
        src={country.flags.svg}
        alt={`${country.name.common} flag`}
        className="w-full h-32 object-cover object-center rounded-lg shadow-md"  // Fixed height for all flags
      />
      <h2 className="text-xl font-bold mt-2">{country.name.common}</h2>
      <p className="text-sm">Population: {country.population.toLocaleString()}</p>
      <p className="text-sm">Region: {country.region}</p>
      <p className="text-sm">Capital: {country.capital?.[0]}</p>
    </Link>
  );
}

export default CountryCard;
