import { useState, useMemo } from 'react';

interface SearchableItem {
  [key: string]: any;
}

interface UseSearchOptions<T> {
  data: T[];
  searchFields: (keyof T)[];
  debounceMs?: number;
}

export function useSearch<T extends SearchableItem>({ 
  data, 
  searchFields, 
  debounceMs = 300 
}: UseSearchOptions<T>) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase().trim();
    
    return data.filter(item => 
      searchFields.some(field => {
        const value = item[field];
        return value && value.toString().toLowerCase().includes(query);
      })
    );
  }, [data, searchQuery, searchFields]);

  const clearSearch = () => setSearchQuery('');

  const isSearching = searchQuery.length > 0;

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
    clearSearch,
    isSearching
  };
} 