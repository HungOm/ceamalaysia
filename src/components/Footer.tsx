import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CEAM</h3>
            <p className="text-gray-300">
              Supporting K'cho and Chin refugees in Malaysia
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-white">
                About Us
              </Link>
              <Link href="/initiatives" className="block text-gray-300 hover:text-white">
                Our Initiatives
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-300">Kuala Lumpur, Malaysia</p>
            <p className="text-gray-300">contact@ceamalaysia.org</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
