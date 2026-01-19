import { useStore } from "@nanostores/react";
import React from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { $calculationOptions } from "@/stores/pricing.store";
import { pricingTypes } from "../config";

export const PricingCalculatorFormStepType = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>((_props, _ref) => {
  const id = React.useId();
  const { type } = useStore($calculationOptions);
  return (
    <RadioGroup
      value={type ?? ""}
      onValueChange={(v) => $calculationOptions.setKey("type", v as "KH")}
    >
      {pricingTypes.map(({ value, label }) => (
        <FieldLabel key={`type-step-r-i-${value}`} htmlFor={`${value}-${id}`}>
          <Field orientation={"horizontal"}>
            <FieldContent>
              <FieldTitle>{value}</FieldTitle>
              <FieldDescription>{label}</FieldDescription>
            </FieldContent>
            <RadioGroupItem value={value} id={`${value}-${id}`} />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  );
});
