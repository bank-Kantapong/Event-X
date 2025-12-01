import { useState, useCallback, useEffect } from 'react';
import { useRegistrationStore } from '@/store/useRegistrationStore';
import activitiesData from '@/data/activities.json';

export const useMyEvents = () => {
    const { registeredIds } = useRegistrationStore();
    const [events, setEvents] = useState<unknown[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchMyEvents = useCallback(async () => {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));

        const myEvents = activitiesData.filter(activity => registeredIds.includes(activity.id))
            .map(activity => ({ ...activity, isRegistered: true }));

        setEvents(myEvents);
        setLoading(false);
    }, [registeredIds]);

    useEffect(() => {
        fetchMyEvents();
    }, [fetchMyEvents]);

    return { events, loading, refetch: fetchMyEvents };
};
