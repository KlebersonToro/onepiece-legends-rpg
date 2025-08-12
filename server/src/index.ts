import express, { Request, Response } from "express";

// Cria uma instância do aplicativo Express
const app = express();

// Define a porta em que o servidor vai rodar
const PORT = 3001;

// Middleware para o Express entender JSON no corpo das requisições
app.use(express.json());

// Uma rota de teste para verificar se a API está funcionando
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "A API do RPG de One Piece está no ar!" });
});

// Inicia o servidor e o faz "escutar" na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}! ⛵`);
});
