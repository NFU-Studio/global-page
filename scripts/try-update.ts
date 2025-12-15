import { $ } from "bun";
import { runScriptMain } from "scripts/_utils";

runScriptMain(async () => {
  console.log("Spróbujemy zaktualizować paczki");
  console.log(
    Bun.color("gray", "ansi"),
    "Jeśli się to nie uda, trzeba ręcznie podnieść majory/zaktualizować templatkę.",
    Bun.color("white", "ansi"),
  );

  await $`bun update --latest`;
  await $`bun biome migrate --write`;

  console.log("✅ Wszystko przeszło!");
});
