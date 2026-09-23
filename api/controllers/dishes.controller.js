import * as dishesService from "../../services/dishes.service.js";

export async function getDishes(req, res) {
  try {
    const { section, typeOfDish, vegetarian } = req.query;
    const dishes = await dishesService.getDishes({
      section,
      typeOfDish,
      vegetarian,
    });

    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getDishById(req, res) {
  try {
    const id = req.params.id;
    const dish = await dishesService.getDishById(id);

    if (!dish) return res.status(404).json({ message: "Plato no encontrado" });

    res.json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createDish(req, res) {
  try {
    const {
      name,
      description,
      price,
      image,
      section,
      typeOfDish,
      vegetarian,
      chefId,
    } = req.body;
    const newDish = {
      name,
      description,
      price,
      image,
      section,
      typeOfDish,
      vegetarian,
    };

    if (chefId) newDish.chefId = chefId;

    const createdDish = await dishesService.createDish(newDish);

    res.status(201).json(createdDish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateDish(req, res) {
  try {
    const id = req.params.id;
    const result = await dishesService.updateDish(id, req.body);

    if (!result || result.matchedCount === 0)
      return res.status(404).json({ message: "Plato no encontrado" });

    res.json({ message: "Plato actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteDish(req, res) {
  try {
    const id = req.params.id;
    const result = await dishesService.deleteDish(id);

    if (!result || result.deletedCount === 0)
      return res.status(404).json({ message: "Plato no encontrado" });

    res.json({ message: "Plato eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
