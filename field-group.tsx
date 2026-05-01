import { FieldGroup } from "@/app/_shadcn/field";
import { cn } from "@/lib/utils";

export function AppFieldGroup({
  className,
  orientation = "vertical",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <FieldGroup
      className={cn(
        "gap-2",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        className,
      )}
      {...props}
    >
      {children}
    </FieldGroup>
  );
}
