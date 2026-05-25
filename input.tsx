import { getFieldKeys } from "@/app/_modules/form/_helper";
import { AppFieldError } from "@/app/_modules/form/field-error";
import { Field, FieldLabel } from "@/app/_shadcn/field";
import { Input } from "@/app/_shadcn/input";

export type TAppInputProps = React.ComponentProps<"input"> & {
  field: ReturnType<typeof Field>["props"];
  label?: string | React.ReactNode;
  placeholder?: string;
  className?: string;
  labelSlot?: React.ReactNode;
  getValue?: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
  setValue?: boolean;
  hasLabel?: boolean;
};

export function AppInput({
  type = "text",
  field,
  label: labelProp,
  placeholder: placeholderProp,
  className,
  labelSlot,
  getValue,
  setValue = true,
  hasLabel = true,
  ...props
}: TAppInputProps) {
  const { name, label, placeholder, value, isInvalid, errors, handleChange } =
    getFieldKeys({
      field,
      label: labelProp,
      placeholder: placeholderProp,
    });

  return (
    <Field className="gap-2" data-invalid={isInvalid}>
      {(hasLabel || labelSlot) && (
        <div className="flex items-center justify-between">
          {hasLabel && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
          {labelSlot}
        </div>
      )}
      <Input
        {...props}
        aria-invalid={isInvalid}
        className={className}
        name={name}
        onChange={(e) => {
          const nextValue = getValue
            ? getValue(e)
            : type === "number"
              ? Number(e.target.value)
              : String(e.target.value);

          handleChange(nextValue as never);

          props.onChange?.(e);
        }}
        placeholder={placeholder}
        type={type}
        value={setValue ? String(value) : undefined}
      />
      {isInvalid && <AppFieldError errors={errors} />}
    </Field>
  );
}
