import type { ComponentProps } from "react";
import { getFieldKeys } from "@/app/_components/form/_helper";
import {
  PasswordInput,
  PasswordInputGenerateAndStrength,
} from "@/app/_components/form/_password-input";
import { AppFieldError } from "@/app/_components/form/field-error";
import { Field, FieldLabel } from "@/app/_shadcn/field";
import type { Input } from "@/app/_shadcn/input";

export function AppPasswordInput({
  field,
  label: labelProp,
  placeholder: placeholderProp,
  className,
  hasStrengthChecker = false,
  labelSlot,
  onGenerate,
  ...props
}: Omit<ComponentProps<typeof Input>, "type"> & {
  field: ReturnType<typeof Field>["props"];
  label?: string | React.ReactNode;
  placeholder?: string;
  className?: string;
  hasStrengthChecker?: boolean;
  labelSlot?: React.ReactNode;
  onGenerate?: (value: string) => void;
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
      <PasswordInput
        {...props}
        aria-invalid={isInvalid}
        className={className}
        name={name}
        onChange={(e) => handleChange(String(e.target.value))}
        placeholder={placeholder}
        value={String(value)}
      >
        {hasStrengthChecker && onGenerate && (
          <PasswordInputGenerateAndStrength onGenerate={onGenerate} />
        )}
      </PasswordInput>
      {isInvalid && <AppFieldError errors={errors} />}
    </Field>
  );
}
