"use client"
import { Facebook, Twitter, Linkedin, Link2, Check } from 'lucide-react'
import { useState } from 'react'

interface SocialShareProps {
  url?: string
  title?: string
  description?: string
}

export default function SocialShare({ 
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = "K'Cho Ethnic Association Malaysia",
  description = "Supporting K'Cho refugees in Malaysia"
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`,
  }
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-600">Share:</span>
      <div className="flex items-center gap-2">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-blue-600 hover:text-white transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-blue-400 hover:text-white transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-blue-700 hover:text-white transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <button
          onClick={copyToClipboard}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-700 hover:text-white transition-colors"
          aria-label="Copy link"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Link2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  )
}