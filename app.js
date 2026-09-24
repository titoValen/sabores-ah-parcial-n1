import express from "express";
import { connectDB } from "./config/db.js";
import dishesRoutes from "./api/routes/dishes.route.js";
import chefsRoutes from "./api/routes/chefs.route.js";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use("/api/dishes", dishesRoutes);
app.use("/api/chefs", chefsRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
