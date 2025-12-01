import ContainerWrapper from "@/components/ContainerWrapper";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import HeroSection from "@/components/HeroSection";
import PopularActivities from "@/components/PopularActivities";
import { useNavigation, TABS } from "@/hooks/useNavigation";
import EventListView from "@/components/views/EventListView";
import MyEventsView from "@/components/views/MyEventsView";

const Home = () => {
  const { activeMenu } = useNavigation();

  return (
    <ContainerWrapper>
      <Head>
        <title>Event X</title>
      </Head>
      <header>
        <Navbar />
      </header>

      <main className="flex-1">
        {activeMenu === TABS.HOME && (
          <>
            <HeroSection />
            <PopularActivities />
          </>
        )}
        {activeMenu === TABS.EVENT_LIST && <EventListView />}
        {activeMenu === TABS.MY_EVENT && <MyEventsView />}
      </main>

      <footer className="py-8 text-center text-sm text-black border-t border-black mt-8">
        © 2025 Event X. All rights reserved.
      </footer>
    </ContainerWrapper>
  );
};

export default Home;
