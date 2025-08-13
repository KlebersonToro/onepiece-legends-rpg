import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FruitList from "./components/FruitList"; // Importa nosso novo componente

function App() {
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
        <FruitList /> {/* Renderiza o componente da lista de frutas */}
      </main>
    </div>
  );
}

export default App;
