"use client";

import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import { Copy, EyeIcon, EyeOffIcon, RotateCcwKey, X } from "lucide-react";
import {
  type ChangeEvent,
  type ComponentProps,
  createContext,
  type ReactNode,
  useContext,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppButton } from "@/app/_components/button";
import type { Input } from "@/app/_shadcn/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/app/_shadcn/input-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/app/_shadcn/tooltip";
import { cn } from "@/lib/utils";

const PasswordInputContext = createContext<{ password: string } | null>(null);

export function PasswordInput({
  children,
  onChange,
  value,
  defaultValue,
  ...props
}: Omit<ComponentProps<typeof Input>, "type"> & {
  children?: ReactNode;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(defaultValue ?? "");

  const Icon = showPassword ? EyeOffIcon : EyeIcon;
  const currentValue = value ?? password;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    onChange?.(e);
  };

  return (
    <PasswordInputContext value={{ password: currentValue.toString() }}>
      <div className="space-y-3">
        <InputGroup>
          <InputGroupInput
            {...props}
            defaultValue={defaultValue}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            value={value}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              onClick={() => setShowPassword((p) => !p)}
              size="icon-xs"
            >
              <Icon className="size-4.5" />
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        {children}
      </div>
    </PasswordInputContext>
  );
}

export function PasswordInputGenerateAndStrength({
  onGenerate,
}: {
  onGenerate: (value: string) => void;
}) {
  const [optionsLoaded, setOptionsLoaded] = useState(false);
  const [errorLoadingOptions, setErrorLoadingOptions] = useState(false);
  const [action, setAction] = useState<string | null>(null);

  const { password } = usePasswordInput();
  const deferredPassword = useDeferredValue(password);
  const strengthResult = useMemo(() => {
    if (!optionsLoaded || deferredPassword.length === 0)
      return { score: 0, feedback: { warning: undefined } } as const;

    return zxcvbn(deferredPassword);
  }, [optionsLoaded, deferredPassword]);

  useEffect(() => {
    Promise.all([
      import("@zxcvbn-ts/language-common"),
      import("@zxcvbn-ts/language-en"),
    ])
      .then(([common, english]) => {
        zxcvbnOptions.setOptions({
          translations: english.translations,
          graphs: common.adjacencyGraphs,
          maxLength: 30,
          dictionary: {
            ...common.dictionary,
            ...english.dictionary,
          },
        });
        setOptionsLoaded(true);
      })
      .catch(() => setErrorLoadingOptions(true));
  }, []);

  function getLabel() {
    if (deferredPassword.length === 0) return "Password strength";
    if (!optionsLoaded) return "Loading strength checker";

    const score = strengthResult.score;
    switch (score) {
      case 0:
      case 1:
        return "Very weak";
      case 2:
        return "Weak";
      case 3:
        return "Strong";
      case 4:
        return "Very strong";
      default:
        throw new Error(`Invalid score: ${score satisfies never}`);
    }
  }

  if (errorLoadingOptions) return null;

  const warning = strengthResult.feedback.warning;

  const label = getLabel();

  const warningComponent = (
    <span
      className={cn(
        "inline-flex w-fit items-center justify-start gap-2 text-xs",
        warning ? "text-destructive" : "text-muted-foreground",
      )}
    >
      <span className="relative flex size-2">
        <span
          className={cn(
            "absolute inline-flex h-full w-full rounded-full opacity-75",
            warning ? "animate-ping bg-destructive" : "bg-muted-foreground",
          )}
        ></span>
        <span
          className={cn(
            "relative inline-flex size-2 rounded-full",
            warning ? "bg-destructive" : "bg-muted-foreground",
          )}
        ></span>
      </span>
      {label}
    </span>
  );

  return (
    <div className="space-y-0.5">
      <div
        aria-label="Password Strength"
        aria-valuemax={4}
        aria-valuemin={0}
        aria-valuenow={strengthResult.score}
        aria-valuetext={label}
        className="flex gap-1"
        role="progressbar"
      >
        {Array.from({ length: 4 }).map((_, i) => {
          const color =
            strengthResult.score >= 3 ? "bg-primary" : "bg-destructive";

          const barKey = `${color}-${i}`;

          return (
            <div
              className={cn(
                "h-1 flex-1 rounded-full",
                strengthResult.score > i ? color : "bg-secondary",
              )}
              key={barKey}
            />
          );
        })}
      </div>
      <div className="mt-2 flex h-6 items-center justify-between gap-2">
        <div className="flex items-center">
          <AppButton
            className="size-6 rounded p-1"
            onClick={(e) => {
              e.preventDefault();
              setAction("Generated!");

              const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
              const lowercase = "abcdefghijklmnopqrstuvwxyz";
              const numbers = "0123456789";
              const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
              const all = uppercase + lowercase + numbers + symbols;

              const generated = [
                uppercase[Math.floor(Math.random() * uppercase.length)],
                lowercase[Math.floor(Math.random() * lowercase.length)],
                numbers[Math.floor(Math.random() * numbers.length)],
                symbols[Math.floor(Math.random() * symbols.length)],
              ];

              for (let i = generated.length; i < 24; i++)
                generated.push(all[Math.floor(Math.random() * all.length)]);

              onGenerate(generated.sort(() => Math.random() - 0.5).join(""));

              setTimeout(() => setAction(null), 2000);
            }}
            size="icon-sm"
            variant="ghost"
          >
            <RotateCcwKey className="size-full" />
          </AppButton>
          <AppButton
            className="size-6 rounded p-1"
            disabled={!password || password.length === 0}
            onClick={(e) => {
              e.preventDefault();
              setAction("Copied!");

              navigator.clipboard.writeText(password);

              setTimeout(() => setAction(null), 2000);
            }}
            size="icon-sm"
            variant="ghost"
          >
            <Copy className="size-full" />
          </AppButton>
          <AppButton
            className="size-6 rounded p-1"
            disabled={!password || password.length === 0}
            onClick={(e) => {
              e.preventDefault();
              setAction("Cleared!");

              onGenerate("");

              setTimeout(() => setAction(null), 2000);
            }}
            size="icon-sm"
            variant="ghost"
          >
            <X className="size-full" />
          </AppButton>
          {action && (
            <span className="ml-1 text-xs transition-all duration-200">
              {action}
            </span>
          )}
        </div>
        <div>
          {warning ? (
            <Tooltip>
              <TooltipTrigger
                className="flex justify-start"
                onClick={(e) => e.preventDefault()}
              >
                {warningComponent}
              </TooltipTrigger>
              <TooltipContent className="text-xs" sideOffset={-8}>
                {strengthResult.feedback.warning}
              </TooltipContent>
            </Tooltip>
          ) : (
            warningComponent
          )}
        </div>
      </div>
    </div>
  );
}

const usePasswordInput = () => {
  const context = useContext(PasswordInputContext);

  if (context == null)
    throw new Error(
      "usePasswordInput must be used within a PasswordInputContext",
    );

  return context;
};
