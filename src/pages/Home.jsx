import { useEffect, useState } from 'react'
import { fetchAllCountries, fetchByName, fetchByRegion } from '../api'
import SearchBar from '../components/SearchBar'
import Filter from '../components/Filter'
import CountryCard from '../components/CountryCard'

function Home() {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('')

  useEffect(() => {
    if (query) {
      fetchByName(query).then(setCountries).catch(() => setCountries([]))
    } else if (region) {
      fetchByRegion(region).then(setCountries)
    } else {
      fetchAllCountries().then(setCountries)
    }
  }, [query, region])

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Explore Countries 🌍</h1>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-center mb-6">
        <SearchBar onSearch={setQuery} />
        <Filter onFilter={setRegion} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {countries.map(c => <CountryCard key={c.cca3} country={c} />)}
      </div>
    </div>
  )
}
export default Home