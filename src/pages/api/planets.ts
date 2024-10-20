import type { NextApiRequest, NextApiResponse } from 'next';
import { buildQuery } from '@/utils/buildQuery';
import { QueryParams } from '@/interfaces/buildQueryInterface';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // API route that handles search, paging and sorting requests.
  // Constructs a query based on parameters received and returns the results.
  try {
    const { page = 1, limit = 5, search = '', sort = 'asc' } = req.query;

    const queryParams: QueryParams = {
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
      search: search as string,
      sort: sort as 'asc' | 'desc',
    };

    const query = buildQuery(queryParams);
    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
}
