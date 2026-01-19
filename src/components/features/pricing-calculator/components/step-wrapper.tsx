import { motion, usePresenceData } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";

export const StepWrapper = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof motion.div>
>(({ children, className }, ref) => {
  const direction = usePresenceData();
  return (
    <motion.div
      ref={ref}
      layout
      className={cn("relative", className)}
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.1,
          type: "spring",
          visualDuration: 0.3,
          bounce: 0,
        },
      }}
      exit={{ opacity: 0, x: direction * -50 }}
    >
      {children}
    </motion.div>
  );
});
