import * as React from "react";
import { Badge } from "../../../components/ui/badge";
import { cn } from "@/lib/utils";
import { PET_COLORS, PetColor } from "../constants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PetColorBadgeProps {
  color: string;
  className?: string;
  showPalette?: boolean;
  children?: React.ReactNode;
}

export const PetColorBadge: React.FC<PetColorBadgeProps> = ({
  color,
  className,
  showPalette = true,
  children,
}) => {
  const predefinedColor = PET_COLORS[color as PetColor];

  if (!showPalette) {
    return (
      <Tooltip>
        <TooltipTrigger
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <Badge
            style={{
              backgroundColor: predefinedColor,
            }}
            className={cn(
              "border-border h-6 w-6 items-center rounded-full border",
              className,
            )}
          />
        </TooltipTrigger>
        <TooltipContent>{color}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Badge
      variant="secondary"
      className={cn("flex items-center gap-1.5 text-xs", className)}
    >
      <div className="flex items-center gap-0.5">
        <div
          className="border-border h-2.5 w-2.5 rounded-full border"
          style={{
            backgroundColor: predefinedColor,
            boxShadow:
              predefinedColor === "#FFFFFF"
                ? "inset 0 0 0 1px #e5e7eb"
                : "none",
          }}
        />
      </div>
      <span>{color}</span>
      {children}
    </Badge>
  );
};
