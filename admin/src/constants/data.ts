  import { Book, CircleDollarSign, CreditCard, Home, Settings, ShoppingCart, Users } from "lucide-react";

export const libraries = [
    "React Router",
    "Tailwind CSS",
    "Lucide React",
    "React Hook Form",
    "React Query",
    "Zustand",
    "Axios",
    "Zod",
    "Sonner",
    "Framer Motion",
]

export const navLinks = [
    { label: "Overview", href: "/overview" , icon: Home},
    { label: "Revenue", href: "/revenue" , icon: CircleDollarSign},
    { label: "Users", href: "/users" , icon: Users},
    { label: "Comics", href: "/comics" , icon: Book},
    { label: "Market Place", href: "/marketplace" , icon: ShoppingCart},
    { label: "Transactions", href: "/transactions" , icon: CreditCard},
    { label: "Settings", href: "/settings" , icon: Settings},
  ];


  export const comicCategories = [
    {
      label: "Action",
      value: "action",
    },
    {
      label: "Adventure",
      value: "adventure",
    },
    {
      label: "Comedy",
      value: "comedy",
    },
    {
      label: "Drama",
      value: "drama",
    },
    {
      label: "Fantasy",
      value: "fantasy",
    },
    {
      label: "Horror",
      value: "horror",
    },
    {
      label: "Mystery",
      value: "mystery",
    },
    {
      label: "Romance",
      value: "romance",
    },
    {
      label: "Sci-Fi",
      value: "sci-fi",
    },
    {
      label: "Thriller",
      value: "thriller",
    }
  ];