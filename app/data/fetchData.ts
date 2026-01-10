import { TQuery } from "../types";

export async function fetchData({ pageNumber }: TQuery) {
  const res = await fetch(
    "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI",
    {
      method: "POST",
      body: JSON.stringify({
        query: "toilets",
        pageNumber: pageNumber,
        size: 0,
        additionalPages: pageNumber + 1,
        sort: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
