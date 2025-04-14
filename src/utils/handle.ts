export const handleFormatValue = (value: number) => {
  const format$ = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

  return format$;
};

export function removeDuplicatesFromArray(strings: string[]) {
  return Array.from(new Set(strings));
}
