import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { pathwayId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { list } = await req.json();
    
    const ownPathway = await db.pathway.findUnique({ where: { id: params.pathwayId, userId } });
    
    if (!ownPathway) return new NextResponse("Unauthorized", { status: 401 });

    for (const item of list) {
      await db.course.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }

    return NextResponse.json("Success", { status: 200 });
  } catch (err) {
    console.log("[REORDER]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
