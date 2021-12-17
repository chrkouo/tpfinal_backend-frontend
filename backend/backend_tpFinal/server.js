import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import adventurers from "./domain/adventurer.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signUp", async (req, res) => {
  try {
    await adventurers.createAdventurer(req.body.name, req.body.password);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(400);
  }
});

app.post("/login", async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  try {
    const adventurer = await adventurers.getAdventurerByNameAndPassword(
      name,
      password
    );
    let userToken = { id: adventurer._id };
    const token = jwt.sign(userToken, "secret");
    res.send(token);
  } catch (e) {
    console.log(e);
    res.sendStatus(403);
  }
});
const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  try {
    const payload = await jwt.verify(token, "secret");
    req.userToken = payload;
    next();
  } catch (e) {
    return res.sendStatus(403);
  }
};

app.get("/quests", authenticate, async (req, res) => {
  try {
    let quests = await adventurers.getAdventurerQuestsById(req.userToken.id);
    res.send(quests);
  } catch (e) {
    return res.sendStatus(403);
  }
});

app.get("/me", authenticate, async (req, res) => {
  try {
    let me = await adventurers.getAdventurerById(req.userToken.id);
    res.send(me);
  } catch (e) {
    return res.sendStatus(403);
  }
});

app.post("/quests", authenticate, async (req, res) => {
  try {
    let quests = await adventurers.addQuestsById(
      req.userToken.id,
      req.body.name,
      req.body.level,
      req.body.completionXp
    );
    res.send(quests);
  } catch (e) {
    return res.sendStatus(403);
  }
});

app.post("/complete/:questId", authenticate, async (req, res) => {
  try {
    await adventurers.completeQuest(req.params.questId, req.userToken.id);
    return res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(404);
  }
});

app.listen(3001);
