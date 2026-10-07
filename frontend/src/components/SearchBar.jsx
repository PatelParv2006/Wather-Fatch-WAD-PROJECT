import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, loading }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onSearch(searchInput.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="search-container" style={{ marginBottom: '24px' }}>
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon-left" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter city name (e.g., Ahmedabad, Mumbai, London)..."
          className="search-input"
          disabled={loading}
          autoComplete="off"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading || !searchInput.trim()}
        style={{ minWidth: '130px', padding: '12px 20px' }}
      >
        {loading ? 'Searching...' : 'Search Weather'}
      </button>
    </form>
  );
};

export default SearchBar;
