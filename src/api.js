const BASE_URL = 'https://restcountries.com/v3.1'

export const fetchAllCountries = () => fetch(`${BASE_URL}/all`).then(res => res.json())
export const fetchByName = (name) => fetch(`${BASE_URL}/name/${name}`).then(res => res.json())
export const fetchByRegion = (region) => fetch(`${BASE_URL}/region/${region}`).then(res => res.json())
export const fetchByCode = (code) => fetch(`${BASE_URL}/alpha/${code}`).then(res => res.json())
