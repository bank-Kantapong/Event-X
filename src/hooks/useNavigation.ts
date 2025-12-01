import { create } from 'zustand';
import { useRouter } from 'next/router';

export enum TABS {
    HOME = "home",
    EVENT_LIST = "eventList",
    MY_EVENT = "myEvent",
}

export const allTabs = [
    {
        id: TABS.HOME,
        name: "หน้าแรก",
    },
    {
        id: TABS.EVENT_LIST,
        name: "รายการกิจกรรม",
    },
    {
        id: TABS.MY_EVENT,
        name: "กิจกรรมของฉัน",
    },
];

interface NavigationState {
    activeTab: TABS;
    setActiveTab: (tab: TABS) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
    activeTab: TABS.HOME,
    setActiveTab: (tab) => set({ activeTab: tab }),
}));



export const useNavigation = () => {
    const { activeTab, setActiveTab } = useNavigationStore();
    const router = useRouter();

    const navigateToTab = (tabId: TABS) => {
        setActiveTab(tabId);
        if (router.pathname !== '/') {
            router.push('/');
        }
    };

    return {
        activeMenu: activeTab,
        navigateToTab,
        tabs: allTabs,
    };
};
