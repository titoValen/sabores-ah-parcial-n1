import express from "express";
import { connectDB } from "./config/db";

const app = express();

app.use(express.json());

const startServer = async () => {
  try {
    await connectDB();
    app.listen(3333, () => console.log("Servidor corriendo en el puerto 3333"));
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

startServer();
