import test from "node:test";
import assert from "node:assert/strict";
import Car from "../models/Car.js";
import { listCars } from "./cars.js";

test("GET /api/cars passes filters to the car model", async () => {
  const originalFind = Car.find;
  let capturedQuery;
  let capturedSort;
  let capturedLimit;
  let capturedSkip;

  Car.find = (query) => {
    capturedQuery = query;
    return {
      sort(sort) {
        capturedSort = sort;
        return this;
      },
      limit(limit) {
        capturedLimit = limit;
        return this;
      },
      async skip(skip) {
        capturedSkip = skip;
        return [{ brand: "Honda", model: "Civic", fuelType: "petrol" }];
      },
    };
  };

  try {
    const req = {
      query: {
        search: "civic",
        fuel: "petrol",
        minPrice: "20",
        maxPrice: "80",
        sort: "pricePerDay",
        page: "2",
      },
    };
    const res = {
      body: null,
      json(payload) {
        this.body = payload;
      },
    };

    await listCars(req, res);

    assert.deepEqual(res.body, [{ brand: "Honda", model: "Civic", fuelType: "petrol" }]);
    assert.deepEqual(capturedQuery, {
      model: { $regex: "civic", $options: "i" },
      fuelType: "petrol",
      pricePerDay: { $gte: 20, $lte: 80 },
    });
    assert.equal(capturedSort, "pricePerDay");
    assert.equal(capturedLimit, 6);
    assert.equal(capturedSkip, 6);
  } finally {
    Car.find = originalFind;
  }
});
