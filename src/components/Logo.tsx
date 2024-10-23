import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/cea-logo.png"
        alt="K'Cho Ethnic Association Malaysia Logo"
        width={120}
        height={40}
        priority
        className="h-10 w-auto"
      />
    </Link>
  )
}
