import {
  ArrowRight,
  ClipboardCheck,
  Compass,
  Dot,
  File,
  Handshake,
} from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { typographyVariants } from "@/component-variants/typography";
import { Button } from "@/components/ui/button";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const services = [
  {
    id: 1,
    category: "Obsługa Księgowa",
    title: "Pełna Księgowość & KPiR",
    items: [
      "Księgi Handlowe",
      "KPiR oraz Ryczałt",
      "Kadry i płace",
      "Rachunkowość zarządcza",
      "Sprawozdania finansowe",
    ],
    description:
      "Kompleksowe prowadzenie Ksiąg Handlowych, KPiR oraz Ryczałtu. Zapewniamy pełną obsługę kadrowo-płacową i wsparcie w rachunkowości zarządczej. Twoje finanse pod stałą kontrolą ekspertów.",
    icon: File,
    buttonTextTemplate: "Sprawdź zakres usług",
    href: "/oferta/",
  },
  {
    id: 2,
    category: "Doradztwo Podatkowe",
    title: "Bezpieczeństwo i Optymalizacja",
    items: [
      "Optymalizacja podatkowa",
      "Opinie prawne",
      "Interpretacja przepisów",
      "Minimalizacja ryzyka",
    ],
    description:
      "Bezpieczna optymalizacja podatkowa i profesjonalne opinie prawne. Pomagamy interpretować zawiłe przepisy i minimalizować ryzyko fiskalne w Twoim biznesie.",
    icon: Compass,
    buttonTextTemplate: "Dowiedz się więcej",
    href: "/oferta/",
  },
  {
    id: 3,
    category: "Sprzedaż Gotowych Spółek",
    title: "Biznes w 24 Godziny",
    items: [
      "Czyste spółki z o.o.",
      "Komplet NIP, REGON, KRS",
      "Gwarancja braku zadłużenia",
      "Szybki start działalności",
    ],
    description:
      "Rozpocznij działalność w 24 godziny. Oferujemy w pełni zarejestrowane, czyste spółki z o.o. z kompletem numerów NIP, REGON i KRS oraz gwarancją braku zadłużenia.",
    icon: Handshake,
    buttonTextTemplate: "Zobacz ofertę spółek",
    href: "/oferta/",
  },
  {
    id: 4,
    category: "Rejestracja Firmy",
    title: "Wsparcie na Starcie",
    items: [
      "Zakładanie JDG",
      "Rejestracja spółek",
      "Wybór formy opodatkowania",
      "Formalności urzędowe",
    ],
    description:
      "Pomagamy przejść przez proces zakładania JDG lub spółki bez stresu. Doradzamy w wyborze formy opodatkowania i załatwiamy formalności w urzędach za Ciebie.",
    icon: ClipboardCheck, // Suggested new icon for registration
    buttonTextTemplate: "Otwórz firmę z nami",
    href: "/oferta/",
  },
];
export const AnimatedAccodrionish = () => {
  const isMobile = useMediaQuery("(width < 1024px)");
  return (
    <motion.ul data-service-list className="p-rws">
      {services.map(
        (
          { category, title, buttonTextTemplate, description, items, href },
          idx,
        ) => (
          <motion.li
            key={`el-list-sr-${category}`}
            whileHover={"hover"}
            className="flex flex-col md:flex-row justify-between p-rws gap-8 lg:gap-16 hover:bg-muted transition-all"
          >
            <p className={cn(typographyVariants({ variant: "small" }))}>
              {(idx + 1).toString().padStart(2, "0")}
            </p>
            <div className="max-w-5xl w-full space-y-5">
              <h3 className="sr-only">{category}</h3>
              <p className={cn(typographyVariants({ variant: "h2l" }))}>
                {title}
              </p>
              <ul className="flex flex-wrap items-center text-accent/60 gap-2">
                {items?.map((l, idx, { length }) => (
                  <React.Fragment key={`${idx + 1}-${l}`}>
                    <li
                      className={cn(typographyVariants({ variant: "small" }))}
                    >
                      {l}
                    </li>
                    {idx < length - 1 && (
                      <li>
                        <Dot />
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
              <motion.div
                className="overflow-clip space-y-2.5"
                key={`---et-et--${title}`}
                style={!isMobile ? { height: 0 } : {}}
                variants={{
                  hover: {
                    height: "auto",
                  },
                }}
              >
                <p
                  className={cn(typographyVariants({ mw: "h" }))}
                  data-service-list-appear
                >
                  {description}
                </p>
                <Button asChild data-service-list-appear>
                  <a href={href}>
                    {buttonTextTemplate}
                    <ArrowRight />
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.li>
        ),
      )}
    </motion.ul>
  );
};
