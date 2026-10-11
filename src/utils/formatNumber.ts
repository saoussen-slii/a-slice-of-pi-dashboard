import { localeFor } from "../i18n";

export const formatNumber = (value: number, language: string): string =>
  new Intl.NumberFormat(localeFor(language)).format(value);
