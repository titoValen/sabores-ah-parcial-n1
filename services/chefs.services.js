import { db, ObjectId } from "../config/db.js";

export async function getChefs() {
  const chefsCollection = db.collection("chefs");
  const chefs = await chefsCollection.find().toArray();

  return chefs;
}

export async function getChefById(id) {
  const chef = await db.collection("chefs").findOne({ _id: new ObjectId(id) });

  return chef;
}

export async function createChef(chef) {
  const result = await db.collection("chefs").insertOne(chef);
  return result.insertedId;
}

export async function updateChef(id, updatedChef) {
  const result = await db
    .collection("chefs")
    .updateOne({ _id: new ObjectId(id) }, { $set: updatedChef });

  return result;
}

export async function deleteChef(id) {
  const result = await db
    .collection("chefs")
    .deleteOne({ _id: new ObjectId(id) });

  return result;
}
