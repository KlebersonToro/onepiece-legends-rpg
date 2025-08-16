// src/components/FruitCard.tsx
import React from "react";
import styles from "./FruitCard.module.scss";

interface DevilFruit {
  id: number;
  name: string;
  meaning: string;
  currentUser: string | null;
  picture: string | null;
  categoria: string;
  fandomUrl?: string;
}

// 1. ATUALIZAMOS AS PROPS QUE O COMPONENTE ESPERA RECEBER
// Ele agora espera receber uma função 'onDelete'
interface FruitCardProps {
  fruit: DevilFruit;
  onDelete: (id: number) => void;
}

const FruitCard: React.FC<FruitCardProps> = ({ fruit, onDelete }) => {
  const imageUrl =
    fruit.picture || "https://via.placeholder.com/150?text=Sem+Imagem";

  return (
    <div className={styles.fruitCard}>
      <img src={imageUrl} alt={fruit.name} className={styles.fruitImage} />
      <div className={styles.fruitInfo}>
        <h3>{fruit.name}</h3>
        <p>
          <strong>Significado:</strong> {fruit.meaning}
        </p>
        <p>
          <strong>Categoria:</strong>{" "}
          <span
            className={`${styles.category} ${
              styles[fruit.categoria.toLowerCase()]
            }`}
          >
            {fruit.categoria}
          </span>
        </p>
        <p>
          <strong>Usuário Atual:</strong> {fruit.currentUser || "Desconhecido"}
        </p>
        {fruit.fandomUrl && (
          <a
            href={fruit.fandomUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fandomLink}
            title="Ver na Fandom Wiki" // <-- Adicionado para acessibilidade
          >
            🔗
          </a>
        )}
      </div>
      {/* 2. ADICIONAMOS O CONTAINER PARA OS BOTÕES DE AÇÃO */}
      <div className={styles.cardActions}>
        <button className={styles.editButton} title="Editar">
          ✏️
        </button>
        <button
          onClick={() => onDelete(fruit.id)}
          className={styles.deleteButton}
          title="Excluir"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default FruitCard;
