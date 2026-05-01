import { FieldError } from "@/app/_shadcn/field";
import { cn } from "@/lib/utils";

export function AppFieldError({
  className,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  return <FieldError className={cn("text-xs", className)} {...props} />;
}
