import express, { Request, Response } from "express";
// 1. Importe o Prisma Client
import { PrismaClient } from "./generated/prisma";
import cors from 'cors';

const app = express();
const PORT = 3001;

// 2. Crie uma instância do Prisma Client
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// 3. Crie uma nova rota para buscar as frutas (GET all fruits)
app.get("/api/fruits", async (req: Request, res: Response) => {
  try {
    // 4. Use o Prisma para buscar todos os registros da tabela DevilFruit 
    const { categoria } = req.query;

    const whereClause = categoria ? { categoria: categoria as string } : {};

    const allFruits = await prisma.devilFruit.findMany({ where: whereClause });

    res.status(200).json(allFruits);
  } catch (error) {
    // 1. Registre o erro no console para você, o desenvolvedor
    console.error("Erro ao buscar frutas:", error);
    // 2. Envie uma resposta genérica para o usuário
    res
      .status(500)
      .json({ error: "Ocorreu um erro interno ao processar sua solicitação." });
  }
});

// Rota para CRIAR uma nova fruta - CREATE
app.post("/api/fruits", async (req: Request, res: Response) => {
  try {
    // Pega os dados da nova fruta do corpo da requisição
    const { name, meaning, currentUser, picture, categoria } = req.body;

    // Usa o Prisma para criar um novo registro no banco
    const newFruit = await prisma.devilFruit.create({
      data: {
        name,
        meaning,
        currentUser,
        picture,
        categoria,
      },
    });

    // Retorna a fruta recém-criada com o status 201 (Created)
    res.status(201).json(newFruit);
  } catch (error) {
    // 1. Registre o erro no console para você, o desenvolvedor
    console.error("Erro ao criar fruta:", error);
    // 2. Envie uma resposta genérica para o usuário
    res
      .status(500)
      .json({ error: "Ocorreu um erro interno ao processar sua solicitação." });
  }
});

// Rota para BUSCAR uma única fruta pelo ID - READ
app.get("/api/fruits/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const fruit = await prisma.devilFruit.findUnique({
      where: {
        id: Number(id), // Busca pelo ID, convertendo para número
      },
    });

    // Se a fruta não for encontrada, retorna um erro 404
    if (!fruit) {
      return res.status(404).json({ error: "Fruta não encontrada." });
    }

    // Se encontrou, retorna a fruta
    res.status(200).json(fruit);
  } catch (error) {
    console.error("Erro ao buscar fruta por ID:", error);
    res
      .status(500)
      .json({ error: "Ocorreu um erro interno ao processar sua solicitação." });
  }
});

// Rota para ATUALIZAR (Update) uma fruta existente - UPDATE
app.put("/api/fruits/:id", async (req: Request, res: Response) => {
  try {
    // 1. Pega o ID da fruta dos parâmetros da URL
    const { id } = req.params;
    // 2. Pega os novos dados do corpo da requisição
    const { name, meaning, currentUser, picture, categoria } = req.body;

    // 3. Usa o Prisma para atualizar o registro no banco
    const updatedFruit = await prisma.devilFruit.update({
      where: {
        id: Number(id), // Converte o ID de string para número
      },
      data: {
        name,
        meaning,
        currentUser,
        picture,
        categoria,
      },
    });

    // 4. Retorna a fruta atualizada
    res.status(200).json(updatedFruit);
  } catch (error) {
    console.error("Erro ao atualizar fruta:", error);
    res
      .status(500)
      .json({ error: "Ocorreu um erro interno ao atualizar a fruta." });
  }
});

// Rota para EXCLUIR (Delete) uma fruta existente - DELETE
app.delete("/api/fruits/:id", async (req: Request, res: Response) => {
  try {
    // Pega o ID dos parâmetros da URL
    const { id } = req.params;

    // Usa o Prisma para excluir o registro do banco
    await prisma.devilFruit.delete({
      where: {
        id: Number(id), // Converte o ID de string para número
      },
    });

    // Envia uma resposta de sucesso sem conteúdo
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao excluir fruta:", error);
    res
      .status(500)
      .json({ error: "Ocorreu um erro interno ao excluir a fruta." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}! ⛵`);
});
