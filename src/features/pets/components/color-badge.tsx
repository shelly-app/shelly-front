import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { XCircle } from "lucide-react";
import { capitalize } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface ColorBadgeProps {
  color: string;
  className?: string;
  animated?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

// bg color and contrasting text color for each known pet color
const colorStyles: Record<
  string,
  { bg: string; text: string; border?: string }
> = {
  black: { bg: "#1a1a1a", text: "#ffffff" },
  white: { bg: "#ffffff", text: "#1a1a1a", border: "#d1d5db" },
  brown: { bg: "#7c4a1e", text: "#ffffff" },
  golden: { bg: "#d4a017", text: "#1a1a1a" },
};

export const ColorBadge: React.FC<ColorBadgeProps> = ({
  color,
  className,
  animated = false,
  removable = false,
  onRemove,
}) => {
  const { t } = useTranslation();
  const styles = colorStyles[color];

  return (
    <Badge
      variant="secondary"
      className={cn(
        "flex items-center gap-1.5 text-xs",
        animated && "transition hover:-translate-y-1 hover:scale-105",
        className,
      )}
      style={
        styles
          ? {
              backgroundColor: styles.bg,
              color: styles.text,
              borderColor: styles.border ?? styles.bg,
            }
          : undefined
      }
    >
      <span>
        {t(`app.pets.color_labels.${color}`, {
          defaultValue: capitalize(color),
        })}
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
