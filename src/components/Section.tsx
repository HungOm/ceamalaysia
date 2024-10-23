interface SectionProps {
    title?: string
    children: React.ReactNode
    className?: string
  }
  
  export default function Section({ title, children, className = "" }: SectionProps) {
    return (
      <section className={`py-12 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {title && <h2 className="text-3xl font-bold mb-8">{title}</h2>}
          {children}
        </div>
      </section>
    )
  }