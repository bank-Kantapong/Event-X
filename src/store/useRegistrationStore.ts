import { create } from 'zustand';

interface RegistrationState {
    registeredIds: number[];
    setRegisteredIds: (ids: number[]) => void;
    addRegisteredId: (id: number) => void;
}

export const useRegistrationStore = create<RegistrationState>((set) => ({
    registeredIds: [],
    setRegisteredIds: (ids) => set({ registeredIds: ids }),
    addRegisteredId: (id) => set((state) => ({ registeredIds: [...state.registeredIds, id] })),
}));
