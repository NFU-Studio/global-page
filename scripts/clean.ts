import { stat } from "node:fs/promises";
import { $ } from "bun";
import { runScriptMain } from "scripts/_utils";

runScriptMain(async () => {
  await stat("./package.json");
  await $`rm -rf node_modules`;
  await $`rm -rf .astro`;
  console.log("✅ node_modules & .astro gone.");
});
