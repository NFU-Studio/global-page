import { atom, type StoreValue } from "nanostores";
import { $calculationOptions } from "@/stores/pricing.store";
import { notForwardableKeys, stepsConfig } from "./config";

export const $stepStore = atom<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7>(0);

export const setStep = (value: StoreValue<typeof $stepStore>) =>
  $stepStore.set(value);

$calculationOptions.listen((value, old, key) => {
  console.log(value, old, key);
  const currentStep = $stepStore.get();
  if (currentStep >= stepsConfig.length - 1) return;
  if (notForwardableKeys.includes(key)) return;
  if (!old[key] && value[key])
    $stepStore.set((currentStep + 1) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7); // validated
});
