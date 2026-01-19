import { useStore } from "@nanostores/react";
import React from "react";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PRICING_DATA } from "@/data/pricing-data";
import { $calculationOptions } from "@/stores/pricing.store";

export const PricingCalculatorFormStepIndustry = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>((_props, _ref) => {
  const { industryId } = useStore($calculationOptions);
  return (
    <RadioGroup
      value={industryId ?? ""}
      onValueChange={(v) => $calculationOptions.setKey("industryId", v)}
    >
      {PRICING_DATA.INDUSTRIES.map(({ id, name }) => (
        <FieldLabel key={`industry-step-${id}`} htmlFor={`industry-${id}`}>
          <Field orientation={"horizontal"}>
            <FieldContent>
              <FieldTitle>{name}</FieldTitle>
            </FieldContent>
            <RadioGroupItem value={id} id={`industry-${id}`} />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  );
});
