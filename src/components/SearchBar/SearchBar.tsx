import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../icons/SearchIcon';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Buscar",
  onSearch
}) => {
  const [query, setQuery] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim());
      } else {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <SearchIcon width={24} height={24} color="var(--color-text-secondary)" />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
      />
    </form>
  );
};