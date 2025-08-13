// src/components/FruitList.tsx
import React, { useState, useEffect } from "react";

// Definimos a "forma" de um objeto de fruta, para usar com TypeScript
interface DevilFruit {
  id: number;
  name: string;
  meaning: string;
  currentUser: string | null;
  picture: string | null;
  categoria: string;
}

const FruitList: React.FC = () => {
  // 'useState' para guardar a lista de frutas que vem da API
  const [fruits, setFruits] = useState<DevilFruit[]>([]);
  // State para controlar o estado de carregamento
  const [loading, setLoading] = useState<boolean>(true);
  // State para guardar possíveis erros
  const [error, setError] = useState<string | null>(null);

  // 'useEffect' para buscar os dados da API quando o componente carregar
  useEffect(() => {
    const fetchFruits = async () => {
      try {
        // Faz a chamada para a nossa API backend
        const response = await fetch("http://localhost:3001/api/fruits");
        if (!response.ok) {
          throw new Error("A resposta da rede não foi ok");
        }
        const data: DevilFruit[] = await response.json();
        setFruits(data); // Armazena os dados no nosso state
      } catch (err: any) {
        setError(err.message); // Armazena a mensagem de erro
      } finally {
        setLoading(false); // Para de carregar, independentemente do resultado
      }
    };

    fetchFruits();
  }, []); // O array vazio [] significa que este efeito roda apenas uma vez

  // Renderiza mensagens de loading ou erro
  if (loading) return <p>Carregando frutas do diabo...</p>;
  if (error) return <p>Erro ao buscar dados: {error}</p>;

  // Renderiza a lista de frutas
  return (
    <div>
      <h2>Lista de Akuma no Mi</h2>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit.id}>
            <strong>{fruit.name}</strong> ({fruit.categoria}) - Usuário:{" "}
            {fruit.currentUser || "Nenhum"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FruitList;
