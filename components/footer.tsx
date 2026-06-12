import React from 'react';
import Link from 'next/link';
import { Award, Compass, HelpCircle, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#08080a] text-neutral-400 text-xs font-sans border-t border-white/5">
      
      {/* Top Value Add Row */}
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-white/5 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="h-10 w-10 rounded-full border border-[#c5a880]/20 flex items-center justify-center bg-[#111115] text-[#c5a880] shrink-0">
            <Compass className="h-4.5 w-4.5" />
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Atelier Styling Service</h4>
            <p className="text-[10px] text-neutral-500 mt-0.5">Complementary private fittings & tailored size consultations.</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="h-10 w-10 rounded-full border border-[#c5a880]/20 flex items-center justify-center bg-[#111115] text-[#c5a880] shrink-0">
            <Award className="h-4.5 w-4.5" />
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Premium Craftsmanship</h4>
            <p className="text-[10px] text-neutral-500 mt-0.5">Sourced from the finest wool, cotton, and silk mills globally.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="h-10 w-10 rounded-full border border-[#c5a880]/20 flex items-center justify-center bg-[#111115] text-[#c5a880] shrink-0">
            <ShieldCheck className="h-4.5 w-4.5" />
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Secure Acquisition</h4>
            <p className="text-[10px] text-neutral-500 mt-0.5">Fully encrypted payments, secure shipping, and simple returns.</p>
          </div>
        </div>
      </div>

      {/* Main Links Area */}
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        
        <div className="space-y-4">
          <h3 className="text-white font-serif-luxury tracking-[0.2em] text-sm uppercase">V ONE</h3>
          <p className="text-[11px] text-neutral-500 leading-relaxed font-light">
            V ONE Atelier defines precision tailored menswear. From executive double-breasted merino wool suits to effortless weekend linen shirts, we deliver standard-setting wardrobe updates.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-[10px]">COLLECTIONS</h3>
          <ul className="space-y-2 text-[11px]">
            <li><Link href="/products?category=Formal%20Wear" className="hover:text-white transition-colors">Formal & Tailored Suits</Link></li>
            <li><Link href="/products?category=Casual%20Wear" className="hover:text-white transition-colors">Weekend Casual Linen</Link></li>
            <li><Link href="/products?category=Ethnic%20Wear" className="hover:text-white transition-colors">Heritage Ethnic Wear</Link></li>
            <li><Link href="/products?category=Activewear" className="hover:text-white transition-colors">Luxury Activewear</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-[10px]">THE ATELIER</h3>
          <ul className="space-y-2 text-[11px]">
            <li><Link href="#" className="hover:text-white transition-colors">Our Heritage & Craft</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Sustainability Commitments</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Atelier Custom Services</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">In-Store Appointments</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-[10px]">CLIENT CARE</h3>
          <ul className="space-y-2 text-[11px]">
            <li><Link href="#" className="hover:text-white transition-colors">Shipping & Global Deliveries</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Complimentary Returns & Exchanges</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Payment Methods & Security</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">FAQ & Contact Support</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer Info */}
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5 text-neutral-500 text-[10px]">
        <p className="tracking-wide">© {new Date().getFullYear()} V ONE ATELIER. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-neutral-300">Privacy Policy</Link>
          <Link href="#" className="hover:text-neutral-300">Terms of Use</Link>
          <Link href="#" className="hover:text-neutral-300">Accessibility Statement</Link>
        </div>
        <div className="flex gap-2 items-center opacity-40 hover:opacity-75 transition-opacity">
          <span className="text-[9px] uppercase tracking-wider">Secured payments via card systems</span>
        </div>
      </div>

    </footer>
  );
}
