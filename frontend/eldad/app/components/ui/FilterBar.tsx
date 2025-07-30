import React from 'react';
import { View, ScrollView } from 'react-native';
import FilterButton from './FilterButton';

interface FilterBarProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function FilterBar({ filters, activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <View className="mb-4">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0 }}
      >
        {filters.map((filter) => (
          <FilterButton
            key={filter}
            title={filter}
            isActive={activeFilter === filter}
            onPress={() => onFilterChange(filter)}
          />
        ))}
      </ScrollView>
    </View>
  );
} 