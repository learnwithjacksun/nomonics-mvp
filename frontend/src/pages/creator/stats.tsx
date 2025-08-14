import { Box } from "@/components/ui";
import { useAuth, useComics } from "@/hooks";
import { MainLayout } from "@/layouts";
import { ArrowRightLeft, BookCheck, BookOpen, BookX, ShoppingBag, Star, Wallet } from "lucide-react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

export default function Stats() {
  const {user} = useAuth();
  const {creatorComics} = useComics();

  const stats = [
    {
      icon: BookOpen,
      title: "Total Comics",
      value: creatorComics?.length || 0,
    },
    {
      icon: BookCheck,
      title: "Active Comics",
      value: creatorComics?.filter((comic) => comic.status === "approved").length || 0,
    },
    {
      icon: BookX,
      title: "Pending Comics",
      value: creatorComics?.filter((comic) => comic.status === "pending").length || 0,
    },
    {
      icon: ShoppingBag,
      title: "Total Products",
      value: 0,
    },
  ]
  return (
    <MainLayout>
      <div className="w-full md:w-[900px] mx-auto main mt-10 space-y-4">
          <div className="space-y-4 text-center">
            <h1 className="text-2xl md:text-4xl text-primary-2 font-bold">
              Stats and Earnings
            </h1>
            <p className="text-muted">
              View your stats or withdraw your earnings
            </p>
          </div>

          <Box>
            <div className="flex items-center justify-between flex-col md:flex-row gap-4">
              <div className="border border-primary-2/10 bg-primary-2/2 p-4 space-y-2 md:space-y-4 rounded-lg w-full">
                <div className="flex items-center gap-2">
                  <Wallet size={20}/>
                  <span className="text-muted">Total Earnings</span>
                </div>
                <p className="text-primary-2 font-bold text-3xl md:text-4xl">
                  <CountUp end={user?.earnings || 0} prefix="₦" decimals={2} separator="," />
                </p>
              </div>
              <div className="h-10 min-w-10 bg-primary/10 center rounded-full">
                <ArrowRightLeft/>
              </div>
              <div className="border border-primary-2/10 bg-primary-2/2 p-4 space-y-2 md:space-y-4 rounded-lg w-full">
                <div className="flex items-center gap-2">
                  <Star size={20}/>
                  <span className="text-muted">Total Credits</span>
                </div>
                <p className="text-primary-2 font-bold text-3xl md:text-4xl">
                  <CountUp end={user?.credits || 0} />
                </p>
              </div>
            </div>
          </Box>

          <div className="center gap-4">
            <Link to="/" className="btn btn-primary h-10 px-4 w-full md:w-[200px] rounded-lg">
            Withdraw
            </Link>
            <Link to="/" className="btn border border-line bg-primary-2 text-white w-full md:w-[200px] h-10 px-4 rounded-lg">
            Purchase Credit
            </Link>
          </div>

          <Box title="Stats">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.title} className="border border-primary-2/10 bg-primary-2/2 p-4 space-y-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="center h-10 w-10 bg-primary/10 rounded-md">
                      <stat.icon size={20}/>
                    </div>
                      <p className="text-muted">{stat.title}</p>
                  </div>
                  <p className="text-primary-2 font-bold text-3xl md:text-4xl">
                    <CountUp end={stat.value} duration={2.7} />
                  </p>
                </div>
              ))}
            </div>
          </Box>
      </div>
    </MainLayout>
  )
}
