import { type ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="auth h-[100dvh]  overflow-y-scroll ">
      <div className="main grid md:grid-cols-2 h-[100dvh] gap-10 py-10 md:py-0">
        <div className="center">
          <Link to="/"><img src="/logo.svg" alt="logo" width={200} height={200} /></Link>
        </div>
        <div className="md:flex  items-center justify-center">
          <main className="bg-white md:p-10 px-6 py-8 rounded-3xl md:min-h-[90vh] min-h-[400px] md:w-[480px] w-full mx-auto flex flex-col">
            <div className="text-center">
              <h1 className="text-2xl text-primary-2 font-bold">{title}</h1>
              <p className="text-muted text-sm">{subtitle}</p>
            </div>
            <div className="mt-6 mb-4">{children}</div>
            <p className="text-muted text-center mt-auto text-xs">
              By continuing, you agree to accept Nomomics{" "}
              <span className="underline">Terms of Service</span> and{" "}
              <span className="underline">Privacy Policy</span>
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}
