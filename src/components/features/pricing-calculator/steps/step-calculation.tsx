import NumberFlow from "@number-flow/react";
import { AlertCircleIcon, Paperclip, Users } from "lucide-react";
import React from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { type CalculationOptions, calculatePrice } from "@/lib/pricing-engine";
import { $calculationOptions } from "@/stores/pricing.store";

export function PricingCalculatorFormStepCalculation() {
  const [total, setTotal] = React.useState(0);
  const options = $calculationOptions.get();

  const { manualQuote, accountingPrice, hrPrice, message, totalNet } =
    // biome-ignore lint/style/noNonNullAssertion: Options are guaranteed to be set at this step
    calculatePrice(options! as CalculationOptions);

  React.useEffect(() => {
    const t = setTimeout(() => {
      setTotal(totalNet ?? 0);
    }, 250);
    return () => {
      clearTimeout(t);
    };
  }, [totalNet]);
  if (manualQuote) {
    return (
      <Item>
        <ItemMedia>
          <AlertCircleIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Prosimy o kontakt</ItemTitle>
          <ItemDescription>{message}</ItemDescription>
        </ItemContent>
      </Item>
    );
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="bg-foreground text-center text-background rounded-lg space-y-2 p-4">
        <p className="uppercase opacity-60 text-sm font-medium">Cena finalna</p>
        <NumberFlow
          locales={["pl-PL"]}
          className="text-4xl font-bold"
          trend={1}
          transformTiming={{ duration: 750 }}
          value={total}
          format={{ style: "currency", currency: "PLN" }}
        />
      </div>
      <Item variant={"muted"}>
        <ItemMedia>
          <Paperclip />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Księgowość</ItemTitle>
          <ItemDescription>
            {new Intl.NumberFormat("pl-PL", {
              currency: "PLN",
              style: "currency",
              compactDisplay: "short",
            }).format(accountingPrice ?? 0)}
          </ItemDescription>
        </ItemContent>
      </Item>
      {(hrPrice ?? 0) > 0 && (
        <Item variant={"muted"}>
          <ItemMedia>
            <Users />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Kadry</ItemTitle>
            <ItemDescription>
              {new Intl.NumberFormat("pl-PL", {
                style: "currency",
                currency: "PLN",
                compactDisplay: "short",
              }).format(hrPrice ?? 0)}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}
    </div>
  );
}
