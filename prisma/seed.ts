import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialProducts = [
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
    name: 'Pima Cotton Polo T-Shirt',
    description: 'Premium knit polo shirt crafted from ultra-soft Pima cotton. Features a flat-knit rib collar, a three-button placket, and ribbed cuffs. Provides a comfortable stretch and clean casual profile.',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80',
    category: 'Casual Wear',
    inventory: 20,
  },
  {
    name: 'Royal Silk Sherwani Set',
    description: 'Rich brocade silk sherwani with hand-crafted embroidery and mandarin collar. Includes matching churidar pants and a dupatta shawl. Ideal for festive occasions and groomsmen.',
    price: 199.00,
    image: 'https://images.unsplash.com/photo-1610030470217-172b842cdccb?auto=format&fit=crop&w=600&q=80',
    category: 'Ethnic Wear',
    inventory: 5,
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
    name: 'Designer Festive Kurta Jacket Set',
    description: 'Lucknowi Chikankari cotton kurta paired with a tailored Nehru jacket. Features a sleek mandarin collar and gold buttons. Made from comfortable, premium lightweight cotton.',
    price: 99.00,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    category: 'Ethnic Wear',
    inventory: 10,
  },
  {
    name: 'Heavyweight Hooded Sweatshirt',
    description: 'Heavy loopback French terry cotton hoodie. Features a double-lined hood, a spacious kangaroo pocket, and ribbed hem and cuffs. Provides cozy active comfort and durable structure.',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80',
    category: 'Activewear',
    inventory: 15,
  },
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
