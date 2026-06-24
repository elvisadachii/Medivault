const PRODUCTS = [
  {id:1,name:'Paracetamol 500mg',sub:'Pain & Fever · 24 tabs',price:120,cat:'pain-relief',emoji:'💊',rx:true,uses:'Relieves mild to moderate pain and reduces fever. For headaches, toothaches, backaches and cold symptoms.',dosage:'Adults: 1–2 tabs every 4–6 hrs. Max 8 tabs/day.',ingredients:'Paracetamol 500mg, Maize starch, Povidone, Stearic acid.',warning:'Avoid with liver conditions. Consult pharmacist if pregnant.'},
  {id:2,name:'Ibuprofen 400mg',sub:'Anti-inflammatory · 20 tabs',price:180,cat:'pain-relief',emoji:'🩹',rx:false,uses:'Reduces inflammation, pain and fever. For muscle pain, arthritis and dental pain.',dosage:'1 tab 3× daily with food.',ingredients:'Ibuprofen 400mg, Microcrystalline cellulose, Croscarmellose sodium.',warning:'Avoid with stomach ulcers or kidney problems.'},
  {id:3,name:'Vitamin C 1000mg',sub:'Immune Support · 30 tabs',price:350,cat:'vitamins',emoji:'🌿',rx:false,uses:'Supports immune function and acts as an antioxidant.',dosage:'1 tab daily with a meal.',ingredients:'Ascorbic acid 1000mg, Citrus bioflavonoids, Rose hip extract.',warning:'May cause digestive discomfort in high doses.'},
  {id:4,name:'Vitamin D3 2000IU',sub:'Bone & Immunity · 60 caps',price:480,cat:'vitamins',emoji:'☀️',rx:false,uses:'Supports bone health, calcium absorption and immunity.',dosage:'1 cap daily with a fatty meal.',ingredients:'Cholecalciferol 2000IU, Olive oil, Gelatin.',warning:'Do not exceed dose. Check with doctor if on calcium supplements.'},
  {id:5,name:'Multivitamin Daily',sub:'Complete Formula · 30 tabs',price:550,cat:'vitamins',emoji:'💪',rx:false,uses:'Comprehensive daily vitamins A, B complex, C, D, E and key minerals.',dosage:'1 tab daily with breakfast.',ingredients:'Vitamins A, B1–B12, C, D3, E, Folic Acid, Iron, Zinc, Magnesium.',warning:'Not a substitute for a balanced diet.'},
  {id:6,name:'SPF 50 Sunscreen',sub:'Daily UV Protection · 75ml',price:890,cat:'skincare',emoji:'✨',rx:false,uses:'Protects from UVA/UVB rays. For daily use on face and body.',dosage:'Apply 15 min before sun exposure. Reapply every 2 hrs.',ingredients:'Zinc Oxide, Titanium Dioxide, Aloe Vera, Vitamin E, Glycerin.',warning:'Avoid eyes. Discontinue if irritation occurs.'},
  {id:7,name:'Hydrating Moisturiser',sub:'All Skin Types · 100ml',price:720,cat:'skincare',emoji:'💧',rx:false,uses:'Deep hydration, lightweight and non-greasy.',dosage:'Apply to clean face morning and evening.',ingredients:'Hyaluronic Acid, Shea Butter, Niacinamide, Aloe Vera.',warning:'Patch test recommended for sensitive skin.'},
  {id:8,name:'Gentle Cleanser',sub:'Sensitive Skin · 150ml',price:580,cat:'skincare',emoji:'🧴',rx:false,uses:'Removes impurities without stripping the skin barrier. Soap and fragrance free.',dosage:'Apply to damp skin, massage and rinse. Use twice daily.',ingredients:'Cocamidopropyl Betaine, Glycerin, Panthenol, Chamomile Extract.',warning:'Avoid contact with eyes.'},
  {id:9,name:'Blood Pressure Monitor',sub:'Digital · Upper Arm',price:3200,cat:'devices',emoji:'🩺',rx:false,uses:'Clinically validated home BP monitor. Stores 60 readings.',dosage:'Sit quietly 5 min before measuring. Same time daily.',ingredients:'Medical device. Includes cuff, batteries and case.',warning:'Not a replacement for professional diagnosis.'},
  {id:10,name:'Digital Thermometer',sub:'Fast Read · 10 sec',price:650,cat:'devices',emoji:'🌡️',rx:false,uses:'Accurate temperature in under 10 seconds. All ages.',dosage:'Oral, underarm or rectal. Clean probe before and after use.',ingredients:'Medical device. Includes battery.',warning:'Replace battery when indicator appears.'},
  {id:11,name:'Diclofenac Gel 1%',sub:'Topical Pain Relief · 50g',price:290,cat:'pain-relief',emoji:'🔥',rx:true,uses:'Topical anti-inflammatory for joint/muscle pain and sprains.',dosage:'Apply to affected area 3–4× daily. No airtight bandage.',ingredients:'Diclofenac Diethylammonium 1.16%, Carbomer, Propylene Glycol.',warning:'Do not apply to broken skin. Wash hands after.'},
  {id:12,name:'Calcium + Magnesium',sub:'Bone Support · 60 tabs',price:420,cat:'vitamins',emoji:'🦴',rx:false,uses:'Supports bones, teeth, muscle and nervous system.',dosage:'2 tabs daily with a meal.',ingredients:'Calcium Carbonate 500mg, Magnesium Oxide 250mg, Vitamin D3 200IU.',warning:'Consult doctor if history of kidney stones.'},
];



const getCart  = () => { try { return JSON.parse(sessionStorage.getItem('mv_cart')||'[]'); } catch { return []; } };
const saveCart = c => sessionStorage.setItem('mv_cart', JSON.stringify(c));
const cartSum  = c => c.reduce((s,i) => s + i.price*i.qty, 0);

function updateBadges() {
  const n = getCart().reduce((s,i) => s+i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = n);
}

function addToCart(p, qty) {
  const cart = getCart(), found = cart.find(i => i.id===p.id);
  found ? found.qty+=qty : cart.push({id:p.id,name:p.name,price:p.price,emoji:p.emoji,qty});
  saveCart(cart); updateBadges();
}

