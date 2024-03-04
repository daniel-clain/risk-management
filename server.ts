import { json, urlencoded } from "body-parser";
import * as express from "express";
import { readFileSync, writeFileSync } from "fs";

const app = express();
const saveGameFilePath = `${__dirname}/public/saved-game.json`;

app.use(express.static("dist"));
app.use(urlencoded({ extended: false }));

app.post("/save-game", json(), (req, res) => {
  const saveGameJson = req.body;
  console.log("save-game called");
  const saveGameFile = JSON.stringify(saveGameJson);
  writeFileSync(saveGameFilePath, saveGameFile);
  res.send("penis");
});

app.get("/load-game", (req, res) => {
  console.log("load-game called");

  const saveGameFile = readFileSync(saveGameFilePath, "utf8");
  const saveGameJson = JSON.parse(saveGameFile);
  res.header("Content-Type", "application/json");
  res.send(saveGameJson);
});

const PORT = 6969;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
