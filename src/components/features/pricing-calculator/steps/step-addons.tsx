import { useStore } from "@nanostores/react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { PRICING_DATA } from "@/data/pricing-data";
import { $calculationOptions } from "@/stores/pricing.store";

export function PricingCalculatorFormStepAddons() {
  const { activeAddonIds } = useStore($calculationOptions);

  return (
    <FieldSet>
      <FieldGroup>
        {PRICING_DATA.ADDONS.map(({ id, name, description }) => (
          <FieldLabel key={`pcfs-addon-${id}`}>
            <Field orientation={"horizontal"}>
              <FieldContent>
                <FieldTitle>{name}</FieldTitle>
                <FieldDescription>{description}</FieldDescription>
              </FieldContent>
              <Switch
                name={id}
                id={id}
                checked={activeAddonIds?.includes(id)}
                onCheckedChange={(v) => {
                  const newIds = v
                    ? Array.from(new Set([...(activeAddonIds ?? []), id]))
                    : (activeAddonIds ?? []).filter((idx) => idx !== id);
                  $calculationOptions.setKey("activeAddonIds", newIds);
                }}
              />
            </Field>
          </FieldLabel>
        ))}
      </FieldGroup>
    </FieldSet>
  );
}
