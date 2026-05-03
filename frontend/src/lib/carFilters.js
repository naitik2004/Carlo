export function normalizeCarForm(form) {
  return {
    ...form,
    year: Number(form.year),
    pricePerDay: Number(form.pricePerDay),
    mileage: Number(form.mileage),
  };
}

export function buildCarQuery(filters) {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== "" && value !== null && value !== undefined)
  );
}
