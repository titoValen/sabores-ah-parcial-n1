import * as dishesService from "../services/dishes.service.js";

const SECTIONS = [
  { id: "appetizers", name: "Entrantes" },
  { id: "mains", name: "Platos principales" },
  { id: "paste", name: "Pastas" },
  { id: "desserts", name: "Postres" },
  { id: "beverages", name: "Bebidas" },
];

export async function renderDishes(req, res) {
  try {
    res.render("index", { sections: SECTIONS });
  } catch (error) {
    console.error("Error al renderizar los platos:", error);
    res.status(500).render("error");
  }
}

export async function renderSection(req, res) {
  try {
    const { slug } = req.params;
    const dishes = await dishesService.getDishesBySection({ section: slug });
    res.render("section", { section: slug, dishes });
  } catch (error) {
    console.error("Error al renderizar la sección:", error);
    res.status(500).render("error");
  }
}
