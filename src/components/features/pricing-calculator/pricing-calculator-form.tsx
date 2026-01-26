import { useStore } from "@nanostores/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as m from "@/paraglide/messages";
import { $calculationOptions } from "@/stores/pricing.store";
import { StepWrapper } from "./components";
import { stepsConfig } from "./config";
import { $stepStore, setStep } from "./step-logic";

export const PricingCalculatorForm = () => {
  const step = useStore($stepStore);
  const [direction, setDirection] = React.useState<-1 | 1>(1);
  const calculationOptions = useStore($calculationOptions);
  const setSlide = (direction: -1 | 1) => {
    const newStepIdx = step + direction;
    if (newStepIdx < 0 || newStepIdx > stepsConfig.length) return;
    setDirection(direction);
    setStep((step + direction) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7); // check is perfromed at the top
  };
  const { component: CurrentStep, title, key } = stepsConfig[step];
  return (
    <Card
      className={cn("mx-auto max-w-xl relative overflow-hidden shadow-xl")}
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
          {m.sour_spare_tapir_grow()}
        </Button>
        <Button
          className={cn(step === stepsConfig.length - 1 && "invisible")}
          disabled={
            step === stepsConfig.length - 1 || (key && !calculationOptions[key])
          }
          onClick={() => setSlide(1)}
        >
          {m.smug_acidic_worm_gulp()}
          <ChevronRight />
        </Button>
      </CardFooter>
    </Card>
  );
};
