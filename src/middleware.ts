import { defineMiddleware } from "astro:middleware";
import {
  type Locale,
  overwriteGetLocale,
  setLocale,
} from "./paraglide/runtime";

export const onRequest = defineMiddleware((context, next) => {
  setLocale(context.currentLocale as Locale);
  overwriteGetLocale(() => context.currentLocale as Locale);
  return next();
});
