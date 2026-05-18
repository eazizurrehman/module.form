import { AppInput, type TAppInputProps } from "@/app/_modules/form/input";

export function AppFileInput({
  field,
  multiple,
  ...props
}: TAppInputProps &
  Omit<React.ComponentProps<"input">, "type" | "value" | "onChange">) {
  return (
    <AppInput
      {...props}
      field={field}
      getValue={(event) => {
        const files = event.target.files;
        return multiple ? Array.from(files ?? []) : (files?.[0] ?? null);
      }}
      multiple={multiple}
      setValue={false}
      type="file"
    />
  );
}
