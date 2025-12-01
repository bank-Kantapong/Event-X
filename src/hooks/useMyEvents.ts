import { useState, useCallback } from 'react';
import { useRegistrationStore } from '@/store/useRegistrationStore';

export const useMyEvents = () => {
    const { registeredIds, setRegisteredIds } = useRegistrationStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMyEvents = useCallback(async () => {
        // If we already have data, we might not want to fetch again immediately
        // but for now, let's allow refreshing
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/my-events');
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const data = await response.json();
            const ids = data.data.map((activity: { id: number }) => activity.id);
            setRegisteredIds(ids);
            return data.data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return [];
        } finally {
            setLoading(false);
        }
    }, [setRegisteredIds]);

    // Initial fetch if empty? 
    // The user asked "why fetch on events page?". 
    // We will NOT auto-fetch here. We will let the component decide when to fetch.
    // But to show "Registered" status, we DO need the IDs.
    // So we will provide a method to ensure data is loaded.

    return {
        registeredIds,
        fetchMyEvents,
        loading,
        error,
        isRegistered: (id: number) => registeredIds.includes(id),
    };
};
