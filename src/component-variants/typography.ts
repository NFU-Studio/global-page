import { cva, type VariantProps } from "class-variance-authority";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      body: "text-sm text-foreground/80 in-[[data-inverted=true]]:text-background/80",
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
