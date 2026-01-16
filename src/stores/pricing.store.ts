import { map } from "nanostores";
import type { CalculationOptions } from "@/lib/pricing-engine";

export const $calculationOptions = map<Partial<CalculationOptions>>({
  documentCount: 0,
  activeAddonIds: [],
});
