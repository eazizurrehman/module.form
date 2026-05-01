"use client";

import { Upload, X } from "lucide-react";
import { AppButton } from "@/app/_components/button";
import { getFieldKeys } from "@/app/_components/form/_helper";
import { AppFieldError } from "@/app/_components/form/field-error";
import { Field } from "@/app/_shadcn/field";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  type FileUploadProps,
  FileUploadTrigger,
} from "@/app/_shadcn/file-upload";
import { formatBytes } from "@/lib";
import { cn } from "@/lib/utils";

export function AppFileUpload({
  field,
  maxFiles = 1,
  maxSize = 5 * 1024 * 1024,
  disabled: disabledProp = false,
  className,
  ...props
}: FileUploadProps & {
  field: ReturnType<typeof Field>["props"];
}) {
  const { name, value, isInvalid, errors, handleChange } = getFieldKeys({
    field,
  });

  const disabled = disabledProp || value?.length >= maxFiles;

  return (
    <Field className="gap-2" data-invalid={isInvalid}>
      <FileUpload
        {...props}
        className={cn("w-full", className)}
        disabled={disabled}
        maxFiles={maxFiles}
        maxSize={maxSize}
        name={name}
        onValueChange={handleChange}
        value={value}
      >
        <FileUploadDropzone className={cn(isInvalid && "border-destructive")}>
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="flex items-center justify-center rounded-full border p-2.5">
              <Upload className="size-6 text-muted-foreground" />
            </div>
            <p
              className={cn(
                "font-medium text-sm text-white",
                disabled && "text-muted-foreground",
                isInvalid && "text-destructive",
              )}
            >
              Drag & drop files
            </p>
            <p
              className={cn(
                "text-muted-foreground text-xs",
                isInvalid && "text-destructive",
              )}
            >
              Or click to browse
            </p>
            <p
              className={cn(
                "text-muted-foreground text-xs",
                isInvalid && "text-destructive",
              )}
            >
              Max: {`${maxFiles} file${maxFiles > 1 ? "s" : ""}`}
            </p>
            <p
              className={cn(
                "text-muted-foreground text-xs",
                isInvalid && "text-destructive",
              )}
            >
              Size: {`${formatBytes(maxSize)} ${maxFiles > 1 ? "each" : ""}`}
            </p>
          </div>
          <FileUploadTrigger asChild>
            <AppButton className="mt-2 w-fit dark:text-white" variant="outline">
              Browse
            </AppButton>
          </FileUploadTrigger>
        </FileUploadDropzone>
        <FileUploadList>
          {value?.map((file: File) => (
            <FileUploadItem
              key={file.name + file.lastModified + file.size + file.type}
              value={file}
            >
              <FileUploadItemPreview />
              <FileUploadItemMetadata />
              <FileUploadItemDelete asChild>
                <AppButton className="size-7" size="icon" variant="ghost">
                  <X />
                </AppButton>
              </FileUploadItemDelete>
            </FileUploadItem>
          ))}
        </FileUploadList>
      </FileUpload>
      {isInvalid && <AppFieldError errors={errors} />}
    </Field>
  );
}
