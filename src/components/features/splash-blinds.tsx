import { animate } from "motion";
import { motion, type Variant } from "motion/react";
import React from "react";

const animateOut: Variant = {
  rotateY: -90,
};

export const SplashBlinds = () => {
  const [variant, setVariant] = React.useState("initial");

  React.useEffect(() => {
    const splash = document.querySelector("#splash") as HTMLDivElement;
    splash.style.background = "none";
    setTimeout(() => {
      animate(splash.querySelector("svg") as SVGElement, {
        opacity: 0,
      });
      splash.style.pointerEvents = "none";
    }, 400);
    setVariant("animateOut");
  }, []);

  return (
    <motion.div
      animate={variant}
      className="size-full absolute inset-0 flex flex-col lg:flex-row"
      transition={{
        staggerChildren: 0.1,
      }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          variants={{
            initial: {},
            animateOut,
          }}
          transition={{
            type: "tween",
            duration: 0.35,
          }}
          onAnimationComplete={() => {
            window.dispatchEvent(new Event("splash-out"));
          }}
          key={`splash-anim-${i + 1}`}
          className="flex-1 bg-background"
        ></motion.div>
      ))}
    </motion.div>
  );
};
