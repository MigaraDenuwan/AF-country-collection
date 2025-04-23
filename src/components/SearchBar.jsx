function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="🔍 Search for a country..."
      onChange={(e) => onSearch(e.target.value)}
      className="p-3 border rounded-lg w-full max-w-md focus:outline-none focus:ring focus:ring-blue-500"
    />
  )
}
export default SearchBar
