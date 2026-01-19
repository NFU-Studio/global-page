import { useStore } from "@nanostores/react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { z } from "zod";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { $calculationOptions } from "@/stores/pricing.store";

export const PricingCalculatorFormStepWithHR = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>((_props, _ref) => {
  const { employeesNoPefron, employeesPefron, partnersCount, contractors } =
    useStore($calculationOptions);
  const [wHR, setWHR] = React.useState(!!employeesNoPefron);
  const [wPFRON, setWPFRON] = React.useState(!!employeesPefron);
  const [employees, setEmployees] = React.useState(
    (employeesNoPefron ?? 0) + (employeesPefron ?? 0),
  );
  return (
    <>
      <FieldLabel>
        <Field orientation={"horizontal"}>
          <FieldContent>
            <FieldTitle>
              Czy chcesz skorzystać z obsługi kadrowo płacowej?
            </FieldTitle>
          </FieldContent>
          <Switch
            checked={wHR}
            onCheckedChange={(WHR) => {
              setWHR(WHR);
              const stateHRValue = WHR ? 0 : undefined;
              $calculationOptions.setKey("employeesNoPefron", stateHRValue);
              $calculationOptions.setKey("employeesPefron", stateHRValue);
              $calculationOptions.setKey("contractors", stateHRValue);
              $calculationOptions.setKey("partnersCount", stateHRValue);
            }}
          />
        </Field>
      </FieldLabel>
      <AnimatePresence>
        {wHR && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className={cn(wHR && "overflow-y-clip")}
          >
            <FieldGroup className="pt-4">
              <Field orientation={"horizontal"}>
                <FieldLabel>Podaj liczbę pracowników do rozliczenia</FieldLabel>
                <Input
                  inputMode="numeric"
                  pattern="/([1-9][0-9]*)|0/"
                  value={employees}
                  min={0}
                  onChange={(e) => {
                    setEmployees(+e.target.value);
                    $calculationOptions.setKey(
                      "employeesNoPefron",
                      +e.target.value - +(employeesPefron ?? 0),
                    );
                  }}
                />
              </Field>
              <FieldLabel>
                <Field orientation={"horizontal"}>
                  <FieldContent>
                    <FieldTitle>
                      Czy na zatrudnionych pracowników pracodawca otrzymuje
                      dofinansowanie z PFRON?
                    </FieldTitle>
                  </FieldContent>
                  <Switch checked={wPFRON} onCheckedChange={setWPFRON} />
                </Field>
              </FieldLabel>
              <div className="-mt-8">
                <AnimatePresence>
                  {wPFRON && (
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
                          pattern="/([1-9][0-9]*)|0/"
                          value={employeesPefron}
                          min={0}
                          max={employees}
                          onChange={(e) => {
                            $calculationOptions.setKey(
                              "employeesPefron",
                              +e.target.value,
                            );
                            $calculationOptions.setKey(
                              "employeesNoPefron",
                              +employeesNoPefron - +e.target.value,
                            );
                          }}
                        />
                      </Field>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Field orientation={"horizontal"}>
                <FieldLabel>Podaj liczbę zleceniobiorców</FieldLabel>
                <Input
                  value={contractors}
                  onChange={(e) =>
                    $calculationOptions.setKey("contractors", +e.target.value)
                  }
                />
              </Field>
              <Field orientation={"horizontal"}>
                <FieldLabel>
                  Podaj liczbę członków zarządu z prawem do wynagrodzenia
                </FieldLabel>
                <Input
                  inputMode="numeric"
                  value={partnersCount}
                  onChange={(e) => {
                    if (z.coerce.number().safeParse(e.target.value).success)
                      $calculationOptions.setKey(
                        "partnersCount",
                        +e.target.value,
                      );
                  }}
                />
              </Field>
            </FieldGroup>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
