const locale = "en-EN";
// de-DE
export const getFormatedNumber = (number: number) => {
  return new Intl.NumberFormat(locale, {
    minimumIntegerDigits: 2,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(number);
};
