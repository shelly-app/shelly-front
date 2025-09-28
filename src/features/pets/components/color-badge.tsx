import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PET_COLOR_LABELS, PET_COLORS } from "@/features/pets/constants";
import { XCircle } from "lucide-react";
import { capitalize } from "@/lib/utils";

interface ColorBadgeProps {
  /** Color name as defined in PET_COLORS */
  color: string;
  /** Extra class names */
  className?: string;
  /** If true, shows subtle animation (used in forms) */
  animated?: boolean;
  /** If true, shows a small remove (X) icon and triggers onRemove when clicked */
  removable?: boolean;
  /** Callback fired when the remove icon is clicked */
  onRemove?: () => void;
}

// Helper – decide if a HEX color is light to set appropriate text color
const isLightColor = (hexColor: string): boolean => {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};

export const ColorBadge: React.FC<ColorBadgeProps> = ({
  color,
  className,
  animated = false,
  removable = false,
  onRemove,
}) => {
  const hex = PET_COLORS[color as keyof typeof PET_COLORS] ?? "#999999";
  const light = isLightColor(hex);
  const textColor = light ? "#000000" : "#FFFFFF";

  return (
    <Badge
      variant="secondary"
      className={cn(
        "flex items-center gap-1.5 text-xs",
        animated && "transition hover:-translate-y-1 hover:scale-105", // simple bounce
        className,
      )}
      style={{
        backgroundColor: hex,
        color: textColor,
        borderColor: light ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)",
      }}
    >
      <span>
        {capitalize(PET_COLOR_LABELS[color as keyof typeof PET_COLOR_LABELS])}
      </span>
      {removable && (
        <XCircle
          aria-label="Remove color"
          className="h-3 w-3 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
        />
      )}
    </Badge>
  );
};
