import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const ownCourse = await db.course.findUnique({ where: { id: params.courseId, userId } });

    if (!ownCourse) return new NextResponse("Unauthorized", { status: 401 });

    const chapter = await db.chapter.findUnique({ where: { id: params.chapterId, courseId: params.courseId } });

    if (!chapter) return new NextResponse("Not found", { status: 404 });

    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({ where: { chapterId: params.chapterId } });

      if (existingMuxData) {
        await mux.video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({ where: { id: existingMuxData.id } });
      }
    }

    const deletedChapter = await db.chapter.delete({ where: { id: params.chapterId } });

    const publishedChaptersInCourse = await db.chapter.findMany({ where: { courseId: params.courseId, isPublished: true } });

    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: { id: params.courseId },
        data: { isPublished: true },
      });
    }

    return NextResponse.json(deletedChapter);
  } catch (err) {
    console.log("[CHAPTER_ID_DELETE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const ownCourse = await db.course.findUnique({ where: { id: params.courseId, userId } });

    if (!ownCourse) return new NextResponse("Unauthorized", { status: 400 });

    const chapter = await db.chapter.update({
      where: { id: params.chapterId, courseId: params.courseId, }, data: { ...values },
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({ where: { chapterId: params.chapterId } });

      if (existingMuxData) {
        await mux.video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({ where: { id: existingMuxData.id } });
      }

      const asset = await mux.video.assets.create({
        input: [{ url: values.videoUrl }],
        playback_policy: ["public"],
        encoding_tier: "baseline",
        test: false,
      });

      await db.muxData.create({
        data: {
          chapterId: params.chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }
    return NextResponse.json(chapter);
  } catch (err) {
    console.log("[COURSES_CHAPTER_ID]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
