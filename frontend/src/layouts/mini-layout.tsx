interface MiniLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function MiniLayout({
  title,
  subtitle,
  children,
}: MiniLayoutProps) {
  return (
    <div className="w-[90%] md:w-[900px] mx-auto main mt-10 space-y-4">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl md:text-4xl text-primary-2 font-bold">
          {title}
        </h1>
        <p className="text-muted">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
