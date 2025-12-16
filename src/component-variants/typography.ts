import { cva, type VariantProps } from "class-variance-authority";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      body: "text-sm font-medium text-foreground/80 in-data-[inverted=true]:text-background/80",
      headline: "font-display font-bold text-2xl lg:text-6xl 2xl:text-8xl",
      h2: "font-display font-bold text-xl lg:text-3xl 2xl:text-5xl",
      h2l: "font-display text-xl lg:text-3xl 2xl:text-5xl",
      small: "font-bold text-sm",
    },
    mw: {
      full: "max-w-full",
      h: "max-w-4xl",
      p: "max-w-lg",
    },
    color: {},
  },
  defaultVariants: {
    variant: "body",
    mw: "full",
  },
});

export type TypographyVariantProps = VariantProps<typeof typographyVariants>;
