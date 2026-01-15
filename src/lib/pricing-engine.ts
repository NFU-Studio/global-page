import { PRICING_DATA, type PricingRange } from "@/data/pricing-data";

export interface CalculationOptions {
  type: "KH" | "KPIR";
  legalForm: string; // np. 'JDG', 'Spółka z o.o.', 'Fundacja Rodzinna', 'Spółka Cywilna'
  industryId: string;
  documentCount: number;
  activeAddonIds: string[];
  employeesNoPefron: number;
  employeesPefron: number;
  contractors: number;
  partnersCount?: number; // tylko dla Spółki Cywilnej/Jawnej w KPiR
}

export const calculatePrice = (options: CalculationOptions) => {
  let basePrice = 0;

  // 1. Dobór tabeli bazowej
  let table: PricingRange[];
  if (options.type === "KH") {
    table =
      options.legalForm === "Fundacja rodzinna"
        ? PRICING_DATA.KH_FAMILY_FOUNDATION_RATES
        : PRICING_DATA.KH_BASE_RATES;
  } else {
    table = PRICING_DATA.KPIR_BASE_RATES;
  }

  // 2. Cena za dokumenty
  const range = table.find(
    (r) =>
      options.documentCount >= r.min &&
      (r.max === "infinity" || options.documentCount <= r.max),
  );

  if (!range) {
    return {
      manualQuote: true,
      message: "Wycena indywidualna (powyżej 100 dokumentów)",
    };
  }

  basePrice = range.price;

  // 3. Modyfikator branżowy (tylko dla KH)
  let industryModifier = 0;
  if (options.type === "KH") {
    const industry = PRICING_DATA.INDUSTRIES.find(
      (i) => i.id === options.industryId,
    );
    industryModifier = industry ? industry.modifier : 0;
  }

  // 4. Modyfikator za wspólników (tylko dla KPiR Spółka Cywilna/Jawna)
  let partnersModifier = 0;
  if (
    options.type === "KPIR" &&
    (options.legalForm.includes("Cywilna") ||
      options.legalForm.includes("Jawna"))
  ) {
    const partners = options.partnersCount || 1;
    if (partners > 5)
      return {
        manualQuote: true,
        message: "Wycena indywidualna (>5 wspólników)",
      };
    if (partners >= 2) partnersModifier = (partners - 1) * 0.1 + 0.1; // 2->20%, 3->30% itd.
  }

  // 5. Dodatki (VAT/CIT) - LIMIT 40%
  const selectedAddons = PRICING_DATA.ADDONS.filter((a) =>
    options.activeAddonIds.includes(a.id),
  );
  let addonsModifier = selectedAddons.reduce((sum, a) => sum + a.modifier, 0);
  if (addonsModifier > 0.4) addonsModifier = 0.4;

  // 6. Obliczenie ceny księgowości
  // Z maila wynika, że modyfikatory procentowe sumują się i są liczone od bazy
  const totalPercentageModifier =
    industryModifier + partnersModifier + addonsModifier;
  const accountingPrice = basePrice * (1 + totalPercentageModifier);

  // 7. Kadry i Płace (kwoty stałe)
  const hrPrice =
    options.employeesNoPefron * PRICING_DATA.HR_RATES.employee_no_pefron +
    options.employeesPefron * PRICING_DATA.HR_RATES.employee_pefron +
    options.contractors * PRICING_DATA.HR_RATES.contractor;

  return {
    basePrice,
    accountingPrice: Math.round(accountingPrice * 100) / 100,
    hrPrice,
    totalNet: Math.round((accountingPrice + hrPrice) * 100) / 100,
    manualQuote: false,
  };
};
