import ComicCard from "./comic-card";

interface FeatureProps {
  title: string;
}

export default function Feature({ title }: FeatureProps) {
  return (
    <div className="space-y-4 main">
      <h2 className="text-xl font-semibold uppercase">{title}</h2>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
        <ComicCard />
        <ComicCard />
        <ComicCard />
        <ComicCard />
        <ComicCard />
        <ComicCard />
      </div>
    </div>
  );
}
