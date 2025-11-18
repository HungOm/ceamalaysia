interface SectionProps {
  title?: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  containerClass?: string
  titleClass?: string
  center?: boolean
}

export default function Section({ 
  title, 
  subtitle,
  children, 
  className = "", 
  containerClass = "",
  titleClass = "",
  center = false
}: SectionProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClass}`}>
        {(title || subtitle) && (
          <div className={`mb-12 ${center ? 'text-center' : ''}`}>
            {title && (
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${titleClass || 'text-gray-900'}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}