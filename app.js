import express from "express";
import { connectDB } from "./config/db.js";
import dishesRoutes from "./api/routes/dishes.route.js";
import chefsRoutes from "./api/routes/chefs.route.js";

const app = express();

app.use(express.json());
app.use("/api/dishes", dishesRoutes);
app.use("/api/chefs", chefsRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(3333, () => console.log("Servidor corriendo en el puerto 3333"));
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
