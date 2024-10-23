import Image from 'next/image'

export default function SocialShare() {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-600">Share:</span>
      <Image
        src="/images/cea-social-share.png"
        alt="Share on social media"
        width={24}
        height={24}
        className="cursor-pointer hover:opacity-80"
      />
    </div>
  )
}