import { Footer, Header } from "@/components/main";
import { Background } from "@/components/ui";


interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function MainLayout({
  children,
  title,
  subtitle,
}: MainLayoutProps) {
  return (
    <>
      <Background>
        <Header />
        <main className="space-y-6">
          {title && (
            <div className="mt-6 main">
              <h1 className="text-2xl font-bold">{title}</h1>
              {subtitle && <p className="text-muted">{subtitle}</p>}
            </div>
          )}

          <div className="space-y-10 pb-10">{children}</div>
        </main>
        <Footer />
      </Background>

     
    </>
  );
}
