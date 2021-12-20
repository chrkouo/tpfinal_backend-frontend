import { ObjectId } from "bson";
import adventurerDB from "../database/adventurerDB.js";

const getAdventurerByNameAndPassword = async (name, password) => {
  const adventurers = await adventurerDB.findAll();
  const oneAdventurer = adventurers.filter(
    (adventurer) => adventurer.name === name && adventurer.password == password
  )[0];
  if (oneAdventurer != undefined) return oneAdventurer;
  else throw new Error("Wrong name or password");
};
const getAdventurerQuestsById = async (id) => {
  const adventurer = await adventurerDB.findById(id);
  return adventurer.quests;
};

const getAdventurerById = async (id) => {
  const adventurer = await adventurerDB.findById(id);
  const pointNom = { name: adventurer.name, xp: adventurer.xp };
  return pointNom;
};

const addQuestsById = async (id, name, level, completionxp) => {
  const adventurer = await adventurerDB.findById(id);
  const newQuests = {
    _id: ObjectId(),
    name: name,
    level: level,
    completionXp: completionxp,
    completed: false,
  };
  adventurer.quests.push(newQuests);
  await adventurerDB.updateById(id, adventurer);
};

const completeQuest = async (questId, adventurerId) => {
  try {
    const adventurer = await adventurerDB.findById(adventurerId);
    const quest = adventurer.quests.filter(
      (oneQuest) => oneQuest._id == questId
    )[0];
    quest.completed = true;
    await adventurerDB.updateById(adventurerId, adventurer);
  } catch (e) {
    console.log(e);
  }
};

const createAdventurer = async (name, password) => {
  const newAdventurer = {
    name,
    password,
    xp: 0,
    quests: [],
  };
  await adventurerDB.add(newAdventurer);
};

export default {
  getAdventurerByNameAndPassword,
  getAdventurerQuestsById,
  createAdventurer,
  getAdventurerById,
  addQuestsById,
  completeQuest,
};
