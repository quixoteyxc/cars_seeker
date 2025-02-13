const currentYear = new Date().getFullYear();

export const years = Array.from(
  { length: currentYear - 2015 + 1 },
  (_, index) => {
    const year = 2015 + index;
    return { value: String(year), label: String(year) };
  }
);
