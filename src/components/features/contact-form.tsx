"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  type ContactFormValues,
  contactFormSchema,
} from "@/lib/validations/contact";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      rodo: false,
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // TODO: Implement actual form submission logic
    console.log("Form submitted:", data);

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setIsSuccess(false);
      reset();
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Imię i nazwisko</FieldLabel>
          <Input
            id="name"
            {...register("name")}
            aria-invalid={!!errors.name}
            className="h-12 px-4 transition-colors focus-visible:ring-offset-0"
          />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>

        <FieldSet className="lg:flex-row">
          <Field data-invalid={!!errors.phone}>
            <FieldLabel htmlFor="phone">Numer telefonu</FieldLabel>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              aria-invalid={!!errors.phone}
              className="h-12 px-4 transition-colors focus-visible:ring-offset-0"
            />
            {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
          </Field>

          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              {...register("email")}
              aria-invalid={!!errors.email}
              className="h-12 px-4 transition-colors focus-visible:ring-offset-0"
            />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </Field>
        </FieldSet>
        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="message">Wiadomość</FieldLabel>
          <Textarea
            id="message"
            {...register("message")}
            aria-invalid={!!errors.message}
            rows={4}
            className="resize-none transition-colors focus-visible:ring-offset-0"
          />
          {errors.message && <FieldError>{errors.message.message}</FieldError>}
        </Field>

        <Field orientation={"horizontal"} data-invalid={!!errors.rodo}>
          <Checkbox
            id="rodo"
            {...register("rodo")}
            aria-invalid={!!errors.rodo}
          />
          <FieldContent className="flex flex-col gap-1">
            <FieldLabel
              htmlFor="rodo"
              className="text-sm leading-tight cursor-pointer peer-data-[invalid=true]:text-destructive transition-colors"
            >
              Wyrażam zgodę na przetwarzanie moich danych osobowych
            </FieldLabel>
            <FieldDescription>
              w celu udzielenia odpowiedzi na przesłane zapytanie zgodnie z
              polityką prywatności.
            </FieldDescription>
          </FieldContent>
          {errors.rodo && (
            <FieldError className="col-span-full">
              {errors.rodo.message}
            </FieldError>
          )}
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        className="w-full"
        disabled={isSubmitting || isSuccess}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Wysyłanie...
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle2 className="size-4" />
            Wysłano!
          </>
        ) : (
          <>
            <Send className="size-4" />
            Wyślij
          </>
        )}
      </Button>
    </form>
  );
}
