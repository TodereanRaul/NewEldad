import { useState } from 'react';

interface UseFilterOptions {
  initialFilter: string;
  filters: string[];
}

export function useFilter({ initialFilter, filters }: UseFilterOptions) {
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  const changeFilter = (filter: string) => {
    if (filters.includes(filter)) {
      setActiveFilter(filter);
    }
  };

  const resetFilter = () => {
    setActiveFilter(initialFilter);
  };

  return {
    activeFilter,
    changeFilter,
    resetFilter,
    filters
  };
} 