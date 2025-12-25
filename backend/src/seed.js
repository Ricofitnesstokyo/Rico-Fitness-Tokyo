import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const MONGO = process.env.MONGO_URI;

const products = [
  {
    name: "Cadre carbone Gravel Pro",
    category: "Cadres",
    price: 1299,
    stock: 5,
    description: "Cadre carbone haut module – gravel & endurance",
    image: "https://via.placeholder.com/300"
  },
  {
    name: "Groupe Shimano Ultegra R8000",
    category: "Groupes",
    price: 899,
    stock: 8,
    description: "Transmission 11v précise et fiable",
    image: "https://via.placeholder.com/300"
  },
  {
    name: "Roues carbone 50mm",
    category: "Roues",
    price: 1499,
    stock: 4,
    description: "Aérodynamisme et rigidité maximale",
    image: "https://via.placeholder.com/300"
  },
  {
    name: "Casque route Aero",
    category: "Accessoires",
    price: 179,
    stock: 12,
    description: "Léger, ventilé, homologué compétition",
    image: "https://via.placeholder.com/300"
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO);
    console.log("Mongo connected");

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Catalogue seedé avec succès");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
