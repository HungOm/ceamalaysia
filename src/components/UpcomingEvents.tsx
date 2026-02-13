'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Section from '@/components/Section';
import { Calendar, MapPin, ArrowRight, Trophy } from 'lucide-react';
import { eventsData, type EventData } from '@/lib/constants';

/**
 * Shared hook to filter events by date.
 * On initial render (SSR/static), returns all events for SEO.
 * After hydration (client), filters out events whose endDate has passed.
 */
function useUpcomingEvents() {
  const [events, setEvents] = useState<EventData[]>(eventsData);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const now = new Date();
    // Only show events whose endDate hasn't passed yet
    const upcoming = eventsData.filter(event => new Date(event.endDate) > now);
    setEvents(upcoming);
  }, []);

  return { events, mounted };
}


/**
 * Home page "Upcoming Events" section.
 * Renders the full section with title, "View All Events" link, grid, and event cards.
 * Entire section is hidden if no upcoming events after client-side hydration.
 */
export function HomeEventsSection() {
  const { events, mounted } = useUpcomingEvents();

  // After hydration, hide entire section if no upcoming events
  if (mounted && events.length === 0) return null;

  return (
    <Section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Upcoming Events</h2>
            <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
          </div>
          <Link href="/events" className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            View All Events <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} variant="home" />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/events" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            View All Events <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </Section>
  );
}


/**
 * Events listing page grid content.
 * Renders event cards in a responsive grid with a "More Events Coming Soon" placeholder.
 * Shows "No Upcoming Events" empty state if all events have passed.
 */
export function EventsGrid() {
  const { events, mounted } = useUpcomingEvents();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Render upcoming event cards */}
      {events.map((event) => (
        <EventCard key={event.id} event={event} variant="listing" />
      ))}

      {/* Empty state — shown when all events have passed (only after client hydration) */}
      {mounted && events.length === 0 && (
        <div className="bg-gray-50 rounded-2xl border border-gray-200 border-dashed flex items-center justify-center p-8 text-center h-full min-h-[400px] col-span-full">
          <div>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-500 mb-2">No Upcoming Events</h3>
            <p className="text-gray-400 text-sm max-w-xs mx-auto">Stay tuned for future community gatherings and celebrations.</p>
          </div>
        </div>
      )}

      {/* "More Events Coming Soon" placeholder — only visible when there are upcoming events */}
      {events.length > 0 && (
        <div className="bg-gray-50 rounded-2xl border border-gray-200 border-dashed flex items-center justify-center p-8 text-center h-full min-h-[400px]">
          <div>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-500 mb-2">More Events Coming Soon</h3>
            <p className="text-gray-400 text-sm max-w-xs mx-auto">Stay tuned for updates on community gatherings and workshops.</p>
          </div>
        </div>
      )}
    </div>
  );
}


// --- Individual Event Card ---

interface EventCardProps {
  event: EventData;
  variant: 'home' | 'listing';
}

function EventCard({ event, variant }: EventCardProps) {
  const isHome = variant === 'home';

  if (event.type === 'cultural') {
    return <CulturalCard event={event} isHome={isHome} />;
  }
  if (event.type === 'esports') {
    return <EsportsCard event={event} isHome={isHome} />;
  }
  return null;
}


// --- Cultural Event Card (e.g. Kumthi 2026) ---
// Preserved original styling from both home and events pages with variant-based sizing

function CulturalCard({ event, isHome }: { event: EventData; isHome: boolean }) {
  return (
    <Link href={event.href} className="group">
      <div className={`bg-white rounded-2xl ${isHome ? 'shadow-md' : 'shadow-lg'} overflow-hidden border border-gray-100 ${isHome ? 'hover:shadow-xl' : 'hover:shadow-2xl'} transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col`}>
        {/* Header gradient — home uses h-56/from-yellow-500, listing uses h-48/from-yellow-400 */}
        <div className={`${isHome ? 'h-56' : 'h-48'} bg-gradient-to-r ${isHome ? 'from-yellow-500' : 'from-yellow-400'} to-orange-500 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className={`absolute ${isHome ? 'bottom-6 left-6' : 'bottom-4 left-4'} text-white`}>
            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">{event.badge}</span>
            <h3 className={`${isHome ? 'text-3xl' : 'text-2xl'} font-black shadow-black drop-shadow-md`}>{event.title}</h3>
          </div>
        </div>
        {/* Card body — home uses p-8/space-y-4, listing uses p-6/space-y-3 */}
        <div className={`${isHome ? 'p-8' : 'p-6'} flex-1 flex flex-col`}>
          <div className={`${isHome ? 'space-y-4' : 'space-y-3'} mb-6`}>
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className={`${isHome ? 'w-5 h-5' : 'w-4 h-4'} text-blue-500`} />
              <span className={isHome ? 'font-medium' : ''}>{event.dateDisplay}</span>
            </div>
            {/* Location — shown only on listing variant */}
            {!isHome && event.location && (
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>{event.location}</span>
              </div>
            )}
            {/* Description inline for home variant */}
            {isHome && (
              <p className="text-gray-600 leading-relaxed">
                {event.descriptionHome}
              </p>
            )}
          </div>
          {/* Description as separate block for listing variant */}
          {!isHome && (
            <p className="text-gray-600 mb-6 line-clamp-3">
              {event.description}
            </p>
          )}
          <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between text-blue-600 font-semibold group-hover:text-blue-700">
            <span>{isHome ? event.ctaTextHome : event.ctaText}</span>
            <ArrowRight className={`${isHome ? 'w-5 h-5' : 'w-4 h-4'} transform group-hover:translate-x-1 transition-transform`} />
          </div>
        </div>
      </div>
    </Link>
  );
}


// --- Esports Event Card (e.g. Kumthi Ascension '26) ---
// Home variant: fully dark card. Listing variant: white card with dark header.

function EsportsCard({ event, isHome }: { event: EventData; isHome: boolean }) {
  return (
    <Link href={event.href} className="group">
      <div className={`${isHome ? 'bg-[#0a101f] border-gray-800 hover:border-blue-700' : 'bg-white border-gray-100'} rounded-2xl ${isHome ? 'shadow-md hover:shadow-xl' : 'shadow-lg hover:shadow-2xl'} overflow-hidden border transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col`}>
        {/* Dark header — home uses h-56 with lighter hover, listing uses h-48 */}
        <div className={`${isHome ? 'h-56 bg-[#0f172a] group-hover:bg-[#1e293b]' : 'h-48 bg-[#0a101f] group-hover:bg-[#0f172a]'} relative overflow-hidden transition-colors`}>
          <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-20" />
          <div className={`absolute ${isHome ? 'bottom-6 left-6' : 'bottom-4 left-4'} text-white`}>
            <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">{event.badge}</span>
            <h3 className={`${isHome ? 'text-3xl' : 'text-2xl'} font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300`}>{event.title}</h3>
          </div>
        </div>
        {/* Card body — text colors differ between home (dark bg) and listing (white bg) */}
        <div className={`${isHome ? 'p-8' : 'p-6'} flex-1 flex flex-col`}>
          <div className={`${isHome ? 'space-y-4' : 'space-y-3'} mb-6`}>
            {/* Calendar date — shown only on listing variant */}
            {!isHome && (
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>{event.dateDisplay}</span>
              </div>
            )}
            <div className={`flex items-center gap-3 ${isHome ? 'text-gray-400' : 'text-gray-600'}`}>
              <Trophy className={`${isHome ? 'w-5 h-5' : 'w-4 h-4'} text-yellow-500`} />
              <span className={isHome ? 'font-medium text-gray-300' : ''}>{event.secondaryInfo}</span>
            </div>
            {/* Description inline for home variant */}
            {isHome && (
              <p className="text-gray-400 leading-relaxed">
                {event.descriptionHome}
              </p>
            )}
          </div>
          {/* Description as separate block for listing variant */}
          {!isHome && (
            <p className="text-gray-600 mb-6 line-clamp-3">
              {event.description}
            </p>
          )}
          <div className={`mt-auto pt-6 border-t ${isHome ? 'border-gray-800 text-blue-400 group-hover:text-blue-300' : 'border-gray-50 text-blue-600 group-hover:text-blue-700'} flex items-center justify-between font-semibold`}>
            <span>{isHome ? event.ctaTextHome : event.ctaText}</span>
            <ArrowRight className={`${isHome ? 'w-5 h-5' : 'w-4 h-4'} transform group-hover:translate-x-1 transition-transform`} />
          </div>
        </div>
      </div>
    </Link>
  );
}
