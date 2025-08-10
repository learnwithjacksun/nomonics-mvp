import { BookOpen, Boxes, Library, Play, ShoppingCart } from "lucide-react";

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