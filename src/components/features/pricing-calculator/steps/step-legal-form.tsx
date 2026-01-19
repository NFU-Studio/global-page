import { useStore } from "@nanostores/react";
import React from "react";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LEGAL_FORMS_KH } from "@/data/pricing-data";
import { $calculationOptions } from "@/stores/pricing.store";

export const PricingCalculatorFormStepLegalForm = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>((_props, _ref) => {
  const id = React.useId();
  const { legalForm } = useStore($calculationOptions);
  return (
    <RadioGroup
      value={legalForm ?? ""}
      onValueChange={(v) => $calculationOptions.setKey("legalForm", v)}
    >
      {LEGAL_FORMS_KH.map((l) => (
        <FieldLabel key={`type-step-r-i-${l}`} htmlFor={`${l}-${id}`}>
          <Field orientation={"horizontal"}>
            <FieldContent>
              <FieldTitle>{l}</FieldTitle>
              {/* <FieldDescription>{label}</FieldDescription> */}
            </FieldContent>
            <RadioGroupItem value={l} id={`${l}-${id}`} />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  );
});
