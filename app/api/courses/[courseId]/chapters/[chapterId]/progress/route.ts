import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { isCompleted } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    await db.userProgress.upsert({
      where: { userId_chapterId: { userId, chapterId: params.chapterId } },
      update: { isCompleted },
      create: { userId, chapterId: params.chapterId, isCompleted },
    });

    const progress = await getProgress(userId, params.courseId);
    return NextResponse.json(progress);
  } catch (err) {
    console.log("[CHAPTER_ID_PROGRESS]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
