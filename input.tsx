import { getFieldKeys } from "@/app/_components/form/_helper";
import { AppFieldError } from "@/app/_components/form/field-error";
import { Field, FieldLabel } from "@/app/_shadcn/field";
import { Input } from "@/app/_shadcn/input";

export function AppInput({
  type = "text",
  field,
  label: labelProp,
  placeholder: placeholderProp,
  className,
  labelSlot,
  ...props
}: React.ComponentProps<"input"> & {
  field: ReturnType<typeof Field>["props"];
  label?: string | React.ReactNode;
  placeholder?: string;
  className?: string;
  labelSlot?: React.ReactNode;
}) {
  const { name, label, placeholder, value, isInvalid, errors, handleChange } =
    getFieldKeys({
      field,
      label: labelProp,
      placeholder: placeholderProp,
    });

  return (
    <Field className="gap-2" data-invalid={isInvalid}>
      <div className="flex items-center justify-between">
        <FieldLabel htmlFor={name}>{label}</FieldLabel>
        {labelSlot}
      </div>
      <Input
        {...props}
        aria-invalid={isInvalid}
        className={className}
        name={name}
        onChange={(e) => {
          let value: string | number = e.target.value;

          if (type === "number") value = Number(value);
          else value = String(value);

          handleChange(value);
        }}
        placeholder={placeholder}
        type={type}
        value={String(value)}
      />
      {isInvalid && <AppFieldError errors={errors} />}
    </Field>
  );
}
