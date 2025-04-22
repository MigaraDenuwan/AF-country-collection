function Filter({ onFilter }) {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  return (
    <select
      className="p-3 border rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
      onChange={(e) => onFilter(e.target.value)}
    >
      <option value="">🌍 All Regions</option>
      {regions.map(r => <option key={r} value={r}>{r}</option>)}
    </select>
  )
}
export default Filter