import type { Switch as SwitchPrimitive } from "radix-ui";
import { getFieldKeys } from "@/app/_modules/form/_helper";
import { AppFieldError } from "@/app/_modules/form/field-error";
import { Field, FieldContent, FieldLabel } from "@/app/_shadcn/field";
import { Switch } from "@/app/_shadcn/switch";

export function AppSwitch({
  field,
  label: labelProp,
  placeholder: placeholderProp,
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default";
} & {
  field: ReturnType<typeof Field>["props"];
  label?: string | React.ReactNode;
  placeholder?: string;
  className?: string;
}) {
  const { name, label, value, isInvalid, errors, handleChange } = getFieldKeys({
    field,
    label: labelProp,
    placeholder: placeholderProp,
  });

  return (
    <Field data-invalid={isInvalid} orientation="horizontal">
      <FieldContent>
        <FieldLabel className="w-full" htmlFor={name}>
          {label}
        </FieldLabel>
      </FieldContent>
      <Switch
        {...props}
        checked={value}
        data-invalid={isInvalid}
        id={name}
        onCheckedChange={handleChange}
      />
      {isInvalid && <AppFieldError errors={errors} />}
    </Field>
  );
}
