import { PrismaClient, Prisma } from "./generated/prisma";
import fruitsData from "../prisma/fruits-data.json";

const prisma = new PrismaClient();

async function main() {
  console.log(`Iniciando o seed...`);

  // Usamos createMany para inserir todos os dados de uma vez.
  // skipDuplicates: true vai ignorar qualquer tentativa de inserir uma fruta com um 'name' que já existe.
  const result = await prisma.devilFruit.createMany({
    data: fruitsData as Prisma.DevilFruitCreateInput[],
    skipDuplicates: true,
  });

  console.log(`Seed finalizado. ${result.count} frutas foram inseridas.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
