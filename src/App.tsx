import { ChevronRight, Hexagon } from 'lucide-react';
import ScrollVideo from './components/ScrollVideo';
import { Reveal } from './components/Reveal';

const services = ['AI AUTOMATION', 'AI INTEGRATION', 'AI AGENT DEVELOPMENT'];
const navigation = ['Projects', 'About', 'Blog', 'Contact'] as const;

const capabilities = [
  {
    index: '01',
    title: 'Real-time vision',
    body: 'Reads context as it happens and surfaces what matters before you ask.',
  },
  {
    index: '02',
    title: 'Layered insight',
    body: 'Moves from rough outline to sharp output without losing the thread.',
  },
  {
    index: '03',
    title: 'Adaptive speed',
    body: 'Learns your cadence and tightens every pass as you work.',
  },
];

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-white/10 backdrop-blur-md">
      <div className="relative mx-auto flex h-[72px] w-full items-center justify-between px-5 sm:px-8 md:px-12">
        <Reveal delay={0} className="shrink-0">
          <a href="#top" className="inline-flex items-center gap-2.5 text-white" aria-label="NovaAI home">
            <Hexagon size={24} strokeWidth={1.5} aria-hidden="true" />
            <span className="text-lg font-medium tracking-tight sm:text-xl">novaai</span>
          </a>
        </Reveal>

        <nav
          aria-label="Main navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex lg:gap-10"
        >
          {navigation.map((item, index) => (
            <Reveal key={item} delay={100 + index * 100}>
              <a
                href={
                  item === 'Projects'
                    ? '#section-one'
                    : item === 'About'
                      ? '#section-two'
                      : item === 'Blog'
                        ? '#capabilities'
                        : '#contact'
                }
                className="whitespace-nowrap text-sm text-white/85 transition-colors duration-300 hover:text-white"
              >
                {item === 'Projects' ? (
                  <>
                    Projects
                    <sup className="ml-1 font-mono text-[10px] text-white/60">6</sup>
                  </>
                ) : (
                  item
                )}
              </a>
            </Reveal>
          ))}
        </nav>

        <Reveal delay={500} className="ml-auto shrink-0">
          <a
            href="#contact"
            className="inline-flex items-center rounded-md border border-white/20 bg-white/15 px-4 py-2 text-xs text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/25 sm:px-5 sm:text-sm"
          >
            Get Free Consultation
          </a>
        </Reveal>
      </div>
    </header>
  );
}

function GlassBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md">
      {children}
    </span>
  );
}

function HeroSection() {
  return (
    <section
      id="section-one"
      aria-labelledby="hero-title"
      className="flex min-h-screen flex-col justify-between px-5 pb-12 pt-24 supports-[height:100svh]:min-h-[100svh] sm:px-8 sm:pt-28 md:px-12 md:pb-16"
    >
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          {services.map((service, index) => (
            <Reveal
              key={service}
              delay={150 + index * 120}
              className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md"
            >
              / {service}
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="max-w-xs sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            We design automation that brings clarity, precision, and efficiency to the way your company operates.
          </p>
        </Reveal>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <Reveal delay={150} className="mb-5">
            <GlassBadge>We Automate 100+ Businesses</GlassBadge>
          </Reveal>
          <Reveal delay={280}>
            <h1
              id="hero-title"
              className="text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl"
            >
              Clear. Precise.
              <br />
              Automated.
            </h1>
          </Reveal>
        </div>

        <Reveal
          delay={420}
          className="flex items-center gap-4 rounded-xl bg-white/15 p-3 backdrop-blur-md"
          as="div"
        >
          <div id="contact" className="flex items-center gap-4">
            <img
              src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85"
              alt="Mitha, co-founder of NovaAI"
              className="h-24 w-20 rounded-lg object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="flex flex-col gap-1.5 pr-2">
              <p className="text-sm font-medium text-white">Talk with Mitha</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                Co-founder of NovaAI
              </p>
              <a
                href="#section-two"
                className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85"
              >
                Book 15-mins call
                <ChevronRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CapabilityPanel() {
  return (
    <div
      id="capabilities"
      className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 px-5 backdrop-blur-md sm:px-6"
    >
      {capabilities.map((capability, index) => (
        <Reveal
          key={capability.index}
          delay={300 + index * 110}
          className={`flex gap-5 py-5 ${index < capabilities.length - 1 ? 'border-b border-white/15' : ''}`}
        >
          <span className="pt-1 font-mono text-[11px] tracking-[0.15em] text-white/55">
            {capability.index}
          </span>
          <div className="min-w-0 flex-1">
            <a
              href="#section-two"
              className="group inline-flex items-center gap-2 text-white"
            >
              <span className="text-base font-medium sm:text-lg">{capability.title}</span>
              <ChevronRight
                size={16}
                className="text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white"
                aria-hidden="true"
              />
            </a>
            <p className="mt-1.5 text-sm leading-relaxed text-white/70">{capability.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function CapabilitySection() {
  return (
    <section
      id="section-two"
      aria-labelledby="capability-title"
      className="flex min-h-screen flex-col justify-between px-5 pb-12 pt-24 supports-[height:100svh]:min-h-[100svh] sm:px-8 sm:pt-28 md:px-12 md:pb-16"
    >
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <Reveal delay={120}>
          <GlassBadge>Insight On Demand</GlassBadge>
        </Reveal>
        <Reveal delay={220} className="max-w-sm sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            Our AI doesn't just respond — it interprets, sharpens, and delivers the signal you need.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 flex flex-1 flex-col justify-end gap-12 md:mt-0 md:flex-row md:items-end md:justify-between md:gap-16">
        <div className="max-w-xl">
          <Reveal delay={180}>
            <h2
              id="capability-title"
              className="text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl"
            >
              Learn to see
              <br />
              brilliantly.
            </h2>
          </Reveal>
          <Reveal delay={320} className="mt-6 max-w-md">
            <p className="text-sm text-white/80 drop-shadow-md sm:text-base">
              From the first sketch to the final render, Nova turns raw intent into decisions your team can act on — quietly, precisely, at speed.
            </p>
          </Reveal>
          <Reveal delay={420} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#capabilities"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85 sm:text-sm"
            >
              Run the demo
              <ChevronRight size={14} aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-sm"
            >
              Free consultation
            </a>
          </Reveal>
        </div>

        <CapabilityPanel />
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div id="top" className="relative min-h-screen bg-[#0a0a0a] text-white">
      <ScrollVideo />
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <div aria-hidden="true" className="h-[80vh]" />
          <CapabilitySection />
        </main>
      </div>
    </div>
  );
}
