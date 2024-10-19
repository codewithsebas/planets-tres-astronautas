import type { NextApiRequest, NextApiResponse } from 'next';
import { buildQuery } from '@/utils/buildQuery';
import { QueryParams } from '@/interface/buildQueryInterface';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
