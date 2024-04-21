import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 dark:bg-yellow-200 border-yellow-30 text-primary",
        success: "bg-emerald-700 border-emerald-800 text-secondary",
        caution: "bg-gray-500/80 border-gray-400 text-secondary",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
  dark?: string;
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
  caution: AlertTriangle,
};

export default function Banner({ label, variant, dark }: BannerProps) {
  const Icon = iconMap[variant || "warning"];
  return (
    <div
      className={cn("text-black", bannerVariants({ variant }), dark && dark === "black" ? "text-black" : "text-white")}
    >
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </div>
  );
}
