import i18n from "../i18n/i18n";

/**
 *
 * @param numberValue as number
 * @returns Formated number depending on locale
 */
export const getFormatedNumber = (numberValue: number) => {
  return new Intl.NumberFormat(i18n.language, {
    minimumIntegerDigits: 2,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(numberValue);
};
