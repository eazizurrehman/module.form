import type { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { getFieldKeys, type OptionsArrProp } from "@/app/_modules/form/_helper";
import { AppFieldError } from "@/app/_modules/form/field-error";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/app/_shadcn/combobox";
import { Field, FieldLabel } from "@/app/_shadcn/field";

export function AppCombobox({
  type = "string",
  field,
  label: labelProp,
  placeholder: placeholderProp,
  options: optionProp,
  disabled,
  hasLabel = true,
  ...props
}: ComboboxPrimitive.Value.Props & {
  type?: "number" | "string";
  field: ReturnType<typeof Field>["props"];
  label?: string;
  options: OptionsArrProp;
  disabled?: boolean;
  placeholder?: string;
  hasLabel?: boolean;
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

  const inputValue =
    options?.find((option) => option.value === value)?.label ?? "";

  return (
    <Field className="gap-2" data-invalid={isInvalid}>
      {hasLabel && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      <Combobox
        {...props}
        disabled={disabled}
        items={options}
        name={name}
        onValueChange={(id) => {
          handleChange(id);
        }}
        value={String(inputValue)}
      >
        <ComboboxInput
          aria-invalid={isInvalid}
          disabled={disabled}
          placeholder={placeholder}
          showClear
        />
        <ComboboxContent>
          <ComboboxEmpty>No items found</ComboboxEmpty>
          <ComboboxList>
            {(option) => (
              <ComboboxItem key={option.value} value={option.value}>
                {option.label ?? option.value}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {isInvalid && <AppFieldError errors={errors} />}
    </Field>
  );
}
