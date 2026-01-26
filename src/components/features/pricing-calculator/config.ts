import { PricingCalculatorFormStepAddons } from "@/components/features/pricing-calculator/steps/step-addons";
import { PricingCalculatorFormStepCalculation } from "@/components/features/pricing-calculator/steps/step-calculation";
import PricingCalculatorFormStepDocsNumber from "@/components/features/pricing-calculator/steps/step-docs-number";
import { PricingCalculatorFormStepIndustry } from "@/components/features/pricing-calculator/steps/step-industry";
import { PricingCalculatorFormStepLegalForm } from "@/components/features/pricing-calculator/steps/step-legal-form";
import { PricingCalculatorFormStepType } from "@/components/features/pricing-calculator/steps/step-type";
import { PricingCalculatorFormStepWithHR } from "@/components/features/pricing-calculator/steps/step-with-hr";
import type { CalculationOptions } from "@/lib/pricing-engine";
import * as m from "@/paraglide/messages";

export const pricingTypes = [
  {
    value: "KH",
    label: m.free_legal_termite_intend(),
  },
  {
    value: "KPIR",
    label: m.extra_such_dingo_promise(),
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
    title: m.funny_flat_baboon_conquer(),
    key: "type",
  },
  {
    component: PricingCalculatorFormStepLegalForm,
    title: m.solid_factual_crocodile_spin(),
    key: "legalForm",
  },
  {
    component: PricingCalculatorFormStepIndustry,
    title: m.knotty_same_parakeet_fulfill(),
    key: "industryId",
  },
  {
    component: PricingCalculatorFormStepDocsNumber,
    title: m.quick_civil_rat_treat(),
    key: "documentCount",
  },
  {
    component: PricingCalculatorFormStepAddons,
    title: m.weary_noisy_newt_create(),
    key: "activeAddonIds",
  },
  {
    component: PricingCalculatorFormStepWithHR,
    title: m.small_swift_cow_cure(),
  },
  {
    component: PricingCalculatorFormStepCalculation,
    title: m.loved_cozy_mallard_burn(),
  },
];
