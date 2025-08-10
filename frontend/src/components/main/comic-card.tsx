
export default function ComicCard() {
  return (
    <div className="relative overflow-hidden">
         <img 
            src="/poster.jpg" 
            alt="The Amazing Spider-Man" 
            className="w-full h-full object-cover" 
            style={{ aspectRatio: '1/1.414' }} // A4 proportions (1:√2)
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-10">
            <p className="text-white text-sm font-semibold relative z-20">The Amazing Spiderman</p>
          </div>
    </div>
  )
}
