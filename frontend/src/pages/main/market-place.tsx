import { ProductCard } from '@/components/ui'
import { MainLayout } from '@/layouts'
import { useState } from 'react'

const fltBtns = [
  {
      id: "nomonics",
      title: "Nomonics",
  },
  {
      id: "vendors",
      title: "Local Vendors",
  },
]

export default function MarketPlace() {
  const [selectedBtn, setSelectedBtn] = useState("nomonics")
  const handleFilter = (id: string) => {
      setSelectedBtn(id)
  }
  return (
   <MainLayout title="Market Place" subtitle="Buy and sell comics all on Nomonics">
<div className="flex items-center gap-4">
                {fltBtns.map((btn) => (
                    <button key={btn.id} onClick={() => handleFilter(btn.id)} className={`flex items-center gap-2 border-b-2 ${selectedBtn === btn.id ? "border-primary-2 text-primary-2" : "border-transparent bg-background text-muted shadow-lg"} p-4`}>
                        {btn.title}
                    </button>
                ))}
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ProductCard />
                <ProductCard />
            </div>
   </MainLayout>
  )
}
