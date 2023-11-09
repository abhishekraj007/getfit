import { ActivityType } from '@t4/ui/src/modals';
import React, { createContext, useState } from 'react';

const defaultFilter = {
  type: ActivityType.random,
  price: [0],
  participants: 0,
  accessibility: [0],
};

export const FilterContext = createContext({
  filter: defaultFilter,
  updateFilter: (_: string, _value: any) => {},
  clearFilter: () => {},
});

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filter, setFilter] = useState(defaultFilter);

  const updateFilter = (key: string, value) => {
    setFilter({
      ...filter,
      [key]: value,
    });
  };

  const clearFilter = () => {
    setFilter(defaultFilter);
  };

  return (
    <FilterContext.Provider value={{ filter, updateFilter, clearFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
