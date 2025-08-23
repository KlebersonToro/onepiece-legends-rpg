// src/components/SortSelector.tsx
import React from "react";
import styles from "./SortSelector.module.scss";

interface SortSelectorProps {
  sortOrder: string;
  onSortOrderChange: (newOrder: string) => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({
  sortOrder,
  onSortOrderChange,
}) => {
  return (
    <div className={styles.sortContainer}>
      <label htmlFor="sort-select">Ordenar por:</label>
      <select
        id="sort-select"
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value)}
        className={styles.sortSelect}
      >
        <option value="asc">Nome (A-Z)</option>
        <option value="desc">Nome (Z-A)</option>
      </select>
    </div>
  );
};

export default SortSelector;
