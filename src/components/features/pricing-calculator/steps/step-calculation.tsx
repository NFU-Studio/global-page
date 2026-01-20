import NumberFlow from "@number-flow/react";
import {
  AlertCircleIcon,
  Building,
  CheckCircle2,
  FileText,
  Paperclip,
  TrendingUp,
  Users,
} from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { PRICING_DATA } from "@/data/pricing-data";
import { type CalculationOptions, calculatePrice } from "@/lib/pricing-engine";
import { $calculationOptions } from "@/stores/pricing.store";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("pl-PL", {
    currency: "PLN",
    style: "currency",
  }).format(value);

const formatPercent = (value: number) => `${Math.round(value * 100)}%`;

export function PricingCalculatorFormStepCalculation() {
  const [total, setTotal] = React.useState(0);
  const options = $calculationOptions.get();

  const result = calculatePrice(options! as CalculationOptions);

  React.useEffect(() => {
    const t = setTimeout(() => {
      setTotal(result.totalNet ?? 0);
    }, 250);
    return () => {
      clearTimeout(t);
    };
  }, [result.totalNet]);

  if (result.manualQuote) {
    return (
      <Item>
        <ItemMedia variant="icon">
          <AlertCircleIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Prosimy o kontakt</ItemTitle>
          <ItemDescription>{result.message}</ItemDescription>
        </ItemContent>
      </Item>
    );
  }

  // Calculate breakdown for display
  const optionsTyped = options! as CalculationOptions;

  // Determine base table and range
  let baseTable: typeof PRICING_DATA.KH_BASE_RATES;
  if (optionsTyped.type === "KH") {
    baseTable =
      optionsTyped.legalForm === "Fundacja rodzinna"
        ? PRICING_DATA.KH_FAMILY_FOUNDATION_RATES
        : PRICING_DATA.KH_BASE_RATES;
  } else {
    baseTable = PRICING_DATA.KPIR_BASE_RATES;
  }

  const range = baseTable.find(
    (r) =>
      optionsTyped.documentCount >= r.min &&
      (r.max === "infinity" || optionsTyped.documentCount <= r.max),
  );

  // Industry modifier
  const industry = PRICING_DATA.INDUSTRIES.find(
    (i) => i.id === optionsTyped.industryId,
  );
  const industryModifier =
    optionsTyped.type === "KH" && industry ? industry.modifier : 0;

  // Partners modifier
  let partnersModifier = 0;
  if (
    optionsTyped.type === "KPIR" &&
    (optionsTyped.legalForm.includes("Cywilna") ||
      optionsTyped.legalForm.includes("Jawna"))
  ) {
    const partners = optionsTyped.partnersCount || 1;
    if (partners >= 2) partnersModifier = (partners - 1) * 0.1 + 0.1;
  }

  // Selected addons
  const selectedAddons = PRICING_DATA.ADDONS.filter((a) =>
    optionsTyped.activeAddonIds.includes(a.id),
  );
  const addonsModifier = selectedAddons.reduce((sum, a) => sum + a.modifier, 0);

  // Total percentage
  const totalPercentageModifier =
    industryModifier + partnersModifier + Math.min(addonsModifier, 0.4);

  // HR breakdown
  const hrBreakdown = {
    employeeNoPefron: {
      count: optionsTyped.employeesNoPefron,
      rate: PRICING_DATA.HR_RATES.employee_no_pefron,
      label: "Pracownicy (bez PFRON)",
    },
    employeePefron: {
      count: optionsTyped.employeesPefron,
      rate: PRICING_DATA.HR_RATES.employee_pefron,
      label: "Pracownicy (z PFRON)",
    },
    contractor: {
      count: optionsTyped.contractors,
      rate: PRICING_DATA.HR_RATES.contractor,
      label: "Zleceniobiorcy",
    },
  };

  return (
    <div className="flex flex-col gap-6">
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

      {/* Accounting Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="size-5" />
            Księgowość
          </CardTitle>
          <CardDescription>
            {optionsTyped.type === "KH" ? "Księga handlowa" : "KPiR"} •{" "}
            {optionsTyped.legalForm}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ItemGroup>
            {/* Base Price */}
            <Item variant="muted" size="sm">
              <ItemContent>
                <ItemHeader>
                  <ItemTitle>Cena bazowa</ItemTitle>
                  <ItemTitle className="font-semibold">
                    {formatPrice(result.basePrice!)}
                  </ItemTitle>
                </ItemHeader>
                <ItemDescription>
                  {range?.min}–{range?.max === "infinity" ? "∞" : range?.max}{" "}
                  dokumentów/miesiąc
                </ItemDescription>
              </ItemContent>
            </Item>

            {/* Industry Modifier */}
            {industryModifier > 0 && (
              <>
                <ItemSeparator />
                <Item variant="muted" size="sm">
                  <ItemMedia variant="icon">
                    <Building className="size-4" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemHeader>
                      <ItemTitle>Branża</ItemTitle>
                      <ItemTitle className="text-orange-600 dark:text-orange-400 font-semibold">
                        +{formatPercent(industryModifier)}
                      </ItemTitle>
                    </ItemHeader>
                    <ItemDescription>{industry?.name}</ItemDescription>
                  </ItemContent>
                </Item>
              </>
            )}

            {/* Partners Modifier */}
            {partnersModifier > 0 && (
              <>
                <ItemSeparator />
                <Item variant="muted" size="sm">
                  <ItemMedia variant="icon">
                    <Users className="size-4" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemHeader>
                      <ItemTitle>Wspólnicy</ItemTitle>
                      <ItemTitle className="text-orange-600 dark:text-orange-400 font-semibold">
                        +{formatPercent(partnersModifier)}
                      </ItemTitle>
                    </ItemHeader>
                    <ItemDescription>
                      {optionsTyped.partnersCount} wspólników
                    </ItemDescription>
                  </ItemContent>
                </Item>
              </>
            )}

            {/* Addons */}
            {selectedAddons.length > 0 && (
              <>
                <ItemSeparator />
                <Item variant="muted" size="sm">
                  <ItemMedia variant="icon">
                    <CheckCircle2 className="size-4" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemHeader>
                      <ItemTitle>Szczególne procedury</ItemTitle>
                      <ItemTitle className="text-orange-600 dark:text-orange-400 font-semibold">
                        +{formatPercent(Math.min(addonsModifier, 0.4))}
                      </ItemTitle>
                    </ItemHeader>
                    <ItemDescription className="flex flex-wrap gap-1 mt-1">
                      {selectedAddons.map((addon) => (
                        <span
                          key={addon.id}
                          className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted text-xs"
                        >
                          {addon.name} (+{formatPercent(addon.modifier)})
                        </span>
                      ))}
                    </ItemDescription>
                  </ItemContent>
                </Item>
              </>
            )}

            {/* Total Accounting */}
            <ItemSeparator />
            <Item size="sm">
              <ItemMedia variant="icon">
                <TrendingUp className="size-4 text-green-600 dark:text-green-400" />
              </ItemMedia>
              <ItemContent>
                <ItemHeader>
                  <ItemTitle className="font-semibold">
                    Razem księgowość
                  </ItemTitle>
                  <ItemTitle className="text-green-600 dark:text-green-400 font-bold">
                    {formatPrice(result.accountingPrice!)}
                  </ItemTitle>
                </ItemHeader>
                {totalPercentageModifier > 0 && (
                  <ItemDescription>
                    Suma modyfikatorów: +
                    {formatPercent(totalPercentageModifier)}
                  </ItemDescription>
                )}
              </ItemContent>
            </Item>
          </ItemGroup>
        </CardContent>
      </Card>

      {/* HR Details */}
      {(result.hrPrice ?? 0) > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="size-5" />
              Kadry i Płace
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ItemGroup>
              {Object.entries(hrBreakdown).map(([key, data]) =>
                data.count > 0 ? (
                  <React.Fragment key={key}>
                    {key !== "employeeNoPefron" && <ItemSeparator />}
                    <Item variant="muted" size="sm">
                      <ItemContent>
                        <ItemHeader>
                          <ItemTitle>{data.label}</ItemTitle>
                          <ItemTitle className="font-semibold">
                            {formatPrice(data.count * data.rate)}
                          </ItemTitle>
                        </ItemHeader>
                        <ItemDescription>
                          {data.count} × {formatPrice(data.rate)} =
                          {" " + formatPrice(data.count * data.rate)}
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                  </React.Fragment>
                ) : null,
              )}
              <ItemSeparator />
              <Item size="sm">
                <ItemMedia variant="icon">
                  <TrendingUp className="size-4 text-green-600 dark:text-green-400" />
                </ItemMedia>
                <ItemContent>
                  <ItemHeader>
                    <ItemTitle className="font-semibold">Razem kadry</ItemTitle>
                    <ItemTitle className="text-green-600 dark:text-green-400 font-bold">
                      {formatPrice(result.hrPrice!)}
                    </ItemTitle>
                  </ItemHeader>
                </ItemContent>
              </Item>
            </ItemGroup>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
