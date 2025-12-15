// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function runScriptMain<T extends () => any | Promise<any>>(fn: T) {
  try {
    await fn();
    process.exit(0);
  } catch (error) {
    console.log(
      Bun.color("red", "ansi"),
      "[ERROR]",
      Bun.color("white", "ansi"),
      error,
    );
  }
}
