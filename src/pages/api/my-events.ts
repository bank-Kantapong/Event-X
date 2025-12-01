import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import activities from '@/data/activities.json';

const registrationsFilePath = path.join(process.cwd(), 'src/data/registrations.json');

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            // Ensure file exists
            if (!fs.existsSync(registrationsFilePath)) {
                fs.writeFileSync(registrationsFilePath, '[]');
            }

            const fileData = fs.readFileSync(registrationsFilePath, 'utf8');
            const registeredIds = JSON.parse(fileData);

            const registeredActivities = activities.filter(activity =>
                registeredIds.includes(activity.id)
            );

            return res.status(200).json({ data: registeredActivities });
        } catch (error) {
            console.error('Error fetching my events:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
