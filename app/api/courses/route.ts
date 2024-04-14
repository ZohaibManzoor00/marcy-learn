import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title, pathwayId } = await req.json();

    if (!userId || !isTeacher(userId)) return new NextResponse("Unauthorized", { status: 401 });

    const courseOwner = await db.pathway.findUnique({
      where: { id: pathwayId, userId },
    });

    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

    const lastCourse = await db.course.findFirst({
      where: { pathwayId },
      orderBy: { position: "desc" },
    });

    const newPosition = lastCourse ? lastCourse.position + 1 : 1;

    const course = await db.course.create({ data: { userId, title, pathwayId, position: newPosition } });

    return NextResponse.json(course);
  } catch (err) {
    console.log("[COURSES]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
