import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { db } from "@/lib/db";
import { Course } from "@prisma/client";
import CarouselCard from "./carousel-card";

async function getRandomCourses(): Promise<Course[]> {
  const totalCourses = await db.course.count();
  const randomOffset = Math.floor(
    Math.random() * Math.max(0, totalCourses - 5)
  );

  const courses = await db.course.findMany({
    where: { isPublished: true },
    include: { chapters: { where: { isPublished: true } } },
    take: 5,
    skip: randomOffset,
  });

  return courses;
}

export async function CarouselGroup() {
  const recentlyCompletedCourses = await getRandomCourses();
  
  if (!recentlyCompletedCourses) return null 
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full min-w-full"
    >
      <CarouselContent>
        {recentlyCompletedCourses.map((course) => (
          <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="">
              {/* <Card>
                <CardContent className=""> */}
                  <CarouselCard {...course}/>
                {/* </CardContent>
              </Card> */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
