const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@homes24.com";
  const hashedPassword = await bcrypt.hash("Admin@Homes24#2026", 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN" },
    create: {
      name: "Homes24 Admin",
      email: adminEmail,
      password: hashedPassword,
      phone: "9999999999",
      role: "ADMIN",
    },
  });

  console.log("Admin user seeded successfully:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });