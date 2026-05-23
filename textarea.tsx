import { getFieldKeys } from "@/app/_modules/form/_helper";
import { AppFieldError } from "@/app/_modules/form/field-error";
import { Field, FieldLabel } from "@/app/_shadcn/field";
import { Textarea } from "@/app/_shadcn/textarea";
import { cn } from "@/lib/utils";

export function AppTextarea({
  field,
  label: labelProp,
  placeholder: placeholderProp,
  className,
  hasLabel = true,
  ...props
}: React.ComponentProps<"textarea"> & {
  field: ReturnType<typeof Field>["props"];
  label?: string | React.ReactNode;
  hasLabel?: boolean;
}) {
  const { name, label, placeholder, value, isInvalid, errors, handleChange } =
    getFieldKeys({
      field,
      label: labelProp,
      placeholder: placeholderProp,
    });

  return (
    <Field className="gap-2" data-invalid={isInvalid}>
      {hasLabel && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      <Textarea
        {...props}
        aria-invalid={isInvalid}
        className={cn("min-h-30", className)}
        name={name}
        onChange={(e) => handleChange(e.currentTarget.value)}
        placeholder={placeholder}
        value={value ?? ""}
      />
      {isInvalid && <AppFieldError errors={errors} />}
    </Field>
  );
}
