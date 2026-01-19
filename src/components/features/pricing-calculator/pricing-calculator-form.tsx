import { useStore } from "@nanostores/react";
import NumberFlow from "@number-flow/react";
import {
  AlertCircleIcon,
  ChevronLeft,
  ChevronRight,
  Info,
  Paperclip,
  Users,
} from "lucide-react";
import { AnimatePresence, motion, usePresenceData } from "motion/react";
import { atom, type StoreValue } from "nanostores";
import React from "react";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { LEGAL_FORMS_KH, PRICING_DATA } from "@/data/pricing-data";
import { type CalculationOptions, calculatePrice } from "@/lib/pricing-engine";
import { cn } from "@/lib/utils";
import { $calculationOptions } from "@/stores/pricing.store";

const StepWrapper = React.forwardRef(function StepWrapper(
  { children, className }: React.ComponentProps<typeof motion.div>,
  ref,
) {
  const direction = usePresenceData();
  return (
    <motion.div
      ref={ref}
      layout
      className={cn("relative", className)}
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.1,
          type: "spring",
          visualDuration: 0.3,
          bounce: 0,
        },
      }}
      exit={{ opacity: 0, x: direction * -50 }}
    >
      {children}
    </motion.div>
  );
});
const pricingTypes = [
  {
    value: "KH",
    label: "Księga handlowa",
  },
  {
    value: "KPIR",
    label: "Księga przychodów i rozchodów",
  },
];
const PricingCalculatorFormStepType = React.forwardRef(
  function Step0(props, ref) {
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
  },
);

const PricingCalculatorFormStepLegalForm = React.forwardRef(
  function Step1(props, ref) {
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
  },
);

const PricingCalculatorFormStepIndustry = React.forwardRef((props, ref) => {
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

const PricingCalculatorFormStepWithHR = React.forwardRef((props, ref) => {
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

function PricingCalculatorFormStepAddons() {
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

const DocumentDefinition = () => {
  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col overflow-hidden font-sans">
      {/* Header - Compact */}
      <div className="bg-slate-50 flex gap-3 px-4 py-3 border-b border-gray-100">
        <Info />
        <h2 className="text-base font-bold text-slate-800 tracking-tight">
          Definicja Dokumentu
        </h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          <section>
            <h3 className="text-[11px] font-bold text-blue-600 uppercase mb-1.5 tracking-wider">
              Handlowe
            </h3>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>• Faktury (ZAK/SPR)</li>
              <li>• Noty księgowe</li>
              <li>• Polisy i kompensaty</li>
              <li>• Dok. magazynowe</li>
            </ul>
          </section>

          <section>
            <h3 className="text-[11px] font-bold text-blue-600 uppercase mb-1.5 tracking-wider">
              PK / Płace
            </h3>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>• Listy płac / Umowy</li>
              <li>• Deklaracje ZUS</li>
              <li>• Amortyzacja i RMK</li>
              <li>• Dowody wewnętrzne</li>
            </ul>
          </section>

          <section className="col-span-2 bg-gray-50 p-3 rounded-md border border-gray-100">
            <h3 className="text-[11px] font-bold text-gray-600 uppercase mb-2">
              Wyciągi i Raporty
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600 font-medium">
                  Bank / Kasa (operacje)
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold italic">
                  co 10 = 1 dok.
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600 font-medium">
                  Wyciąg rachunku VAT
                </span>
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold italic">
                  zawsze 1 dok.
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-4 text-[10px] leading-relaxed text-gray-400 italic border-t pt-2">
          Pozostałe polecenia księgowania, w tym różnice kursowe, traktowane są
          jako odrębne pozycje rozliczeniowe.
        </div>
      </div>
    </div>
  );
};

function PricingCalculatorFormStepDocsNumber() {
  const { documentCount } = useStore($calculationOptions);
  return (
    <div className="gap-8 grid place-items-center">
      <Field>
        <FieldTitle>
          Podaj przebliżoną miesięczną liczbę dokumentów:{" "}
          <Badge size="lg" className="tabular-nums">
            {(documentCount ?? 0) < 101 ? documentCount : "100+"}
          </Badge>
        </FieldTitle>
        <Slider
          value={[documentCount ?? 0]}
          onValueChange={([value]) =>
            $calculationOptions.setKey("documentCount", value)
          }
          min={0}
          step={10}
          max={110}
          className="mt-2 w-full"
        />
        <AnimatePresence>
          {(documentCount ?? 0) > 100 && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
            >
              <FieldError>
                Przy ponad 100 dokumentach usługi wyceniamy indywidualnie
              </FieldError>
            </motion.div>
          )}
        </AnimatePresence>
      </Field>
      <DocumentDefinition />
    </div>
  );
}

function PricingCalculatorFormCalculation() {
  const [total, setTotal] = React.useState(0);
  const {
    manualQuote,
    accountingPrice,
    basePrice,
    hrPrice,
    message,
    totalNet,
  } = calculatePrice($calculationOptions.get()!);
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

const stepsConfig: {
  component: React.FunctionComponent;
  title: string;
  key?: keyof CalculationOptions;
}[] = [
  {
    component: PricingCalculatorFormStepType,
    title: "Wybierz rodzaj",
    key: "type",
  },
  {
    component: PricingCalculatorFormStepLegalForm,
    title: "Wybierz formę prawną",
    key: "legalForm",
  },
  {
    component: PricingCalculatorFormStepIndustry,
    title: "Wybierz branżę",
    key: "industryId",
  },
  {
    component: PricingCalculatorFormStepDocsNumber,
    title: "Liczba dokumentów",
    key: "documentCount",
  },
  {
    component: PricingCalculatorFormStepAddons,
    title: "Szczególne procedury",
    key: "activeAddonIds",
  },
  {
    component: PricingCalculatorFormStepWithHR,
    title: "Kadry",
  },
  {
    component: PricingCalculatorFormCalculation,
    title: "Wycena",
  },
];

const $stepStore = atom<0 | 1 | 2 | 3 | 4 | 5>(0);
const setStep = (value: StoreValue<typeof $stepStore>) => $stepStore.set(value);
const notForwardableKeys: (keyof CalculationOptions)[] = [
  "documentCount",
  "activeAddonIds",
  "employeesNoPefron",
  "employeesPefron",
  "contractors",
  "partnersCount",
];
$calculationOptions.listen((value, old, key) => {
  console.log(value, old, key);
  const currentStep = $stepStore.get();
  if (currentStep >= stepsConfig.length - 1) return;
  if (notForwardableKeys.includes(key)) return;
  if (!old[key] && value[key]) $stepStore.set((currentStep + 1) as 1); // validated
});

export const PricingCalculatorForm = () => {
  const step = useStore($stepStore);
  const [direction, setDirection] = React.useState<-1 | 1>(1);
  const calculationOptions = useStore($calculationOptions);
  const setSlide = (direction: -1 | 1) => {
    const newStepIdx = step + direction;
    if (newStepIdx < 0 || newStepIdx > stepsConfig.length) return;
    setDirection(direction);
    setStep((step + direction) as 1); // check is perfromed at the top
  };
  const { component: CurrentStep, title, key } = stepsConfig[step];
  return (
    <Card
      className="mx-auto max-w-xl relative overflow-hidden"
      data-lenis-prevent
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="relative h-120 overflow-x-clip [scrollbar-gutter:stable] overflow-y-auto">
        <motion.div layout>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <StepWrapper key={`step-${step}`}>
              <CurrentStep key={`step-${step}`} />
            </StepWrapper>
          </AnimatePresence>
        </motion.div>
      </CardContent>
      <CardFooter className="gap-2 items-center justify-center">
        <Button
          disabled={step === 0}
          onClick={() => setSlide(-1)}
          variant={"secondary"}
          className={cn(step === 0 && "invisible")}
        >
          <ChevronLeft />
          Poprzedni krok
        </Button>
        <Button
          className={cn(step === stepsConfig.length - 1 && "invisible")}
          disabled={
            step === stepsConfig.length - 1 || (key && !calculationOptions[key])
          }
          onClick={() => setSlide(1)}
        >
          Następny krok
          <ChevronRight />
        </Button>
      </CardFooter>
    </Card>
  );
};
