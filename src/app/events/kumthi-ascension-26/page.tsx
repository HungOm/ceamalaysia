'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Section from '@/components/Section'
import Link from 'next/link'
import Image from 'next/image'
import {
    Calendar, Trophy, Users,
    ArrowRight, Sword, Crosshair, Crown, Flame, Zap,
    Shield, ChevronDown, Gamepad2
} from 'lucide-react'

/* ═══════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════ */

// Scroll-triggered visibility
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

// Parallax scroll offset
function useParallax(speed = 0.3) {
    const ref = useRef<HTMLDivElement>(null)
    const [offset, setOffset] = useState(0)
    useEffect(() => {
        const onScroll = () => {
            if (!ref.current) return
            const rect = ref.current.getBoundingClientRect()
            const center = rect.top + rect.height / 2
            const viewCenter = window.innerHeight / 2
            setOffset((center - viewCenter) * speed)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [speed])
    return { ref, offset }
}

// Animated counter
function useCounter(target: number, duration = 2000, active = false) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (!active) return
        let start = 0
        const step = target / (duration / 16)
        const id = setInterval(() => {
            start += step
            if (start >= target) { setCount(target); clearInterval(id) }
            else setCount(Math.floor(start))
        }, 16)
        return () => clearInterval(id)
    }, [target, duration, active])
    return count
}

// Mouse position tracking for spotlight
function useMouse() {
    const ref = useRef<HTMLDivElement>(null)
    const [pos, setPos] = useState({ x: 0.5, y: 0.5 })
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect()
            setPos({
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height,
            })
        }
        el.addEventListener('mousemove', onMove)
        return () => el.removeEventListener('mousemove', onMove)
    }, [])
    return { ref, pos }
}

/* ═══════════════════════════════════════════════════════
   ANIMATION COMPONENTS
   ═══════════════════════════════════════════════════════ */

// Scroll-triggered reveal wrapper
function Reveal({ children, delay = 0, direction = 'up', className = '' }: {
    children: React.ReactNode; delay?: number; direction?: 'up' | 'down' | 'left' | 'right' | 'scale'; className?: string
}) {
    const { ref, inView } = useInView(0.1)
    const transforms: Record<string, string> = {
        up: 'translateY(60px)', down: 'translateY(-60px)',
        left: 'translateX(-60px)', right: 'translateX(60px)',
        scale: 'scale(0.85)',
    }
    return (
        <div ref={ref} className={className} style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : transforms[direction],
            transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        }}>
            {children}
        </div>
    )
}

// Animated grid background
function CyberGrid() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-400" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            {/* Animated horizontal scan line */}
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent animate-scanline" />
            {/* Animated vertical scan line */}
            <div className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent animate-scanline-v" />
        </div>
    )
}

// Floating orbs
function FloatingOrbs() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {[
                { size: 300, x: '10%', y: '20%', color: 'rgba(59,130,246,0.08)', dur: '20s', delay: '0s' },
                { size: 400, x: '70%', y: '60%', color: 'rgba(6,182,212,0.06)', dur: '25s', delay: '-5s' },
                { size: 200, x: '80%', y: '10%', color: 'rgba(249,115,22,0.07)', dur: '18s', delay: '-10s' },
                { size: 250, x: '30%', y: '70%', color: 'rgba(59,130,246,0.05)', dur: '22s', delay: '-3s' },
            ].map((orb, i) => (
                <div key={i} className="absolute rounded-full animate-float-orb" style={{
                    width: orb.size, height: orb.size, left: orb.x, top: orb.y,
                    background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                    animationDuration: orb.dur, animationDelay: orb.delay,
                    filter: 'blur(40px)',
                }} />
            ))}
        </div>
    )
}

// Particle system
function Particles({ count = 30 }: { count?: number }) {
    const particles = useRef(
        Array.from({ length: count }, () => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 10,
            opacity: Math.random() * 0.4 + 0.1,
        }))
    ).current
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {particles.map((p, i) => (
                <div key={i} className="absolute rounded-full bg-blue-400 animate-particle" style={{
                    width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`,
                    opacity: p.opacity,
                    animationDuration: `${p.duration}s`,
                    animationDelay: `${p.delay}s`,
                }} />
            ))}
        </div>
    )
}

// 3D Tilt Card
function TiltCard({ children, className = '', glowColor = 'rgba(59,130,246,0.3)' }: {
    children: React.ReactNode; className?: string; glowColor?: string
}) {
    const ref = useRef<HTMLDivElement>(null)
    const [style, setStyle] = useState({})

    const onMove = useCallback((e: React.MouseEvent) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        setStyle({
            transform: `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`,
            boxShadow: `${-x * 20}px ${y * 20}px 40px ${glowColor}`,
        })
    }, [glowColor])

    const onLeave = useCallback(() => {
        setStyle({ transform: 'perspective(800px) rotateY(0) rotateX(0) scale(1)', boxShadow: 'none' })
    }, [])

    return (
        <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className}
            style={{ ...style, transition: 'transform 0.2s ease, box-shadow 0.3s ease', willChange: 'transform' }}>
            {children}
        </div>
    )
}

// Glitch text
function GlitchText({ text, className = '' }: { text: string; className?: string }) {
    return (
        <span className={`relative inline-block ${className}`}>
            <span className="relative z-10">{text}</span>
            <span className="absolute inset-0 text-cyan-400 animate-glitch-1 z-0 select-none" aria-hidden="true">{text}</span>
            <span className="absolute inset-0 text-red-500 animate-glitch-2 z-0 select-none" aria-hidden="true">{text}</span>
        </span>
    )
}

// Animated border gradient
function GlowBorder({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`relative p-px rounded-2xl overflow-hidden ${className}`}>
            <div className="absolute inset-0 rounded-2xl animate-border-spin"
                style={{ background: 'conic-gradient(from var(--angle, 0deg), transparent 40%, #3b82f6 50%, #06b6d4 55%, transparent 60%)' }} />
            <div className="relative bg-[#0a101f] rounded-2xl overflow-hidden h-full">
                {children}
            </div>
        </div>
    )
}

// Marquee ticker
function Marquee({ children, speed = 30 }: { children: React.ReactNode; speed?: number }) {
    return (
        <div className="overflow-hidden whitespace-nowrap">
            <div className="inline-flex animate-marquee" style={{ animationDuration: `${speed}s` }}>
                {children}
                {children}
            </div>
        </div>
    )
}

// Typewriter effect
function Typewriter({ text, speed = 50, delay = 1000 }: { text: string; speed?: number; delay?: number }) {
    const [displayed, setDisplayed] = useState('')
    const [cursor, setCursor] = useState(true)
    useEffect(() => {
        const timeout = setTimeout(() => {
            let i = 0
            const id = setInterval(() => {
                setDisplayed(text.slice(0, ++i))
                if (i >= text.length) clearInterval(id)
            }, speed)
            return () => clearInterval(id)
        }, delay)
        return () => clearTimeout(timeout)
    }, [text, speed, delay])
    useEffect(() => {
        const id = setInterval(() => setCursor(c => !c), 530)
        return () => clearInterval(id)
    }, [])
    return <span>{displayed}<span className={`${cursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span></span>
}

// Horizontal progress bar on scroll
function ScrollProgress() {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const onScroll = () => {
            const h = document.documentElement.scrollHeight - window.innerHeight
            setProgress(h > 0 ? (window.scrollY / h) * 100 : 0)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])
    return (
        <div className="fixed top-0 left-0 right-0 h-[2px] z-[100]">
            <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 transition-[width] duration-150"
                style={{ width: `${progress}%` }} />
        </div>
    )
}

/* ═══════════════════════════════════════════════════════
   STYLES (Injected via <style>)
   ═══════════════════════════════════════════════════════ */
const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap');

:root {
    --angle: 0deg;
}

/* Scanlines */
@keyframes scanline {
    0% { transform: translateY(-100vh); }
    100% { transform: translateY(100vh); }
}
@keyframes scanline-v {
    0% { transform: translateX(-100vw); }
    100% { transform: translateX(100vw); }
}
.animate-scanline { animation: scanline 8s linear infinite; }
.animate-scanline-v { animation: scanline-v 12s linear infinite; }

/* Floating orbs */
@keyframes float-orb {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(30px, -40px) scale(1.1); }
    50% { transform: translate(-20px, 20px) scale(0.95); }
    75% { transform: translate(40px, 30px) scale(1.05); }
}
.animate-float-orb { animation: float-orb 20s ease-in-out infinite; }

/* Particles */
@keyframes particle {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
}
.animate-particle { animation: particle 15s linear infinite; }

/* Glitch */
@keyframes glitch-1 {
    0%, 100% { clip-path: inset(0 0 95% 0); transform: translate(0); }
    10% { clip-path: inset(20% 0 60% 0); transform: translate(-3px, 1px); }
    20% { clip-path: inset(70% 0 5% 0); transform: translate(3px, -1px); }
    30% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, 2px); }
    40% { clip-path: inset(50% 0 30% 0); transform: translate(2px, -2px); }
    50% { clip-path: inset(0 0 95% 0); transform: translate(0); }
}
@keyframes glitch-2 {
    0%, 100% { clip-path: inset(95% 0 0 0); transform: translate(0); }
    15% { clip-path: inset(40% 0 30% 0); transform: translate(3px, 2px); }
    25% { clip-path: inset(80% 0 5% 0); transform: translate(-3px, -1px); }
    35% { clip-path: inset(5% 0 70% 0); transform: translate(2px, 1px); }
    45% { clip-path: inset(60% 0 10% 0); transform: translate(-2px, -2px); }
    55% { clip-path: inset(95% 0 0 0); transform: translate(0); }
}
.animate-glitch-1 { animation: glitch-1 3s steps(1) infinite; }
.animate-glitch-2 { animation: glitch-2 3s steps(1) infinite 0.1s; }

/* Gradient spin for border */
@property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
}
@keyframes border-spin {
    from { --angle: 0deg; }
    to { --angle: 360deg; }
}
.animate-border-spin { animation: border-spin 4s linear infinite; }

/* Marquee */
@keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}
.animate-marquee { animation: marquee 30s linear infinite; }

/* Pulse slow */
@keyframes pulse-slow {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.1); }
}
.animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }

/* Bounce slow */
@keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
}
.animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }

/* Staggered fade */
@keyframes fade-in-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in-down {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in-up 0.8s ease-out both; }
.animate-fade-in-up { animation: fade-in-up 0.8s ease-out both; }
.animate-fade-in-down { animation: fade-in-down 0.8s ease-out both; }
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-600 { animation-delay: 0.6s; }
.animation-delay-800 { animation-delay: 0.8s; }

/* Gradient text animation */
@keyframes gradient-x {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}
.animate-gradient-x { background-size: 200% 200%; animation: gradient-x 4s ease infinite; }

/* Neon flicker */
@keyframes neon-flicker {
    0%, 100% { opacity: 1; }
    5% { opacity: 0.8; }
    10% { opacity: 1; }
    15% { opacity: 0.6; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    85% { opacity: 0.7; }
    90% { opacity: 1; }
}
.animate-neon-flicker { animation: neon-flicker 5s ease-in-out infinite; }

/* HUD corners */
.hud-corners {
    --corner-size: 12px;
    --corner-color: rgba(59,130,246,0.5);
}
.hud-corners::before, .hud-corners::after {
    content: '';
    position: absolute;
    width: var(--corner-size);
    height: var(--corner-size);
    border-color: var(--corner-color);
    border-style: solid;
    pointer-events: none;
    z-index: 20;
}
.hud-corners::before {
    top: 0; left: 0;
    border-width: 2px 0 0 2px;
}
.hud-corners::after {
    bottom: 0; right: 0;
    border-width: 0 2px 2px 0;
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #050b14; }
::-webkit-scrollbar-thumb { background: #1e40af; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #3b82f6; }

/* Noise overlay */
.noise-overlay::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 1;
}

/* Chevron bounce */
@keyframes chevron-bounce {
    0%, 100% { transform: translateY(0); opacity: 0.6; }
    50% { transform: translateY(8px); opacity: 1; }
}
.animate-chevron { animation: chevron-bounce 2s ease-in-out infinite; }
`

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function KumthiAscensionClient() {
    const heroMouse = useMouse()
    const statsSection = useInView(0.3)
    const teamCount = useCounter(32, 2000, statsSection.inView)
    const prizePool = useCounter(3700, 2500, statsSection.inView)
    const playerCount = useCounter(160, 2200, statsSection.inView)
    const heroParallax = useParallax(0.15)

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
            <ScrollProgress />

            <div className="bg-[#050b14] text-white selection:bg-blue-500/30" style={{ fontFamily: "'Rajdhani', sans-serif" }}>

                {/* ═══════════════════════════════════
                    HERO SECTION
                    ═══════════════════════════════════ */}
                <section ref={heroMouse.ref} className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay">
                    {/* Layered backgrounds */}
                    <div className="absolute inset-0">
                        <CyberGrid />
                        <FloatingOrbs />
                        <Particles count={40} />

                        {/* Mouse-tracking spotlight */}
                        <div className="absolute inset-0 transition-opacity duration-500" style={{
                            background: `radial-gradient(600px circle at ${heroMouse.pos.x * 100}% ${heroMouse.pos.y * 100}%, rgba(59,130,246,0.06) 0%, transparent 60%)`,
                        }} />

                        {/* Top / Bottom gradient fades */}
                        <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-blue-900/15 to-transparent" />
                        <div className="absolute bottom-0 inset-x-0 h-[300px] bg-gradient-to-t from-[#050b14] to-transparent z-10" />
                    </div>

                    <div ref={heroParallax.ref} className="relative z-10 container mx-auto px-4 text-center" style={{ transform: `translateY(${heroParallax.offset}px)` }}>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-6 py-2.5 rounded-full mb-10 backdrop-blur-md animate-fade-in-down">
                            <Trophy className="w-5 h-5 text-yellow-500 animate-neon-flicker" />
                            <span className="text-blue-100 font-bold tracking-[0.2em] uppercase text-xs" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                Official K'Cho Esports Tournament
                            </span>
                        </div>

                        {/* Title with Glitch */}
                        <h1 className="mb-2 animate-fade-in">
                            <span className="block text-6xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter leading-[0.85]"
                                style={{ fontFamily: "'Orbitron', sans-serif", textShadow: '0 0 40px rgba(59,130,246,0.3)' }}>
                                KUMTHI
                            </span>
                            <span className="block text-5xl md:text-7xl lg:text-[8rem] font-black tracking-tighter leading-[0.9]">
                                <GlitchText
                                    text="ASCENSION"
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 animate-gradient-x"
                                />
                                <span className="text-3xl md:text-5xl text-blue-500/40 ml-4 font-mono align-top">'26</span>
                            </span>
                        </h1>

                        {/* Typewriter tagline */}
                        <div className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-14 h-8 animate-fade-in-up animation-delay-200"
                            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.95rem', letterSpacing: '0.15em' }}>
                            <Typewriter text="TWO GAMES. ONE STAGE. ETERNAL GLORY." speed={45} delay={800} />
                        </div>

                        {/* Game start cards */}
                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-400">
                            <TiltCard className="rounded-xl" glowColor="rgba(59,130,246,0.25)">
                                <div className="flex items-center gap-4 bg-gray-900/80 backdrop-blur-xl border border-gray-800 p-5 rounded-xl group cursor-pointer">
                                    <div className="w-14 h-14 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/40 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                                        <Sword className="w-7 h-7 text-blue-400 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xs text-blue-400 font-bold uppercase tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif" }}>Mobile Legends</div>
                                        <div className="text-white font-bold text-lg">Starts March 8th</div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-blue-500/50 ml-2 group-hover:translate-x-1 group-hover:text-blue-400 transition-all" />
                                </div>
                            </TiltCard>

                            <TiltCard className="rounded-xl" glowColor="rgba(249,115,22,0.25)">
                                <div className="flex items-center gap-4 bg-gray-900/80 backdrop-blur-xl border border-gray-800 p-5 rounded-xl group cursor-pointer">
                                    <div className="w-14 h-14 bg-orange-600/20 rounded-lg flex items-center justify-center group-hover:bg-orange-600/40 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                                        <Crosshair className="w-7 h-7 text-orange-400 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xs text-orange-400 font-bold uppercase tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif" }}>PUBG Mobile</div>
                                        <div className="text-white font-bold text-lg">March 15th</div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-orange-500/50 ml-2 group-hover:translate-x-1 group-hover:text-orange-400 transition-all" />
                                </div>
                            </TiltCard>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-600" style={{ fontFamily: "'Orbitron', sans-serif" }}>Scroll</span>
                        <ChevronDown className="w-5 h-5 text-blue-500/50 animate-chevron" />
                    </div>
                </section>

                {/* ═══════════════════════════════════
                    TICKER MARQUEE
                    ═══════════════════════════════════ */}
                <div className="py-4 bg-gradient-to-r from-[#050b14] via-blue-950/30 to-[#050b14] border-y border-blue-900/20 overflow-hidden">
                    <Marquee speed={25}>
                        {['⚔️ MOBILE LEGENDS: BANG BANG', '🏆 RM 3,700+ PRIZE POOL', '🎯 PUBG MOBILE SQUAD MODE',
                            '📅 MARCH 2026', '👥 32 TEAMS', '🔥 KUMTHI CULTURAL FESTIVAL', '⭐ LIVE TROPHY CEREMONY'].map((item, i) => (
                                <span key={i} className="mx-8 text-sm text-gray-500 font-bold tracking-widest uppercase whitespace-nowrap"
                                    style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.65rem' }}>
                                    {item}
                                </span>
                            ))}
                    </Marquee>
                </div>

                {/* ═══════════════════════════════════
                    STATS BAR
                    ═══════════════════════════════════ */}
                <section ref={statsSection.ref} className="py-16 bg-[#060d1a] relative">
                    <CyberGrid />
                    <div className="relative z-10 max-w-5xl mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { icon: <Users className="w-6 h-6" />, value: teamCount, suffix: '', label: 'Teams', color: 'blue' },
                                { icon: <Trophy className="w-6 h-6" />, value: prizePool, suffix: '+', label: 'Prize Pool (RM)', color: 'yellow' },
                                { icon: <Gamepad2 className="w-6 h-6" />, value: playerCount, suffix: '+', label: 'Players', color: 'cyan' },
                                { icon: <Zap className="w-6 h-6" />, value: 2, suffix: '', label: 'Game Titles', color: 'orange' },
                            ].map((stat, i) => (
                                <Reveal key={i} delay={i * 0.1}>
                                    <div className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all duration-500 group">
                                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-${stat.color}-500/10 text-${stat.color}-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-shadow`}>
                                            {stat.icon}
                                        </div>
                                        <div className="text-3xl md:text-4xl font-black text-white tabular-nums" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                            {stat.value.toLocaleString()}{stat.suffix}
                                        </div>
                                        <div className="text-xs text-gray-500 uppercase tracking-widest mt-2 font-bold">{stat.label}</div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════
                    ROAD TO THE CUP
                    ═══════════════════════════════════ */}
                <Section className="py-24 bg-[#0a101f] relative overflow-hidden">
                    <FloatingOrbs />
                    <div className="relative z-10 max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-16 items-start">

                            <div>
                                <Reveal>
                                    <div className="inline-block px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6"
                                        style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                        About
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                        The Road<br />to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Cup</span>
                                    </h2>
                                </Reveal>

                                <Reveal delay={0.15}>
                                    <p className="text-gray-400 text-lg leading-relaxed mb-10">
                                        Kumthi Ascension '26 is the premier esports competitive event for the K'Cho community.
                                        Qualifiers will be held throughout March, culminating in a grand trophy presentation
                                        at the main <Link href="/events/kumthi-2026" className="text-blue-400 hover:text-cyan-300 underline underline-offset-4 transition-colors">Kumthi 2026</Link> celebration on April 1st.
                                    </p>
                                </Reveal>

                                <div className="space-y-8">
                                    {[
                                        { icon: <Users className="w-5 h-5" />, title: 'Community & Competition', desc: 'Bringing youth together through healthy competition and teamwork.', color: 'blue' },
                                        { icon: <Crown className="w-5 h-5" />, title: 'The Grand Stage', desc: 'Champions will be honored live on stage during the Kumthi Cultural Festival.', color: 'yellow' },
                                        { icon: <Shield className="w-5 h-5" />, title: 'Fair Play', desc: 'All matches are monitored. Integrity, sportsmanship, and respect come first.', color: 'green' },
                                    ].map((item, i) => (
                                        <Reveal key={i} delay={0.2 + i * 0.1} direction="left">
                                            <div className="flex gap-5 group">
                                                <div className={`w-12 h-12 rounded-xl bg-${item.color}-900/50 flex items-center justify-center border border-${item.color}-800/50 flex-shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300`}>
                                                    <span className={`text-${item.color}-400`}>{item.icon}</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                                                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                                                </div>
                                            </div>
                                        </Reveal>
                                    ))}
                                </div>
                            </div>

                            {/* Poster with 3D tilt + glow */}
                            <Reveal delay={0.2} direction="right">
                                <TiltCard className="w-full max-w-sm mx-auto" glowColor="rgba(59,130,246,0.2)">
                                    <div className="relative aspect-[3/4]">
                                        <div className="absolute inset-0 bg-blue-500/20 blur-[60px] -z-10 rounded-full animate-pulse-slow" />
                                        <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-2xl hud-corners">
                                            <Image
                                                src="/images/events/esport-posters/1.png"
                                                alt="Kumthi Ascension Poster"
                                                fill
                                                className="object-cover"
                                            />
                                            {/* Scan overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-900/30" />
                                            <div className="absolute inset-0 animate-scanline opacity-20 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[20%]" />
                                        </div>

                                        {/* Prize pool floating badge */}
                                        <div className="absolute -bottom-4 -left-4 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 p-4 rounded-xl shadow-2xl z-20 flex items-center gap-3 animate-bounce-slow">
                                            <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                                                <Trophy className="w-5 h-5 text-yellow-500" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Total Prize Pool</div>
                                                <div className="text-white font-black text-xl" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                                    RM 3,700<span className="text-yellow-500">+</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Game count badge */}
                                        <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs font-black px-3 py-2 rounded-lg z-20 shadow-lg"
                                            style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                            2 GAMES
                                        </div>
                                    </div>
                                </TiltCard>
                            </Reveal>
                        </div>
                    </div>
                </Section>

                {/* ═══════════════════════════════════
                    TOURNAMENT SCHEDULE
                    ═══════════════════════════════════ */}
                <Section className="py-24 bg-gray-900 border-t border-gray-800 relative overflow-hidden">
                    <CyberGrid />
                    <Particles count={15} />

                    <div className="relative z-10 max-w-6xl mx-auto">
                        <Reveal>
                            <div className="text-center mb-16">
                                <div className="inline-block px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6"
                                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                    Schedule
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight"
                                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                    Tournament<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Schedule</span>
                                </h2>
                            </div>
                        </Reveal>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* MLBB Card */}
                            <Reveal delay={0.1} direction="left">
                                <GlowBorder>
                                    <div className="group">
                                        <div className="h-36 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative p-6 flex flex-col justify-between overflow-hidden">
                                            {/* Animated pattern overlay */}
                                            <div className="absolute inset-0 opacity-10">
                                                <div className="absolute inset-0" style={{
                                                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)',
                                                }} />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                            <div className="relative z-10 flex justify-between items-start">
                                                <Sword className="w-8 h-8 text-blue-300 group-hover:rotate-12 transition-transform duration-500" />
                                                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>MOBA</span>
                                            </div>
                                            <h3 className="relative z-10 text-2xl md:text-3xl font-black text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                                MOBILE LEGENDS
                                            </h3>
                                        </div>
                                        <div className="p-8 space-y-6">
                                            <div className="flex items-start gap-4 group/item">
                                                <Calendar className="w-5 h-5 text-blue-500 mt-1 group-hover/item:scale-110 transition-transform" />
                                                <div>
                                                    <h4 className="text-white font-bold text-lg">Group Stages & Knockouts</h4>
                                                    <p className="text-gray-400">Starts March 8th, 2026</p>
                                                    <p className="text-gray-600 text-sm mt-1">Played over several nights leading up to the finals.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4 group/item">
                                                <Users className="w-5 h-5 text-blue-500 mt-1 group-hover/item:scale-110 transition-transform" />
                                                <div>
                                                    <h4 className="text-white font-bold text-lg">Format</h4>
                                                    <p className="text-gray-400">5v5 Tournament Draft</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4 group/item">
                                                <Trophy className="w-5 h-5 text-yellow-500 mt-1 group-hover/item:scale-110 transition-transform" />
                                                <div>
                                                    <h4 className="text-white font-bold text-lg">Prize</h4>
                                                    <p className="text-gray-400">Trophies + Cash Prizes</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </GlowBorder>
                            </Reveal>

                            {/* PUBG Card */}
                            <Reveal delay={0.2} direction="right">
                                <GlowBorder>
                                    <div className="group">
                                        <div className="h-36 bg-gradient-to-br from-orange-900 via-orange-800 to-red-900 relative p-6 flex flex-col justify-between overflow-hidden">
                                            <div className="absolute inset-0 opacity-10">
                                                <div className="absolute inset-0" style={{
                                                    backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)',
                                                }} />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                            <div className="relative z-10 flex justify-between items-start">
                                                <Crosshair className="w-8 h-8 text-orange-300 group-hover:rotate-45 transition-transform duration-500" />
                                                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>BATTLE ROYALE</span>
                                            </div>
                                            <h3 className="relative z-10 text-2xl md:text-3xl font-black text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                                PUBG MOBILE
                                            </h3>
                                        </div>
                                        <div className="p-8 space-y-6">
                                            <div className="flex items-start gap-4 group/item">
                                                <Calendar className="w-5 h-5 text-orange-500 mt-1 group-hover/item:scale-110 transition-transform" />
                                                <div>
                                                    <h4 className="text-white font-bold text-lg">One-Day Showdown</h4>
                                                    <p className="text-gray-400">March 15th, 2026</p>
                                                    <p className="text-gray-600 text-sm mt-1">Full day event. 32 Teams battling for survival.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4 group/item">
                                                <Users className="w-5 h-5 text-orange-500 mt-1 group-hover/item:scale-110 transition-transform" />
                                                <div>
                                                    <h4 className="text-white font-bold text-lg">Format</h4>
                                                    <p className="text-gray-400">Squad Mode (4 players) · 32 Teams Limit</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4 group/item">
                                                <Trophy className="w-5 h-5 text-yellow-500 mt-1 group-hover/item:scale-110 transition-transform" />
                                                <div>
                                                    <h4 className="text-white font-bold text-lg">Prize</h4>
                                                    <p className="text-gray-400">Trophies + Cash Prizes</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </GlowBorder>
                            </Reveal>
                        </div>
                    </div>
                </Section>

                {/* ═══════════════════════════════════
                    TIMELINE
                    ═══════════════════════════════════ */}
                <section className="py-24 bg-[#060d1a] relative overflow-hidden">
                    <CyberGrid />
                    <div className="relative z-10 max-w-4xl mx-auto px-4">
                        <Reveal>
                            <div className="text-center mb-16">
                                <div className="inline-block px-3 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-widest uppercase mb-6"
                                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                    Timeline
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                    Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Timeline</span>
                                </h2>
                            </div>
                        </Reveal>

                        {/* Vertical timeline */}
                        <div className="relative">
                            {/* Center line */}
                            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/30 to-orange-500/50" />

                            {[
                                { date: 'Feb 2026', title: 'Registration Opens', desc: 'Teams sign up via CEAM social media. Slots are limited!', icon: <Gamepad2 className="w-5 h-5" />, color: 'blue', side: 'left' },
                                { date: 'Mar 8', title: 'MLBB Qualifiers Begin', desc: 'Group stages kick off. Matches played over multiple evenings.', icon: <Sword className="w-5 h-5" />, color: 'blue', side: 'right' },
                                { date: 'Mar 15', title: 'PUBG Mobile Showdown', desc: 'One-day battle royale. 32 squads fight for survival.', icon: <Crosshair className="w-5 h-5" />, color: 'orange', side: 'left' },
                                { date: 'Late Mar', title: 'MLBB Finals', desc: 'Top teams clash in the final bracket to determine the champion.', icon: <Flame className="w-5 h-5" />, color: 'purple', side: 'right' },
                                { date: 'Apr 1', title: 'Kumthi Grand Ceremony', desc: 'Trophy presentation live on stage at the Kumthi 2026 festival.', icon: <Trophy className="w-5 h-5" />, color: 'yellow', side: 'left' },
                            ].map((item, i) => (
                                <Reveal key={i} delay={i * 0.12} direction={item.side === 'left' ? 'left' : 'right'}>
                                    <div className={`relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:text-${i % 2 === 0 ? 'right' : 'left'}`}>
                                        {/* Dot */}
                                        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-900 border-2 z-10 mt-1.5"
                                            style={{ borderColor: `var(--tw-${item.color === 'yellow' ? 'yellow' : item.color}-500, #3b82f6)` }}>
                                            <div className={`absolute inset-0 rounded-full bg-${item.color}-500 animate-ping opacity-30`} />
                                        </div>

                                        {/* Content */}
                                        <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? '' : 'md:ml-auto md:pl-12'} ${i % 2 === 0 ? 'md:pr-12' : ''}`}>
                                            <div className={`p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-${item.color}-500/30 transition-all duration-500 group hover:bg-white/[0.05]`}>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className={`text-${item.color}-400`}>{item.icon}</span>
                                                    <span className={`text-xs font-bold tracking-widest uppercase text-${item.color}-400`}
                                                        style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                                        {item.date}
                                                    </span>
                                                </div>
                                                <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════
                    CTA SECTION
                    ═══════════════════════════════════ */}
                <section className="py-24 relative overflow-hidden">
                    {/* Dramatic background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-[#0a1628] to-indigo-950" />
                    <div className="absolute inset-0">
                        <CyberGrid />
                        <Particles count={20} />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[100px] animate-pulse-slow" />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                        <Reveal direction="scale">
                            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                READY TO<br />
                                <GlitchText text="ASCEND" className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400" />
                                <span className="text-blue-500">?</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.15}>
                            <p className="text-blue-200/70 text-xl mb-12 max-w-xl mx-auto">
                                Registration is open now. Gather your squad and prove your worth on the battlefield.
                            </p>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                <a href="https://wa.me/601119264581" target="_blank" rel="noopener noreferrer"
                                    className="group relative px-10 py-4 rounded-xl font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] inline-block text-center"
                                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <span className="relative z-10 flex items-center gap-2 text-white justify-center">
                                        <Sword className="w-5 h-5" />
                                        Register for MLBB
                                    </span>
                                </a>
                                <a href="https://wa.me/60194160730" target="_blank" rel="noopener noreferrer"
                                    className="group relative px-10 py-4 rounded-xl font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] inline-block text-center"
                                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <span className="relative z-10 flex items-center gap-2 text-white justify-center">
                                        <Crosshair className="w-5 h-5" />
                                        Register for PUBG
                                    </span>
                                </a>
                            </div>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <div className="mt-16 pt-8 border-t border-blue-800/30">
                                <Link href="/events/kumthi-2026" className="inline-flex items-center gap-3 text-blue-300/70 hover:text-white transition-all duration-300 group">
                                    <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-2 transition-transform duration-300" />
                                    <span>Back to Kumthi 2026 Main Event</span>
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </section>

            </div>
        </>
    )
}