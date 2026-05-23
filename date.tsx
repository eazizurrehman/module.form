import { useState } from "react";
import type { DayPicker } from "react-day-picker";
import { getFieldKeys } from "@/app/_modules/form/_helper";
import { AppFieldError } from "@/app/_modules/form/field-error";
import { Button } from "@/app/_shadcn/button";
import { Calendar } from "@/app/_shadcn/calendar";
import { Field, FieldLabel } from "@/app/_shadcn/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/_shadcn/popover";

export function AppDate({
  field,
  label: labelProp,
  placeholder: placeholderProp,
  hasLabel = true,
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
} & {
  field: ReturnType<typeof Field>["props"];
  label?: string | React.ReactNode;
  placeholder?: string;
  hasLabel?: boolean;
}) {
  const { name, label, placeholder, value, isInvalid, errors, handleChange } =
    getFieldKeys({
      field,
      label: labelProp,
      placeholder: placeholderProp,
    });

  const [open, setOpen] = useState(false);

  return (
    <Field className="gap-2" data-invalid={isInvalid}>
      {hasLabel && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            className="justify-start pl-3 font-sm"
            id={name}
            variant="outline"
          >
            {value ? (
              value.toLocaleDateString()
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto overflow-hidden p-0">
          <Calendar
            captionLayout="dropdown"
            defaultMonth={value}
            mode="single"
            onSelect={(date: Date | undefined) => {
              handleChange(date);
              setOpen(false);
            }}
            selected={value}
          />
        </PopoverContent>
      </Popover>
      {isInvalid && <AppFieldError errors={errors} />}
    </Field>
  );
}
