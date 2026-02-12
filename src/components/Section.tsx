interface SectionProps {
  title?: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  containerClass?: string
  titleClass?: string
  center?: boolean
  variant?: 'default' | 'alternate' | 'brand' | 'transparent'
  id?: string
}

export default function Section({
  title,
  subtitle,
  children,
  className = "",
  containerClass = "",
  titleClass = "",
  center = false,
  variant = 'default',
  id
}: SectionProps) {
  const variantClasses = {
    default: 'section-default',
    alternate: 'section-alternate',
    brand: 'section-brand',
    transparent: 'bg-transparent'
  }

  return (
    <section id={id} className={`py-20 md:py-24 ${variantClasses[variant]} ${className}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClass}`}>
        {(title || subtitle) && (
          <div className={`mb-16 ${center ? 'text-center' : ''} animate-fade-in`}>
            {title && (
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${variant === 'brand' ? 'text-white' : (titleClass || 'text-gray-900')
                }`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${variant === 'brand' ? 'text-blue-100' : 'text-gray-600'
                }`}>
                {subtitle}
              </p>
            )}
            {center && <div className={`h-1.5 w-24 rounded-full mt-6 mx-auto ${variant === 'brand' ? 'bg-white/30' : 'bg-blue-600'
              }`} />}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}