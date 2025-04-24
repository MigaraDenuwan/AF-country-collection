import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function CountryCard({ country, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slideUp');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <Link
      to={`/country/${country.cca3}`}
      ref={cardRef}
      className="country-card block opacity-0"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="relative overflow-hidden group">
        <img
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70"></div>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold mb-3 text-gray-100">{country.name.common}</h2>
        <div className="space-y-1 text-gray-300">
          <p className="flex justify-between">
            <span className="text-gray-400">Population:</span>
            <span>{country.population.toLocaleString()}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Region:</span>
            <span>{country.region}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Capital:</span>
            <span>{country.capital?.[0] || 'N/A'}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CountryCard;
