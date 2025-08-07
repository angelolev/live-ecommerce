import React from 'react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
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