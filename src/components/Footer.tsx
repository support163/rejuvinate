import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and social */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">R</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-tight">REVITALIZED</span>
                <span className="text-xs text-gray-300 tracking-wider">HEALTH</span>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="hover:text-secondary transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-semibold text-secondary mb-4">Address</h4>
            <p className="text-gray-300 text-sm">
              9846 W Remington Pl,<br />
              Unit A3 Littleton, CO,<br />
              80128
            </p>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold text-secondary mb-4">Contacts</h4>
            <p className="text-gray-300 text-sm">
              Phone: 303-351-2363<br />
              Fax: 720-728-0637<br />
              <Link href="mailto:info@revitalizedhealth.com" className="hover:text-secondary transition-colors">
                www.revitalizedhealth.com
              </Link>
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-secondary mb-4">Hours</h4>
            <p className="text-gray-300 text-sm">
              Mon-Fri: 8:30 am - 5:00 pm<br />
              Sat: 8:30 am - 1:00 pm<br />
              Sun: Closed
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <div className="container-custom py-4 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="#" className="hover:text-secondary transition-colors">Patient Portal</Link>
              <Link href="#" className="hover:text-secondary transition-colors">Blog</Link>
              <Link href="#" className="hover:text-secondary transition-colors">Shop</Link>
              <Link href="#" className="hover:text-secondary transition-colors">About Us</Link>
              <Link href="#" className="hover:text-secondary transition-colors">Contact Us</Link>
            </div>
            <p className="text-sm text-gray-400">
              &copy; 2025 Revitalized Health | Designed by Richter Design
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
