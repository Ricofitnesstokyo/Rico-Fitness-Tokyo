import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

console.log("Seed script démarré");
console.log("MONGO_URI =", process.env.MONGO_URI);

const products = [
  {
    name: "Cadre carbone Aero X1",
    description: "Cadre carbone ultra léger pour performance route",
    category: "Cadres",
    brand: "Veloparts",
    price: 1299,
    stock: 5,
    image: "https://picsum.photos/400/300?bike1"
  },
  {
    name: "Groupe Shimano Ultegra R8000",
    description: "Transmission complète route",
    category: "Groupes",
    brand: "Shimano",
    price: 899,
    stock: 8,
    image: "https://picsum.photos/400/300?bike2"
  },
  {
    name: "Roues carbone 50mm",
    description: "Roues carbone profil haut",
    category: "Roues",
    brand: "Veloparts",
    price: 1499,
    stock: 4,
    image: "https://picsum.photos/400/300?bike3"
  },
  {
    name: "Selle ergonomique Pro",
    description: "Confort longue distance",
    category: "Accessoires",
    brand: "Pro",
    price: 179,
    stock: 12,
    image: "https://picsum.photos/400/300?bike4"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo connecté");

    await Product.deleteMany();
    console.log("Ancien catalogue supprimé");

    await Product.insertMany(products);
    console.log("Catalogue complet seedé avec succès");

    process.exit(0);
  } catch (err) {
    console.error("Erreur seed :", err);
    process.exit(1);
  }
}

seed();
