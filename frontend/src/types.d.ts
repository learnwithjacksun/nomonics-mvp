interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  type: string;
  label?: string;
  error?: string;
}
interface InputWithoutIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label?: string;
  error?: string;
}

interface ButtonWithLoaderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  initialText: string;
  loadingText: string;
}

interface SelectWithIconProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon: React.ReactNode;
  label?: string;
  error?: string;
  defaultValue?: string;
  options: {
    label: string;
    value: string;
  }[];
}

interface SelectWithoutIconProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  defaultValue?: string;
  options: {
    label: string;
    value: string;
  }[];
}

interface IUser {
  id: string; 
  name: string;
  email: string;
  role: "reader" | "creator";
  phone?: string;
  address?: string;
  country?: string;
  city?: string;
  state?: string;
  gender?: string;
  dob?: string | Date;
  credits: number;
  earnings: number;
  isEmailVerified: boolean;
  image: string;
  isAdmin: boolean;
  preferences: {
    sendEmail: boolean;
  };
  createdAt: Date; 
  updatedAt: Date; 
}

type ObjectId = string;



interface IComment {
  id: ObjectId;
  chapter: IChapter; 
  user: IUser;
  comment: string;
  likes: IUser[];
  replies: IComment[]; 
  createdAt: Date;
  updatedAt: Date;
}


interface IChapter {
  id: ObjectId;
  comic: ObjectId;
  comicUploaded: {
    url: string;
    publicId: string;
  };
  title: string;
  chapterNumber: number;
  readTime: number;
  comments:  IComment[];
  createdAt: Date;
  updatedAt: Date;
}


  interface IComic {
  id: ObjectId;
  creator: IUser;
  title: string;
  synopsis: string;
  genre: string[];
  coverImage: {
    url: string;
    publicId: string;
  };
  status: "pending" | "approved" | "rejected";
  type: "free" | "paid";
  credit: number;
  chapters: IChapter[];
  likes: IUser[];
  subscribers: IUser[];
  format: "pdf" | "image";
  createdAt: Date;
  updatedAt: Date;
}

interface ITransaction {
  id: ObjectId;
  user: IUser;
  title: string;
  description: string;
  type: "credit" | "debit";
  amount: number;
  status: "pending" | "success" | "failed";
  reference: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IProduct {
  id: ObjectId;
  name: string;
  price: number;
  contact: string;
  description: string;
  image: string;
  category: string;
  vendorType: "local" | "nomonics";
  createdBy: IUser;
  createdAt: Date;
  updatedAt: Date;
}
