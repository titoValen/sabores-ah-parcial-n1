import * as dishesService from "../../services/dishes.service.js";

const VALID_SECTIONS = new Set([
  "appetizers",
  "mains",
  "pastas",
  "desserts",
  "beverages",
]);

function validateDish(dish, partial = false) {
  const requiredFields = [
    "name",
    "description",
    "price",
    "image",
    "section",
    "typeOfDish",
    "vegetarian",
    "chefId",
  ];

  if (!partial && requiredFields.some((field) => dish[field] === undefined)) {
    return "Todos los campos del plato son obligatorios";
  }

  if (dish.price !== undefined && (!Number.isFinite(dish.price) || dish.price < 0)) {
    return "El precio debe ser un número mayor o igual a cero";
  }

  if (dish.vegetarian !== undefined && typeof dish.vegetarian !== "boolean") {
    return "vegetarian debe ser booleano";
  }

  if (dish.section !== undefined && !VALID_SECTIONS.has(dish.section)) {
    return "La sección del plato no es válida";
  }

  if (
    ["name", "description", "image", "typeOfDish", "chefId"].some(
      (field) => dish[field] !== undefined && typeof dish[field] !== "string"
    )
  ) {
    return "Los campos de texto del plato deben ser cadenas";
  }

  return null;
}

function getErrorStatus(error) {
  return error.statusCode || 500;
}

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
    res.status(getErrorStatus(error)).json({ message: error.message });
  }
}

export async function getDishById(req, res) {
  try {
    const id = req.params.id;
    const dish = await dishesService.getDishById(id);

    if (!dish) return res.status(404).json({ message: "Plato no encontrado" });

    res.json(dish);
  } catch (error) {
    res.status(getErrorStatus(error)).json({ message: error.message });
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
      chefId,
    };

    const validationError = validateDish(newDish);
    if (validationError) return res.status(400).json({ message: validationError });

    const createdDish = await dishesService.createDish(newDish);

    res.status(201).json(createdDish);
  } catch (error) {
    res.status(getErrorStatus(error)).json({ message: error.message });
  }
}

export async function updateDish(req, res) {
  try {
    const id = req.params.id;
    const updatedDish = req.body;
    const validationError = validateDish(updatedDish, true);

    if (validationError) return res.status(400).json({ message: validationError });
    if (Object.keys(updatedDish).length === 0)
      return res.status(400).json({ message: "Debe enviar al menos un campo para actualizar" });

    const result = await dishesService.updateDish(id, updatedDish);

    if (!result || result.matchedCount === 0)
      return res.status(404).json({ message: "Plato no encontrado" });

    res.json({ message: "Plato actualizado correctamente" });
  } catch (error) {
    res.status(getErrorStatus(error)).json({ message: error.message });
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
    res.status(getErrorStatus(error)).json({ message: error.message });
  }
}
