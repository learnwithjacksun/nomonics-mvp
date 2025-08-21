import { Link } from "react-router-dom";
import { MessageIcon, PhoneIcon } from "../icons/Svg";

const Footer = () => {
  return (
      <div className="bg-primary-2 py-4 text-white">
      <div className="main grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        <div className="space-y-2">
          <img src="/logo.svg" alt="logo" width={150} height={150} className="-translate-x-6 -translate-y-2" />
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0">
                <MessageIcon />
              </div> <span className="md:text-sm text-xs">nomomics@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon /> <span className="md:text-sm text-xs">+2347067351150</span>
            </div>
          </div>
          <div className="flex gap-4 items-center mt-10">
          <a href="https://www.facebook.com/nomomics/" target="_blank" rel="noopener noreferrer">
            <img src="/fb.svg" alt="facebook" />
          </a>
          <a href="https://www.instagram.com/nomomics_?igsh=MWYwMDh3ZmpoYWd5NQ==" target="_blank" rel="noopener noreferrer">
            <img src="/insta.svg" alt="instagram" />
          </a>
          <a href="https://x.com/nomomics?s=21" target="_blank" rel="noopener noreferrer">
            <img src="/x.svg" alt="twitter" />
          </a>
        </div>
        </div>
        <div>
            <h3 className="text-lg font-semibold">Links</h3>
          <ul className="space-y-4 mt-4">
            <li><Link to="/" className="md:text-sm text-xs" style={{textDecoration: 'none'}}>Home</Link></li>
            <li><Link to="/" className="md:text-sm text-xs text-white/80">About</Link></li>
            <li><Link to="/" className="md:text-sm text-xs text-white/80">Community</Link></li>
           
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Legal</h3>
          <ul className="space-y-4 mt-4">
            <li><Link to="/" className="md:text-sm text-xs text-white/80">Privacy Policy</Link></li>
            <li><Link to="/" className="md:text-sm text-xs text-white/80">Terms of Service</Link></li>
            <li><Link to="/" className="md:text-sm text-xs text-white/80">Cookies</Link></li>
           
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Product</h3>
          <ul className="space-y-4 mt-4">
              <li><Link to="/" className="md:text-sm text-xs text-white/80">Categories</Link></li>
            <li><Link to="/" className="md:text-sm text-xs text-white/80">Customize</Link></li>
            <li><Link to="/" className="md:text-sm text-xs text-white/80">Pricing</Link></li>
           
          </ul>
        </div>
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold">Newsletter</h3>
          <div className="p-2 bg-white rounded-md flex items-center gap-2">
            <input type="text" placeholder="Enter your email" className="w-full text-main md:text-sm text-xs" />
            <button className="btn-primary text-white px-4 py-2 rounded-sm">Subscribe</button>
          </div>
        </div>
        
      </div>
      <p className="text-center md:text-sm text-xs text-white pt-4 border-t border-white/10 mt-4">Copyright 2024 Nomomics.com all rights reserved</p>
    </div>
  );
};

export default Footer;
