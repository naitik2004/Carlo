import api from "../utils/api";


export async function signup(name, email, password) {
  const { data } = await api.post("/api/auth/signup", { name, email, password });
  return data;
}

export async function login(email, password) {
  const { data } = await api.post("/api/auth/login", { email, password });
  return data;
}
