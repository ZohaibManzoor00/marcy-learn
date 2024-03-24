import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function DELETE(
  req: Request,
  { params }: { params: { pathwayId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    console.log("here");
    const course = await db.course.findUnique({
      where: { id: params.pathwayId, userId },
      include: { chapters: { include: { muxData: true } } },
    });

    if (!course) return new NextResponse("Not found", { status: 404 });

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await mux.video.assets.delete(chapter.muxData.assetId);
      }
    }

    await db.course.delete({ where: { id: params.pathwayId } });
    const deletedPathway = db.pathway.delete({
      where: { id: params.pathwayId },
    });

    return NextResponse.json(deletedPathway);
  } catch (err) {
    console.log("[COURSE_ID_DELETE]", err);
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
    console.log("[COURSE_ID]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
