export default function Box({ children, title , icon}: { children: React.ReactNode, title?: string, icon?: React.ReactNode }) {
  return (
    <>
    <div className="border border-line bg-background px-6 pt-4 pb-6 shadow-xl rounded-lg space-y-4">
      {title && <p className="text-lg text-primary-2 font-semibold flex items-center gap-2">
        {icon} {title}  
      </p>}
      <div>
        {children}
      </div>
    </div>
    </>
  )
}
