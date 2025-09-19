import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useCity } from '../contexts/CityContext';


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVenueOpen, setIsVenueOpen] = useState(false); // Add this state for venue dropdown
  const [showCityModal, setShowCityModal] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [showAllCities, setShowAllCities] = useState(false);
  const { selectedCity, updateCity } = useCity();
  const navigations = [
    { name: 'Home', to: '/' },
    { name: 'Contact', to: '/contact' },
    { name: 'Login', to: '/login' }
  ];
  const allCities = ["Mumbai","Delhi","Bengaluru","Chennai","Kolkata","Hyderabad","Pune",
    "Ahmedabad","Jaipur","Lucknow","Kanpur","Nagpur","Indore","Bhopal","Patna","Vadodara",
    "Surat","Varanasi","Visakhapatnam","Coimbatore","Kochi","Thiruvananthapuram","Madurai",
    "Mysuru","Mangaluru","Belagavi","Hubballi","Kalaburagi","Davangere","Shivamogga","Ballari",
    "Tumakuru","Raichur","Bidar","Hassan","Mandya","Chitradurga","Kolar","Karwar","Hospet",
    "Bagalkot","Bijapur","Chikkamagaluru","Gadag","Udupi","Sirsi","Bhadravati","Yadgir",
    "Koppal","Dharwad","Amritsar","Ludhiana","Chandigarh","Guwahati","Ranchi","Raipur",
    "Bhubaneswar","Noida","Gurugram","Faridabad","Ghaziabad","Jodhpur","Udaipur","Agra",
    "Meerut","Prayagraj","Jabalpur","Aurangabad","Nashik","Rajkot","Gwalior","Jamshedpur",
    "Dehradun","Shimla","Srinagar","Jammu","Panaji","Margao","Dhanbad","Asansol","Durgapur",
    "Siliguri","Howrah","Navi Mumbai","Thane","Solapur","Kolhapur","Satara","Sangli",
    "Tiruchirappalli","Erode","Salem","Tirunelveli","Tiruppur","Vellore","Kanchipuram",
    "Nagercoil","Tuticorin","Rajahmundry","Kakinada","Guntur","Nellore","Anantapur","Tirupati",
    "Kurnool","Ongole","Eluru","Nizamabad","Karimnagar","Warangal","Khammam","Adilabad",
    "Mahbubnagar","Suryapet","Nalgonda","Imphal","Aizawl","Agartala","Shillong","Itanagar",
    "Kohima","Gangtok","Dibrugarh","Tinsukia","Silchar","Tezpur","Jorhat","Bongaigaon",
    "Aligarh","Moradabad","Saharanpur","Bareilly","Gorakhpur","Firozabad","Mathura","Ayodhya",
    "Muzaffarnagar","Sitapur","Etawah","Jhansi","Shahjahanpur","Bulandshahr","Mirzapur",
    "Barabanki","Deoria","Ghazipur","Morena","Sagar","Satna","Rewa","Katni","Chhindwara",
    "Seoni","Betul","Ratlam","Khandwa","Khargone","Burhanpur","Dewas","Ujjain"]

  const popularCities = [
    { name: 'Mumbai', icon: '🌉' },        // Gateway of India / Marine Drive
  { name: 'Delhi-NCR', icon: '🕌' },     // India Gate / Red Fort
  { name: 'Bengaluru', icon: '🏢' },    // Modern IT skyline
  { name: 'Hyderabad', icon: '🏰' },    // Charminar
  { name: 'Ahmedabad', icon: '🕌' },    // Jama Masjid
  { name: 'Chandigarh', icon: '🏛️' },  // Capitol Complex
  { name: 'Chennai', icon: '🛕' },      // Kapaleeshwarar Temple
  { name: 'Pune', icon: '🏰' },         // Shaniwar Wada
  { name: 'Kolkata', icon: '🌉' },      // Howrah Bridge
  { name: 'Kochi', icon: '⛵' },        // Backwaters / Chinese Fishing Nets
  { name: 'Jaipur', icon: '🏰' },       // Hawa Mahal / Amber Fort
  { name: 'Lucknow', icon: '🏛️' },     // Bara Imambara
  { name: 'Nagpur', icon: '🛕' },       // Deekshabhoomi
  { name: 'Indore', icon: '🏢' },       // Rajwada Palace
  { name: 'Bhopal', icon: '🏰' },       // Taj-ul-Masajid
  { name: 'Patna', icon: '🕌' },        // Golghar
  { name: 'Vadodara', icon: '🏰' },     // Laxmi Vilas Palace
  { name: 'Surat', icon: '🏙️' },       // Textile city skyline
  { name: 'Visakhapatnam', icon: '🏖️' }, // Beaches
  { name: 'Coimbatore', icon: '🏭' }    // Industrial city / textile mills
  ];

  const filteredCities = allCities.filter(city => 
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleCitySelect = (city) => {
    updateCity(city);
    setShowCityModal(false);
    setCitySearch('');
    setShowAllCities(false);
  };
  

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Using BigDataCloud API (CORS-friendly)
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await res.json();
            
            // Update the selected city with the detected city
            if (data.city) {
              updateCity(data.city);
              setShowCityModal(false);
              setCitySearch('');
            } else {
              alert('Unable to detect your city. Please select manually.');
            }
          } catch (err) {
            console.error('Error fetching location data:', err);
            alert('Error detecting your location. Please select manually.');
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to detect your location. Please select manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <nav className="bg-white shadow-lg sticky top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/">
                  <h1 className="text-2xl md:text-3xl font-extrabold ml-4 tracking-wide">
                    <span className="text-black">BookMy</span>
                    <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent ml-1">
                      Venue
                    </span>
                  </h1>
                </Link>
              </div>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8 ml-8">
              {/* City Selection Button */}
              <button
                onClick={() => setShowCityModal(true)}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200 inline-flex items-center gap-2"
              >
                <MapPinIcon className="h-4 w-4" />
                <span className="text-sm font-medium">{selectedCity}</span>
                <span className="text-gray-500">▾</span>
              </button>

              {navigations.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-gray-700 hover:text-blue-600"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              >
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              {/* Mobile City Selection Button */}
              <button
                onClick={() => setShowCityModal(true)}
                className="w-full text-left text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
              >
                <MapPinIcon className="h-4 w-4" />
                {selectedCity}
              </button>

              {navigations.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* City Selection Modal */}
      {showCityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCityModal(false)} />
          <div className="relative w-full max-w-2xl mx-4">
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-white">
              <div className="p-4">
                {/* Search Bar */}
                <div className="relative mb-4">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for your city"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    className="w-full pl-10 pr-4 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Detect Location Button */}
                <button
                  onClick={handleLocationDetect}
                  className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-4 h-4 rounded-full border-2 border-red-500 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 font-medium">Detect my location</span>
                </button>

                {/* Popular Cities */}
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Popular Cities</h3>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {popularCities.map((city) => (
                      <button
                        key={city.name}
                        onClick={() => handleCitySelect(city.name)}
                        className="flex flex-col items-center p-2 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
                      >
                        <span className="text-lg mb-1">{city.icon}</span>
                        <span className="text-xs font-medium text-gray-700 text-center">{city.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* All Cities List */}
                {(citySearch || showAllCities) && (
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">All Cities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {filteredCities.map((city) => (
                        <button
                          key={city}
                          onClick={() => handleCitySelect(city)}
                          className="text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <span className="text-sm text-gray-700">{city}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* View All Cities Link */}
                <div className="mt-4 text-center">
                  <button
                    onClick={() => {
                      setShowAllCities(true);
                      setCitySearch('');
                    }}
                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    View All Cities
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavBar