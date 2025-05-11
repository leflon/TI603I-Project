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



import {decreaseGameQuantityByQuantity, getCartByUserID, removeItemFromWishlist} from "./lib/db";
import {getQuantityOfGame} from "./lib/db";
import {addItemToCart} from "./lib/db";
import { addItemToWishlist } from "./lib/db";
import { getWishlistByUserID } from "./lib/db";

console.log(await addItemToCart("U0000001", "G0000001", 1))


// console.log(await removeItemFromWishlist("U0000001", "G0000001"));

// console.log(await getWishlistByUserID("U0000001"));

// console.log(await addItemToWishlist("U0000001", "G0000001"));

// console.log(await getWishlistByUserID("U0000001"));

