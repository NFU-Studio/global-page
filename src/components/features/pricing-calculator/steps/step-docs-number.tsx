import { useStore } from "@nanostores/react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Field, FieldError, FieldTitle } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { $calculationOptions } from "@/stores/pricing.store";
import { DocumentDefinition } from "../components";

function PricingCalculatorFormStepDocsNumber() {
  const { documentCount } = useStore($calculationOptions);
  return (
    <div className="gap-8 grid place-items-center">
      <Field>
        <FieldTitle>
          Podaj przebliżoną miesięczną liczbę dokumentów:{" "}
          <Badge size="lg" className="tabular-nums">
            {(documentCount ?? 0) < 101 ? documentCount : "100+"}
          </Badge>
        </FieldTitle>
        <Slider
          value={[documentCount ?? 0]}
          onValueChange={([value]) =>
            $calculationOptions.setKey("documentCount", value)
          }
          min={0}
          step={10}
          max={110}
          className="mt-2 w-full"
        />
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: (documentCount ?? 0) > 100 ? "auto" : 0 }}
          exit={{ height: 0 }}
        >
          {(documentCount ?? 0) > 100 && (
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
        </motion.div>
      </Field>
      <DocumentDefinition />
    </div>
  );
}

export default PricingCalculatorFormStepDocsNumber;
