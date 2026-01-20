import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@nanostores/react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Form, FormField, useFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { $calculationOptions } from "@/stores/pricing.store";

// === Schema ===
const hrFormSchema = z
  .object({
    enabled: z.boolean().default(false),
    totalEmployees: z.coerce
      .number({
        error: "Podaj liczbę",
      })
      .int("Liczba musi być całkowita")
      .min(0, "Liczba nie może być ujemna")
      .default(0),
    hasPFRON: z.boolean().default(false),
    employeesPefron: z.coerce
      .number({
        error: "Podaj liczbę",
      })
      .int("Liczba musi być całkowita")
      .min(0, "Liczba nie może być ujemna")
      .default(0),
    contractors: z.coerce
      .number({
        error: "Podaj liczbę",
      })
      .int("Liczba musi być całkowita")
      .min(0, "Liczba nie może być ujemna")
      .default(0),
    partnersCount: z.coerce
      .number({
        error: "Podaj liczbę",
      })
      .int("Liczba musi być całkowita")
      .min(0, "Liczba nie może być ujemna")
      .default(0),
  })
  .refine(
    (data) => !data.enabled || data.employeesPefron <= data.totalEmployees,
    {
      path: ["employeesPefron"],
      message:
        "Liczba pracowników PFRON nie może przekroczyć całkowitej liczby",
    },
  )
  .refine((data) => !data.hasPFRON || data.totalEmployees > 0, {
    path: ["totalEmployees"],
    message: "Włącz PFRON tylko gdy są pracownicy",
  });

type HRFormData = z.infer<typeof hrFormSchema>;
type HRFormProps = {
  defaultValues?: Partial<HRFormData>;
  onSubmit?: (data: HRFormData) => void;
};

// === Sub-components ===

const HRHeader = () => {
  const { control } = useFormContext<HRFormData>();
  const currentOptions = useStore($calculationOptions);

  return (
    <FormField
      control={control}
      name="enabled"
      render={({ field }) => (
        <FieldLabel>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>
                Czy chcesz skorzystać z obsługi kadrowo płacowej?
              </FieldTitle>
            </FieldContent>
            <Switch
              checked={field.value}
              onCheckedChange={(enabled) => {
                field.onChange(enabled);
                // Reset all values when disabled
                if (!enabled) {
                  $calculationOptions.setKey("employeesNoPefron", 0);
                  $calculationOptions.setKey("employeesPefron", 0);
                  $calculationOptions.setKey("contractors", 0);
                  $calculationOptions.setKey("partnersCount", 0);
                }
              }}
            />
          </Field>
        </FieldLabel>
      )}
    />
  );
};

const EmployeeCountField = () => {
  const { control, watch } = useFormContext<HRFormData>();

  return (
    <FormField
      control={control}
      name="totalEmployees"
      render={({ field }) => (
        <Field orientation="horizontal">
          <FieldLabel>Podaj liczbę pracowników do rozliczenia</FieldLabel>
          <Input
            inputMode="numeric"
            type="number"
            value={field.value}
            min={0}
            onChange={(e) => {
              const newTotal = Number(e.target.value) || 0;
              field.onChange(newTotal);
            }}
          />
        </Field>
      )}
    />
  );
};

const PFRONSection = () => {
  const { control, watch, setValue } = useFormContext<HRFormData>();
  const totalEmployees = watch("totalEmployees");

  return (
    <>
      <FormField
        control={control}
        name="hasPFRON"
        render={({ field }) => (
          <FieldLabel>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>
                  Czy na zatrudnionych pracowników pracodawca otrzymuje
                  dofinansowanie z PFRON?
                </FieldTitle>
              </FieldContent>
              <Switch
                checked={field.value}
                onCheckedChange={(has) => {
                  field.onChange(has);
                  // Default: 1 employee with PFRON when enabled
                  if (has && totalEmployees > 0) {
                    setValue("employeesPefron", Math.min(1, totalEmployees));
                  } else {
                    setValue("employeesPefron", 0);
                  }
                }}
                disabled={totalEmployees === 0}
              />
            </Field>
          </FieldLabel>
        )}
      />

      <div className="-mt-8">
        <FormField
          control={control}
          name="employeesPefron"
          render={({ field }) => {
            const hasPFRON = watch("hasPFRON");

            return (
              <AnimatePresence>
                {hasPFRON && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-clip"
                  >
                    <Field className="py-4">
                      <FieldLabel>
                        Podaj liczbę pracowników objętych PFRON
                      </FieldLabel>
                      <Input
                        inputMode="numeric"
                        type="number"
                        value={field.value}
                        min={0}
                        max={totalEmployees}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value) || 0);
                        }}
                      />
                    </Field>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          }}
        />
      </div>
    </>
  );
};

const AdditionalWorkers = () => {
  const { control } = useFormContext<HRFormData>();

  return (
    <>
      <FormField
        control={control}
        name="contractors"
        render={({ field }) => (
          <Field orientation="horizontal">
            <FieldLabel>Podaj liczbę zleceniobiorców</FieldLabel>
            <Input
              inputMode="numeric"
              type="number"
              min={0}
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value) || 0)}
            />
          </Field>
        )}
      />

      <FormField
        control={control}
        name="partnersCount"
        render={({ field }) => (
          <Field orientation="horizontal">
            <FieldLabel>
              Podaj liczbę członków zarządu z prawem do wynagrodzenia
            </FieldLabel>
            <Input
              inputMode="numeric"
              type="number"
              min={0}
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value) || 0)}
            />
          </Field>
        )}
      />
    </>
  );
};

// === Main Component ===

export const PricingCalculatorFormStepWithHR = React.forwardRef<
  HTMLFormElement,
  Omit<React.ComponentProps<"form">, "onSubmit">
>((props, ref) => {
  const currentOptions = useStore($calculationOptions);

  // Initialize form with current store values
  const form = useForm<HRFormData>({
    resolver: zodResolver(hrFormSchema),
    defaultValues: {
      enabled:
        !!(currentOptions.employeesNoPefron ?? 0) ||
        !!(currentOptions.employeesPefron ?? 0) ||
        !!(currentOptions.contractors ?? 0),
      totalEmployees:
        (currentOptions.employeesNoPefron ?? 0) +
        (currentOptions.employeesPefron ?? 0),
      hasPFRON: !!(currentOptions.employeesPefron ?? 0),
      employeesPefron: currentOptions.employeesPefron ?? 0,
      contractors: currentOptions.contractors ?? 0,
      partnersCount: currentOptions.partnersCount ?? 0,
    },
    mode: "onTouched",
  });

  // Watch form values to update store
  const watchedValues = form.watch();

  React.useEffect(() => {
    if (!watchedValues.enabled) return;

    const employeesNoPefron =
      watchedValues.totalEmployees - watchedValues.employeesPefron;

    $calculationOptions.setKey("employeesNoPefron", employeesNoPefron);
    $calculationOptions.setKey(
      "employeesPefron",
      watchedValues.employeesPefron,
    );
    $calculationOptions.setKey("contractors", watchedValues.contractors);
    $calculationOptions.setKey("partnersCount", watchedValues.partnersCount);
  }, [
    watchedValues.enabled,
    watchedValues.totalEmployees,
    watchedValues.employeesPefron,
    watchedValues.contractors,
    watchedValues.partnersCount,
  ]);

  const onSubmit = (data: HRFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props} ref={ref}>
        <HRHeader />

        <AnimatePresence>
          {watchedValues.enabled && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className={cn("overflow-y-clip")}
            >
              <FieldGroup className="pt-4">
                <EmployeeCountField />
                <PFRONSection />
                <AdditionalWorkers />
              </FieldGroup>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </Form>
  );
});
