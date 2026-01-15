export type PricingRange = {
  min: number;
  max: number | "infinity";
  price: number;
};

export type Addon = {
  id: string;
  name: string;
  modifier: number; // 0.2 = +20%
};

export const PRICING_DATA = {
  KH_BASE_RATES: [
    { min: 0, max: 20, price: 1080 },
    { min: 21, max: 40, price: 1233 },
    { min: 41, max: 60, price: 1580 },
    { min: 61, max: 80, price: 1830 },
    { min: 81, max: 100, price: 2080 },
  ] as PricingRange[],

  KH_FAMILY_FOUNDATION_RATES: [
    { min: 0, max: 20, price: 1380 },
    { min: 21, max: 40, price: 1533 },
    { min: 41, max: 60, price: 1980 },
    { min: 61, max: 80, price: 2230 },
    { min: 81, max: 100, price: 2480 },
  ] as PricingRange[],

  KPIR_BASE_RATES: [
    { min: 0, max: 10, price: 250 },
    { min: 11, max: 20, price: 325 },
    { min: 21, max: 30, price: 400 },
    { min: 31, max: 50, price: 550 },
    { min: 51, max: 70, price: 775 },
    { min: 71, max: 100, price: 1000 },
  ] as PricingRange[],

  INDUSTRIES: [
    { id: "standard", name: "IT / Usługi / Handel", modifier: 0 },
    {
      id: "construction",
      name: "Deweloperka / Budowa / Transport",
      modifier: 0.2,
    },
    { id: "production", name: "Produkcja", modifier: 0.3 },
  ],

  ADDONS: [
    { id: "vat_proporcja", name: "Proporcja VAT", modifier: 0.1 },
    { id: "vat_oss", name: "VAT OSS", modifier: 0.2 },
    { id: "cash_method", name: "Metoda Kasowa", modifier: 0.2 },
    { id: "vat_margin", name: "VAT Marża", modifier: 0.2 },
    { id: "cit_estonski", name: "CIT Estoński", modifier: 0.2 },
  ] as Addon[],

  HR_RATES: {
    employee_no_pefron: 90,
    employee_pefron: 170,
    contractor: 90,
  },
};

export const LEGAL_FORMS_KH = [
  "Jednoosobowa działalność gospodarcza",
  "Spółka z ograniczoną odpowiedzialnością",
  "Spółka komandytowa",
  "Fundacja",
  "Stowarzyszenie",
  "Fundacja rodzinna",
] as const;

export const LEGAL_FORMS_KPIR = [
  "Jednoosobowa działalność gospodarcza",
  "Spółka cywilna",
  "Spółka jawna",
] as const;

// Jeśli potrzebujesz jednej płaskiej listy do selecta:
export const ALL_LEGAL_FORMS = Array.from(
  new Set([...LEGAL_FORMS_KH, ...LEGAL_FORMS_KPIR]),
);

export type LegalFormKH = (typeof LEGAL_FORMS_KH)[number];
export type LegalFormKPIR = (typeof LEGAL_FORMS_KPIR)[number];
