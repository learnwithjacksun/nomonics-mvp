import { ComicCard } from "../ui"

interface FeatureProps{
    title: string
}

export default function Feature({title}: FeatureProps) {
  return (
    <div className="space-y-4">
        <h2 className="text-xl font-semibold uppercase">{title}</h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            <ComicCard/>
            <ComicCard/>
            <ComicCard/>
            <ComicCard/>
            <ComicCard/>
            <ComicCard/>
        </div>
    </div>
  )
}
