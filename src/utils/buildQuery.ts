import { supabase } from '@/lib/supabaseClient';
import { getPagination } from './pagination';
import { QueryParams } from '@/interfaces/buildQueryInterface';

// Function to build a query to the planets database.
export const buildQuery = (params: QueryParams) => {
  const { page, limit, search, sort } = params;
  const { start, end } = getPagination(page, limit);

  // Creates an initial query to select all planets in the specified range
  let query = supabase.from('planets').select('*').range(start, end);

  // If a search term is provided, it adds a partial match filter on the name
  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  // Return the query sorted by name in ascending or descending order according to the order parameter
  return query.order('name', { ascending: sort === 'asc' });
};
