import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Form submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Imię i nazwisko</FieldLabel>
          <Input
            type="text"
            id="name"
            name="name"
            required
            className="h-12 px-4"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            type="email"
            id="email"
            name="email"
            required
            className="h-12 px-4"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="message">Wiadomość</FieldLabel>
          <Textarea
            id="message"
            name="message"
            rows={4}
            required
            className="resize-none"
          />
        </Field>
      </FieldGroup>

      <Button type="submit" variant="secondary" size="lg" className="w-fit">
        Wyślij wiadomość
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <path
            d="M5 12h14"
            className="origin-[25%_50%] group-hover/arrow:scale-x-100 transition duration-350 scale-x-0"
          />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Button>
    </form>
  );
}
