import type { Select as SelectPrimitive } from "radix-ui";
import { getFieldKeys, type OptionsArrProp } from "@/app/_modules/form/_helper";
import { AppFieldError } from "@/app/_modules/form/field-error";
import { Field, FieldLabel } from "@/app/_shadcn/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_shadcn/select";

export function AppSelect({
  type = "string",
  field,
  label: labelProp,
  placeholder: placeholderProp,
  options: optionProp,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root> & {
  type?: "number" | "string";
  field: ReturnType<typeof Field>["props"];
  label?: string;
  options: OptionsArrProp;
  placeholder?: string;
}) {
  const {
    name,
    label,
    placeholder,
    options,
    value,
    isInvalid,
    errors,
    handleChange,
  } = getFieldKeys({
    field,
    label: labelProp,
    placeholder: placeholderProp,
    options: optionProp,
  });

  return (
    <Field className="gap-2" data-invalid={isInvalid}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Select
        {...props}
        aria-invalid={isInvalid}
        name={name}
        onValueChange={(val) =>
          handleChange(type === "number" ? Number(val) : val)
        }
        value={String(value)}
      >
        <SelectTrigger id={name}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {(options || []).map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isInvalid && <AppFieldError errors={errors} />}
    </Field>
  );
}
