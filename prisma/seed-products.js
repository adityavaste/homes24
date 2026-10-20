

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const INITIAL_PRODUCTS = [
  {
    title: "Urban Ladder 3-Seater Fabric Sofa (Grey)",
    category: "sofas",
    price: 12999,
    originalPrice: 38999,
    condition: "Mint Grade A+",
    warranty: "1-Year Warranty",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Samsung 253L Double Door Refrigerator",
    category: "appliances",
    price: 14499,
    originalPrice: 31990,
    condition: "Like New Grade A",
    warranty: "1-Year Warranty",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Bosch 7kg Fully Automatic Washing Machine",
    category: "appliances",
    price: 13200,
    originalPrice: 36000,
    condition: "Mint Grade A+",
    warranty: "1-Year Warranty",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "King Size Solid Sheesham Wood Bed with Storage",
    category: "beds",
    price: 16800,
    originalPrice: 48000,
    condition: "Certified Excellent",
    warranty: "1-Year Warranty",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "6-Seater Solid Wood Dining Table Set",
    category: "dining",
    price: 18500,
    originalPrice: 52000,
    condition: "Mint Grade A+",
    warranty: "1-Year Warranty",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
  },
];

async function main() {
  console.log("Seeding inventory into MySQL...");
  for (const item of INITIAL_PRODUCTS) {
    await prisma.product.create({
      data: item,
    });
  }
  console.log("Inventory seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });