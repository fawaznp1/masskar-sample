const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 mt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.1),_transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,119,198,0.05),_transparent_50%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="group">
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Categories
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transform scale-x-0 group-hover:scale-x-10 transition-transform duration-300"></div>
            </h3>
            <ul className="space-y-3">
              {['Fish', 'Meat', 'Fresh', 'Veg', 'Fruits'].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 ease-out block py-1 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="group">
            <h3 className="text-xl font-bold text-white mb-6 relative">
              More Categories
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </h3>
            <ul className="space-y-3">
              {['Food', 'Bakery', 'Roastery', 'Non Food'].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 ease-out block py-1 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="group">
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Policy Info
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </h3>
            <ul className="space-y-3">
              {['FAQ', 'Cancellation', 'Returns & Refund', 'Payments & Privacy'].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 ease-out block py-1 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="group">
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Company
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </h3>
            <ul className="space-y-3">
              {['Masskar', 'About Us', 'Feedback', 'Delivery Locations'].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 ease-out block py-1 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="group">
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Contact
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-cyan-400 transition-all duration-300 ease-out block py-1 hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.4)] hover:scale-105"
                >
                  <span className="block text-sm font-medium">Phone:</span>
                  <span className="text-lg font-semibold">+123456789</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-cyan-400 transition-all duration-300 ease-out block py-1 hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.4)] hover:scale-105"
                >
                  <span className="block text-sm font-medium">Email:</span>
                  <span className="text-lg font-semibold ">info@masskar.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gradient-to-r from-transparent via-gray-700 to-transparent mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
        </div>

      
        {/* Copyright */}
        <div className="text-center">
          <div className="inline-block">
            <a 
              href="#" 
              className="text-gray-500 hover:text-gray-300 transition-all duration-300 text-sm hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] hover:scale-105"
            >
              © {new Date().getFullYear()} Masskar. All rights reserved.
            </a>
          </div>
          <div className="mt-4 flex justify-center space-x-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((policy, index) => (
              <a
                key={index}
                href="#"
                className="text-xs text-gray-500 hover:text-gray-300 transition-all duration-300 hover:underline"
              >
                {policy}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;