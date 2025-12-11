"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { ReactNode } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import RequiredMark from "./required-mark";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

type FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  name: TName;
  label: ReactNode;
  description?: ReactNode;
  /**
   * Indica si la descripción se muestra después del campo de entrada (Input, Select, etc.)
   */
  isDescriptionAfter?: boolean;

  /** Indica si el campo es obligatorio, para mostrar la marca de requerido */
  isRequired?: boolean;
  control: ControllerProps<TFieldValues, TName, TTransformedValues>["control"];
};

type FormBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormControlProps<TFieldValues, TName, TTransformedValues> & {
  horizontal?: boolean;
  controlFirst?: boolean;
  children: (
    field: Parameters<
      ControllerProps<TFieldValues, TName, TTransformedValues>["render"]
    >[0]["field"] & {
      "aria-invalid": boolean;
      id: string;
    },
  ) => ReactNode;
};

type FormControlFunc<
  ExtraProps extends Record<string, unknown> = Record<never, never>,
> = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(
  props: FormControlProps<TFieldValues, TName, TTransformedValues> & ExtraProps,
) => ReactNode;

export function FormBase<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  children,
  control,
  label,
  name,
  description,
  isDescriptionAfter,
  controlFirst,
  horizontal,
  isRequired,
}: FormBaseProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const labelElement = (
          <>
            <FieldLabel htmlFor={field.name}>
              {label}
              {isRequired && <RequiredMark />}
            </FieldLabel>
            {!isDescriptionAfter && description && (
              <FieldDescription>{description}</FieldDescription>
            )}
          </>
        );
        const control = children({
          ...field,
          id: field.name,
          "aria-invalid": fieldState.invalid,
        });
        const errorElem = fieldState.invalid && (
          <FieldError errors={[fieldState.error]} />
        );

        const descriptionElement =
          isDescriptionAfter && description ? (
            <FieldDescription>{description}</FieldDescription>
          ) : null;

        return (
          <Field
            data-invalid={fieldState.invalid}
            orientation={horizontal ? "horizontal" : undefined}
          >
            {controlFirst ? (
              <>
                {control}
                {descriptionElement}
                <FieldContent>
                  {labelElement}
                  {errorElem}
                </FieldContent>
              </>
            ) : (
              <>
                {labelElement}
                {control}
                {descriptionElement}
                {errorElem}
              </>
            )}
          </Field>
        );
      }}
    />
  );
}

export const FormInput: FormControlFunc<
  React.ComponentPropsWithoutRef<typeof Input>
> = ({ placeholder, type, disabled, ...props }) => {
  return (
    <FormBase {...props}>
      {(field) => (
        <Input
          {...field}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
        />
      )}
    </FormBase>
  );
};

export const FormTextarea: FormControlFunc<
  React.ComponentPropsWithoutRef<typeof Textarea>
> = ({ placeholder, rows, disabled, ...props }) => {
  return (
    <FormBase {...props}>
      {(field) => (
        <Textarea
          {...field}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
        />
      )}
    </FormBase>
  );
};

export const FormSelect: FormControlFunc<
  { children: ReactNode } & React.ComponentPropsWithoutRef<typeof SelectTrigger>
> = ({ children, disabled, ...props }) => {
  return (
    <FormBase {...props}>
      {({ onChange, onBlur, ...field }) => (
        <Select {...field} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger
            aria-invalid={field["aria-invalid"]}
            id={field.id}
            onBlur={onBlur}
            disabled={disabled}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>{children}</SelectContent>
        </Select>
      )}
    </FormBase>
  );
};

export const FormCheckbox: FormControlFunc<
  React.ComponentPropsWithoutRef<typeof Checkbox>
> = ({ disabled, ...props }) => {
  return (
    <FormBase {...props} horizontal controlFirst>
      {({ onChange, value, ...field }) => (
        <Checkbox
          {...field}
          checked={value}
          onCheckedChange={onChange}
          disabled={disabled}
        />
      )}
    </FormBase>
  );
};

export const FormSwitch: FormControlFunc<
  React.ComponentPropsWithoutRef<typeof Switch>
> = ({ disabled, ...props }) => {
  return (
    <FormBase {...props} horizontal controlFirst>
      {({ onChange, value, ...field }) => (
        <Switch
          {...field}
          checked={value}
          onCheckedChange={onChange}
          disabled={disabled}
        />
      )}
    </FormBase>
  );
};
