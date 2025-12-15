import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center transition duration-300",
  {
    variants: {
      variant: {
        none: "",
      },
      size: {
        none: "",
      },
    },
    defaultVariants: {
      variant: "none",
      size: "none",
    },
  },
);
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
