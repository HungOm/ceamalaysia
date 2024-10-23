import Image from 'next/image'

interface HeroProps {
    title: string
    subtitle: string
    showCoverPhoto?: boolean
  }
  
  
  export default function Hero({ title, subtitle, showCoverPhoto = false }: HeroProps) {
    return (
      <div className="relative bg-blue-700 text-white">
        {showCoverPhoto && (
          <div className="absolute inset-0">
            <Image
              src="/images/cover-photo.png"
              alt="K'Cho community cover photo"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-blue-900/70" />
          </div>
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-xl md:text-2xl">{subtitle}</p>
          </div>
        </div>
      </div>
    )
  }
  