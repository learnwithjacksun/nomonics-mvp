import { Feature, Hero, HorizontalScroll } from "@/components/main";
import { useComics } from "@/hooks";
import { MainLayout } from "@/layouts";

export default function Home() {
  const {newReleaseComics, isNewReleaseComicsLoading, trendingComics, isTrendingComicsLoading, freeComics, isFreeComicsLoading} = useComics();
 
  return (
    <MainLayout>
      <Hero />
      <HorizontalScroll />
      <Feature title="New Releases" comics={newReleaseComics} isLoading={isNewReleaseComicsLoading} />
      <Feature title="Trending" comics={trendingComics} isLoading={isTrendingComicsLoading} />
      <Feature title="Free Comics" comics={freeComics} isLoading={isFreeComicsLoading} />
    </MainLayout>
  );
}
