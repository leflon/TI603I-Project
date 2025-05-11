import express from "express";
import {config} from "dotenv";

config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Express with Bun!");
});

app.get("/api/get_all_data", (req, res) => {
    res.send("You sucessfully interrogated the DB ! WIP")
})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});



import {decreaseGameQuantityByQuantity} from "./lib/db";
import {getQuantityOfGame} from "./lib/db";

// addItemToCart("U0000001", "G0000001", 1)
