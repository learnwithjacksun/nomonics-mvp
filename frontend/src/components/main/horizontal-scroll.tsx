

const items = [
    "🚀 Adventure",
    "🌍 Mystery",
    "🛰 Thriller",
    "🌕 Horror",
    "🪐 Fantasy",
    "☀️ Comedy",
    "🌟 Drama",
  ];

export default function HorizontalScroll() {
  return (
    <div className="relative overflow-hidden whitespace-nowrap w-full py-4">
      <div className="animate-scroll inline-block whitespace-nowrap">
        {[...items, ...items].map((item, index) => (
          <span key={index} className="inline-block bg-primary-2/10 text-primary-2 px-4 py-2 rounded-lg mx-4 text-md">
            {item}
          </span>
        ))}
      </div>
      <div className="absolute top-0 left-0 md:w-[100px] w-[50px] h-full bg-gradient-to-r from-background to-transparent"></div>
      <div className="absolute top-0 right-0 md:w-[100px] w-[50px] h-full bg-gradient-to-l from-background to-transparent"></div>
    </div>
  )
}
