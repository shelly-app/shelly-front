import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const AuthLayout = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className={cn("flex-1", className)}>{children}</main>
    </div>
  );
};
