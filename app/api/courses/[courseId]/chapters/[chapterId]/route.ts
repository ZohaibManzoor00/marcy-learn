import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();
    
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const ownCourse = await db.course.findUnique({
      where: { id: params.courseId, userId },
    });

    if (!ownCourse) return new NextResponse("Unauthorized", { status: 400 });

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: { ...values },
    });

    // TODO handle video upload
    return NextResponse.json(chapter);
  } catch (err) {
    console.log("[COURSES_CHAPTER_ID]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
