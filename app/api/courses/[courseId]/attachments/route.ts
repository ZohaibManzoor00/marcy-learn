import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = auth();
    const { url, name } = await req.json();

    if (!userId || !isTeacher(userId)) return new NextResponse("Unauthorized", { status: 401 });

    const courseOwner = await db.course.findUnique({ where: { id: params.courseId, userId } });

    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

    const attachment = await db.attachment.create({ data: { url, name, courseId: params.courseId } });

    return NextResponse.json(attachment);
  } catch (err) {
    console.log("COURSE_ID_ATTACHMENTS", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
