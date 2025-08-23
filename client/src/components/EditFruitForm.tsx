// src/components/EditFruitForm.tsx
import React, { useState } from "react";
import { DevilFruit } from "../types";
import { API_BASE_URL } from "../config/config";
import styles from "./AddFruitForm.module.scss"; // Vamos reutilizar os mesmos estilos!

interface EditFruitFormProps {
  fruit: DevilFruit;
  onClose: () => void;
  onFruitUpdated: (updatedFruit: DevilFruit) => void;
}

const EditFruitForm: React.FC<EditFruitFormProps> = ({
  fruit,
  onClose,
  onFruitUpdated,
}) => {
  // 1. Inicializamos o estado com os dados da fruta que veio via props
  const [name, setName] = useState(fruit.name);
  const [meaning, setMeaning] = useState(fruit.meaning);
  const [categoria, setCategoria] = useState(fruit.categoria);
  const [currentUser, setCurrentUser] = useState(fruit.currentUser || "");
  const [picture, setPicture] = useState(fruit.picture || "");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedData = { name, meaning, categoria, currentUser, picture };

    try {
      const response = await fetch(`${API_BASE_URL}/api/fruits/${fruit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Falha ao atualizar a fruta.");
      }

      const updatedFruitFromServer = await response.json();
      // Avisa o App.tsx sobre a atualização
      onFruitUpdated(updatedFruitFromServer);
      // Fecha o modal
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar fruta:", error);
      alert("Erro ao atualizar fruta.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.fruitForm}>
      <h2>Editando: {fruit.name}</h2>

      <label>Nome:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Significado:</label>
      <input
        type="text"
        value={meaning}
        onChange={(e) => setMeaning(e.target.value)}
        required
      />

      <label>Categoria:</label>
      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        <option value="Paramecia">Paramecia</option>
        <option value="Zoan">Zoan</option>
        <option value="Logia">Logia</option>
      </select>

      <label>Usuário Atual:</label>
      <input
        type="text"
        value={currentUser}
        onChange={(e) => setCurrentUser(e.target.value)}
      />

      <label>URL da Imagem:</label>
      <input
        type="text"
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
      />

      <div className={styles.actionsContainer}>
        <button
          type="button"
          onClick={onClose}
          className={styles.buttonSecondary}
        >
          Cancelar
        </button>
        <button type="submit" className={styles.buttonPrimary}>
          Salvar Alterações
        </button>
      </div>
    </form>
  );
};

export default EditFruitForm;
