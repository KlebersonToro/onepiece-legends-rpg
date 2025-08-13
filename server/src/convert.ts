// server/convert.ts
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

async function convertMySqlToJson() {
  console.log("Iniciando conexão com o banco de dados MySQL temporário...");

  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "onepiece_original",
      port: 3306,
    });

    console.log("Conexão bem-sucedida. Buscando dados...");

    const [rows] = await connection.execute(
      "SELECT name, meaning, currentUser, picture, categoria FROM devil_fruits"
    );

    console.log(
      `Encontrados ${Array.isArray(rows) ? rows.length : 0} registros.`
    );

    const outputPath = path.join(__dirname, "../prisma", "fruits-data.json");

    fs.writeFileSync(outputPath, JSON.stringify(rows, null, 2));

    console.log(`\nSUCESSO! Os dados foram salvos em: ${outputPath}`);

    await connection.end();
  } catch (error) {
    console.error("\nERRO durante o processo de conversão:", error);
  }
}

convertMySqlToJson();
