import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import IconBadge from "@/components/icon-badge";
import { File, LayoutDashboard, ListChecks, Lock } from "lucide-react";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/category-form";
import AttachmentForm from "./_components/attachment-form";
import ChaptersForm from "./_components/courses-form";
import Banner from "@/components/banner";
import Actions from "./_components/actions";
import CoursesForm from "./_components/courses-form";

export default async function PathwayIdPage({
  params,
}: {
  params: { pathwayId: string };
}) {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const pathway = await db.pathway.findUnique({
    where: { id: params.pathwayId },
  });

  if (!pathway) return redirect("/");

  const requiredFields = [pathway.title, pathway.description, pathway.imageUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;

  const isComplete = requiredFields.every(Boolean);

  const courses = await db.pathway.findUnique({
    where: { id: params.pathwayId },
    include: {
      courses: { orderBy: { position: "asc" } },
    },
  });

  if (!courses) return redirect("/");

  return (
    <>
      {!pathway.isPublished && (
        <Banner
          label="This pathway is unpublished. It will not be visible to others."
          dark={"black"}
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Pathway setup</h1>
            <span className="text-sm text-slate-700 dark:text-slate-400">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            pathwayId={params.pathwayId}
            isPublished={pathway.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} variant={"primary"} />
              <h2 className="text-xl">Customize your pathway</h2>
            </div>
            <TitleForm initialData={pathway} pathwayId={pathway.id} />
            <DescriptionForm initialData={pathway} pathwayId={pathway.id} />
            <ImageForm initialData={pathway} pathwayId={pathway.id} />
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-x-2">
              <IconBadge variant={"primary"} icon={ListChecks} />
              <h2 className="text-xl">Pathway Courses</h2>
            </div>
            <CoursesForm initialData={courses} pathwayId={pathway.id} />
          </div>
        </div>
      </div>
    </>
  );
}
