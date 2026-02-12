'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import Section from '@/components/Section'
import Link from 'next/link'
import Image from 'next/image'
import {
    Calendar, Clock, MapPin, Music, Zap, Users, Trophy, Star,
    Sparkles, Mic, Monitor, Heart, ArrowRight, ArrowDown,
    Play, Volume2, Camera, Gift, ChevronRight
} from 'lucide-react'

/* ═══════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════ */

function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el) } },
            { threshold }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [threshold])
    return { ref, inView }
}

function useParallax(speed = 0.2) {
    const ref = useRef<HTMLDivElement>(null)
    const [offset, setOffset] = useState(0)
    useEffect(() => {
        const onScroll = () => {
            if (!ref.current) return
            const rect = ref.current.getBoundingClientRect()
            setOffset((rect.top / window.innerHeight) * 100 * speed)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [speed])
    return { ref, offset }
}

function useCountdown(target: string) {
    const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    useEffect(() => {
        const tick = () => {
            const d = new Date(target).getTime() - Date.now()
            if (d <= 0) { setT({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return }
            setT({
                days: Math.floor(d / 86400000),
                hours: Math.floor((d % 86400000) / 3600000),
                minutes: Math.floor((d % 3600000) / 60000),
                seconds: Math.floor((d % 60000) / 1000),
            })
        }
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [target])
    return t
}

function useCounter(target: number, dur = 2000, active = false) {
    const [c, setC] = useState(0)
    useEffect(() => {
        if (!active) return
        let v = 0
        const step = target / (dur / 16)
        const id = setInterval(() => {
            v += step
            if (v >= target) { setC(target); clearInterval(id) }
            else setC(Math.floor(v))
        }, 16)
        return () => clearInterval(id)
    }, [target, dur, active])
    return c
}

function useMouse() {
    const ref = useRef<HTMLDivElement>(null)
    const [pos, setPos] = useState({ x: 0.5, y: 0.5 })
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect()
            setPos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height })
        }
        el.addEventListener('mousemove', onMove)
        return () => el.removeEventListener('mousemove', onMove)
    }, [])
    return { ref, pos }
}

/* ═══════════════════════════════════════════════════════
   ANIMATION COMPONENTS
   ═══════════════════════════════════════════════════════ */

function Reveal({ children, delay = 0, direction = 'up', className = '' }: {
    children: React.ReactNode; delay?: number; direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none'; className?: string
}) {
    const { ref, inView } = useInView(0.08)
    const transforms: Record<string, string> = {
        up: 'translateY(50px)', down: 'translateY(-50px)',
        left: 'translateX(-50px)', right: 'translateX(50px)',
        scale: 'scale(0.9)', none: 'none',
    }
    return (
        <div ref={ref} className={className} style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : transforms[direction],
            transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        }}>
            {children}
        </div>
    )
}

// Warm-toned floating particles (embers / sparks)
function Embers({ count = 25 }: { count?: number }) {
    const embers = useRef(
        Array.from({ length: count }, () => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            dur: Math.random() * 12 + 8,
            delay: Math.random() * 8,
            op: Math.random() * 0.5 + 0.2,
            hue: Math.random() * 40 + 20, // warm orange-gold
        }))
    ).current
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {embers.map((e, i) => (
                <div key={i} className="absolute rounded-full animate-ember" style={{
                    width: e.size, height: e.size, left: `${e.x}%`, top: `${e.y}%`,
                    background: `hsl(${e.hue}, 100%, 65%)`,
                    opacity: e.op,
                    animationDuration: `${e.dur}s`,
                    animationDelay: `${e.delay}s`,
                    filter: `blur(${e.size > 2 ? 1 : 0}px)`,
                }} />
            ))}
        </div>
    )
}

// Decorative SVG weave pattern (K'Cho textile inspired)
function WeavePattern({ className = '', opacity = 0.04 }: { className?: string; opacity?: number }) {
    return (
        <svg className={`absolute inset-0 w-full h-full ${className}`} style={{ opacity }} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
                <pattern id="weave" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="0.6" className="text-amber-400" />
                    <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="0.3" className="text-orange-300" />
                </pattern>
                <pattern id="weave2" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
                    <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="0.6" className="text-amber-400" />
                    <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="0.3" className="text-orange-300" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#weave)" />
            <rect width="100%" height="100%" fill="url(#weave2)" />
        </svg>
    )
}

// Horizontal scroll container for program phases
function HorizontalScroll({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const updateScrollState = useCallback(() => {
        const el = scrollRef.current
        if (!el) return
        setCanScrollLeft(el.scrollLeft > 10)
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
    }, [])

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        el.addEventListener('scroll', updateScrollState, { passive: true })
        updateScrollState()
        return () => el.removeEventListener('scroll', updateScrollState)
    }, [updateScrollState])

    const scroll = useCallback((dir: number) => {
        scrollRef.current?.scrollBy({ left: dir * 350, behavior: 'smooth' })
    }, [])

    return (
        <div className={`relative group ${className}`}>
            {canScrollLeft && (
                <button onClick={() => scroll(-1)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
                    <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
            )}
            <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {children}
            </div>
            {canScrollRight && (
                <button onClick={() => scroll(1)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
                    <ChevronRight className="w-5 h-5" />
                </button>
            )}
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-[#0d0806] to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-[#0d0806] to-transparent pointer-events-none z-10" />
        </div>
    )
}

// Magnetic hover card
function MagneticCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const [style, setStyle] = useState({})
    const onMove = useCallback((e: React.MouseEvent) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        setStyle({
            transform: `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(10px)`,
        })
    }, [])
    const onLeave = useCallback(() => {
        setStyle({ transform: 'perspective(600px) rotateY(0) rotateX(0) translateZ(0)' })
    }, [])
    return (
        <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className}
            style={{ ...style, transition: 'transform 0.25s ease', willChange: 'transform' }}>
            {children}
        </div>
    )
}

// Animated divider
function WaveDivider({ flip = false, color = '#0d0806' }: { flip?: boolean; color?: string }) {
    return (
        <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`}>
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
                <path d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z" fill={color} />
            </svg>
        </div>
    )
}

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const programPhases = [
    {
        phase: 1, name: 'Energy Hook', duration: '~20 min', color: '#FF6B35', icon: '⚡',
        items: [
            { time: '2 min', name: 'MC Quick Welcome', energy: 'medium' },
            { time: '8 min', name: 'Male Group Dance (Mindat)', energy: 'high' },
            { time: '5 min', name: 'Opening Prayer', energy: 'low' },
            { time: '5 min', name: 'Welcome Speech', energy: 'medium' },
        ]
    },
    {
        phase: 2, name: 'Cultural Tapestry', duration: '~35 min', color: '#4ECDC4', icon: '🎭',
        items: [
            { time: '7 min', name: 'Children\'s Peace Song', energy: 'emotional' },
            { time: '10 min', name: 'Kanpetlet Performance', energy: 'medium' },
            { time: '8 min', name: 'Band Set 1 (2 songs)', energy: 'high' },
            { time: '10 min', name: 'Mindat Performance', energy: 'medium' },
        ]
    },
    {
        phase: 3, name: 'Modern + Tradition', duration: '~31 min', color: '#A78BFA', icon: '🎮',
        items: [
            { time: '5 min', name: 'Esports Awards', energy: 'medium' },
            { time: '10 min', name: 'Dai/Daai Performance', energy: 'medium' },
            { time: '8 min', name: 'Female Traditional Dance', energy: 'graceful' },
            { time: '8 min', name: 'Band Set 2 (Sing-along!)', energy: 'high' },
        ]
    },
    {
        phase: 4, name: 'Showcase & Message', duration: '~36 min', color: '#F472B6', icon: '👗',
        items: [
            { time: '15 min', name: 'Cultural Fashion Show', energy: 'high' },
            { time: '12 min', name: 'Main Keynote Speech', energy: 'medium' },
            { time: '5 min', name: 'Shelter Documentary', energy: 'emotional' },
            { time: '4 min', name: 'Band Set 3 (Uplift)', energy: 'high' },
        ]
    },
    {
        phase: 5, name: 'Celebration Finale', duration: '~20 min', color: '#FBBF24', icon: '🎉',
        items: [
            { time: '15 min', name: 'Grand Lucky Draw', energy: 'peak' },
            { time: '5 min', name: 'Closing Remarks', energy: 'warm' },
        ]
    },
]

const highlights = [
    { icon: Users, title: 'Traditional Dances', desc: 'Witness the powerful Mindat warrior dances and graceful performances showcasing our rich K\'Cho heritage across three regions.', color: 'amber', gradient: 'from-amber-600 to-orange-600' },
    { icon: Star, title: 'Cultural Fashion Show', desc: 'A spectacular runway display of traditional attire from K\'Cho regions, blending history with modern elegance.', color: 'rose', gradient: 'from-rose-600 to-pink-600' },
    { icon: Music, title: 'Live Concert', desc: 'Three band sets throughout the event featuring traditional folk songs and modern hits, including an audience sing-along.', color: 'sky', gradient: 'from-sky-600 to-blue-600' },
    { icon: Heart, title: 'Community Unity', desc: 'K\'Cho people from Mindat, Kanpetlet, and Dai/Daai regions gathering to celebrate shared identity and strengthen bonds.', color: 'emerald', gradient: 'from-emerald-600 to-teal-600' },
    { icon: Sparkles, title: 'Grand Lucky Draw', desc: 'From small gifts to the grand prize — 15 chances to win. Must be present! The perfect high-energy finale.', color: 'yellow', gradient: 'from-yellow-500 to-amber-600' },
    { icon: Camera, title: 'Shelter Documentary', desc: 'An emotional screening showcasing CEAM Shelter\'s mission: providing safety, dignity and protection to the most vulnerable.', color: 'violet', gradient: 'from-violet-600 to-purple-600' },
]

/* ═══════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════ */

const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

:root {
    --gold: #D4A843;
    --amber: #F59E0B;
    --crimson: #9F1239;
    --dark: #0d0806;
    --darker: #080503;
}

/* Embers rising */
@keyframes ember {
    0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
    10% { opacity: 1; }
    50% { transform: translateY(-50vh) translateX(15px) scale(0.8); opacity: 0.8; }
    100% { transform: translateY(-100vh) translateX(-10px) scale(0.3); opacity: 0; }
}
.animate-ember { animation: ember 10s ease-out infinite; }

/* Morphing blobs */
@keyframes morph {
    0%, 100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; transform: rotate(0deg); }
    33% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; transform: rotate(60deg); }
    66% { border-radius: 30% 70% 40% 60% / 50% 60% 40% 50%; transform: rotate(120deg); }
}
.animate-morph { animation: morph 15s ease-in-out infinite; }

/* Slow pulse */
@keyframes pulse-slow {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.08); }
}
.animate-pulse-slow { animation: pulse-slow 5s ease-in-out infinite; }

/* Fade variants */
@keyframes fade-in-down { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-down { animation: fade-in-down 1s ease-out both; }
.animate-fade-in-up { animation: fade-in-up 1s ease-out both; }
.animate-fade-in { animation: fade-in-up 1s ease-out both; }
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-600 { animation-delay: 0.6s; }

/* Shimmer line */
@keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
}

/* Horizontal reveal */
@keyframes reveal-h {
    from { width: 0; }
    to { width: 100%; }
}

/* Glow breathe */
@keyframes glow-breathe {
    0%, 100% { box-shadow: 0 0 20px rgba(212,168,67,0.2), 0 0 60px rgba(212,168,67,0.05); }
    50% { box-shadow: 0 0 30px rgba(212,168,67,0.4), 0 0 80px rgba(212,168,67,0.1); }
}

/* Energy bar pulse */
@keyframes energy-pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
}

/* Bounce slow */
@keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
}
.animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }

/* Chevron bounce */
@keyframes chevron-down {
    0%, 100% { transform: translateY(0); opacity: 0.5; }
    50% { transform: translateY(6px); opacity: 1; }
}
.animate-chevron-down { animation: chevron-down 2s ease-in-out infinite; }

/* Gradient text animation */
@keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

/* Noise overlay */
.noise::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 1;
}

/* Scrollbar hide */
.scrollbar-hide::-webkit-scrollbar { display: none; }

/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--darker); }
::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--amber); }

/* Stagger children animation */
.stagger-children > * {
    opacity: 0;
    transform: translateY(20px);
    animation: fade-in-up 0.6s ease-out both;
}
.stagger-children > *:nth-child(1) { animation-delay: 0.05s; }
.stagger-children > *:nth-child(2) { animation-delay: 0.10s; }
.stagger-children > *:nth-child(3) { animation-delay: 0.15s; }
.stagger-children > *:nth-child(4) { animation-delay: 0.20s; }
.stagger-children > *:nth-child(5) { animation-delay: 0.25s; }
.stagger-children > *:nth-child(6) { animation-delay: 0.30s; }
`

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function Kumthi2026Client() {
    const countdown = useCountdown('2026-04-01T10:00:00+08:00')
    const heroMouse = useMouse()
    const heroParallax = useParallax(0.12)
    const statsRef = useInView(0.3)
    const phases = useCounter(5, 1500, statsRef.inView)
    const acts = useCounter(18, 2000, statsRef.inView)
    const regions = useCounter(3, 1000, statsRef.inView)
    const minutes = useCounter(142, 2500, statsRef.inView)

    const energyData = useMemo(() => [
        85, 95, 30, 55, // Phase 1
        60, 65, 85, 65, // Phase 2
        55, 65, 50, 90, // Phase 3
        88, 60, 40, 80, // Phase 4
        100, 50,        // Phase 5
    ], [])

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

            <div className="bg-[var(--dark)] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

                {/* ═══════════════════════════════════
                    HERO SECTION
                    ═══════════════════════════════════ */}
                <section ref={heroMouse.ref} className="relative min-h-screen flex items-center justify-center overflow-hidden noise">
                    {/* Layered BG */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a04] via-[var(--dark)] to-[var(--dark)]" />
                        <WeavePattern opacity={0.03} />
                        <Embers count={30} />

                        {/* Morphing orbs */}
                        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] animate-morph animate-pulse-slow"
                            style={{ background: 'radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
                        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] animate-morph animate-pulse-slow"
                            style={{ background: 'radial-gradient(circle, rgba(159,18,57,0.08) 0%, transparent 70%)', filter: 'blur(60px)', animationDelay: '-5s' }} />

                        {/* Mouse spotlight */}
                        <div className="absolute inset-0 transition-all duration-700" style={{
                            background: `radial-gradient(500px circle at ${heroMouse.pos.x * 100}% ${heroMouse.pos.y * 100}%, rgba(212,168,67,0.04) 0%, transparent 60%)`,
                        }} />

                        {/* Bottom fade to content */}
                        <div className="absolute bottom-0 inset-x-0 h-[300px] bg-gradient-to-t from-[var(--dark)] to-transparent z-10" />
                    </div>

                    <div ref={heroParallax.ref} className="relative z-20 text-center px-4 max-w-5xl mx-auto"
                        style={{ transform: `translateY(${heroParallax.offset}px)` }}>

                        {/* Date badge */}
                        <div className="animate-fade-in-down">
                            <div className="inline-flex items-center gap-2.5 bg-amber-900/20 backdrop-blur-md border border-amber-700/30 px-5 py-2 rounded-full mb-10">
                                <Calendar className="w-4 h-4 text-amber-400" />
                                <span className="text-amber-200/90 font-medium tracking-wide text-sm">April 1st, 2026</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="animate-fade-in mb-4">
                            <span className="block text-xl md:text-2xl font-medium text-amber-400/70 tracking-[0.3em] uppercase mb-4"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                K'Cho New Year
                            </span>
                            <span className="block text-7xl md:text-[8rem] lg:text-[10rem] font-black leading-[0.85] tracking-tight"
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    background: 'linear-gradient(135deg, #F5E6C8 0%, #D4A843 30%, #F59E0B 50%, #D4A843 70%, #F5E6C8 100%)',
                                    backgroundSize: '200% 200%',
                                    animation: 'gradient-shift 6s ease infinite',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    filter: 'drop-shadow(0 0 30px rgba(212,168,67,0.3))',
                                }}>
                                KUMTHI
                            </span>
                            <span className="block text-5xl md:text-7xl font-light text-white/20 tracking-[0.4em] mt-2"
                                style={{ fontFamily: "'Playfair Display', serif" }}>
                                2026
                            </span>
                        </h1>

                        {/* Event info pills */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-10 animate-fade-in-up animation-delay-400">
                            <div className="flex items-center gap-2 text-white/70 bg-white/[0.04] backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/[0.06] hover:bg-white/[0.08] transition-colors">
                                <MapPin className="w-4 h-4 text-rose-400" />
                                <span className="text-sm">Main Hall, Kuala Lumpur</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/70 bg-white/[0.04] backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/[0.06] hover:bg-white/[0.08] transition-colors">
                                <Clock className="w-4 h-4 text-sky-400" />
                                <span className="text-sm">10:00 AM – 12:22 PM</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/70 bg-white/[0.04] backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/[0.06] hover:bg-white/[0.08] transition-colors">
                                <Users className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm">Community Event</span>
                            </div>
                        </div>

                        {/* Countdown */}
                        <div className="mt-14 animate-fade-in-up animation-delay-600">
                            <div className="text-[10px] text-amber-500/60 uppercase tracking-[0.3em] font-bold mb-4">Countdown</div>
                            <div className="inline-flex gap-3 sm:gap-5">
                                {[
                                    { v: countdown.days, l: 'Days' },
                                    { v: countdown.hours, l: 'Hrs' },
                                    { v: countdown.minutes, l: 'Min' },
                                    { v: countdown.seconds, l: 'Sec' },
                                ].map(({ v, l }) => (
                                    <div key={l} className="relative">
                                        <div className="w-16 sm:w-20 py-3 sm:py-4 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-amber-900/20"
                                            style={{ animation: 'glow-breathe 4s ease-in-out infinite' }}>
                                            <div className="text-2xl sm:text-3xl font-black text-amber-100 tabular-nums"
                                                style={{ fontFamily: "'Playfair Display', serif" }}>
                                                {String(v).padStart(2, '0')}
                                            </div>
                                            <div className="text-[9px] uppercase tracking-[0.2em] text-amber-600/50 mt-1 font-bold">{l}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Scroll hint */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-amber-700/40 font-medium">Discover</span>
                        <ArrowDown className="w-4 h-4 text-amber-600/30 animate-chevron-down" />
                    </div>
                </section>

                {/* ═══════════════════════════════════
                    STATS BAR
                    ═══════════════════════════════════ */}
                <section ref={statsRef.ref} className="py-12 bg-[var(--darker)] relative border-y border-amber-900/10">
                    <WeavePattern opacity={0.02} />
                    <div className="relative z-10 max-w-5xl mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { v: phases, label: 'Phases', suffix: '' },
                                { v: acts, label: 'Performances', suffix: '' },
                                { v: regions, label: 'K\'Cho Regions', suffix: '' },
                                { v: minutes, label: 'Minutes', suffix: '' },
                            ].map((s, i) => (
                                <Reveal key={i} delay={i * 0.08}>
                                    <div className="text-center py-4">
                                        <div className="text-3xl md:text-4xl font-black text-amber-200 tabular-nums"
                                            style={{ fontFamily: "'Playfair Display', serif" }}>
                                            {s.v}{s.suffix}
                                        </div>
                                        <div className="text-[10px] uppercase tracking-[0.2em] text-amber-700/50 mt-2 font-bold">{s.label}</div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════
                    HIGHLIGHTS — "Experience the Culture"
                    ═══════════════════════════════════ */}
                <section className="py-28 bg-gradient-to-b from-[var(--dark)] via-[#110c08] to-[var(--dark)] relative overflow-hidden">
                    <WeavePattern opacity={0.02} />
                    <Embers count={10} />

                    <div className="relative z-10 max-w-6xl mx-auto px-4">
                        <Reveal>
                            <div className="text-center mb-20">
                                <div className="text-[10px] text-amber-500/60 uppercase tracking-[0.4em] font-bold mb-4">What Awaits</div>
                                <h2 className="text-4xl md:text-6xl font-black leading-tight"
                                    style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Experience the{' '}
                                    <span className="italic" style={{
                                        background: 'linear-gradient(135deg, #D4A843, #F59E0B)',
                                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                    }}>Culture</span>
                                </h2>
                                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mt-6" />
                                <p className="text-gray-500 mt-5 text-lg max-w-xl mx-auto">A day of heritage, community, and celebration.</p>
                            </div>
                        </Reveal>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {highlights.map((h, i) => (
                                <Reveal key={i} delay={i * 0.08} direction={i % 2 === 0 ? 'up' : 'scale'}>
                                    <MagneticCard>
                                        <div className="group relative bg-white/[0.02] backdrop-blur-sm rounded-2xl p-7 border border-white/[0.04] hover:border-amber-700/30 transition-all duration-500 hover:bg-white/[0.04] h-full">
                                            {/* Shimmer line on hover */}
                                            <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
                                            </div>

                                            <div className="relative z-10">
                                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${h.gradient} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                                                    <h.icon className="w-7 h-7 text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-200 transition-colors"
                                                    style={{ fontFamily: "'Playfair Display', serif" }}>
                                                    {h.title}
                                                </h3>
                                                <p className="text-gray-500 leading-relaxed text-sm">{h.desc}</p>
                                            </div>
                                        </div>
                                    </MagneticCard>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════
                    PROGRAM RUNDOWN — Horizontal Scroll
                    ═══════════════════════════════════ */}
                <section className="py-28 bg-[var(--dark)] relative overflow-hidden">
                    <div className="relative z-10 max-w-7xl mx-auto px-4">
                        <Reveal>
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                                <div>
                                    <div className="text-[10px] text-amber-500/60 uppercase tracking-[0.4em] font-bold mb-4">The Journey</div>
                                    <h2 className="text-4xl md:text-5xl font-black leading-tight"
                                        style={{ fontFamily: "'Playfair Display', serif" }}>
                                        Program{' '}
                                        <span className="italic" style={{
                                            background: 'linear-gradient(135deg, #D4A843, #F59E0B)',
                                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                        }}>Rundown</span>
                                    </h2>
                                </div>
                                <p className="text-gray-600 max-w-sm text-sm">Five phases designed for maximum engagement — from an explosive opening to a celebratory finale.</p>
                            </div>
                        </Reveal>

                        {/* Energy Map */}
                        <Reveal delay={0.1}>
                            <div className="mb-10 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                                <div className="flex items-center gap-2 mb-4">
                                    <Zap className="w-4 h-4 text-amber-500" />
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-600/60">Energy Flow</span>
                                </div>
                                <div className="flex items-end gap-[3px] h-14">
                                    {energyData.map((h, i) => {
                                        const color = h >= 90 ? '#FBBF24' : h >= 70 ? '#F59E0B' : h >= 50 ? '#D4A843' : h >= 40 ? '#92400E' : '#451A03'
                                        return (
                                            <div key={i} className="flex-1 rounded-sm transition-all duration-500 hover:brightness-125 cursor-crosshair group relative"
                                                style={{
                                                    height: `${h}%`,
                                                    background: `linear-gradient(to top, ${color}40, ${color})`,
                                                    animation: `energy-pulse ${2 + Math.random()}s ease-in-out infinite`,
                                                    animationDelay: `${i * 0.1}s`,
                                                }}>
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 text-[9px] text-amber-300 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                    {programPhases[Math.floor(i / 4)]?.items?.[i % 4]?.name || ''}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="flex justify-between mt-3">
                                    {programPhases.map(p => (
                                        <span key={p.phase} className="text-[9px] text-gray-700 uppercase tracking-wider font-bold">{p.name}</span>
                                    ))}
                                </div>
                            </div>
                        </Reveal>

                        {/* Horizontal Phase Cards */}
                        <Reveal delay={0.2}>
                            <HorizontalScroll>
                                {programPhases.map((p, pi) => (
                                    <div key={p.phase} className="snap-start flex-shrink-0 w-[320px] md:w-[360px] group">
                                        <div className="h-full rounded-2xl overflow-hidden border transition-all duration-500 hover:scale-[1.02]"
                                            style={{ borderColor: `${p.color}20`, background: `linear-gradient(135deg, ${p.color}05, ${p.color}10)` }}>
                                            {/* Phase header */}
                                            <div className="px-6 py-5 border-b" style={{ borderColor: `${p.color}15` }}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-3xl">{p.icon}</span>
                                                    <span className="text-xs text-gray-500 bg-white/[0.03] px-3 py-1 rounded-full">{p.duration}</span>
                                                </div>
                                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: p.color }}>
                                                    Phase {p.phase}
                                                </span>
                                                <h3 className="text-xl font-bold text-white mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                                                    {p.name}
                                                </h3>
                                            </div>
                                            {/* Items */}
                                            <div className="px-6 py-4 space-y-3">
                                                {p.items.map((item, ii) => {
                                                    const energyColors: Record<string, string> = {
                                                        high: '#FBBF24', peak: '#EF4444', medium: '#D4A843',
                                                        low: '#4B5563', emotional: '#A78BFA', graceful: '#F472B6', warm: '#F59E0B',
                                                    }
                                                    return (
                                                        <div key={ii} className="flex items-center gap-3 group/item">
                                                            <div className="w-1 h-8 rounded-full flex-shrink-0 transition-all duration-300 group-hover/item:h-10"
                                                                style={{ background: energyColors[item.energy] || '#6B7280' }} />
                                                            <div className="flex-1 min-w-0">
                                                                <div className="text-white text-sm font-medium truncate">{item.name}</div>
                                                                <div className="text-gray-600 text-xs">{item.time}</div>
                                                            </div>
                                                            <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                                                                style={{ color: energyColors[item.energy] || '#6B7280', background: `${energyColors[item.energy] || '#6B7280'}15` }}>
                                                                {item.energy}
                                                            </span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </HorizontalScroll>
                        </Reveal>
                    </div>
                </section>

                {/* ═══════════════════════════════════
                    ESPORTS HIGHLIGHT
                    ═══════════════════════════════════ */}
                <section className="py-28 bg-[#050a14] relative overflow-hidden">
                    {/* Transition from warm to cold */}
                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[var(--dark)] to-transparent z-10" />
                    <div className="absolute inset-0">
                        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <defs>
                                <pattern id="cybergrid" width="50" height="50" patternUnits="userSpaceOnUse">
                                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#3b82f6" strokeWidth="0.4" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#cybergrid)" />
                        </svg>
                    </div>

                    <div className="relative z-20 max-w-6xl mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1">
                                <Reveal direction="left">
                                    <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6">
                                        <Trophy className="w-4 h-4 text-blue-400" />
                                        <span className="text-blue-200 text-xs font-bold tracking-[0.15em] uppercase">Official Tournament</span>
                                    </div>
                                </Reveal>

                                <Reveal delay={0.1} direction="left">
                                    <h2 className="text-5xl md:text-7xl font-black text-white mb-2 leading-[0.9]"
                                        style={{ fontFamily: "'Playfair Display', serif" }}>
                                        KUMTHI{' '}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                            ASCENSION
                                        </span>
                                    </h2>
                                    <span className="text-3xl md:text-5xl text-gray-600 font-light"
                                        style={{ fontFamily: "'Playfair Display', serif" }}>'26</span>
                                </Reveal>

                                <Reveal delay={0.2} direction="left">
                                    <p className="text-lg text-gray-400 my-8 leading-relaxed max-w-lg">
                                        The battle begins early. <strong className="text-white">Mobile Legends</strong> kicks off March 8th, followed by the{' '}
                                        <strong className="text-white">PUBG Mobile</strong> showdown on March 15th.
                                        Champions will be crowned live on stage at Kumthi 2026.
                                    </p>
                                </Reveal>

                                <Reveal delay={0.3} direction="left">
                                    <Link href="/events/kumthi-ascension-26" className="group">
                                        <div className="flex items-center gap-4 bg-gray-800/30 p-4 rounded-xl border border-gray-700/30 hover:border-blue-500/40 transition-all duration-500 hover:bg-gray-800/50">
                                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
                                                <Monitor className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold group-hover:text-blue-400 transition-colors">View Tournament Details</h3>
                                                <p className="text-gray-500 text-sm">Schedules, Brackets & Registration</p>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-gray-600 ml-auto group-hover:translate-x-2 group-hover:text-blue-400 transition-all duration-300" />
                                        </div>
                                    </Link>
                                </Reveal>

                                <Reveal delay={0.4} direction="left">
                                    <div className="mt-8">
                                        <button className="relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] hover:scale-105 group">
                                            <span className="relative z-10">Register Team</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </button>
                                    </div>
                                </Reveal>
                            </div>

                            {/* Poster stack */}
                            <div className="order-1 lg:order-2">
                                <Reveal direction="right" delay={0.15}>
                                    <div className="relative w-full max-w-md mx-auto aspect-[3/4] group">
                                        {/* Poster 2 (back) */}
                                        <div className="absolute top-4 -right-4 w-full h-full transform rotate-6 transition-all duration-700 group-hover:translate-x-10 group-hover:rotate-12 z-10">
                                            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-500/20">
                                                <Image src="/images/events/esport-posters/2.png" alt="Esports Poster 2" fill className="object-cover" />
                                            </div>
                                        </div>
                                        {/* Poster 1 (front) */}
                                        <div className="absolute inset-0 transform transition-all duration-700 group-hover:-translate-x-6 z-20">
                                            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-400/40 bg-gray-900">
                                                <Image src="/images/events/esport-posters/1.png" alt="Esports Poster 1" fill className="object-cover" />
                                                {/* Scan line */}
                                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                                    <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
                                                        style={{ animation: 'scanline 4s linear infinite', top: 0 }} />
                                                </div>
                                                {/* Badge */}
                                                <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center shadow-xl border-4 border-gray-900 z-30 animate-bounce-slow">
                                                    <div className="text-center leading-none">
                                                        <span className="block text-[8px] font-bold text-gray-800 uppercase tracking-wider">Prize</span>
                                                        <span className="block font-black text-gray-900 text-sm">RM</span>
                                                        <span className="block font-black text-gray-900 text-lg leading-none">3,700+</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Glow */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/15 blur-[80px] rounded-full -z-10 group-hover:bg-blue-500/25 transition-all duration-700" />
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                    {/* Transition back to warm */}
                    <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[var(--dark)] to-transparent z-10" />
                    <style dangerouslySetInnerHTML={{ __html: `@keyframes scanline { 0% { top: -10%; } 100% { top: 110%; } }` }} />
                </section>

                {/* ═══════════════════════════════════
                    CALL TO ACTION
                    ═══════════════════════════════════ */}
                <section className="py-28 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a04] via-[var(--dark)] to-[#0d0806]" />
                    <WeavePattern opacity={0.03} />
                    <Embers count={15} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full animate-morph"
                        style={{ background: 'radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

                    <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
                        <Reveal direction="scale">
                            <div className="text-6xl mb-6">🪘</div>
                            <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6"
                                style={{ fontFamily: "'Playfair Display', serif" }}>
                                Be Part of{' '}
                                <span className="italic" style={{
                                    background: 'linear-gradient(135deg, #D4A843, #F59E0B, #D4A843)',
                                    backgroundSize: '200% 200%',
                                    animation: 'gradient-shift 4s ease infinite',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                }}>Something Beautiful</span>
                            </h2>
                        </Reveal>

                        <Reveal delay={0.15}>
                            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                                Whether you're performing, competing, or cheering — Kumthi 2026 is where our community
                                comes alive. Mark your calendar. Bring your family. Celebrate who we are.
                            </p>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="#" className="group relative px-8 py-4 rounded-xl font-bold text-base overflow-hidden transition-all duration-500 hover:scale-105"
                                    style={{ animation: 'glow-breathe 4s ease-in-out infinite' }}>
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-600" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <span className="relative z-10 flex items-center gap-2 text-white">
                                        <Calendar className="w-5 h-5" />
                                        Save the Date
                                    </span>
                                </a>
                                <Link href="/contact"
                                    className="px-8 py-4 rounded-xl font-bold text-base border border-amber-800/30 text-amber-200/70 hover:bg-amber-900/10 hover:text-amber-100 hover:border-amber-700/50 transition-all duration-300">
                                    Contact CEAM
                                </Link>
                            </div>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 text-gray-700 text-xs">
                                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> April 1, 2026</span>
                                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Kuala Lumpur</span>
                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 10:00 AM</span>
                                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> All K'Cho Welcome</span>
                            </div>
                        </Reveal>
                    </div>
                </section>

            </div>
        </>
    )
}