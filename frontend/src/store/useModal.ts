import { create } from "zustand";

interface ModalState {
    isOpen: boolean,
    toggleOpen: (state: boolean) => Promise<void>;
}

export const useModal = create<ModalState>((set, get) => ({
    isOpen: false,
    toggleOpen: async (state: boolean) => {
        set({ isOpen: state })
    }
}
))