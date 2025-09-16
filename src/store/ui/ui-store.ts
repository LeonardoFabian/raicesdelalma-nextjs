import { create } from 'zustand';

interface State {
    isSideMenuOpen: boolean;
    isAdminSidebarOpen: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
    openAdminSidebar: () => void;
    closeAdminSidebar: () => void;
}

export const useUIStore = create<State>()((set) => ({
    isSideMenuOpen: false,
    isAdminSidebarOpen: true,
    openSideMenu: () => set({ isSideMenuOpen: true }),
    closeSideMenu: () => set({ isSideMenuOpen: false }),

    openAdminSidebar: () => set({ isAdminSidebarOpen: true }),
    closeAdminSidebar: () => set({ isAdminSidebarOpen: false }),
}))