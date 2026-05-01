import type { Field } from "@/app/_shadcn/field";
import { splitLabel, toTitleCase } from "@/lib";

export type TOptionString = {
  label: string;
  value: string;
  description?: string;
};

export type Option = {
  label: string | number;
  value: string | number;
  description?: string;
};

export type OptionProp =
  | { label: string | number; value: string; description?: string }
  | string
  | number;

export type OptionsArrProp = Array<OptionProp> | ReadonlyArray<OptionProp>;

export const getFieldKeys = ({
  field,
  label: labelProp,
  placeholder: placeholderProp,
  options: optionsProp = [],
}: {
  field: ReturnType<typeof Field>["props"];
  label?: string | React.ReactNode;
  placeholder?: string;
  options?: OptionsArrProp;
}) => {
  if (!field) return {};

  const {
    name,
    state: {
      value,
      meta: { isTouched, isValid, errors },
    },
    handleChange,
  } = field;

  const isInvalid = isTouched && !isValid;

  const label = labelProp || toTitleCase(splitLabel(name));

  const placeholder =
    placeholderProp ||
    `Enter ${label && typeof label === "string" ? label.toLowerCase() : toTitleCase(name)}`;

  const options: Option[] = optionsProp
    ? optionsProp.map((option) =>
        typeof option === "object" && "label" in option && "value" in option
          ? { ...option }
          : { label: option, value: option },
      )
    : [];

  return {
    name,
    label,
    placeholder,
    options,
    value,
    isTouched,
    isValid,
    isInvalid,
    errors,
    handleChange,
  };
};
