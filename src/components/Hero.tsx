import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

interface HeroProps {
  title: string
  subtitle: string
  subtitleKCho?: string
  showCoverPhoto?: boolean
  showScrollIndicator?: boolean
  ctaButtons?: Array<{
    text: string
    href: string
    variant?: 'primary' | 'secondary'
  }>
}

export default function Hero({ 
  title, 
  subtitle,
  subtitleKCho,
  showCoverPhoto = false,
  showScrollIndicator = true,
  ctaButtons = []
}: HeroProps) {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {showCoverPhoto && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/cover-photo.png"
              alt="K'Cho community gathering"
              fill
              priority
              className="object-cover"
              quality={100}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-blue-900/90 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
        </>
      )}
      
      {!showCoverPhoto && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 z-0">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full filter blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          </div>
        </div>
      )}
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
            {title}
          </h1>
          <div className="space-y-3 md:space-y-4 mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl sm:text-2xl md:text-3xl text-white font-semibold leading-relaxed">
              {subtitle}
            </p>
            {subtitleKCho && (
              <p className="text-sm sm:text-base md:text-lg text-blue-200/90 italic leading-relaxed font-light">
                <span className="text-blue-300/80">{subtitleKCho}</span>
              </p>
            )}
          </div>
          
          {ctaButtons.length > 0 && (
            <div className="flex gap-4 justify-center flex-wrap animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {ctaButtons.map((button, index) => (
                <a 
                  key={index} 
                  href={button.href}
                  className={`px-8 py-4 text-lg font-semibold rounded-lg transition-all transform hover:-translate-y-1 ${
                    button.variant === 'secondary' 
                      ? 'bg-white/20 backdrop-blur text-white border border-white/30 hover:bg-white/30' 
                      : 'bg-white text-blue-700 hover:bg-blue-50 shadow-xl'
                  }`}
                >
                  {button.text}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center items-center">
          <div className="flex flex-col items-center text-white/90 hover:text-white cursor-pointer transition-colors animate-bounce">
            <span className="text-sm font-medium mb-2">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      )}
    </div>
  )
}