import api from "../utils/api";

export async function getCars(params = {}) {
  const { data } = await api.get("/api/cars", { params });
  return data;
}

export async function getMyCars() {
  const { data } = await api.get("/api/cars/my-cars");
  return data;
}

export async function createCar(car) {
  const { data } = await api.post("/api/cars", car);
  return data;
}

export async function updateCar(id, car) {
  const { data } = await api.put(`/api/cars/${id}`, car);
  return data;
}

export async function deleteCar(id) {
  const { data } = await api.delete(`/api/cars/${id}`);
  return data;
}
