const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
        data: [
            { name: "Mod 0" }, 
            { name: "Mod 1" }, 
            { name: "Mod 2" }, 
            { name: "Mod 3" }, 
            { name: "Mod 4" }, 
            { name: "Mod 5" }, 
            { name: "Mod 6" }, 
            { name: "Mod 7" }, 
            { name: "Mod 8" }, 
            { name: "Mod 9" }, 
            { name: "Other" }, 
        ]
    })
    console.log("Success")
  } catch (err) {
    console.log("Error seeding database categories", err);
  } finally {
    await database.$disconnect();
  }
}

main()
