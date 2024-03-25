import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  _req: Request,
  { params }: { params: { pathwayId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    const pathway = await db.pathway.findUnique({
      where: { id: params.pathwayId, userId },
    });

    if (!pathway) return new NextResponse("Not found", { status: 404 });

    const unpublishedPathway = await db.pathway.update({
        where: { id: params.pathwayId, userId }, 
        data: { isPublished: false }
    })

    return NextResponse.json(unpublishedPathway)
  } catch (err) {
    console.log("[PATHWAY_ID_UNPUBLISH]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
