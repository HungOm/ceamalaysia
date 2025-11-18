import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'default' | 'white'
  showText?: boolean
  className?: string
}

export default function Logo({ variant = 'default', showText = true, className = '' }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      <div className="relative">
        <Image
          src={variant === 'white' ? "/images/cea-logo-white.png" : "/images/cea-logo.png"}
          alt="K'Cho Ethnic Association Malaysia"
          width={48}
          height={48}
          priority
          className={`h-12 w-12 object-contain group-hover:scale-105 transition-transform ${
            variant === 'white' ? 'brightness-0 invert' : ''
          }`}
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-xl leading-tight ${variant === 'white' ? 'text-white' : 'text-blue-900'}`}>
            CEAM
          </span>
          <span className={`text-xs ${variant === 'white' ? 'text-gray-300' : 'text-blue-600'}`}>
            K&apos;Cho Ethnic Association Malaysia
          </span>
        </div>
      )}
    </Link>
  )
}