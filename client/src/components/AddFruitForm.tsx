// src/components/AddFruitForm.tsx
import React, { useState } from "react";
import styles from "./AddFruitForm.module.scss";
import { DevilFruit } from '../types'; // Importa a interface do App.tsx

// 1. DEFINIMOS A INTERFACE PARA AS PROPS QUE O COMPONENTE RECEBE
interface AddFruitFormProps {
  onFruitAdded: (fruit: DevilFruit) => void;
}

// 2. O COMPONENTE AGORA USA ESSA INTERFACE E RECEBE 'onFruitAdded'
const AddFruitForm: React.FC<AddFruitFormProps> = ({ onFruitAdded }) => {
  // O estado dos inputs continua o mesmo
  const [name, setName] = useState("");
  const [meaning, setMeaning] = useState("");
  const [categoria, setCategoria] = useState("Paramecia");
  const [currentUser, setCurrentUser] = useState("");
  const [picture, setPicture] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newFruitData = { name, meaning, categoria, currentUser, picture };

    try {
      const response = await fetch("http://localhost:3001/api/fruits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFruitData),
      });

      if (!response.ok) {
        throw new Error("Falha ao criar a fruta.");
      }

      const createdFruit = await response.json();

      // 3. AGORA A FUNÇÃO 'onFruitAdded' EXISTE E PODE SER CHAMADA
      onFruitAdded(createdFruit);

      alert("Fruta adicionada com sucesso!");
      setName("");
      setMeaning("");
      setCategoria("Paramecia");
      setCurrentUser("");
      setPicture("");
    } catch (error) {
      console.error("Erro ao adicionar fruta:", error);
      alert("Erro ao adicionar fruta.");
    }
  };

  // O JSX do formulário continua o mesmo
  return (
    <form onSubmit={handleSubmit} className={styles.fruitForm}>
      <h3>Adicionar Nova Akuma no Mi</h3>
      <input
        type="text"
        placeholder="Nome da Fruta"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Significado"
        value={meaning}
        onChange={(e) => setMeaning(e.target.value)}
        required
      />
      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        <option value="Paramecia">Paramecia</option>
        <option value="Zoan">Zoan</option>
        <option value="Logia">Logia</option>
      </select>
      <input
        type="text"
        placeholder="Usuário Atual (opcional)"
        value={currentUser}
        onChange={(e) => setCurrentUser(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL da Imagem (opcional)"
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
      />
      <button type="submit">Adicionar Fruta</button>
    </form>
  );
};

export default AddFruitForm;
