import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchByCode } from '../api'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

function CountryPage() {
  const { code } = useParams()
  const [country, setCountry] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    fetchByCode(code).then(data => setCountry(data[0]))
  }, [code])

  const addToFavorites = async () => {
    if (!user) return alert("Please login first")
    const countryDoc = doc(db, "users", user.uid, "favorites", country.cca3)
    await setDoc(countryDoc, {
      name: country.name.common,
      flag: country.flags.svg,
      capital: country.capital?.[0],
      region: country.region,
      population: country.population,
      code: country.cca3
    })
    alert("Added to favorites!")
  }

  if (!country) return <p className="p-6">Loading...</p>

  return (
    <div className="p-6">
      <img src={country.flags.svg} alt="flag" className="w-60 mb-4 rounded border" />
      <h1 className="text-3xl font-bold">{country.name.common}</h1>
      <p><strong>Capital:</strong> {country.capital?.[0]}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}</p>

      {user && (
        <button
          onClick={addToFavorites}
          className="mt-4 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          Add to Favorites
        </button>
      )}
      {!user && (
        <p className="mt-4 text-red-500">Login to add this country to favorites.</p>
      )}
    </div>
  )
}

export default CountryPage
