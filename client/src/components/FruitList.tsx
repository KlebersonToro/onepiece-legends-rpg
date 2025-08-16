// src/components/FruitList.tsx
import React from "react";
import FruitCard from "./FruitCard";
import styles from "./FruitList.module.scss";
import { DevilFruit } from '../types';

interface FruitListProps {
  fruits: DevilFruit[];
  loading: boolean;
  error: string | null;
  onDelete: (id: number) => void; // 1. O componente agora espera receber a função onDelete
}

const FruitList: React.FC<FruitListProps> = ({
  fruits,
  loading,
  error,
  onDelete,
}) => {
  if (loading) return <p>Carregando frutas do diabo...</p>;
  if (error) return <p>Erro ao buscar dados: {error}</p>;

  return (
    <div>
      <h2>Lista de Akuma no Mi</h2>
      <div className={styles.fruitListContainer}>
        {fruits.map((fruit) => (
          // 2. A função onDelete recebida é passada para cada FruitCard
          <FruitCard key={fruit.id} fruit={fruit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default FruitList;
