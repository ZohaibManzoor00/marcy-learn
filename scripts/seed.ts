const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
        data: [
            { name: "Instructional" }, 
            { name: "Partnerships" }, 
            { name: "Program Managers" }, 
            { name: "Admissions" }, 
            { name: "Other" }, 
        ]
    })
    // await db.pathway.createMany({
    //     data: [
    //         { title: "Lead Instructor" }, 
    //         { title: "Program Manager" }, 
    //     ]
    // })
    console.log("Success")
  } catch (err) {
    console.log("Error seeding database", err);
  } finally {
    await db.$disconnect();
  }
}

main()
