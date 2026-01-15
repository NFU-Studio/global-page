import {
  Archive,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  Info,
  Repeat,
} from "lucide-react";
import { AnimatePresence, motion, usePresenceData } from "motion/react";
import React, { Activity } from "react";
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
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { LEGAL_FORMS_KH, PRICING_DATA } from "@/data/pricing-data";
import { calculatePrice } from "@/lib/pricing-engine";
import { cn } from "@/lib/utils";

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
    return (
      <>
        <RadioGroup>
          {pricingTypes.map(({ value, label }) => (
            <FieldLabel
              key={`type-step-r-i-${value}`}
              htmlFor={`${value}-${id}`}
            >
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
      </>
    );
  },
);

const PricingCalculatorFormStepLegalForm = React.forwardRef(
  function Step1(props, ref) {
    const id = React.useId();
    return (
      <>
        <RadioGroup>
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
      </>
    );
  },
);

const PricingCalculatorFormStepIndustry = React.forwardRef((props, ref) => {
  return (
    <>
      <RadioGroup>
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
    </>
  );
});

const PricingCalculatorFormStepWithHR = React.forwardRef((props, ref) => {
  const [wHR, setWHR] = React.useState(false);
  const [wPFRON, setWPFRON] = React.useState(false);
  return (
    <>
      <FieldLabel>
        <Field orientation={"horizontal"}>
          <FieldContent>
            <FieldTitle>
              Czy chcesz skorzystać z obsługi kadrowo płacowej?
            </FieldTitle>
          </FieldContent>
          <Switch onCheckedChange={setWHR} />
        </Field>
      </FieldLabel>
      <AnimatePresence>
        {wHR && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className={cn(wHR && "overflow-clip")}
          >
            <FieldGroup className="pt-4">
              <Field orientation={"horizontal"}>
                <FieldLabel>Podaj liczbę pracowników do rozliczenia</FieldLabel>
                <Input />
              </Field>
              <FieldLabel>
                <Field orientation={"horizontal"}>
                  <FieldContent>
                    <FieldTitle>
                      Czy na zatrudnionych pracowników pracodawca otrzymuje
                      dofinansowanie z PFRON?
                    </FieldTitle>
                  </FieldContent>
                  <Switch onCheckedChange={setWPFRON} />
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
                        <Input />
                      </Field>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Field orientation={"horizontal"}>
                <FieldLabel>Podaj liczbę zleceniobiorców</FieldLabel>
                <Input />
              </Field>
              <Field orientation={"horizontal"}>
                <FieldLabel>
                  Podaj liczbę członków zarządu z prawem do wynagrodzenia
                </FieldLabel>
                <Input />
              </Field>
            </FieldGroup>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

function PricingCalculatorFormStepAddons() {
  return (
    <FieldSet>
      <FieldGroup>
        {PRICING_DATA.ADDONS.map(({ id, name }) => (
          <FieldLabel key={`pcfs-addon-${id}`}>
            <Field orientation={"horizontal"}>
              <FieldContent>
                <FieldTitle>{name}</FieldTitle>
                <FieldDescription></FieldDescription>
              </FieldContent>
              <Switch />
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

export default DocumentDefinition;

function PricingCalculatorFormStepDocsNumber() {
  const [value, setValue] = React.useState([0]);
  return (
    <div className="gap-8 grid place-items-center">
      <Field>
        <FieldTitle>
          Podaj przebliżoną miesięczną liczbę dokumentów:{" "}
          <Badge size="lg" className="tabular-nums">
            {value[0] < 101 ? value[0] : "100+"}
          </Badge>
        </FieldTitle>
        <Slider
          value={value}
          onValueChange={setValue}
          min={0}
          step={10}
          max={110}
          className="mt-2 w-full"
        />
        <AnimatePresence>
          {value[0] > 100 && (
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
  return <div></div>;
}

const stepsConfig = [
  { component: PricingCalculatorFormStepType, title: "Wybierz rodzaj" },
  {
    component: PricingCalculatorFormStepLegalForm,
    title: "Wybierz formę prawną",
  },
  {
    component: PricingCalculatorFormStepIndustry,
    title: "Wybierz branżę",
  },
  {
    component: PricingCalculatorFormStepDocsNumber,
    title: "Liczba dokumentów",
  },
  {
    component: PricingCalculatorFormStepAddons,
    title: "Szczególne procedury",
  },
  {
    component: PricingCalculatorFormStepWithHR,
    title: "Kadry",
  },
];

export const PricingCalculatorForm = () => {
  const [step, setStep] = React.useState<0 | 1 | 2 | 3>(0);
  const [direction, setDirection] = React.useState<-1 | 1>(1);
  const setSlide = (direction: -1 | 1) => {
    const newStepIdx = step + direction;
    if (newStepIdx < 0 || newStepIdx > stepsConfig.length) return;
    setDirection(direction);
    setStep((p) => (p + direction) as 1); // check is perfromed at the top
  };
  const { component: CurrentStep, title } = stepsConfig[step];
  return (
    <Card className="mx-auto max-w-xl relative overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="relative h-120 overflow-x-clip overflow-y-auto">
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
        >
          <ChevronLeft />
          Poprzedni krok
        </Button>
        <Button
          disabled={step === stepsConfig.length - 1}
          onClick={() => setSlide(1)}
        >
          Następny krok
          <ChevronRight />
        </Button>
      </CardFooter>
    </Card>
  );
};
