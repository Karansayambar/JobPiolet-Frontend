import React, { ReactNode } from "react";
import {
  FieldValues,
  FormProvider as RHFFormProvider,
  UseFormReturn,
} from "react-hook-form";

interface FormProviderProps<T extends FieldValues = FieldValues> {
  children: ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  methods: UseFormReturn<T>;
}

export default function FormProvider<T extends FieldValues>({
  children,
  onSubmit,
  methods,
}: FormProviderProps<T>) {
  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={onSubmit} noValidate>
        {children}
      </form>
    </RHFFormProvider>
  );
}
