import { Link } from "wouter";
import { GraduationCap, Phone, Mail, MapPin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[hsl(152_55%_10%)] text-green-100">
      <div className="gold-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-0.5 overflow-hidden shadow-inner">
                <img src="/logo-crest.svg?v=3" className="w-full h-full object-contain" alt="YOSU Logo" />
              </div>
              <div>
                <p className="font-serif font-bold text-white">YOSU INTERNATIONAL</p>
                <p className="text-[hsl(43_90%_52%)] text-xs tracking-widest uppercase">School</p>
              </div>
            </div>
            <p className="text-sm text-green-200 leading-relaxed">
              Nurturing excellence and building futures in the heart of Swat Valley since our founding. An English-medium international school committed to academic brilliance.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg text-[hsl(43_90%_52%)] mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/notifications", label: "Notifications" },
                { href: "/events", label: "Events Gallery" },
                { href: "/results", label: "Result Checker" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-green-200 hover:text-[hsl(43_90%_52%)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg text-[hsl(43_90%_52%)] mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[hsl(43_90%_52%)] mt-0.5 flex-shrink-0" />
                <span className="text-green-200">Shah je market opposite Arshad Super store, Deolai Swat Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[hsl(43_90%_52%)] flex-shrink-0" />
                <a href="tel:+923449757557" className="text-green-200 hover:text-[hsl(43_90%_52%)] transition-colors">
                  +92 344 9757557
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[hsl(43_90%_52%)] flex-shrink-0" />
                <a href="mailto:info@d.yosu.edu.pk" className="text-green-200 hover:text-[hsl(43_90%_52%)] transition-colors">
                  info@d.yosu.edu.pk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-[hsl(152_40%_16%)] py-4">
        <p className="text-center text-xs text-green-300 flex items-center justify-center gap-1">
          © {new Date().getFullYear()} YOSU International School. Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> in Swat Valley.
        </p>
      </div>
    </footer>
  );
}
