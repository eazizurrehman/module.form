import Image from "next/image";
import type { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { getFieldKeys } from "@/app/_modules/form/_helper";
import { AppFieldError } from "@/app/_modules/form/field-error";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/app/_shadcn/field";
import { RadioGroup, RadioGroupItem } from "@/app/_shadcn/radio-group";
import { cn } from "@/lib/utils";

export type RadioCardOption = {
  value: string;
  label?: string;
  description?: string;
  image?: string;
  className?: string;
};

export function AppRadioCard({
  field,
  label: labelProp,
  orientation = "horizontal",
  options,
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root> & {
  field: ReturnType<typeof Field>["props"];
  label?: string;
  options: RadioCardOption[];
}) {
  const { name, label, value, isInvalid, errors, handleChange } = getFieldKeys({
    field,
    label: labelProp,
  });

  return (
    <>
      <FieldSet>
        <FieldLabel>{label}</FieldLabel>
        <RadioGroup
          {...props}
          className={cn(
            "flex",
            orientation === "vertical" ? "flex-col" : "flex-row",
            className,
          )}
          name={name}
          onValueChange={handleChange}
          value={String(value)}
        >
          {(options || []).map((option) => (
            <FieldLabel htmlFor={String(option.value)} key={option.value}>
              <Field
                className="flex flex-row items-center"
                data-invalid={isInvalid}
              >
                <FieldContent className={option.className}>
                  {option.label && <FieldTitle>{option.label}</FieldTitle>}
                  <FieldDescription>
                    {option.description && option.description}
                    {option.image && (
                      <div className="flex h-10 items-center overflow-hidden rounded">
                        <Image
                          alt={String(option.label)}
                          height={40}
                          src={option.image}
                          width={100}
                        />
                      </div>
                    )}
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem
                  aria-invalid={isInvalid}
                  className="max-h-4 max-w-4 bg-green-900"
                  id={String(option.value)}
                  value={String(option.value)}
                />
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
      </FieldSet>
      {isInvalid && <AppFieldError errors={errors} />}
    </>
  );
}
