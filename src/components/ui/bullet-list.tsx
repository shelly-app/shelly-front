import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bulletVariants = cva("h-2 w-2 rounded-full", {
  variants: {
    variant: {
      default: "bg-sky-400",
      primary: "bg-blue-500",
      secondary: "bg-gray-400",
      success: "bg-green-500",
      warning: "bg-yellow-500",
      danger: "bg-red-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface BulletListProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof bulletVariants> {
  options: string[];
}

export const BulletList = ({
  options,
  variant,
  className,
  ...props
}: BulletListProps) => {
  if (options.length === 0) return null;

  return options.map((option) => (
    <div
      key={option}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <div className={bulletVariants({ variant })}></div>
      <span className="text-sm">{option}</span>
    </div>
  ));
};
