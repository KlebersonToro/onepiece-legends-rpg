// src/App.tsx
import React, { useState, useEffect } from "react";
import "./App.scss";
import logo from "./logo.svg";
import FruitList from "./components/FruitList";
import AddFruitForm from "./components/AddFruitForm";
import { DevilFruit } from './types';

function App() {
  // 1. O estado da lista de frutas agora vive em App
  const [fruits, setFruits] = useState<DevilFruit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 2. O useEffect para buscar os dados também vive em App
  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/fruits");
        if (!response.ok) {
          throw new Error("A resposta da rede não foi ok");
        }
        const data: DevilFruit[] = await response.json();
        setFruits(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFruits();
  }, []);

  // 3. Função para adicionar a nova fruta ao estado
  const handleFruitAdded = (newFruit: DevilFruit) => {
    setFruits((currentFruits) => [...currentFruits, newFruit]);
  };

  const handleFruitDelete = (id: number) => {
    // Adiciona a caixa de diálogo de confirmação do navegador
    if (
      window.confirm(
        "Tem certeza que deseja excluir esta fruta? Esta ação não pode ser desfeita."
      )
    ) {
      // A lógica de exclusão só roda se o usuário clicar em "OK"
      setFruits((currentFruits) =>
        currentFruits.filter((fruit) => fruit.id !== id)
      );
      // Nota: A chamada à API para deletar no backend ainda precisa ser adicionada aqui.
      // Faremos isso em seguida para garantir que o dado seja removido do banco.
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h1>Frontend do RPG de One Piece</h1>
      </header>
      <main>
        <main>
          <AddFruitForm onFruitAdded={handleFruitAdded} />
          <hr />
          <FruitList
            fruits={fruits}
            loading={loading}
            error={error}
            onDelete={handleFruitDelete}
          />
        </main>
      </main>
    </div>
  );
}

export default App;
