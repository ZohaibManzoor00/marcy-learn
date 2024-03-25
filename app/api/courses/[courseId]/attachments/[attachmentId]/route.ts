import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId || !isTeacher(userId)) return new NextResponse("Unauthorized", { status: 401 });

    const courseOwner = await db.course.findUnique({ where: { id: params.courseId, userId } });

    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

    const attachment = await db.attachment.delete({ where: { courseId: params.courseId, id: params.attachmentId } });

    return NextResponse.json(attachment);
  } catch (err) {
    console.log("ATTACHMENT_ID", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
