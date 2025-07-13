// Backend server URL obtained from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getProducts = async () => {
  const res = await fetch(`${BACKEND_URL}/api/products`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  return data;
};
