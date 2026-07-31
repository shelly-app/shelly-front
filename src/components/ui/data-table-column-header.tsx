import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
};

export function getColumnAriaSort<TData>(
  column: Column<TData, unknown>,
): "none" | "ascending" | "descending" | undefined {
  if (!column.getCanSort()) return undefined;

  const sorted = column.getIsSorted();
  if (sorted === "asc") return "ascending";
  if (sorted === "desc") return "descending";
  return "none";
}

export const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  const { t } = useTranslation();
  const label = t(title);

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{label}</div>;
  }

  const sorted = column.getIsSorted();
  const nextDirection =
    sorted === "asc" ? "descending" : sorted === "desc" ? "none" : "ascending";

  const sortLabel = t("app.pets.table.sort_by", {
    column: label,
    direction: t(`app.pets.table.sort_direction.${nextDirection}`),
  });

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={cn("hover:bg-accent/60 -ml-3 h-8 px-3 font-medium", className)}
      onClick={() => column.toggleSorting()}
      aria-label={sortLabel}
    >
      <span>{label}</span>
      {sorted === "desc" ? (
        <ArrowDown className="size-4" aria-hidden="true" />
      ) : sorted === "asc" ? (
        <ArrowUp className="size-4" aria-hidden="true" />
      ) : (
        <ChevronsUpDown
          className="text-muted-foreground size-4"
          aria-hidden="true"
        />
      )}
    </Button>
  );
};
