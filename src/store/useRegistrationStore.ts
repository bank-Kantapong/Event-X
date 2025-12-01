import { create } from 'zustand';

interface RegistrationState {
    registeredIds: number[];
    setRegisteredIds: (ids: number[]) => void;
    addRegisteredId: (id: number) => void;
    removeRegisteredId: (id: number) => void;
    clearRegistrations: () => void;
}

export const useRegistrationStore = create<RegistrationState>((set) => ({
    registeredIds: [],
    setRegisteredIds: (ids) => set({ registeredIds: ids }),
    addRegisteredId: (id) => set((state) => ({ registeredIds: [...state.registeredIds, id] })),
    removeRegisteredId: (id) => set((state) => ({ registeredIds: state.registeredIds.filter((rId) => rId !== id) })),
    clearRegistrations: () => set({ registeredIds: [] }),
}));
