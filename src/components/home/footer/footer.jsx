import React from "react";
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-green-200 text-black py-8">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="footer-col w-full md:w-auto mb-8 md:mb-0 flex-grow">
          <h4 className="font-bold">Shop Categories</h4>
          <ul className="list-none mt-4">
            <li className="mb-2">
              <a href="#" className="text-black hover:underline">
                Laptops
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-black hover:underline">
                Desktops
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-black hover:underline">
                Phones
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-black hover:underline">
                Watches
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-black hover:underline">
                TVs
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-black hover:underline">
                accessories
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-col w-full md:w-auto mb-8 md:mb-0 flex-grow">
          <h4 className="font-bold">Customer Service</h4>
          <ul className="list-none mt-4">
            <li className="mb-2">
              <span className="text-black hover:underline">
                <Link href="/contactus">Contact Us</Link>
              </span>
            </li>
            <li className="mb-2">
              <a href="#" className="text-black hover:underline">
                Shipping Policy
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-black hover:underline">
                Returns & Exchanges
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-black hover:underline">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col w-full md:w-auto mb-8 md:mb-0 flex-grow">
          <h4 className="font-bold">About Us</h4>
          <p className="text-gray-400">At our electronics store.</p>
        </div>

        <div className="footer-col w-full md:w-auto mb-8 md:mb-0 flex-grow">
          <h4 className="font-bold">Follow Us</h4>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-black hover:underline">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="#" className="text-black hover:underline">
                <FaYoutube />
              </a>
            </li>
            <li>
              <a href="#" className="text-black hover:underline">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a href="#" className="text-black hover:underline">
                <FaFacebook />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
