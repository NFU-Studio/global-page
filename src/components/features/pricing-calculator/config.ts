import { PricingCalculatorFormStepAddons } from "@/components/features/pricing-calculator/steps/step-addons";
import { PricingCalculatorFormStepCalculation } from "@/components/features/pricing-calculator/steps/step-calculation";
import PricingCalculatorFormStepDocsNumber from "@/components/features/pricing-calculator/steps/step-docs-number";
import { PricingCalculatorFormStepIndustry } from "@/components/features/pricing-calculator/steps/step-industry";
import { PricingCalculatorFormStepLegalForm } from "@/components/features/pricing-calculator/steps/step-legal-form";
import { PricingCalculatorFormStepType } from "@/components/features/pricing-calculator/steps/step-type";
import { PricingCalculatorFormStepWithHR } from "@/components/features/pricing-calculator/steps/step-with-hr";
import type { CalculationOptions } from "@/lib/pricing-engine";

export const pricingTypes = [
  {
    value: "KH",
    label: "Księga handlowa",
  },
  {
    value: "KPIR",
    label: "Księga przychodów i rozchodów",
  },
];

export const notForwardableKeys: (keyof CalculationOptions)[] = [
  "documentCount",
  "activeAddonIds",
  "employeesNoPefron",
  "employeesPefron",
  "contractors",
  "partnersCount",
];

export const stepsConfig: {
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
    component: PricingCalculatorFormStepCalculation,
    title: "Wycena",
  },
];
