import {
  ShieldCheck,
  Truck,
  MapPin,
  Package,
  Wrench,
  Boxes,
  ArrowRight,
  CheckCircle2,
  Award,
  Target,
  Users,
  Zap,
  Quote
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col text-primary font-sans bg-surface-bright">
      {/* --- Hero Section --- */}
      <section className="relative flex h-[420px] md:h-[480px] items-center overflow-hidden w-full bg-primary-dark pb-16 md:pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC37i-8XdrQj4Ji82pMNwwyko2D5XCUWuKcGFfL6CvtGaJnrDtdoTcq_IQzFyK13O3XtJ_0m3mNcyPqkwB-nAFc4-lBlJPerM0ciTsZ0sMN8Y5ha-TPzugwgS-3fnEFqZICPXRiot_-O47TRZVJWF5rHimb8obkf1xCeR9qkd-MCHn8mKwisABxuOyp3ZplRryQKpaB4N6gQrD7RR3_DGE1-HZSssrfkOlnTFVb5nBLQ7U3FcraQkz7UVw-Rbz6o8FOR8fLCXk6v8E"
            alt="Industrial Refrigeration Warehouse"
            fill
            className="object-cover opacity-20 grayscale contrast-125"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full">
          <div className="max-w-2xl">
            <span className="text-accent mb-2 inline-block font-semibold tracking-widest uppercase text-sm">
              OUR LEGACY & BUSINESS VALUES
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase leading-tight tracking-tight">
              About Mata Refrigeration
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              We connect industrial requirements with top-tier HVAC solutions, serving Maharashtra's cold chains and engineering projects with uncompromising quality since 1989.
            </p>
          </div>
        </div>
        {/* Curved divider to match requested wavy shape */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px] fill-[#f8f9ff]">
            <path d="M0,60 C300,140 600,0 900,30 C1050,45 1150,95 1200,90 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* --- Our Story & Mission Statement --- */}
      <section className="py-16 max-w-7xl mx-auto px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Story text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="h-1 w-8 bg-secondary-light rounded-full" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-secondary-light">OUR STORY</h2>
            </div>
            <h3 className="text-3xl font-extrabold text-primary uppercase tracking-tight">
              Built on Vision, Realized through Devotion
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              Mata Refrigeration is proud to be part of a rich business heritage originally founded under the Agarwal Group of Companies. Headed by the late <strong>Mr. B.L. Agarwal</strong>—a visionary entrepreneur who possessed the drive and caliber to explore new products in new markets—the company was built on the foundation of matching market demands with cutting-edge technologies.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              Today , the responsibility of realizing that vision is shared by his sons. With focused devotion and dedication, they work continuously to expand the customer base and provide better, more reliable service. We continue to look towards the future while honoring the principles of integrity and commitment that started it all.
            </p>
          </div>

          {/* Mission Quote Card */}
          <div className="lg:col-span-5 bg-primary text-white p-8 rounded-xl relative overflow-hidden shadow-2xl border border-primary-light">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Quote size={120} className="text-white" />
            </div>
            <div className="relative z-10">
              <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-4">OUR MISSION STATEMENT</h4>
              <p className="text-lg font-medium italic leading-relaxed text-white/90 mb-6">
                &ldquo;We believe in investing in any opportunity which assists in improving our capability to be of value to our esteemed Customer and to provide them with the latest technology at the most economically feasible prices.&rdquo;
              </p>
              <div className="h-[2px] w-12 bg-accent mb-3" />
              <p className="text-xs uppercase tracking-widest text-white/50">Mata Refrigeration Board of Directors</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Core Pillars (Vision, Org, Strengths) --- */}
      <section className="bg-gray-50 py-20 border-y border-gray-100 w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-secondary-light mb-2">OPERATIONAL PILLARS</h2>
            <h3 className="text-3xl font-extrabold text-primary uppercase tracking-tight">Our Core Capabilities</h3>
            <p className="text-gray-600 mt-2">How we align our internal organization to stand firmly in a competitive market.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:border-secondary-light/40 transition-all hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-secondary/5 rounded-lg flex items-center justify-center text-secondary-light mb-6">
                  <Target size={24} />
                </div>
                <h4 className="text-xl font-bold text-primary uppercase mb-4">Our Vision</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We look forward to venturing into new alliances, reaching new horizons, and strengthening our ability to serve all potential HVAC and industrial cooling markets in Maharashtra and beyond.
                </p>
              </div>
            </div>

            {/* Organisation */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:border-secondary-light/40 transition-all hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-secondary/5 rounded-lg flex items-center justify-center text-secondary-light mb-6">
                  <Users size={24} />
                </div>
                <h4 className="text-xl font-bold text-primary uppercase mb-4">Our Organisation</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Our organization objective is to go out of our way to employ the most suitable candidates and ensure every person associated with our organization is content, motivated, and fully geared up to achieve excellence.
                </p>
              </div>
            </div>

            {/* Strengths */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:border-secondary-light/40 transition-all hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-secondary/5 rounded-lg flex items-center justify-center text-secondary-light mb-6">
                  <Zap size={24} />
                </div>
                <h4 className="text-xl font-bold text-primary uppercase mb-4">Our Strengths</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Keeping pace with modernization, we are equipped with the infrastructure and expertise required to succeed:
                </p>
                <ul className="space-y-2">
                  {[
                    "Qualified sales & trained service engineers",
                    "IT-equipped logistics and support channels",
                    "Diversified warehouse locations with centralized control",
                    "Real-time online inventory control",
                    "Strong financial and customer base"
                  ].map((strength, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle2 size={14} className="text-secondary-light shrink-0 mt-0.5" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Meet the CEO Section --- */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* CEO Image Container */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <div className="relative w-full aspect-[4/5] max-w-sm rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-200">
              <Image
                src="/images/arun_agarwal_ceo.png"
                alt="Arun Agarwal - CEO"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <div className="mt-4 text-center lg:text-left">
              <h4 className="text-xl font-bold text-primary">Arun Agarwal</h4>
              <p className="text-sm font-semibold text-secondary-light uppercase tracking-wider">CEO, Mata Refrigeration</p>
              <p className="text-xs text-gray-400 mt-1">Agarwal Group of Companies</p>
            </div>
          </div>

          {/* CEO Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="h-1 w-8 bg-secondary-light rounded-full" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-secondary-light">EXECUTIVE LEADERSHIP</h2>
            </div>
            <h3 className="text-3xl font-extrabold text-primary uppercase tracking-tight">
              Leading with Innovation & Integrity
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Mr. Arun Agarwal is a Commerce graduate who moved on to pursue Chartered Accountancy (CA). He stepped into the business with a humble start in the year 1989 with Jaykay Enterprises – Engineering division, a sister concern of the Agarwal Group of Companies. Under his management, the company established itself as a leading distributor for engineering adhesives, industrial lubricants, and refrigerant gases.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              As a forward-thinking businessman with sharp leadership skills, Mr. Agarwal has guided the expansion of Mata Refrigeration as Navi Mumbai&apos;s leading distributor of <strong>FLORON make refrigerant gases</strong>, <strong>LOCTITE engineering adhesives and sealants</strong>, and <strong>ROCOL special industrial lubricants</strong>. His philosophy centers on growth through customer satisfaction, striving to continuously improve customer service and support systems.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              Under his direction, Mata Refrigeration serves thousands of satisfied clients across Maharashtra and India. Mr. Agarwal is also an active member of professional networking platforms like BNI (Business Network International), bringing together collaborations that drive local and national industry growth.
            </p>
            <div className="border-t border-gray-150 pt-6 grid grid-cols-3 gap-4">
              <div>
                <span className="block text-2xl font-bold text-primary">1989</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Year Established</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-primary">3,000+</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Clients Served</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-primary">100%</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Genuine Products</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA Banner --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-16 w-full">
        <div className="bg-primary text-white p-10 md:p-16 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl overflow-hidden relative">
          <div className="max-w-xl relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold uppercase mb-6 leading-tight">Partner with Us Today</h2>
            <p className="text-lg text-white/70">Get specialized volume pricing and technical consultation for your commercial and industrial cooling setups.</p>
          </div>
          <Link
            href="/contact"
            className="bg-accent hover:bg-accent-dark text-white font-bold h-14 px-10 rounded-full transition-all flex items-center gap-3 whitespace-nowrap active:scale-95 relative z-10 shadow-lg"
          >
            REQUEST A QUOTE
            <ArrowRight size={20} />
          </Link>
          {/* Subtle decoration */}
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-accent/10 to-transparent" />
        </div>
      </section>
    </div>
  );
}
