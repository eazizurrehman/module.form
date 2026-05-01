import { Plus } from "lucide-react";
import { AppButton } from "@/app/_components/button";
import { getFieldKeys } from "@/app/_components/form/_helper";
import {
  type Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/app/_shadcn/field";

export function AppMultiField({
  field,
  label: labelProp,
  children,
  description,
  addLabel,
  pushValue,
}: React.ComponentProps<"fieldset"> & {
  field: ReturnType<typeof Field>["props"];
  label?: string | React.ReactNode;

  addLabel?: string;
  description?: React.ReactNode | string;
  pushValue: () => void;
}) {
  const { label, isInvalid } = getFieldKeys({
    field,
    label: labelProp,
  });

  return (
    <FieldSet className="gap-4">
      <FieldLegend variant="label">{label}</FieldLegend>
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldGroup className="gap-4">
        {children}
        <AppButton
          disabled={field.state.value.length >= 5}
          onClick={(e) => {
            e.preventDefault();
            pushValue();
          }}
          variant="outline"
        >
          <Plus />
          {addLabel || "Add"}
        </AppButton>
      </FieldGroup>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </FieldSet>
  );
}
