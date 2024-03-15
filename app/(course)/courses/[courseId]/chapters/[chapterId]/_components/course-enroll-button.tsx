"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

export default function CourseEnrollButton({
  courseId,
  price,
}: CourseEnrollButtonProps) {
  return (
    <Button className="w-full md:w-auto" size="sm">
      {formatPrice(price)}
    </Button>
  );
}
