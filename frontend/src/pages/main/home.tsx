import { Feature, Hero, HorizontalScroll } from "@/components/main";
import { MainLayout } from "@/layouts";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <HorizontalScroll />
      <Feature title="New Releases" />
      <Feature title="Trending" />
      <Feature title="Free Comics" />
    </MainLayout>
  );
}
