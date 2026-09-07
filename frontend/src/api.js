const API_URL = "http://localhost:8000/api/countdown/";

export async function fetchCountdown() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch countdown");
  return res.json();
}