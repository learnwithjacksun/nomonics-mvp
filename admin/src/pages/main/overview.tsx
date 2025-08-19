import { MainLayout } from "@/layouts";
import { useAdmin, useComics } from "@/hooks";
import {
  Book,
  BookUser,
  CircleArrowOutUpRight,
  CircleDollarSign,
  ClockFading,
  CreditCard,
  UserRoundPen,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { Feature } from "@/components/main";

export default function Overview() {
  const { users, transactions, balance } = useAdmin();
  const { allComics, isAllComicsLoading } = useComics();

  const stats = [
    {
      title: "Total Revenue",
      value: balance,
      icon: <CircleDollarSign size={20} />,
      isMoney: true,
      link: "/revenue",
    },
    {
      title: "Total Users",
      value: users?.length,
      icon: <UsersRound size={20} />,
      isMoney: false,
      link: "/users",
    },
    {
      title: "Total Readers",
      value: users?.filter((user) => user.role === "reader").length,
      icon: <BookUser size={20} />,
      isMoney: false,
      link: "/users?type=reader",
    },
    {
      title: "Total Creators",
      value: users?.filter((user) => user.role === "creator").length,
      icon: <UserRoundPen size={20} />,
      isMoney: false,
      link: "/users?type=creator",
    },
    {
      title: "Total Comics",
      value: allComics?.length,
      icon: <Book size={20} />,
      isMoney: false,
      link: "/comics",
    },
    {
      title: "Pending Comics",
      value: allComics?.filter((comic) => comic.status === "pending").length,
      icon: <ClockFading size={20} />,
      isMoney: false,
      link: "/comics?status=pending",
    },
    {
      title: "Total Transactions",
      value: transactions?.length,
      icon: <CreditCard size={20} />,
      isMoney: false,
      link: "/transactions",
    },
    {
      title: "Pending Withdrawals",
      value: 0,
      icon: <CircleArrowOutUpRight size={20} />,
      isMoney: false,
      link: "/withdrawals?status=pending",
    },
  ];
  return (
    <MainLayout title="Overview" description="Manage your comics and users">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-background space-y-2 shadow-lg rounded-lg border border-line"
          >
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-md bg-primary-2/10 text-primary-2 flex items-center justify-center">
                  {stat.icon}
                </div>
                <h3 className=" text-muted font-medium">{stat.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">
                  {stat.isMoney ? (
                    <CountUp
                      end={stat.value || 0}
                      decimals={2}
                      prefix="₦"
                      separator=","
                    />
                  ) : (
                    <CountUp end={stat.value || 0} decimals={0} separator="," />
                  )}
                </span>
              </div>
            </div>
            <Link
              to={stat.link}
              className="btn bg-primary/10 text-primary-2 py-2 w-full"
            >
              View
            </Link>
          </div>
        ))}
      </div>

      <Feature
        title="Recent Comics"
        comics={allComics}
        isLoading={isAllComicsLoading}
      />
    </MainLayout>
  );
}
