import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialProducts = [
  // --- FORMAL WEAR (13 items) ---
  {
    name: 'Premium Wool Slim Fit Suit',
    description: 'Meticulously tailored slim fit two-piece suit crafted from 100% merino wool. Features a notch lapel jacket with double vents and flat-front trousers. The ultimate formal outfit for executive wear and weddings.',
    price: 249.00,
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=600&q=80',
    category: 'Formal Wear',
    inventory: 8,
  },
  {
    name: 'Classic White Oxford Shirt',
    description: 'Tailored button-down Oxford cotton shirt. Features a structured button-down collar, chest pocket, and double-button barrel cuffs. Made from durable, breathable, heavyweight Oxford fabric.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    category: 'Formal Wear',
    inventory: 15,
  },
  {
    name: 'Charcoal Herringbone Blazer',
    description: 'A refined single-breasted blazer featuring a rich herringbone texture. Made from a wool blend with notch lapels, patch pockets, and a soft shoulder construction for a versatile modern-classic profile.',
    price: 189.00,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
    category: 'Formal Wear',
    inventory: 10,
  },
  {
    name: 'Midnight Blue Tuxedo Set',
    description: 'Exquisite evening wear tuxedo crafted from fine wool. Features a satin peak lapel jacket and matching side-stripe trousers. Perfect for formal black-tie events and celebrations.',
    price: 299.00,
    image: 'https://images.unsplash.com/photo-1621574539437-4b7cb63120b8?auto=format&fit=crop&w=600&q=80',
    category: 'Formal Wear',
    inventory: 6,
  },
  {
    name: 'Premium Double-Breasted Suit',
    description: 'A bold, double-breasted suit jacket and trouser set designed in premium wool blend. Features sharp peak lapels and a six-button front for an elegant, commanding aesthetic.',
    price: 279.00,
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80',
    category: 'Formal Wear',
    inventory: 5,
  },
  {
    name: 'Double Monk Strap Leather Shoes',
    description: 'Classic double monk strap shoes crafted from burnished Italian leather. Features silver buckles, a cushioned footbed, and a durable stacked leather sole.',
    price: 120.00,
    image: 'https://images.unsplash.com/photo-1543132220-4bf3de626f53?auto=format&fit=crop&w=600&q=80',
    category: 'Formal Wear',
    inventory: 12,
  },
  {
    name: 'Tailored Flat-Front Trousers',
    description: 'Sleek, flat-front dress trousers made from high-grade stretch-wool blend. Features a hook-and-bar closure, crease lines, and unfinished hems for custom tailoring.',
    price: 69.00,
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
    category: 'Formal Wear',
    inventory: 14,
  },
  {
    name: 'Luxury Silk Jacquard Tie',
    description: 'A handsome, 100% mulberry silk necktie woven with a subtle jacquard geometric pattern. Designed to form a perfect knot with high-density interlining.',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1598808503744-44d885d5acb9?auto=format&fit=crop&w=600&q=80',
    category: 'Formal Wear',
    inventory: 25,
  },
  {
    name: 'Light Blue French Cuff Shirt',
    description: 'Formal dress shirt in premium 100s two-ply cotton. Features elegant French cuffs, a spread collar, and a fly front to conceal buttons for a clean look.',
    price: 55.00,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80',
    category: 'Formal Wear',
    inventory: 18,
  },
  {
    name: 'Premium Cashmere Overcoat',
    description: 'A luxurious single-breasted overcoat tailored from a heavyweight cashmere-wool blend. Features three-button closure, notched lapels, and a warm satin lining.',
    price: 259.00,
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80',
    category: 'Formal Wear',
    inventory: 4,
  },
  {
    name: 'Modern Fit Tweed Waistcoat',
    description: 'A heritage-inspired tweed vest featuring a five-button front, adjustable back strap, and contrast satin lining. Perfect for layering under blazers.',
    price: 79.00,
    image: 'https://images.unsplash.com/photo-1555069513-045c8677eefd?auto=format&fit=crop&w=600&q=80',
    category: 'Formal Wear',
    inventory: 8,
  },
  {
    name: 'Handcrafted Italian Leather Belt',
    description: 'Genuine full-grain leather belt handmade in Italy. Features hand-painted edges and a polished silver-finish solid brass buckle.',
    price: 49.00,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
    category: 'Formal Wear',
    inventory: 15,
  },
  {
    name: 'Sterling Silver Cufflinks Set',
    description: 'Elegant sterling silver cufflinks featuring a polished rectangular design with a secure T-back closure. Packed in a signature presentation box.',
    price: 39.00,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    category: 'Formal Wear',
    inventory: 20,
  },

  // --- CASUAL WEAR (13 items) ---
  {
    name: 'Pima Cotton Polo T-Shirt',
    description: 'Premium knit polo shirt crafted from ultra-soft Pima cotton. Features a flat-knit rib collar, a three-button placket, and ribbed cuffs. Provides a comfortable stretch and clean casual profile.',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80',
    category: 'Casual Wear',
    inventory: 20,
  },
  {
    name: 'Classic Cotton Chino Pants',
    description: 'Flat-front stretch cotton chinos. Tailored straight fit with functional welt back pockets and a zip fly closure. Provides comfort and styling versatility for casual or semi-formal looks.',
    price: 55.00,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
    category: 'Casual Wear',
    inventory: 12,
  },
  {
    name: 'Premium Linen Summer Shirt',
    description: 'Light and breezy casual shirt crafted from 100% Belgian flax linen. Features an open spread collar, button closures, and a curved hem. Natural texture perfect for summer getaways.',
    price: 49.00,
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80',
    category: 'Casual Wear',
    inventory: 18,
  },
  {
    name: 'Raw Indigo Selvedge Denim Jeans',
    description: 'Classic straight-leg jeans in premium 14oz Japanese selvedge denim. Rich indigo dye that ages uniquely with wear. Finished with copper rivets and button fly.',
    price: 89.00,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    category: 'Casual Wear',
    inventory: 10,
  },
  {
    name: 'Vintage Suede Bomber Jacket',
    description: 'Ultra-soft genuine suede bomber jacket with ribbed collar, cuffs, and hem. Features front zip closure, side welt pockets, and a fully lined interior.',
    price: 199.00,
    image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&w=600&q=80',
    category: 'Casual Wear',
    inventory: 5,
  },
  {
    name: 'Cable-Knit Merino Wool Sweater',
    description: 'Thick, comfortable crewneck sweater knitted from 100% premium merino wool. Features a classic cable-knit pattern and ribbed cuffs.',
    price: 79.00,
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=600&q=80',
    category: 'Casual Wear',
    inventory: 8,
  },
  {
    name: 'Casual Chambray Button-Down',
    description: 'Midweight indigo-dyed cotton chambray shirt. Features a button-down collar, chest pocket, and casual wash finish for laid-back character.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=600&q=80',
    category: 'Casual Wear',
    inventory: 15,
  },
  {
    name: 'Heavyweight Waffle Knit Crewneck',
    description: 'Thick waffle-weave cotton thermal shirt designed for warmth and layered styling. Structured neck rib and fitted wrist cuffs.',
    price: 39.00,
    image: 'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&w=600&q=80',
    category: 'Casual Wear',
    inventory: 20,
  },
  {
    name: 'Luxury Leather Chelsea Boots',
    description: 'Elegant Chelsea boots crafted from smooth calfskin leather. Elastic side panels, pull tabs, and a rubber-infused sole for wet-weather traction.',
    price: 149.00,
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80',
    category: 'Casual Wear',
    inventory: 7,
  },
  {
    name: 'Classic Crewneck Pima Tee',
    description: 'Simple and refined daily tee made from premium Peruvian Pima cotton. Breathable, durable, and exceptionally soft to the touch.',
    price: 29.00,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
    category: 'Casual Wear',
    inventory: 30,
  },
  {
    name: 'Relaxed Fit Utility Cargo Pants',
    description: 'Rugged cargo pants in a durable cotton ripstop weave. Multiple functional utility pockets, reinforced seat, and adjustable cuff ties.',
    price: 59.00,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80',
    category: 'Casual Wear',
    inventory: 11,
  },
  {
    name: 'Soft Corduroy Overshirt',
    description: 'Perfect layering overshirt in fine-wale cotton corduroy. Dual buttoned chest pockets and tortoiseshell buttons for vintage casual aesthetic.',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80',
    category: 'Casual Wear',
    inventory: 12,
  },
  {
    name: 'Breathable Cotton Henley Shirt',
    description: 'Classic three-button casual Henley shirt in a textured slub-cotton knit. Offers a clean neckline and relaxed slim fit.',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80',
    category: 'Casual Wear',
    inventory: 15,
  },

  // --- ETHNIC WEAR (12 items) ---
  {
    name: 'Royal Silk Sherwani Set',
    description: 'Rich brocade silk sherwani with hand-crafted embroidery and mandarin collar. Includes matching churidar pants and a dupatta shawl. Ideal for festive occasions and groomsmen.',
    price: 199.00,
    image: 'https://images.unsplash.com/photo-1610030470217-172b842cdccb?auto=format&fit=crop&w=600&q=80',
    category: 'Ethnic Wear',
    inventory: 5,
  },
  {
    name: 'Designer Festive Kurta Jacket Set',
    description: 'Lucknowi Chikankari cotton kurta paired with a tailored Nehru jacket. Features a sleek mandarin collar and gold buttons. Made from comfortable, premium lightweight cotton.',
    price: 99.00,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    category: 'Ethnic Wear',
    inventory: 10,
  },
  {
    name: 'Hand-Embroidered Kurta',
    description: 'Fine georgette kurta featuring intricate tone-on-tone Chikankari hand embroidery from Lucknow. Light, luxurious, and breathable ethnic garment.',
    price: 79.00,
    image: 'https://images.unsplash.com/photo-1583795128727-6ec3642408f8?auto=format&fit=crop&w=600&q=80',
    category: 'Ethnic Wear',
    inventory: 8,
  },
  {
    name: 'Regal Velvet Bandhgala',
    description: 'Stunning structured Bandhgala jacket crafted from plush premium velvet. Mandarin collar, brass buttons, and custom silk satin inner lining.',
    price: 159.00,
    image: 'https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&w=600&q=80',
    category: 'Ethnic Wear',
    inventory: 4,
  },
  {
    name: 'Pure Silk Dhoti Kurta Set',
    description: 'Traditional ensemble featuring a raw silk kurta and a pre-draped matching silk dhoti. Highlights gold zari border detail for festive weddings.',
    price: 119.00,
    image: 'https://images.unsplash.com/photo-1631857455684-a54a2f03665f?auto=format&fit=crop&w=600&q=80',
    category: 'Ethnic Wear',
    inventory: 6,
  },
  {
    name: 'Banarasi Silk Nehru Jacket',
    description: 'Tailored Nehru vest crafted from genuine handloom Banarasi silk. Features elegant floral jacquard patterns and neat welt pockets.',
    price: 69.00,
    image: 'https://images.unsplash.com/photo-1597983073492-bc24058b375b?auto=format&fit=crop&w=600&q=80',
    category: 'Ethnic Wear',
    inventory: 12,
  },
  {
    name: 'Linen Pathani Suit Set',
    description: 'Robust Pathani-style tunic and trouser set crafted from premium linen-cotton. Features shoulder epaulets, double chest pockets, and relaxed salwar.',
    price: 89.00,
    image: 'https://images.unsplash.com/photo-1605784401368-5af1d9d6c4dc?auto=format&fit=crop&w=600&q=80',
    category: 'Ethnic Wear',
    inventory: 8,
  },
  {
    name: 'Heritage Floral Kurta',
    description: 'Comfortable cotton kurta adorned with hand-blocked floral motifs using natural vegetable dyes. Perfect for casual day-time festive gatherings.',
    price: 49.00,
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80',
    category: 'Ethnic Wear',
    inventory: 15,
  },
  {
    name: 'Golden Silk Churidar Pajama',
    description: 'A classic draw-string waist churidar trouser made from shiny, stretchable blended silk fabric. Designed to pair with all sherwanis and kurtas.',
    price: 29.00,
    image: 'https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&w=600&q=80',
    category: 'Ethnic Wear',
    inventory: 20,
  },
  {
    name: 'Royal Jacquard Kurta Pajama',
    description: 'Luxurious self-patterned jacquard silk-mix kurta paired with silk-blend trousers. Styled with neat fabric-covered buttons.',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1611601679655-7c8bc197f0c6?auto=format&fit=crop&w=600&q=80',
    category: 'Ethnic Wear',
    inventory: 10,
  },
  {
    name: 'Embroidered Moohra Juttis',
    description: 'Hand-crafted traditional leather mojris/juttis featuring gold thread embroidery and padded leather lining for wedding functions.',
    price: 59.00,
    image: 'https://images.unsplash.com/photo-1611601679655-7c8bc197f0c6?auto=format&fit=crop&w=600&q=80',
    category: 'Ethnic Wear',
    inventory: 15,
  },
  {
    name: 'Pashmina Wool Sherwani Shawl',
    description: 'An elegant ethnic wrap crafted from warm, lightweight Pashmina-style wool. Finished with traditional Kashmiri embroidery on the borders.',
    price: 75.00,
    image: 'https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&w=600&q=80',
    category: 'Ethnic Wear',
    inventory: 8,
  },

  // --- ACTIVEWEAR (12 items) ---
  {
    name: 'Heavyweight Hooded Sweatshirt',
    description: 'Heavy loopback French terry cotton hoodie. Features a double-lined hood, a spacious kangaroo pocket, and ribbed hem and cuffs. Provides cozy active comfort and durable structure.',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80',
    category: 'Activewear',
    inventory: 15,
  },
  {
    name: 'Performance Compression Shorts',
    description: 'Ergonomic base layer compression shorts with moisture-wicking technology. Four-way stretch fabric prevents chafing during running and training.',
    price: 29.00,
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=600&q=80',
    category: 'Activewear',
    inventory: 25,
  },
  {
    name: 'Tech-Stretch Jogger Pants',
    description: 'Modern slim joggers in a technical double-knit fabric. Features zippered hand pockets, an elastic drawstring waistband, and cuffed ankles.',
    price: 49.00,
    image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=600&q=80',
    category: 'Activewear',
    inventory: 18,
  },
  {
    name: 'Breathable Mesh Training Tee',
    description: 'Lightweight performance top designed with strategic mesh ventilation zones to keep you cool. Quick-drying and odor-resistant.',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    category: 'Activewear',
    inventory: 30,
  },
  {
    name: 'Lightweight Packable Windbreaker',
    description: 'Ripstop nylon shell windbreaker featuring water-resistant coating, adjustable toggle hood, and packable pocket design for runners.',
    price: 59.00,
    image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=600&q=80',
    category: 'Activewear',
    inventory: 12,
  },
  {
    name: 'Performance Fleece Zip-Up',
    description: 'Midweight thermal fleece athletic jacket. High mock collar, flatlock stitching, and zippered pockets for secure storage.',
    price: 55.00,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80',
    category: 'Activewear',
    inventory: 14,
  },
  {
    name: 'Moisture-Wicking Muscle Tank',
    description: 'Relaxed athletic cut gym tank top made from recycled dry-fit polyester. Wide armholes permit maximum freedom of movement.',
    price: 19.00,
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=600&q=80',
    category: 'Activewear',
    inventory: 20,
  },
  {
    name: 'Therma-Fit Running Tights',
    description: 'Full-length cold-weather running tights featuring fleece-brushed lining, reflective details, and a zippered rear key pocket.',
    price: 39.00,
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=600&q=80',
    category: 'Activewear',
    inventory: 10,
  },
  {
    name: 'High-Performance Cushioned Socks',
    description: 'Three-pack of dry-cotton athletic socks featuring arch compression support and targeted heel/toe cushioning.',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=600&q=80',
    category: 'Activewear',
    inventory: 40,
  },
  {
    name: 'French Terry Active Sweatpants',
    description: 'Ultra-soft French terry sweatpants in a relaxed casual cut. Features elastic waist with drawstring and side slide pockets.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&w=600&q=80',
    category: 'Activewear',
    inventory: 15,
  },
  {
    name: 'Water-Resistant Track Jacket',
    description: 'Retro sports track jacket in water-resistant ripstop fabric. Zippered front, dynamic paneling details, and athletic fit.',
    price: 69.00,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80',
    category: 'Activewear',
    inventory: 12,
  },
  {
    name: 'Anti-Chafe Training Shorts',
    description: 'Lightweight double-layered athletic shorts. Built-in boxer-brief liner features phone pocket, side splits for agility.',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=600&q=80',
    category: 'Activewear',
    inventory: 18,
  }
];

async function main() {
  console.log('Start seeding men\'s dress shop data...');
  // Clear existing orders first due to foreign key constraints
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  
  for (const product of initialProducts) {
    const created = await prisma.product.create({
      data: product,
    });
    console.log(`Created men's dress product with id: ${created.id} (${created.name})`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
