'use client';

import { useState, FormEvent } from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Mail, 
  Clock, 
  Send, 
  ShieldCheck, 
  ArrowRight,
  Store
} from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [otherText, setOtherText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const CATEGORY_OPTIONS = [
    "Refrigerant Gases (R22, R134a, etc)",
    "Industrial Compressor Oils",
    "AC Copper Piping & Insulation",
    "Brazing Rods & Technical Accessories",
    "Other"
  ];

  const getProductCategoriesValue = () => {
    return selectedCategories.map(c => {
      if (c === "Other") {
        return otherText.trim() ? `Other (${otherText.trim()})` : "Other";
      }
      return c;
    }).join(', ');
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      const updated = prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category];
      if (updated.length > 0) {
        setErrors(errs => ({ ...errs, product_categories: '' }));
      }
      return updated;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setStatus('idle');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const company = formData.get('company') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = "Full name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!company.trim()) {
      newErrors.company = "Company name is required";
    }

    const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = "Invalid phone number (min 10 digits)";
    }

    if (selectedCategories.length === 0) {
      newErrors.product_categories = "Please select at least one category";
    }

    if (selectedCategories.includes("Other") && !otherText.trim()) {
      newErrors.other_text = "Please specify your requirement";
    }

    if (!message.trim()) {
      newErrors.message = "Message is required";
    } else if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch("https://formsubmit.co/ajax/matarefrigeration@gmail.com", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        setSelectedCategories([]);
        setOtherText('');
        setStatus('success');
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col font-sans text-primary">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#06112C] py-12 lg:py-16 overflow-hidden">
        <div className="container relative z-10 mx-auto px-6 lg:px-16">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-secondary-light mb-2 inline-block">
              Get in Touch
            </span>
            <h1 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl uppercase tracking-tight">
              Contact <span className="text-secondary-light">Mata</span> Refrigeration
            </h1>
            <p className="text-lg text-[#A0B4CC] leading-relaxed max-w-xl">
              Connect with our industrial experts for high-performance refrigerant gases, components, and regional technical support.
            </p>
          </div>
        </div>
        {/* Background Decoration */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#2B7A78]/10 to-transparent pointer-events-none" />
      </section>

      {/* --- QUICK CONTACT CARDS --- */}
      <section className="relative -mt-10 z-20">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 group hover:border-secondary-light transition-all">
              <div className="h-10 w-10 rounded-lg bg-secondary-light/10 text-secondary-light flex items-center justify-center mb-4 group-hover:bg-secondary-light group-hover:text-white transition-colors">
                <Phone size={20} />
              </div>
              <h3 className="font-heading text-lg font-bold mb-1">Call Experts</h3>
              <p className="text-xs text-gray-500 mb-3">Direct line for technical specs & pricing.</p>
              <a href="tel:+918080673647" className="text-md font-bold text-primary hover:text-secondary-light flex items-center gap-2">
                080806 73647
                <ArrowRight size={14} />
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 group hover:border-secondary-light transition-all">
              <div className="h-10 w-10 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-4 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                <MessageCircle size={20} />
              </div>
              <h3 className="font-heading text-lg font-bold mb-1">WhatsApp Enquiry</h3>
              <p className="text-xs text-gray-500 mb-3">Fastest route for stock availability.</p>
              <a href="https://wa.me/918080673647" className="text-md font-bold text-primary hover:text-[#25D366] flex items-center gap-2">
                Message Now
                <ArrowRight size={14} />
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 group hover:border-secondary-light transition-all">
              <div className="h-10 w-10 rounded-lg bg-secondary-light/10 text-secondary-light flex items-center justify-center mb-4 group-hover:bg-secondary-light group-hover:text-white transition-colors">
                <Mail size={20} />
              </div>
              <h3 className="font-heading text-lg font-bold mb-1">Email Support</h3>
              <p className="text-xs text-gray-500 mb-3">For bulk quotes & corporate inquiries.</p>
              <a href="mailto:matarefrigeration@gmail.com" className="text-md font-bold text-primary hover:text-secondary-light flex items-center gap-2">
                matarefrigeration@gmail.com
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT: INFO & FORM --- */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left: Info & Map */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold mb-6 uppercase tracking-tight">Regional Hub</h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin className="text-secondary-light shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold text-primary text-sm">Main Office & Distribution</h4>
                      <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                        CHANNEL CLASSIC, HSG Society<br />
                        Shop No -1, Plot No-91, Sector 1<br />
                        Kopar Khairane, Navi Mumbai 400709
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="text-secondary-light shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold text-primary text-sm">Contact Number</h4>
                      <p className="text-gray-600 mt-1 text-sm">
                        <a href="tel:+918080673647" className="hover:text-secondary-light font-semibold">
                          +91 80806 73647
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="text-secondary-light shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold text-primary text-sm">Operations</h4>
                      <p className="text-gray-600 mt-1 text-sm">
                        Mon - Sat: 10:00 AM - 06:00 PM<br />
                        <span className="text-red-500 font-semibold italic text-xs">Sunday: Closed</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm text-secondary-light shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-xs">GST Verified Dealer</h4>
                    <p className="text-[10px] text-gray-500 mt-1">Registered industrial supplier compliant with safety standards.</p>
                  </div>
                </div>
                <a 
                  href="https://www.indiamart.com/matarefrigeration/profile.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3 hover:border-accent/40 transition-colors group"
                >
                  <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm text-accent group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
                    <Store size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-xs flex items-center gap-1.5">
                      IndiaMART TrustSEAL
                      <span className="text-[9px] font-extrabold uppercase text-accent bg-accent/10 px-1.5 py-0.5 rounded-sm">Verified</span>
                    </h4>
                    <p className="text-[10px] text-gray-500 mt-1 group-hover:underline">Click to view our verified seller profile.</p>
                  </div>
                </a>
              </div>

              {/* Map Placeholder with Style */}
              <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 shadow-inner group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.2117565403!2d73.0036!3d19.117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnwn6S0MDYnMTIuMCJOIDczwrAwMCcxMy4wIkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                  className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                ></iframe>
                <div className="absolute inset-0 bg-primary/10 pointer-events-none group-hover:opacity-0 transition-opacity" />
              </div>
            </div>

            {/* Right: Modern Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-100">
                <h2 className="font-heading text-2xl font-bold mb-2">Industrial Enquiry</h2>
                <p className="text-gray-500 mb-6 text-sm">Mention your BTU requirements or gas tonnage for specialized bulk pricing.</p>
                
                {status === 'success' && (
                  <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-700 mb-5">
                    <p className="font-bold text-base">Thank you!</p>
                    <p className="mt-1">Your industrial enquiry has been sent successfully. Our team will contact you shortly.</p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700 mb-5">
                    <p className="font-bold text-base">Submission failed</p>
                    <p className="mt-1">Something went wrong. Please try again or call us directly.</p>
                  </div>
                )}

                <form 
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  noValidate
                >
                  {/* FormSubmit Configuration */}
                  <input type="hidden" name="_subject" value="New Industrial Enquiry - Mata Refrigeration" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary-light outline-none text-primary text-sm transition-all ${
                          errors.name ? 'border-red-500 focus:ring-red-500' : 'border-transparent'
                        }`}
                        placeholder="Industrial Buyer Name" 
                      />
                      {errors.name && <p className="text-red-500 text-[11px] font-semibold mt-0.5">{errors.name}</p>}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Company</label>
                      <input 
                        type="text" 
                        name="company"
                        className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary-light outline-none text-primary text-sm transition-all ${
                          errors.company ? 'border-red-500 focus:ring-red-500' : 'border-transparent'
                        }`}
                        placeholder="Technical / Contracting Firm" 
                      />
                      {errors.company && <p className="text-red-500 text-[11px] font-semibold mt-0.5">{errors.company}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary-light outline-none text-primary text-sm transition-all ${
                          errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-transparent'
                        }`}
                        placeholder="For instant WhatsApp quote" 
                      />
                      {errors.phone && <p className="text-red-500 text-[11px] font-semibold mt-0.5">{errors.phone}</p>}
                    </div>
                     <div className="space-y-1 relative">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Requirement</label>
                      <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary-light transition-all outline-none text-primary text-left flex justify-between items-center text-sm transition-all ${
                          errors.product_categories ? 'border-red-500 focus:ring-red-500' : 'border-transparent'
                        }`}
                      >
                        <span className="truncate">
                          {selectedCategories.length === 0 
                            ? 'Select Product Categories' 
                            : getProductCategoriesValue()
                          }
                        </span>
                        <span className="text-gray-400 text-xs">{isOpen ? '▲' : '▼'}</span>
                      </button>
                      
                      {isOpen && (
                        <>
                          <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
                          <div className="absolute z-30 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg p-3 space-y-2 max-h-60 overflow-y-auto">
                            {CATEGORY_OPTIONS.map((option) => {
                              const isChecked = selectedCategories.includes(option);
                              return (
                                <label 
                                  key={option} 
                                  className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${isChecked ? 'bg-secondary-light/5 font-semibold text-secondary-light' : 'text-primary'}`}
                                >
                                  <input 
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => toggleCategory(option)}
                                    className="rounded text-secondary-light focus:ring-secondary-light h-4 w-4"
                                  />
                                  <span className="text-sm">{option}</span>
                                </label>
                              );
                            })}
                          </div>
                        </>
                      )}
                      
                      <input 
                        type="hidden" 
                        name="product_categories" 
                        value={getProductCategoriesValue()} 
                      />
                      {errors.product_categories && <p className="text-red-500 text-[11px] font-semibold mt-0.5">{errors.product_categories}</p>}
                    </div>
                  </div>

                  {/* Specify Other Input */}
                  {selectedCategories.includes("Other") && (
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Specify Other Requirement</label>
                      <input 
                        type="text"
                        value={otherText}
                        onChange={(e) => {
                          setOtherText(e.target.value);
                          if (e.target.value.trim()) {
                            setErrors(errs => ({ ...errs, other_text: '' }));
                          }
                        }}
                        placeholder="Please specify your requirement..."
                        className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary-light outline-none text-primary text-sm transition-all ${
                          errors.other_text ? 'border-red-500 focus:ring-red-500' : 'border-transparent'
                        }`}
                      />
                      {errors.other_text && <p className="text-red-500 text-[11px] font-semibold mt-0.5">{errors.other_text}</p>}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Detailed Message</label>
                    <textarea 
                      name="message"
                      rows={4} 
                      className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary-light outline-none text-primary resize-none text-sm transition-all ${
                        errors.message ? 'border-red-500 focus:ring-red-500' : 'border-transparent'
                      }`}
                      placeholder="Describe your scale, quantity, or technical needs..."
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-[11px] font-semibold mt-0.5">{errors.message}</p>}
                  </div>

                  <button 
                    type="submit"
                    disabled={status === 'submitting' || status === 'success'}
                    className={`w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-secondary-light transition-all shadow-lg flex items-center justify-center gap-3 active:scale-[0.98] ${
                      (status === 'submitting' || status === 'success') ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                    }`}
                  >
                    {status === 'submitting' && 'SENDING...'}
                    {status === 'success' && 'SENT!'}
                    {status === 'error' && 'TRY AGAIN'}
                    {status === 'idle' && 'SEND ENQUIRY'}
                    {status !== 'submitting' && status !== 'success' && <Send size={18} />}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
