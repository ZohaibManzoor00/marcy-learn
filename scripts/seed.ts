const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
        data: [
            { name: "Computer Science" }, 
            { name: "Music" }, 
            { name: "Fitness" }, 
            { name: "Photography" }, 
            { name: "Accounting" }, 
            { name: "Filming" }, 
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
