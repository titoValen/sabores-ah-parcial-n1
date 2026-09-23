import * as dishesService from "../../services/dishes.service.js";
import * as chefsService from "../../services/chefs.services.js";

export async function getChefs(req, res) {
  try {
    const chefs = await chefsService.getChefs();
    res.json(chefs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getChefById(req, res) {
  try {
    const id = req.params.id;
    const chef = await chefsService.getChefById(id);

    if (!chef) return res.status(404).json({ message: "Chef no encontrado" });

    res.json(chef);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createChef(req, res) {
  try {
    const { name, photo, description } = req.body;
    const newChef = { name, photo, description };

    const createdChef = await chefsService.createChef(newChef);

    res.status(201).json(createdChef);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateChef(req, res) {
  try {
    const id = req.params.id;
    const result = await chefsService.updateChef(id, req.body);

    if (!result || result.matchedCount === 0)
      return res.status(404).json({ message: "Chef no encontrado" });

    res.json({ message: "Chef actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteChef(req, res) {
  try {
    const id = req.params.id;
    const result = await chefsService.deleteChef(id);

    if (!result || result.deletedCount === 0)
      return res.status(404).json({ message: "Chef no encontrado" });

    res.json({ message: "Chef eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}