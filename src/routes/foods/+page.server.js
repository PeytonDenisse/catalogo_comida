export async function load({ fetch }) {
  const res = await fetch("/api/food");
  const data = await res.json();
  return { foods: data.data || [] };
}