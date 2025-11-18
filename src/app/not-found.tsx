"use client"
import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gradient animate-float">404</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          We couldn&apos;t find the page you&apos;re looking for. It may have been moved or doesn&apos;t exist. 
          Let&apos;s get you back on track.
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Link 
            href="/" 
            className="btn-primary inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
        
        <p className="mt-12 text-sm text-gray-500">
          Need assistance? <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium underline">Contact us</Link>
        </p>
      </div>
    </div>
  )
}