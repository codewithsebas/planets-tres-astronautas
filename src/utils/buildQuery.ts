import { supabase } from '@/lib/supabaseClient';
import { getPagination } from './pagination';
import { QueryParams } from '@/interfaces/buildQueryInterface';

export const buildQuery = (params: QueryParams) => {
  const { page, limit, search, sort } = params;
  const { start, end } = getPagination(page, limit);

  let query = supabase.from('planets').select('*').range(start, end);

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  return query.order('name', { ascending: sort === 'asc' });
};
