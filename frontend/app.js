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
  .then(data => {
    document.body.innerHTML = `
      <h1>Catalogue produits</h1>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
  })
  .catch(err => {
    console.warn("Backend non disponible → fallback UI", err);
    renderFallback();
  });
