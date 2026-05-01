import type { VariantProps } from "class-variance-authority";
import { AppButton } from "@/app/_components/button";
import type { buttonVariants } from "@/app/_shadcn/button";
import { LoadingSwap } from "@/app/_shadcn/loading-swap";

type SubscribeButtonProps = Omit<
  React.ComponentProps<"button">,
  "form" | "type" | "size" | "disabled"
> &
  VariantProps<typeof buttonVariants> & {
    form: {
      Subscribe: React.ComponentType<{
        selector: (state: {
          canSubmit: boolean;
          isSubmitting: boolean;
        }) => readonly [boolean, boolean];
        children: (state: readonly [boolean, boolean]) => React.ReactNode;
      }>;
    };
    formId: string;
    isLoading?: boolean;
  };

export function AppSubmitButton({
  form,
  formId,
  isLoading: isLoadingProp,
  children,
  ...props
}: SubscribeButtonProps) {
  return (
    <form.Subscribe
      selector={({
        canSubmit,
        isSubmitting,
      }: {
        canSubmit: boolean;
        isSubmitting: boolean;
      }) => [canSubmit, isSubmitting] as const}
    >
      {(state: readonly [boolean, boolean]) => {
        const [canSubmit, isSubmitting] = state;

        const isLoading =
          typeof isLoadingProp === "boolean"
            ? isLoadingProp && isSubmitting
            : isSubmitting;

        return (
          <AppButton
            {...props}
            disabled={!canSubmit}
            form={formId}
            size="sm"
            type="submit"
          >
            <LoadingSwap
              className="inline-flex items-center justify-center gap-1"
              isLoading={isLoading}
            >
              {children}
            </LoadingSwap>
          </AppButton>
        );
      }}
    </form.Subscribe>
  );
}
