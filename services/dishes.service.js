import { db, ObjectId } from "../config/db.js";

export async function getDishes() {
  const dishesCollection = db.collection("dishes");
  const dishes = await dishesCollection.find().toArray();

  return dishes;
}

export async function getDishById(id) {
  const dishe = await db
    .collection("dishes")
    .findOne({ _id: new ObjectId(id) });

  return dishe;
}

export async function createDish(dish) {
  const result = await db.collection("dishes").insertOne(dish);
  return result.insertedId;
}

export async function updateDish(id, updatedDish) {
  const result = await db
    .collection("dishes")
    .updateOne({ _id: new ObjectId(id) }, { $set: updatedDish });

  return result;
}

export async function deleteDish(id) {
  const result = await db
    .collection("dishes")
    .deleteOne({ _id: new ObjectId(id) });

  return result;
}
