import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

// Form inputs with a label and an error message.
// The label is connected with htmlFor/id, and the error with aria-describedby,
// so screen readers announce both.

const controlClasses =
  "w-full rounded-control border bg-white px-3 py-2.5 text-base text-ink placeholder:text-ink-soft/70 sm:text-sm";

function borderFor(error?: string) {
  return error ? "border-danger" : "border-line hover:border-ink-soft";
}

interface FieldWrapperProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

function FieldWrapper({ id, label, error, hint, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  hint?: string;
}

export function TextField({ id, label, error, hint, className = "", ...props }: TextFieldProps) {
  return (
    <FieldWrapper id={id} label={label} error={error} hint={hint}>
      <input
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${controlClasses} ${borderFor(error)} ${className}`}
        {...props}
      />
    </FieldWrapper>
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
}

export function TextAreaField({ id, label, error, className = "", ...props }: TextAreaFieldProps) {
  return (
    <FieldWrapper id={id} label={label} error={error}>
      <textarea
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error)}
        className={`${controlClasses} ${borderFor(error)} min-h-28 ${className}`}
        {...props}
      />
    </FieldWrapper>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

export function SelectField({ id, label, error, className = "", children, ...props }: SelectFieldProps) {
  return (
    <FieldWrapper id={id} label={label} error={error}>
      <select
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error)}
        className={`${controlClasses} ${borderFor(error)} ${className}`}
        {...props}
      >
        {children}
      </select>
    </FieldWrapper>
  );
}
