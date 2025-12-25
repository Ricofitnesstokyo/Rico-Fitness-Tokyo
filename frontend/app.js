const API_URL = "https://veloparts-backend.onrender.com/api/products";

function renderFallback() {
  document.body.innerHTML = `
    <header style="padding:20px;text-align:center;">
      <h1>🚴‍♂️ Rico Fitness Tokyo – Veloparts</h1>
      <p>Pièces vélo premium – Japon & International</p>
    </header>

    <main style="max-width:900px;margin:auto;padding:20px;">
      <h2>Catalogue</h2>
      <p>Le catalogue est en cours de chargement.</p>

      <ul>
        <li>Cadres carbone</li>
        <li>Groupes Shimano / SRAM</li>
        <li>Roues carbone</li>
        <li>Accessoires & pièces détachées</li>
      </ul>
    </main>

    <footer style="text-align:center;padding:20px;">
      © ${new Date().getFullYear()} Rico Fitness Tokyo
    </footer>
  `;
}

fetch(API_URL)
  .then(res => {
    if (!res.ok) {
      throw new Error("API indisponible");
    }
    return res.json();
  })
  .then(products => {
  document.body.innerHTML = `
    <header style="padding:20px;text-align:center;">
      <h1>🚴‍♂️ Rico Fitness Tokyo – Veloparts</h1>
      <p>Catalogue produits</p>
    </header>

    <main style="max-width:1000px;margin:auto;padding:20px;
                 display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;">
      ${products.map(p => `
        <div style="border:1px solid #ddd;padding:15px;border-radius:8px;">
          <h3>${p.category}</h3>
          <p><strong>Prix :</strong> ${p.price} €</p>
          <p><strong>Stock :</strong> ${p.stock}</p>
          <button style="margin-top:10px;padding:8px 12px;">
            Ajouter au panier
          </button>
        </div>
      `).join("")}
    </main>

    <footer style="text-align:center;padding:20px;">
      © ${new Date().getFullYear()} Rico Fitness Tokyo
    </footer>
  `;
})

  })
  .catch(err => {
    console.warn("Backend non disponible → fallback UI", err);
    renderFallback();
  });
