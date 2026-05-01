import type { Country } from "react-phone-number-input";
import { getFieldKeys } from "@/app/_components/form/_helper";
import {
  PhoneInput,
  type PhoneInputProps,
} from "@/app/_components/form/_phone-input";
import { AppFieldError } from "@/app/_components/form/field-error";
import { Field, FieldLabel } from "@/app/_shadcn/field";

export function AppPhoneInput({
  field,
  label: labelProp,
  placeholder: placeholderProp,
  defaultCountry = "PK",
  ...props
}: Omit<PhoneInputProps, "value" | "onChange" | "name"> & {
  field: ReturnType<typeof Field>["props"];
  label?: string | React.ReactNode;
  placeholder?: string;
  defaultCountry?: Country;
}) {
  const { name, label, placeholder, value, isInvalid, errors, handleChange } =
    getFieldKeys({
      field,
      label: labelProp,
      placeholder: placeholderProp,
    });

  return (
    <Field className="gap-2" data-invalid={isInvalid}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <PhoneInput
        {...props}
        aria-invalid={isInvalid}
        defaultCountry={defaultCountry}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
      />
      {isInvalid && <AppFieldError errors={errors} />}
    </Field>
  );
}
