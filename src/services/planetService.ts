export const fetchPlanets = async (
  page: number,
  limit: number,
  search: string,
  sort: string
) => {
  // Make a request to the API to obtain the planets.
  const res = await fetch(
    `/api/planets?page=${page}&limit=${limit}&search=${search}&sort=${sort}`
  );
  // Checks if the response was successful (status code 200)
  if (!res.ok) {
    throw new Error('Error al obtener los planetas');
  }
  const data = await res.json();
  // Return the obtained data (planets)
  return data;
};
