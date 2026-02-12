import Hero from '@/components/Hero'
import Section from '@/components/Section'
import Link from 'next/link'
import { Calendar, MapPin, ArrowRight, Trophy } from 'lucide-react'

export const metadata = {
    title: 'Events | K\'Cho Ethnic Association Malaysia',
    description: 'Upcoming events, cultural celebrations, and community gatherings.',
}

export default function EventsPage() {
    return (
        <>
            <Hero
                title="Events & Gatherings"
                subtitle="Celebrating our culture, strengthening our community"
                showCoverPhoto={false}
            />

            <Section className="py-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-gray-900 border-l-4 border-blue-600 pl-4">Upcoming Events</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Kumthi 2026 Card */}
                        <Link href="/events/kumthi-2026" className="group">
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                                <div className="h-48 bg-gradient-to-r from-yellow-400 to-orange-500 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/10" />
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">Cultural Festival</span>
                                        <h3 className="text-2xl font-black shadow-black drop-shadow-md">KUMTHI 2026</h3>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <Calendar className="w-4 h-4 text-blue-500" />
                                            <span>April 1st, 2026 • 10:00 AM</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <MapPin className="w-4 h-4 text-red-500" />
                                            <span>Main Hall, Kuala Lumpur</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-6 line-clamp-3">
                                        Join us for the biggest cultural celebration of the year! Featuring traditional dances, modern music, esports awards, and more.
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between text-blue-600 font-semibold group-hover:text-blue-700">
                                        <span>View Event Details</span>
                                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Kumthi Ascension Card */}
                        <Link href="/events/kumthi-ascension-26" className="group">
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                                <div className="h-48 bg-[#0a101f] relative overflow-hidden group-hover:bg-[#0f172a] transition-colors">
                                    <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-20" />
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">Esports Tournament</span>
                                        <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">KUMTHI ASCENSION '26</h3>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <Calendar className="w-4 h-4 text-blue-500" />
                                            <span>Starts March 8th, 2026</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <Trophy className="w-4 h-4 text-yellow-500" />
                                            <span>Mobile Legends & PUBG Mobile</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-6 line-clamp-3">
                                        The biggest esports event for K'Cho youth. 32 PUBG Teams. MLBB Knockouts. One Stage for Glory.
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between text-blue-600 font-semibold group-hover:text-blue-700">
                                        <span>Tournament Details</span>
                                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Placeholder for future events */}
                        <div className="bg-gray-50 rounded-2xl border border-gray-200 border-dashed flex items-center justify-center p-8 text-center h-full min-h-[400px]">
                            <div>
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Calendar className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-500 mb-2">More Events Coming Soon</h3>
                                <p className="text-gray-400 text-sm max-w-xs mx-auto">Stay tuned for updates on community gatherings and workshops.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </Section>
        </>
    )
}
