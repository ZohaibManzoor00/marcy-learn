import { db } from "@/lib/db";

export const getProgress = async (userId: string, courseId: string): Promise<number> => {
  const chapters = await db.chapter.findMany({
    where: { courseId, isPublished: true },
    select: { userProgress: { where: { userId, isCompleted: true } } }
  });

  if (chapters.length === 0) return 0; 

  const totalChapters = chapters.length;
  const completedChapters = chapters.filter(chapter => chapter.userProgress.length > 0).length;

  const progressPercentage = (completedChapters / totalChapters) * 100;

  return progressPercentage;
}

