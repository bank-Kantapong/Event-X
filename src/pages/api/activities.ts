import type { NextApiRequest, NextApiResponse } from 'next';
import activities from '@/data/activities.json';


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || activities.length;
        const search = (req.query.search as string || '').toLowerCase();
        const hashtag = req.query.hashtag as string || '';

        let filteredActivities = activities;

        // Filter by search term (title or location)
        if (search) {
            filteredActivities = filteredActivities.filter(activity =>
                activity.title.toLowerCase().includes(search) ||
                activity.location.toLowerCase().includes(search)
            );
        }

        // Filter by hashtag
        if (hashtag) {
            filteredActivities = filteredActivities.filter(activity =>
                activity.hashtag === hashtag
            );
        }

        const totalItems = filteredActivities.length;
        const totalPages = Math.ceil(totalItems / limit);

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedActivities = filteredActivities.slice(startIndex, endIndex);



        res.status(200).json({
            data: paginatedActivities,
            meta: {
                page,
                limit,
                totalItems,
                totalPages
            }
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}


