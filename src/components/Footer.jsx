const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 px-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>Fish</li>
            <li>Meat</li>
            <li>Fresh</li>
            <li>Veg</li>
            <li>Fruits</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">More Categories</h3>
          <ul className="space-y-2">
            <li>Food</li>
            <li>Bakery</li>
            <li>Roastery</li>
            <li>Non Food</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Policy Info</h3>
          <ul className="space-y-2">
            <li>FAQ</li>
            <li>Cancellation</li>
            <li>Returns & Refund</li>
            <li>Payments & Privacy</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2">
            <li>Masskar</li>
            <li>About Us</li>
            <li>Feedback</li>
            <li>Delivery Locations</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-2">
            <li>Phone: <a href="tel:+123456789" className="text-blue-400">+123456789</a></li>
            <li>Email: <a href="mailto:info@example.com" className="text-blue-400">info@example.com</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-8 text-sm">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
