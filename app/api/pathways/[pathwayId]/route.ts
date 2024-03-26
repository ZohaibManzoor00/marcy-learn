import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function DELETE(
  _req: Request,
  { params }: { params: { pathwayId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const pathway = await db.pathway.findUnique({ where: { id: params.pathwayId }})

    if (!pathway) return new NextResponse("Not found", { status: 404 }); 

    const coursesToDelete = await db.course.findMany({
      where: { pathwayId: params.pathwayId },
      include: { chapters: { include: { muxData: true } } },
    });

    for (const course of coursesToDelete) {
      for (const chapter of course.chapters) {
        if (chapter?.muxData) await mux.video.assets.delete(chapter.muxData.assetId)
      } 
    }

    await db.course.deleteMany({ where: { pathwayId: params.pathwayId } });

    const deletedPathway = await db.pathway.delete({ where: { id: params.pathwayId } });

    return NextResponse.json(deletedPathway);
  } catch (err) {
    console.log("[PATHWAY_ID_DELETE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { pathwayId: string } }
) {
  try {
    const { userId } = auth();
    const { pathwayId } = params;
    const values = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const pathway = await db.pathway.update({
      where: { id: pathwayId, userId },
      data: { ...values },
    });

    return NextResponse.json(pathway);
  } catch (err) {
    console.log("[PATHWAY_ID]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
