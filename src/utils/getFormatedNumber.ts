const LANGUAGE = navigator.languages[0];

/**
 *
 * @param numberValue as number
 * @returns Formated number depending on locale
 */
export const getFormatedNumber = (numberValue: number) => {
  return new Intl.NumberFormat(LANGUAGE, {
    minimumIntegerDigits: 2,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(numberValue);
};
