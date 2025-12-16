import { ArrowRight, Compass, Dot, File, Handshake } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { typographyVariants } from "@/component-variants/typography";
import { Button } from "@/components/ui/button";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const services = [
  {
    id: 1,
    category: "Kompleksowa Obsługa Księgowa",
    title: "Pełna Księgowość & KPiR",
    items: [
      "Księgi Handlowe",
      "Sprawozdania finansowe",
      "Ewidencje",
      "Deklaracje podatkowe",
      "Rozliczenia",
    ],
    description:
      'Rzetelnie prowadzona księgowość jest podstawą każdego przedsiębiorstwa, a biuro rachunkowe "Global" bierze pełną odpowiedzialność za przestrzeganie obowiązujących przepisów podatkowych i rachunkowych. Usługi w tym zakresie mają na celu znaczną obniżkę podatków i kosztów oraz pozwalają firmie skupić się na prowadzeniu biznesu. Biuro zapewnia kompleksową obsługę księgową dla różnych typów spółek (Sp. z o.o., S.A., Sp. K.).',
    icon: File,
    buttonTextTemplate: "Więcej o księgowości",
    href: "/oferta/",
  },
  {
    id: 2,
    category: "Kadry i Płace z Prawem Pracy",
    title: "Profesjonalne Zarządzanie Zespołem",
    description:
      "Zajmiemy się obsługą HR od A do Z, dbając o zgodność umów i płac z aktualnym prawem. Otrzymasz dedykowanego specjalistę do Twojej dyspozycji.",
    icon: Handshake,
    buttonTextTemplate: "Więcej o HR",
    href: "/oferta/",
  },
  {
    id: 3,
    category: "Doradztwo Podatkowe i Strategiczne",
    title: "Wsparcie w Kluczowych Decyzjach",
    description:
      "Pomagamy wybrać optymalne rozwiązania podatkowe, które zabezpieczą i zoptymalizują Twoje koszty. To partnerstwo, które buduje wartość.",
    icon: Compass,
    buttonTextTemplate: "Szczegóły o doradztwie",
    href: "/oferta/",
  },
];
export const AnimatedAccodrionish = () => {
  const isMobile = useMediaQuery("(width < 1024px)");
  return (
    <motion.ul data-service-list className="p-rws">
      {services.map(
        ({ title, buttonTextTemplate, description, items, href }, idx) => (
          <motion.li
            key={`el-list-sr-${title}`}
            whileHover={"hover"}
            className="flex flex-col md:flex-row justify-between p-rws gap-8 lg:gap-16 hover:bg-muted transition-all"
          >
            <p className={cn(typographyVariants({ variant: "small" }))}>
              {(idx + 1).toString().padStart(2, "0")}
            </p>
            <div className="max-w-5xl w-full space-y-5">
              <h3 className={cn(typographyVariants({ variant: "h2l" }))}>
                {title}
              </h3>
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
