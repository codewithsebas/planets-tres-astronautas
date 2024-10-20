export const getPagination = (page: number, limit: number) => {
  const start = (page - 1) * limit;
  const end = start + limit - 1;
  return { start, end };
};
