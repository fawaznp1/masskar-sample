import { useState } from "react";

const deliveryLocations = [
  "Abu Hamour", "Abu Sidra", "Ain Khaled", "Al Aziziyah", "Al Dafna", "AL Doha AL Jadeeda",
  "Al Duhail", "Al Gharrafa", "Al Hilal", "Al Hitmi", "Al Jelaiah", "Al Khisah",
  "Al Luqta", "Al Maamoura", "Al Manaseer", "Al Mansoura", "Al Markhiya", "Al Mearad",
  "Al Messila", "Al Muntazah", "Al Muraikh", "Al Murra", "Al Nasr", "Al Rayyan New",
  "Al Rayyan Old", "Al Rumaila", "Al Sadd", "Al Sailiya", "Al Soudan", "Al Thumama",
  "Al Waab", "Al Wukair", "Aspire Zone", "Bani Hajer", "Barwa City", "Fereej Abdul Aziz",
  "Fereej Al Ali", "Fereej al kulaib", "Fereej Bin Mahmoud", "Fereej Bin Omran", "Izghawa",
  "Madinat Khalifa North", "Madinat Khalifa South", "Mehairja", "Mesaieed", "Mesaimeer",
  "Muaither North", "Muaither South", "Musherib", "Najma", "New Salata / Al Asiri",
  "Nuaija", "Old Airport", "Onaiza", "Pearl Qatar",
  "Ras Abu Aboud", "Umm Ghuwailina", "Wakrah", "West Bay"
];

const DeliveryLocations = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLocations = deliveryLocations.filter(location =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="delivery-locations" className="bg-gray-50 mt-1 py-12 px-6 md:px-12 lg:px-20">
       <img src="https://masskaronline.com/uploads/images/banner/Masskar%20All%20Items-1.jpg" style={{width:'82%',display:'block',margin:'0 auto'}} alt="all item image" />
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-2">Delivery Locations</h2>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search your location..."
            className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 gap-4 max-h-96 overflow-y-auto pr-2">
          {filteredLocations.map((location, index) => (
            <div key={index} className="text-gray-700 text-sm bg-white p-2 rounded shadow hover:bg-blue-50 transition">
              {location}
            </div>
          ))}
        </div>
      </div>
     
    </section>
  );
};

export default DeliveryLocations;