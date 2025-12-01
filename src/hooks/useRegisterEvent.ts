import { useState } from 'react';
import { useRegistrationStore } from '@/store/useRegistrationStore';
import { useNotification } from '@/context/NotificationContext';

export const useRegisterEvent = () => {
    const { addRegisteredId } = useRegistrationStore();
    const { showNotification } = useNotification();
    const [registering, setRegistering] = useState(false);

    const registerEvent = async (id: number) => {
        setRegistering(true);
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ activityId: id }),
            });

            if (response.ok) {
                addRegisteredId(id);
                showNotification('ลงทะเบียนกิจกรรมสำเร็จ', 'success', 5000);
                return true;
            } else {
                showNotification('ไม่สามารถลงทะเบียนได้', 'error');
                return false;
            }
        } catch {
            showNotification('เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
            return false;
        } finally {
            setRegistering(false);
        }
    };

    return {
        registerEvent,
        registering,
    };
};
