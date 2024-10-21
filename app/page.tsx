import HomePageHeader from "@/components/me/HomePageHeader";
import HomePageSecondSection from "@/components/me/HomePageSecondSection";
import HomePageThirdSection from "@/components/me/HomePageThirdSection";
import HomePageFooter from "@/components/me/HomePageFooter";
import HomePageFourthSection from "@/components/me/HomePageFourthSection";

export default function Home() {
  return (
    <div className="min-h-screen grid grid-[auto,1fr,auto]">
      <HomePageHeader />
      <HomePageSecondSection/>      
      <HomePageThirdSection/>
      <HomePageFourthSection/>
      <HomePageFooter/>
    </div>
  );
}
