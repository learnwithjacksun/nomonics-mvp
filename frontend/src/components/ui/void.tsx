import { Info } from "lucide-react";

export default function Void({title}: {title: string}) {
  return (
    <div className="w-full md:w-1/2 mx-auto bg-background shadow-lg p-6 border border-line flex flex-col items-center justify-center gap-4 mt-10">
        <div className="bg-primary-2/10  rounded-full h-20 w-20 flex items-center justify-center">
            <Info size={50} className="text-primary-2" />
        </div>
            <h2 className="text-2xl font-bold text-center">{title}</h2>
            <p className="text-muted text-center">
                This page features a collection of comics that are currently trending and popular. However, its not available yet.
            </p>
    </div>
  )
}