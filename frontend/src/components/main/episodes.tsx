import { EpisodeCard } from '../ui'

export default function Episodes() {
  return (
    <div className="space-y-4">
    <h2 className="text-xl font-semibold uppercase">Chapters</h2>
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        <EpisodeCard/>
        <EpisodeCard/>
    </div>
</div>
  )
}
