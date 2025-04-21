import React, { ReactNode } from "react";
import {
  FormProvider as RHFFormProvider,
  UseFormReturn,
} from "react-hook-form";

interface FormProviderProps {
  children: ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  methods: UseFormReturn<any>;
}

export default function FormProvider({
  children,
  onSubmit,
  methods,
}: FormProviderProps) {
  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={onSubmit} noValidate>
        {children}
      </form>
    </RHFFormProvider>
  );
}
