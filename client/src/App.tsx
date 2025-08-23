// src/App.tsx
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "./config/config";
import { DevilFruit } from "./types";
import "./App.scss";
import logo from "./logo.svg";
import FruitList from "./components/FruitList";
import AddFruitForm from "./components/AddFruitForm";
import Modal from "./components/Modal";
import EditFruitForm from "./components/EditFruitForm";
import SortSelector from "./components/SortSelector";

function App() {
  // O estado da lista de frutas agora vive em App
  const [fruits, setFruits] = useState<DevilFruit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Começa como 'null', significando que nenhum modal está aberto.
  const [editingFruit, setEditingFruit] = useState<DevilFruit | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [isAddFruitModalOpen, setIsAddFruitModalOpen] =
    useState<boolean>(false);

  // O useEffect para buscar os dados também vive em App
  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/fruits`);
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

  // Função para adicionar a nova fruta ao estado
  const handleFruitAdded = (newFruit: DevilFruit) => {
    setFruits((currentFruits) => [...currentFruits, newFruit]);
  };

  const handleOpenAddFruitModal = () => {
    setIsAddFruitModalOpen(true);
  };

  const handleCloseAddFruitModal = () => {
    setIsAddFruitModalOpen(false);
  };

  const handleFruitDelete = async (id: number) => {
    // Adicionamos 'async'
    if (
      window.confirm(
        "Tem certeza que deseja excluir esta fruta? Esta ação não pode ser desfeita."
      )
    ) {
      try {
        // Fazemos a chamada à API para deletar no backend
        const response = await fetch(`${API_BASE_URL}/api/fruits/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          // Se a API retornar um erro, nós o capturamos aqui
          throw new Error("Falha ao excluir a fruta do banco de dados.");
        }

        // Atualizamos o estado do frontend APENAS se o backend confirmar o sucesso
        setFruits((currentFruits) =>
          currentFruits.filter((fruit) => fruit.id !== id)
        );
      } catch (error) {
        console.error("Erro ao excluir a fruta:", error);
        alert("Não foi possível excluir a fruta. Tente novamente.");
      }
    }
  };

  const handleFruitUpdated = (updatedFruit: DevilFruit) => {
    setFruits((currentFruits) =>
      currentFruits.map((fruit) =>
        fruit.id === updatedFruit.id ? updatedFruit : fruit
      )
    );
  };

  const handleFruitEdit = (fruit: DevilFruit) => {
    setEditingFruit(fruit);
  };

  const handleCloseModal = () => {
    setEditingFruit(null);
  };

  // LÓGICA DE ORDENAÇÃO
  const sortedFruits = [...fruits].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

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
          <div className="main-actions-container">
            <button
              onClick={handleOpenAddFruitModal}
              className="add-fruit-button"
            >
              Adicionar Nova Fruta
            </button>
          </div>

          <SortSelector
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
          />

          <FruitList
            fruits={sortedFruits}
            loading={loading}
            error={error}
            onDelete={handleFruitDelete}
            onEdit={handleFruitEdit}
          />

          {/* Modal Adicionar Fruta */}
          {isAddFruitModalOpen && (
            <Modal onClose={handleCloseAddFruitModal}>
              <AddFruitForm
                onFruitAdded={(newFruit) => {
                  handleFruitAdded(newFruit);
                  handleCloseAddFruitModal(); // Fecha o modal após adicionar
                }}
                onCancel={handleCloseAddFruitModal} // Passa a função para o botão Cancelar
              />
            </Modal>
          )}

          {/* RENDERIZAÇÃO CONDICIONAL DO MODAL DE EDIÇÃO*/}
          {/* Se 'editingFruit' não for nulo, o modal será exibido */}
          {editingFruit && (
            <Modal onClose={handleCloseModal}>
              <EditFruitForm
                fruit={editingFruit}
                onClose={handleCloseModal}
                onFruitUpdated={handleFruitUpdated} // PASSAMOS A NOVA FUNÇÃO
              />
            </Modal>
          )}
        </main>
      </main>
    </div>
  );
}

export default App;
