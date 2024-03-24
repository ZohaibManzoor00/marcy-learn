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
import ChaptersForm from "./_components/chapters-form";
import Banner from "@/components/banner";
import Actions from "./_components/actions";

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

  const categories = await db.category.findMany();

  if (!pathway) return redirect("/");

  const requiredFields = [pathway.title, pathway.description, pathway.imageUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!pathway.isPublished && (
        <Banner label="This pathway is unpublished. It will not be visible to viewers." dark={"black"} />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Pathway setup</h1>
            <span className="text-sm text-slate-700">
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
              <IconBadge icon={LayoutDashboard} variant={"default"} />
              <h2 className="text-xl">Customize your pathway</h2>
            </div>
            <TitleForm initialData={pathway} pathwayId={pathway.id} />
            <DescriptionForm initialData={pathway} pathwayId={pathway.id} />
            <ImageForm initialData={pathway} pathwayId={pathway.id} />
            {/* <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            /> */}
          </div>
          <div className="space-y-6">
            {/* <div className="">
              <div className="flex items-center gap-x-2">
                <IconBadge variant={"default"} icon={ListChecks} />
                <h2 className="text-xl">Course Chapters</h2>
              </div>
              <ChaptersForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge variant={"default"} icon={File} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentForm initialData={pathway} courseId={pathway.id} />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
