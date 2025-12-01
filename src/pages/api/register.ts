import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const registrationsFilePath = path.join(process.cwd(), 'src/data/registrations.json');

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { activityId } = req.body;

        if (!activityId) {
            return res.status(400).json({ message: 'Activity ID is required' });
        }

        try {
            const fileData = fs.readFileSync(registrationsFilePath, 'utf8');
            const registrations = JSON.parse(fileData);

            if (!registrations.includes(activityId)) {
                registrations.push(activityId);
                fs.writeFileSync(registrationsFilePath, JSON.stringify(registrations, null, 2));
            }

            return res.status(200).json({ message: 'Registration successful' });
        } catch (error) {
            console.error('Error registering event:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
