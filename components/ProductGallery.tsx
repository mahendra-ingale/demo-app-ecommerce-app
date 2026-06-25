import React from 'react'

export default function ProductGallery({ children }: { children: React.ReactNode }) {
  return (
    <section className="space-y-8">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {children}
      </div>
    </section>
  )
}
