
import { useRegistrationStore } from '@/store/useRegistrationStore';
import { useNotification } from '@/context/NotificationContext';

export const useRegisterEvent = () => {
    const { addRegisteredId, registeredIds } = useRegistrationStore();
    const { showNotification } = useNotification();

    const registerEvent = async (activityId: number) => {
        if (registeredIds.includes(activityId)) {
            showNotification('คุณลงทะเบียนกิจกรรมนี้ไปแล้ว', 'error');
            return false;
        }

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            addRegisteredId(activityId);
            showNotification('ลงทะเบียนสำเร็จ!', 'success');
            return true;
        } catch (error) {
            console.error('Registration failed:', error);
            showNotification('เกิดข้อผิดพลาดในการลงทะเบียน', 'error');
            return false;
        }
    };

    return { registerEvent };
};
