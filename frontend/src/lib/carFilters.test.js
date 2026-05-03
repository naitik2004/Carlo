import test from "node:test";
import assert from "node:assert/strict";
import { buildCarQuery, normalizeCarForm } from "./carFilters.js";

test("buildCarQuery removes empty filters", () => {
  assert.deepEqual(
    buildCarQuery({ search: "civic", fuel: "", minPrice: "20", maxPrice: undefined }),
    { search: "civic", minPrice: "20" }
  );
});

test("normalizeCarForm converts numeric fields", () => {
  assert.deepEqual(
    normalizeCarForm({
      brand: "Honda",
      model: "Civic",
      year: "2022",
      pricePerDay: "75",
      mileage: "12000",
    }),
    {
      brand: "Honda",
      model: "Civic",
      year: 2022,
      pricePerDay: 75,
      mileage: 12000,
    }
  );
});
