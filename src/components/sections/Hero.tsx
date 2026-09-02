import Image from 'next/image';
import Link from 'next/link';
import { Phone, MessageCircle, BadgeCheck, MapPin } from 'lucide-react';

const brands = [
  { name: 'Chemours', src: '/images/c.png' },
  { name: 'Floron', src: '/images/f.png' },
  { name: 'MPCL', src: '/images/m.png' },
  { name: 'Mafron', src: '/images/ma.png' },
  { name: 'Symbol', src: '/images/sy.png' },
  { name: 'Refron', src: '/images/r.png' },
];

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#06112C]">
      {/* --- Layout Grid --- */}
      <div className="relative flex min-h-[420px] lg:min-h-[520px]">

        {/* ---- LEFT: Content Pane ---- */}
        <div className="relative z-10 flex w-full flex-col justify-center px-6 py-14 sm:px-10 lg:w-[58%] lg:px-16 lg:py-20">

          <div className="flex items-center gap-4 mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/mata_logo_gold.svg"
              alt="Mata Refrigeration Logo"
              className="h-16 w-16 md:h-20 md:w-20 object-contain drop-shadow-[0_4px_12px_rgba(255,167,81,0.2)] animate-pulse-slow"
              style={{ animationDuration: '3s' }}
            />
            <div>
              <div className="inline-flex w-fit items-center gap-2 rounded-sm bg-[#1FAB89] px-3 py-1 mb-1">
                <BadgeCheck size={13} className="text-white" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-white">
                  Authorized Refrigerant  Gas Dealer
                </span>
              </div>
              <p className="text-[10px] sm:text-xs font-semibold text-accent uppercase tracking-widest">Navi Mumbai's Leading Distributor</p>
            </div>
          </div>

          {/* Headline */}
          <h1 className="mb-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem]">
            Mata Refrigeration&nbsp;&mdash; Refrigerant Gas &amp;{' '}
            <br className="hidden sm:block" />
            HVAC Supply Experts
          </h1>

          {/* Sub-text */}
          <p className="mb-8 max-w-lg text-[15px] leading-relaxed text-[#A0B4CC]">
            Trusted supplier of refrigerant gases, compressor oils, copper pipes, brazing
            rods, and refrigeration accessories in Navi Mumbai. Precision components for
            large-scale industrial cooling.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+918080673647"
              className="inline-flex items-center gap-2 rounded-md border border-white bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#06112C]"
            >
              <Phone size={16} />
              Call Now
            </a>
            <a
              href="https://wa.me/918080673647?text=Hi%2C%20I%20saw%20your%20website%20and%20I%27m%20interested%20in%20your%20industrial%20refrigeration%20products.%20Can%20you%20please%20provide%20more%20details%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1DA851]"
            >
              <MessageCircle size={16} />
              WhatsApp Enquiry
            </a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Shop+No+-1,+Plot+No-91,+Channel+Classic,+HSG+Society,+Sector+1,+Kopar+Khairane,+Navi+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-secondary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary-dark"
            >
              <MapPin size={16} />
              Get Directions
            </a>
          </div>
        </div>

        {/* ---- RIGHT: Image Pane ---- */}
        <div className="absolute inset-0 lg:relative lg:inset-auto lg:w-[42%]">
          {/* Dark overlay on mobile so text is readable; clipped on desktop */}
          <div className="absolute inset-0 bg-[#06112C]/75 lg:bg-transparent" />
          {/* Blue-tinted overlay on top of the image on desktop */}
          <div className="absolute inset-0 hidden bg-[#06112C]/55 lg:block" />
          <Image
            src="/images/hero-bg.png"
            alt="Industrial refrigeration machinery"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* --- Brand Logos Ticker --- */}
      <div className="relative border-y border-gray-150 bg-white py-6 pause-marquee">
        {/* Gradient edge overlays for smooth transition/fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee-rtl flex items-center">
            {/* First Set of Logos */}
            <div className="flex shrink-0 items-center">
              {brands.map((brand, idx) => (
                <div
                  key={`brand-set1-${idx}`}
                  className="flex h-12 w-28 md:h-16 md:w-36 items-center justify-center transition-transform duration-300 hover:scale-105 mr-6 md:mr-8"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.src}
                    alt={`${brand.name} Logo`}
                    className="max-h-full max-w-full object-contain"
                    style={brand.name === 'Symbol' ? { filter: 'invert(1)' } : undefined}
                  />
                </div>
              ))}
            </div>
            {/* Second (Duplicate) Set of Logos for Infinite Loop */}
            <div className="flex shrink-0 items-center">
              {brands.map((brand, idx) => (
                <div
                  key={`brand-set2-${idx}`}
                  className="flex h-12 w-28 md:h-16 md:w-36 items-center justify-center transition-transform duration-300 hover:scale-105 mr-6 md:mr-8"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.src}
                    alt={`${brand.name} Logo`}
                    className="max-h-full max-w-full object-contain"
                    style={brand.name === 'Symbol' ? { filter: 'invert(1)' } : undefined}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
