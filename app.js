// app.js — catalogue + panier simple (localStorage)

console.log("app.js chargé");

const API_URL = "https://veloparts-backend.onrender.com/api/products";
const CART_KEY = "veloparts_cart_v1";

document.addEventListener("DOMContentLoaded", () => {
  const productsDiv = document.getElementById("products");
  const cartBtn = document.getElementById("open-cart");
  const cartPanel = document.getElementById("cart");
  const cartItemsDiv = document.getElementById("cart-items");
  const cartCountSpan = document.getElementById("cart-count");
  const checkoutBtn = document.getElementById("checkout");

  // Cart utilities
  function readCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  }
  function writeCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
  }
  function addToCart(product) {
    const cart = readCart();
    const existing = cart.find(i => i._id === product._id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({...product, qty: 1});
    }
    writeCart(cart);
  }
  function removeFromCart(productId) {
    let cart = readCart();
    cart = cart.filter(i => i._id !== productId);
    writeCart(cart);
  }

  function renderCart() {
    const cart = readCart();
    cartItemsDiv.innerHTML = cart.length ? cart.map(i => `
      <div style="border-bottom:1px solid #eee;padding:8px 0;">
        <strong>${i.category}</strong><br/>
        ${i.price} € × ${i.qty}
        <div style="margin-top:6px;">
          <button data-id="${i._id}" class="remove-btn">Supprimer</button>
        </div>
      </div>
    `).join("") : "<p>Panier vide</p>";

    cartCountSpan.textContent = cart.reduce((s, x) => s + x.qty, 0);

    // attach remove handlers
    Array.from(document.querySelectorAll(".remove-btn")).forEach(btn => {
      btn.addEventListener("click", e => {
        const id = e.currentTarget.dataset.id;
        removeFromCart(id);
      });
    });
  }

  // Toggle cart panel
  cartBtn.addEventListener("click", () => {
    cartPanel.classList.toggle("hidden");
  });

  checkoutBtn.addEventListener("click", () => {
    alert("Checkout demo — intégrer Stripe ensuite.");
  });

  // Load products
  fetch(API_URL)
    .then(res => {
      if (!res.ok) throw new Error("API indisponible");
      return res.json();
    })
    .then(products => {
      productsDiv.innerHTML = products.map(p => `
        <div class="card">
          <h3>${p.category}</h3>
          <p><strong>Prix :</strong> ${p.price} €</p>
          <p><strong>Stock :</strong> ${p.stock}</p>
          <div style="margin-top:8px;">
            <button class="add-btn" data-id="${p._id}">Ajouter au panier</button>
          </div>
        </div>
      `).join("");

      // attach add handlers
      Array.from(document.querySelectorAll(".add-btn")).forEach(btn => {
        btn.addEventListener("click", e => {
          const id = e.currentTarget.dataset.id;
          const prod = products.find(x => x._id === id);
          if (prod) addToCart(prod);
        });
      });

      renderCart();
    })
    .catch(err => {
      console.error("Erreur API", err);
      productsDiv.innerHTML = "<p>Catalogue indisponible</p>";
    });

});