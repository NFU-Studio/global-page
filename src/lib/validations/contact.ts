import * as z from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Imię musi mieć co najmniej 2 znaki.")
    .max(50, "Imię może mieć maksymalnie 50 znaków."),
  phone: z
    .string()
    .min(9, "Numer telefonu musi mieć co najmniej 9 cyfr.")
    .max(15, "Numer telefonu może mieć maksymalnie 15 cyfr.")
    .refine((val) => /^[0-9+\s\-()]+$/.test(val), {
      message: "Nieprawidłowy format numeru telefonu.",
    }),
  email: z
    .string()
    .min(1, "Email jest wymagany.")
    .email("Nieprawidłowy format adresu email."),
  message: z
    .string()
    .min(10, "Wiadomość musi mieć co najmniej 10 znaków.")
    .max(1000, "Wiadomość może mieć maksymalnie 1000 znaków."),
  rodo: z
    .boolean()
    .refine((val) => val === true, {
      message: "Musisz wyrazić zgodę na przetwarzanie danych.",
    }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
