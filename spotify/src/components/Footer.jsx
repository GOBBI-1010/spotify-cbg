// src/components/Footer.jsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" p-9 sm:pl-69   md:p-20 bg-black mt-1 br-50 text-white   pb-8 ">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-0 text-lg "> {/* Removed space by setting gap-0 */}
        {/* Company Section */}
        <div>
          <h3 className="font-bold text-2xl mb-4 mt-8 text-green-800">Company</h3>
          <ul>
            <li><a href="#" className="hover:text-green-800">About</a></li>
            <li><a href="#" className="hover:text-green-800">Jobs</a></li>
            <li><a href="#" className="hover:text-green-800">For the Record</a></li>
            <li><a href="#" className="hover:text-green-800">Communities</a></li>
          </ul>
        </div>

        {/* For Artists Section */}
        <div>
          <h3 className="font-bold text-2xl mb-4 mt-8 text-green-800">For Artists</h3>
          <ul>
            <li><a href="#" className="hover:text-green-800">Developers</a></li>
            <li><a href="#" className="hover:text-green-800">Advertising</a></li>
            <li><a href="#" className="hover:text-green-800">Investors</a></li>
            <li><a href="#" className="hover:text-green-800">Vendors</a></li>
          </ul>
        </div>

        {/* Useful Links Section */}
        <div>
          <h3 className="font-bold text-lg mb-4 mt-8 text-green-800">Useful Links</h3>
          <ul>
            <li><a href="#" className="hover:text-green-800">Support</a></li>
            <li><a href="#" className="hover:text-green-800">Premium Individual</a></li>
            <li><a href="#" className="hover:text-green-800">Premium Student</a></li>
            <li><a href="#" className="hover:text-green-800">Spotify Free</a></li>
          </ul>
        </div>

        {/* Social Media & Copyright */}
        <div>
          <h3 className="font-bold text-lg mb-4 mt-8 text-green-800">Follow Us</h3>
          <div className="flex space-x-6 text-2xl">
            <a href="#" className="hover:text-green-800"><FaFacebook /></a>
            <a href="#" className="hover:text-green-800"><FaTwitter /></a>
            <a href="#" className="hover:text-green-800"><FaInstagram /></a>
            <a href="#" className="hover:text-green-800"><FaLinkedin /></a>
          </div>
          <p className="mt-6 text-sm">
            &copy; 2025 Spotify 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
