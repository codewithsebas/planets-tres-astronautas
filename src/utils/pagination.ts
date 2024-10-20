// Function to calculate pagination indexes based on the current page and the limit of elements per page.
export const getPagination = (page: number, limit: number) => {
  // Calculates the starting index for the query
  const start = (page - 1) * limit;
  // Calculates the end index for the query (inclusive)
  const end = start + limit - 1;
  // Returns an object with start and end indexes
  return { start, end };
};
