import { Book, BookOpen, Boxes, CircleDollarSign, CreditCard, Home, Library, Play, ShoppingCart, Users } from "lucide-react";

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
    { label: "E-Comics", href: "/" , icon: BookOpen},
    { label: "Categories", href: "/categories" , icon: Boxes},
    { label: "Market Place", href: "/marketplace" , icon: ShoppingCart},
    { label: "Library", href: "/library" , icon: Library},
    { label: "Reel flow", href: "/reel-flow" , icon: Play},
  ];
export const creatorNavLinks = [
    { label: "E-Comics", href: "/" , icon: BookOpen},
    { label: "Categories", href: "/categories" , icon: Boxes},
    { label: "Market Place", href: "/marketplace" , icon: ShoppingCart},
    { label: "My Comics", href: "/creator/comics" , icon: Library},
    { label: "Reel Flow", href: "/reel-flow" , icon: Play},
  ];

  export const adminNavLinks = [
    { label: "Overview", href: "/admin/overview" , icon: Home},
    { label: "Revenue", href: "/admin/revenue" , icon: CircleDollarSign},
    { label: "Users", href: "/admin/users" , icon: Users},
    { label: "Comics", href: "/admin/comics" , icon: Book},
    { label: "Transactions", href: "/admin/transactions" , icon: CreditCard},
    { label: "Market Place", href: "/admin/marketplace" , icon: ShoppingCart},
  ];



  export const accountTypes = [
    {
      label: "reader",
      description: "For readers who want to explore and read comics",
    },
    {
      label: "creator",
      description: "For creators who want to upload and manage their comics",
    },
  ];

  export const genres = [
    "all",
    "adventure",
    "action",
    "superhero",
    "comedy",
    "drama",
    "fantasy",
    "sci-fi",
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