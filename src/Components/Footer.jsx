import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone, Mail } from 'lucide-react';

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 mt-12">
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
      {/* Contact Info */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
        <p><Phone size={16} className="inline-block mr-2 text-[#d72f18]" />+91 9953‑888‑840</p>
        <p className="mt-2"><Mail size={16} className="inline-block mr-2 text-[#d72f18]" />support@vimaansafar.com</p>
        <div className="mt-4 flex space-x-3 text-[#d72f18]">
          <Facebook />
          <Instagram />
          <Twitter />
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
        <ul className="space-y-2 text-sm">
          {['Home', 'Flights', 'Hotel', 'Flight Offers', 'My Bookings', 'Airlines'].map(link => (
            <li key={link}>
              <Link to={`/${link.replace(/\s+/g, '').toLowerCase()}`} className="hover:underline">
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Packages */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Packages</h3>
        <ul className="space-y-2 text-sm">
          {['Goa', 'Kashmir', 'Himachal', 'Kerela', 'Dubai', 'All Packages'].map(link => (
            <li key={link}>
              <Link to={`/packages/${link.replace(/\s+/g, '').toLowerCase()}`} className="hover:underline">
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Support */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Support</h3>
        <ul className="space-y-2 text-sm">
          {['About Us', 'Contact Us', 'Privacy Policy', 'Terms & Conditions', 'Disclaimer'].map(link => (
            <li key={link}>
              <Link to={`/${link.replace(/\s+/g, '').toLowerCase().replace('&', 'and')}`} className="hover:underline">
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="bg-gray-100 text-center py-4 text-sm text-gray-600">
      © {new Date().getFullYear()} Vimaan Safar. All Rights Reserved. | Powered by <strong className='text-[#d72f18]'>Supern</strong>
    </div>
  </footer>
);

export default Footer;
