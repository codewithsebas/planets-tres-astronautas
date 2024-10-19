export const fetchPlanets = async (page: number, limit: number, search: string, sort: string) => {
    const res = await fetch(`/api/planets?page=${page}&limit=${limit}&search=${search}&sort=${sort}`);
    if (!res.ok) {
      throw new Error('Error al obtener los planetas');
    }
    const data = await res.json();
    return data;
};