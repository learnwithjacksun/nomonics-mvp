import { Link } from "react-router-dom";
import { MessageIcon, PhoneIcon } from "../icons/Svg";

const Footer = () => {
  return (
      <div className="bg-primary-2 py-10 text-white">
      <div className="main grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        <div className="space-y-2">
          <img src="/logo.svg" alt="logo" width={150} height={150} className="-translate-x-4 -translate-y-2" />
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0">
                <MessageIcon />
              </div> <span className="text-sm">help@nomonics.com</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon /> <span className="text-sm">+234 81 21081148</span>
            </div>
          </div>
          <div className="flex gap-4 items-center mt-10">
          <a href="https://www.facebook.com/nomomics/" target="_blank" rel="noopener noreferrer">
            <img src="/fb.svg" alt="facebook" />
          </a>
          <a href="https://www.instagram.com/nomomics/" target="_blank" rel="noopener noreferrer">
            <img src="/insta.svg" alt="instagram" />
          </a>
          <a href="https://www.twitter.com/nomomics/" target="_blank" rel="noopener noreferrer">
            <img src="/x.svg" alt="twitter" />
          </a>
        </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Links</h3>
          <ul className="space-y-4 mt-4">
            <li><Link to="/" className="text-sm" style={{textDecoration: 'none'}}>Home</Link></li>
            <li><Link to="/" className="text-sm text-white/80">About</Link></li>
            <li><Link to="/" className="text-sm text-white/80">Community</Link></li>
           
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Legal</h3>
          <ul className="space-y-4 mt-4">
            <li><Link to="/" className="text-sm text-white/80">Privacy Policy</Link></li>
            <li><Link to="/" className="text-sm text-white/80">Terms of Service</Link></li>
            <li><Link to="/" className="text-sm text-white/80">Cookies</Link></li>
           
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Product</h3>
          <ul className="space-y-4 mt-4">
              <li><Link to="/" className="text-sm text-white/80">Categories</Link></li>
            <li><Link to="/" className="text-sm text-white/80">Customize</Link></li>
            <li><Link to="/" className="text-sm text-white/80">Pricing</Link></li>
           
          </ul>
        </div>
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-2xl font-semibold">Newsletter</h3>
          <div className="p-4 bg-white rounded-md flex items-center gap-2">
            <input type="text" placeholder="Enter your email" className="w-full text-main text-sm" />
            <button className="btn-primary text-white px-4 py-2 rounded-sm">Subscribe</button>
          </div>
        </div>
        
      </div>
      <p className="text-center text-sm text-white pt-10 border-t border-white/10 mt-10">Copyright 2024 Nomomics.com all rights reserved</p>
    </div>
  );
};

export default Footer;
