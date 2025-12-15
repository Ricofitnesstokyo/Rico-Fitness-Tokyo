const API = (location.hostname==='localhost') ? 'http://localhost:4000/api' : location.origin + '/api';
async function load(){
  const res = await fetch(API + '/products');
  const products = await res.json();
  const grid = document.getElementById('products');
  grid.innerHTML = '';
  products.forEach(p=>{
    const div = document.createElement('div');
    div.className='card';
    div.innerHTML = `<img src="${p.img}" style="width:100%;height:140px;object-fit:cover;border-radius:6px"/><h3>${p.title_fr}</h3><p>${p.description_fr}</p><div><strong>${(p.price||0).toFixed(2)} €</strong> <button data-sku="${p.sku}">Ajouter</button></div>`;
    grid.appendChild(div);
  });
  document.querySelectorAll('.card button').forEach(b=>b.addEventListener('click',(e)=>{
    const sku = e.currentTarget.dataset.sku;
    addToCart(sku);
  }));
}
function getCart(){ return JSON.parse(localStorage.getItem('veloparts_cart')||'[]'); }
function saveCart(c){ localStorage.setItem('veloparts_cart', JSON.stringify(c)); renderCart(); }
function addToCart(sku){
  fetch(API + '/products/' + sku).then(r=>r.json()).then(p=>{
    const cart = getCart();
    const idx = cart.findIndex(i=>i.sku===p.sku);
    if(idx===-1) cart.push({ sku:p.sku, title:p.title_fr, price:p.price, qty:1, stripe_price_id:p.stripe_price_id||''});
    else cart[idx].qty +=1;
    saveCart(cart);
  });
}
function renderCart(){
  const cart = getCart(); document.getElementById('cart-count').innerText = cart.reduce((s,i)=>s+i.qty,0);
  const items = document.getElementById('cart-items'); items.innerHTML = cart.map(i=>`<div>${i.title} x ${i.qty} — ${(i.price*i.qty).toFixed(2)}€</div>`).join('');
}
document.getElementById('open-cart').addEventListener('click', ()=> document.getElementById('cart').classList.toggle('hidden'));
document.getElementById('checkout').addEventListener('click', async ()=>{
  const cart = getCart();
  if(!cart.length) return alert('Panier vide');
  const items = cart.map(i=>({ price: i.stripe_price_id || i.sku, quantity: i.qty }));
  const res = await fetch(API + '/stripe/create-checkout-session', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ items, customer_email: '' })});
  const json = await res.json();
  if(json.url) window.location.href = json.url;
  else alert('Erreur: ' + (json.error || 'session'));
});
load();
renderCart();
