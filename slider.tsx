import type { Slider as SliderPrimitive } from "radix-ui";
import { getFieldKeys } from "@/app/_modules/form/_helper";
import { AppFieldError } from "@/app/_modules/form/field-error";
import { Field, FieldLabel } from "@/app/_shadcn/field";
import { Slider } from "@/app/_shadcn/slider";

export function AppSlider({
  field,
  label: labelProp,
  className,
  hasLabel = true,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  field: ReturnType<typeof Field>["props"];
  label?: string | React.ReactNode;
  className?: string;
  hasLabel?: boolean;
}) {
  const { name, label, value, isInvalid, errors, handleChange } = getFieldKeys({
    field,
    label: labelProp,
  });

  return (
    <Field className="gap-2" data-invalid={isInvalid}>
      <div className="flex items-center justify-between gap-2">
        {hasLabel && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
        <span className="text-muted-foreground text-sm">
          {value[0]} to {value[1]}
        </span>
      </div>
      <Slider
        {...props}
        id={name}
        onValueChange={handleChange}
        step={1}
        value={value}
      />
      {isInvalid && <AppFieldError errors={errors} />}
    </Field>
  );
}
