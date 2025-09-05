import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TiTick, TiTimes } from 'react-icons/ti'
import { FaCarAlt, FaMotorcycle, FaStar, FaMapMarkerAlt, FaParking, FaBed } from 'react-icons/fa'
import { MdPeopleAlt } from 'react-icons/md'
import Blogs from './Blogs'

const Landing = () => {
  const FeaturedCard = ({ venue }) => {
    const [index, setIndex] = useState(0)
    const total = venue.photos.length
    const goPrev = () => setIndex((i) => (i - 1 + total) % total)
    const goNext = () => setIndex((i) => (i + 1) % total)
    return (
      <div className="bg-white rounded-2xl shadow-md ring-1 ring-gray-200 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-56">
          <img src={venue.photos[index]} alt={`${venue.name} photo ${index + 1}`} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/80 backdrop-blur px-2.5 py-1 text-sm font-semibold text-green-700 shadow ring-1 ring-black/5">
            <FaStar className="text-green-600" /> {venue.rating || '4.5'}
          </div>
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
            {venue.photos.map((_, i) => (
              <span key={i} className={`h-1.5 w-6 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`} />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-between px-2">
            <button type="button" aria-label="Previous" onClick={goPrev} className="h-8 w-8 rounded-full bg-black/45 text-white grid place-items-center hover:bg-black/60">‹</button>
            <button type="button" aria-label="Next" onClick={goNext} className="h-8 w-8 rounded-full bg-black/45 text-white grid place-items-center hover:bg-black/60">›</button>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{venue.name}</h3>
              <div className="mt-1 flex items-center gap-2 text-gray-600 text-sm">
                <FaMapMarkerAlt />
                <span>{venue.address}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Starting from</p>
              <p className="text-2xl font-extrabold text-gray-900">₹{venue.price.toLocaleString()}/pax</p>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Per Plate | Veg & Non-veg</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-gray-700 bg-gray-50 ring-1 ring-gray-200">
              <MdPeopleAlt /> {venue.paxCapacity}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-gray-700 bg-gray-50 ring-1 ring-gray-200">
              <FaBed /> {venue.rooms} rooms
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-gray-700 bg-gray-50 ring-1 ring-gray-200">
              <FaParking /> {venue.parking.cars} parking
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className={`rounded-md border px-3 py-2 text-center text-xs font-medium flex items-center justify-center gap-1 ring-1 ${venue.externalDecorationAllowed ? 'bg-green-50 text-green-700 border-green-200 ring-green-200/70' : 'bg-red-50 text-red-700 border-red-200 ring-red-200/70'}`}>
              {venue.externalDecorationAllowed ? <TiTick className="text-green-600" /> : <TiTimes className="text-red-600" />}
              <span>External Decor {venue.externalDecorationAllowed ? 'Allowed' : 'Not Allowed'}</span>
            </div>
            <div className={`rounded-md border px-3 py-2 text-center text-xs font-medium flex items-center justify-center gap-1 ring-1 ${venue.externalCatererAllowed ? 'bg-green-50 text-green-700 border-green-200 ring-green-200/70' : 'bg-red-50 text-red-700 border-red-200 ring-red-200/70'}`}>
              {venue.externalCatererAllowed ? <TiTick className="text-green-600" /> : <TiTimes className="text-red-600" />}
              <span>External Caterers {venue.externalCatererAllowed ? 'Allowed' : 'Not Allowed'}</span>
            </div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Link to={`/venues/${encodeURIComponent(venue.city)}?name=${encodeURIComponent(venue.name)}`} className="flex-1 text-center rounded-lg bg-red-600 px-5 py-2.5 text-white font-semibold hover:bg-red-700">Check availability</Link>
            <Link to={`/venues/${encodeURIComponent(venue.city)}?name=${encodeURIComponent(venue.name)}`} className="flex-1 text-center rounded-lg border-2 border-gray-200 px-5 py-2.5 text-gray-900 font-semibold hover:border-gray-300">View contact</Link>
          </div>
        </div>
      </div>
    )
  }
  const [showTalkModal, setShowTalkModal] = useState(false)
  const [talkForm, setTalkForm] = useState({ name: '', phone: '', email: '', eventType: '', packs: '', company: '', date: '', requirements: '' })
  const updateTalkForm = (key, val) => setTalkForm(prev => ({ ...prev, [key]: val }))
  const navigate = useNavigate()
  const cities = useMemo(
    () => [
      'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur',
      'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara',
      'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Aurangabad',
      'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada',
      'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubli–Dharwad', 'Bareilly', 'Mysore',
    ],
    []
  )
  const venueTypes = useMemo(
    () => [
      'Banquet Hall', 'Lawn', 'Resort', 'Wedding Hall','Hotel', 'Community Hall', 'Conference Hall', 'Farmhouse', 'Restaurant',
    ],
    []
  )
  const occasionTypes = useMemo(
    () => [
      'Religious Event', 'Social Event', 'Political Event', 'Business Event',
    ],
    []
  )
  const paxRanges = useMemo(
    () => [
      'Up to 100', '100 - 200', '200 - 300', '300 - 500', '500+',
    ],
    []
  )
  const serviceTypes = useMemo(
    () => [
      'Photography', 'Videography', 'Catering', 'Decoration', 'DJ & Music', 'Lighting', 'Transportation', 'Makeup & Styling', 'Event Planning', 'Security'
    ],
    []
  )
  // Resources dropdown data
  const resourceTypes = useMemo(
    () => [
      "Ganesha idol / God idol setup",
      "Decorative background / stage backdrop",
      "Flower decorations (real/artificial)",
      "Balloon decorations / arches / pillars",
      "Mandap / canopy / shamiana",
      "Wedding arch / entry gate decoration",
      "Fairy lights / LED lights / chandeliers",
      "Carpet / red carpet walkway",
      "Photo booth props & frames",
      "Chairs (plastic, cushioned, banquet)",
      "Chair covers & ribbons",
      "Sofas for stage",
      "Dining tables / round tables",
      "Cocktail tables / high tables",
      "Tablecloths, runners, skirting",
      "DJ & sound system",
      "Speakers & microphones",
      "LED screens / projectors",
      "Dance floor setup",
      "Stage platforms / risers",
      "Cutlery (plates, spoons, glasses)",
      "Serving counters / buffet tables",
      "Chafing dishes (for hot food)",
      "Juice / mocktail counters",
      "Coffee machine / tea stall setup",
      "Shamiana / pandal",
      "Fans / coolers / heaters",
      "Portable AC",
      "Generators / backup power",
      "Carpet flooring / matting",
      "Bouncy castle / inflatable games (for birthdays)",
      "Magician / clown props",
      "Cake table setup",
      "Party props (hats, masks, etc.)",
      "Themed cutouts / cartoon characters"
    ],
    []
  )
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedOccasion, setSelectedOccasion] = useState('')
  const [selectedPax, setSelectedPax] = useState('')
  const [searchType, setSearchType] = useState('venue') // 'venue' or 'service' or 'resources'
  // Resources state
  const [selectedResourceType, setSelectedResourceType] = useState('')
  const [resourceMode, setResourceMode] = useState('rent') // 'rent' | 'sell'
  const featuredVenues = useMemo(
    () => [
      {
        name: 'Grand Orchid Banquets',
        city: 'Mumbai',
        address: 'Andheri East, Mumbai, Maharashtra',
        paxCapacity: '200 - 300',
        rooms: 12,
        parking: { cars: 50, bikes: 120 },
        price: 450,
        externalDecorationAllowed: true,
        externalCatererAllowed: false,
        photos: [
          'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop'
        ]
      },
      {
        name: 'Lotus Garden Lawn',
        city: 'Delhi',
        address: 'Dwarka Sector 21, New Delhi',
        paxCapacity: '300 - 500',
        rooms: 20,
        parking: { cars: 100, bikes: 200 },
        price: 600,
        externalDecorationAllowed: false,
        externalCatererAllowed: true,
        photos: [
           'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop'
        ]
      },
      {
        name: 'Taj West End',
        city: 'Delhi',
        address: 'Dwarka Sector 21, New Delhi',
        paxCapacity: '300 - 500',
        rooms: 20,
        parking: { cars: 100, bikes: 200 },
        price: 600,
        externalDecorationAllowed: true,
        externalCatererAllowed: true,
        photos: [
            'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop'
        ]
      }
    ],
    []
  )

  const onSubmit = (e) => {
    e.preventDefault()
    if (!selectedCity) return
    const params = new URLSearchParams()
    if (selectedType) params.set('type', selectedType)
    if (selectedOccasion) params.set('occasion', selectedOccasion)
    if (selectedPax) params.set('pax', selectedPax)
    const query = params.toString()
    
    if (searchType === 'venue') {
      const url = `/venues/${encodeURIComponent(selectedCity)}${query ? `?${query}` : ''}`
      navigate(url)
    } else if (searchType === 'service') {
      const url = `/services/${encodeURIComponent(selectedCity)}${query ? `?${query}` : ''}`
      navigate(url)
    } else {
      const paramsResources = new URLSearchParams()
      if (selectedResourceType) paramsResources.set('resourceType', selectedResourceType)
      paramsResources.set('mode', resourceMode)
      const queryResources = paramsResources.toString()
      const url = `/resources/${encodeURIComponent(selectedCity)}${queryResources ? `?${queryResources}` : ''}`
      navigate(url)
    }
  }
  return (
    <div className="relative bg-gradient-to-r from-gray-300 via-purple-200 to-pink-200">
      <section className="w-full py-12 md:py-10">
        <div className="relative max-w-7xl mx-auto px-4">
          {/* Decorative background blobs */}
          <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-pink-200/40 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-12 -right-8 h-48 w-48 rounded-full bg-purple-200/40 blur-3xl"></div>
          
          {/* Main container */}
          <div className="rounded-2xl p-4 bg-gray-300">
            <div className="grid grid-cols-3 gap-4 h-[600px]">
              {/* Left column with two stacked sections */}
              <div className="col-span-2 flex flex-col gap-4">
                {/* Top section - Venue card */}
                <div className="flex-1 rounded-xl p-[1px] bg-gradient-to-r from-pink-400/5 via-fuchsia-400/5 to-purple-400/5">
                  <div className="rounded-xl bg-white/40 backdrop-blur shadow-xl ring-1 ring-gray-200 h-full px-5 py-6 transition-all hover:shadow-2xl hover:-translate-y-1">
                    <div className="flex items-center gap-6 h-full">
                      <a href='/' className="flex-1">
                        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
                          <span className="block">Find Your Perfect</span>
                          <span className="block bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent w-fit">
                            Venue
                          </span>
                        </h1>
                        <p className="mt-4 text-base md:text-lg text-gray-600">
                          Discover amazing party halls for weddings, birthdays, corporate events, and celebrations.
                        </p>
                      </a>
                      <div className="w-32 h-24 md:w-65 md:h-52 rounded-lg overflow-hidden ring-1 ring-black/5 shadow">
                        <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1600&auto=format&fit=crop" alt="Venue" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom section - Services card */}
                <div className="flex-1 rounded-xl p-[1px] bg-gradient-to-r from-pink-400/5 via-fuchsia-400/5 to-purple-400/5">
                  <div className="rounded-xl bg-white/40 backdrop-blur shadow-xl ring-1 ring-gray-200 h-full px-5 py-6 transition-all hover:shadow-2xl hover:-translate-y-1">
                    <div className="flex items-center gap-6 h-full">
                      <div className="w-32 h-24 md:w-65 md:h-52 rounded-lg overflow-hidden ring-1 ring-black/5 shadow">
                        <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop" alt="Services" className="w-full h-full object-cover" />
                      </div>
                      <a href='/services' className="flex-1 text-right">
                        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
                          <span className="block">Find Your Perfect</span>
                          <span className="block bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent w-fit ml-auto">
                            Services
                          </span>
                        </h1>
                        <p className="mt-4 text-base md:text-lg text-gray-600">
                          Our Service and your Happiness is one appointment away. Click now to Book!
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column - Search section */}
              <div className="col-span-1">
                <div className="rounded-xl p-[1px] bg-gradient-to-r from-pink-400/5 via-fuchsia-400/5 to-purple-400/5 h-full">
                  <div className="rounded-xl bg-white/40 backdrop-blur shadow-xl ring-1 ring-gray-200 h-full px-5 py-6 transition-all hover:shadow-2xl hover:-translate-y-1">
                  <div className="h-full">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 text-center">
                      Search {searchType === 'venue' ? 'Venues' : searchType === 'service' ? 'Services' : 'Resources'}
                    </h2>
                    
                    {/* Toggle buttons */}
                    <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => setSearchType('venue')}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                          searchType === 'venue'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Venues
                      </button>
                      <button
                        type="button"
                        onClick={() => setSearchType('service')}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                          searchType === 'service'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Services
                      </button>
                      <button
                        type="button"
                        onClick={() => setSearchType('resources')}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                          searchType === 'resources'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Resources
                      </button>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="landing-city" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <select
                          id="landing-city"
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none cursor-pointer text-sm"
                          style={{ 
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: 'right 0.5rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.2em 1.2em',
                            paddingRight: '2rem'
                          }}
                        >
                          <option value="" className="text-gray-500">Select city</option>
                          {cities.map((city) => (
                            <option key={city} value={city} className="text-gray-900 py-2">{city}</option>
                          ))}
                        </select>
                      </div>

                      {searchType !== 'resources' && (
                        <div>
                          <label htmlFor="landing-type" className="block text-sm font-medium text-gray-700 mb-2">
                            {searchType === 'venue' ? 'Venue Type' : 'Service Type'}
                          </label>
                          <select
                            id="landing-type"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none cursor-pointer text-sm"
                            style={{ 
                              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                              backgroundPosition: 'right 0.5rem center',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: '1.2em 1.2em',
                              paddingRight: '2rem'
                            }}
                          >
                            <option value="" className="text-gray-900">Select type</option>
                            {(searchType === 'venue' ? venueTypes : serviceTypes).map((t) => (
                              <option key={t} value={t} className="text-gray-900 py-2">{t}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {searchType === 'resources' && (
                        <>
                          <div>
                            <label htmlFor="landing-resource-type" className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
                            <select
                              id="landing-resource-type"
                              value={selectedResourceType}
                              onChange={(e) => setSelectedResourceType(e.target.value)}
                              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none cursor-pointer text-sm"
                              style={{ 
                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                backgroundPosition: 'right 0.5rem center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '1.2em 1.2em',
                                paddingRight: '2rem'
                              }}
                            >
                              <option value="" className="text-gray-900">Select resource</option>
                              {resourceTypes.map((r) => (
                                <option key={r} value={r} className="text-gray-900 py-2">{r}</option>
                              ))}
                            </select>
                          </div>

                          {/* Rent/Sell toggle */}
                          <div className="flex mb-2 mt-2 bg-gray-100 rounded-lg p-1">
                            <button
                              type="button"
                              onClick={() => { setResourceMode('rent') }}
                              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                                resourceMode === 'rent'
                                  ? 'bg-white text-gray-900 shadow-sm'
                                  : 'text-gray-600 hover:text-gray-900'
                              }`}
                            >
                              Rent
                            </button>
                            <button
                              type="button"
                              onClick={() => { setResourceMode('sell') }}
                              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                                resourceMode === 'sell'
                                  ? 'bg-white text-gray-900 shadow-sm'
                                  : 'text-gray-600 hover:text-gray-900'
                              }`}
                            >
                              Sell
                            </button>
                          </div>
                        </>
                      )}

                      {searchType === 'venue' && (
                        <div>
                          <label htmlFor="landing-occasion" className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
                          <select
                            id="landing-occasion"
                            value={selectedOccasion}
                            onChange={(e) => setSelectedOccasion(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none cursor-pointer text-sm"
                            style={{ 
                              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                              backgroundPosition: 'right 0.5rem center',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: '1.2em 1.2em',
                              paddingRight: '2rem'
                            }}
                          >
                            <option value="" className="text-gray-900">Occasion type</option>
                            {occasionTypes.map((o) => (
                              <option key={o} value={o} className="text-gray-900 py-2">{o}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {searchType === 'venue' && (
                        <div>
                          <label htmlFor="landing-pax" className="block text-sm font-medium text-gray-700 mb-2">Pax</label>
                          <select
                            id="landing-pax"
                            value={selectedPax}
                            onChange={(e) => setSelectedPax(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none cursor-pointer text-sm"
                            style={{ 
                              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                              backgroundPosition: 'right 0.5rem center',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: '1.2em 1.2em',
                              paddingRight: '2rem'
                            }}
                          >
                            <option value="" className="text-gray-900">Select pax</option>
                            {paxRanges.map((p) => (
                              <option key={p} value={p} className="text-gray-900 py-2">{p}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow ring-1 ring-red-500/20 text-sm"
                      >
                        Find {searchType === 'venue' ? 'venues' : searchType === 'service' ? 'services' : 'resources'} →
                      </button>
                    </form>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="relative flex items-center justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">Featured Venues</h2>
          <Link to="/venues/featured" className="absolute right-0 text-red-600 hover:text-red-700 font-medium">View all</Link>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredVenues.map((v) => (
            <FeaturedCard key={v.name} venue={v} />
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Ready to Host Your Perfect Event?
        </h2>
        <p className="mt-4 text-lg md:text-2xl text-gray-600">
          Join thousands of satisfied customers who found their dream venue with PartyVenue
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
            onClick={() => setShowTalkModal(true)}
            className="inline-flex items-center justify-center rounded-xl border-2 border-purple-300 text-purple-700 px-8 py-4 text-lg font-semibold hover:border-purple-400"
          >
            Chat With Us
          </button>
          <Link
            to="/venues/all"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 text-lg font-semibold shadow-md hover:opacity-95"
          >
            Browse All Venues
          </Link>
        </div>
      </section>
      <Blogs/>

      {showTalkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowTalkModal(false)} />
          <div className="relative w-full max-w-5xl mx-4">
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop"
                  alt="Party background"
                  className="absolute inset-0 h-full w-full object-cover blur-md"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative px-6 md:px-10 pt-8 pb-6 text-center z-10">
                  <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">LET'S TALK.</h3>
                </div>
                <form onSubmit={(e)=>{e.preventDefault(); setShowTalkModal(false)}} className="relative z-10 px-6 md:px-10 pb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <input value={talkForm.name} onChange={(e)=>updateTalkForm('name', e.target.value)} placeholder="Your name" className="rounded-xl border border-white/40 bg-white/10 placeholder-white/80 text-white px-5 py-4 focus:outline-none focus:ring-2 focus:ring-white/60" />
                    <input value={talkForm.phone} onChange={(e)=>updateTalkForm('phone', e.target.value)} placeholder="Phone no" className="rounded-xl border border-white/40 bg-white/10 placeholder-white/80 text-white px-5 py-4 focus:outline-none focus:ring-2 focus:ring-white/60" />
                    <input value={talkForm.email} onChange={(e)=>updateTalkForm('email', e.target.value)} placeholder="Email address" className="rounded-xl border border-white/40 bg-white/10 placeholder-white/80 text-white px-5 py-4 focus:outline-none focus:ring-2 focus:ring-white/60" />
                    <input value={talkForm.eventType} onChange={(e)=>updateTalkForm('eventType', e.target.value)} placeholder="Event Type" className="rounded-xl border border-white/40 bg-white/10 placeholder-white/80 text-white px-5 py-4 focus:outline-none focus:ring-2 focus:ring-white/60" />
                    <input value={talkForm.packs} onChange={(e)=>updateTalkForm('packs', e.target.value)} placeholder="Number of Packs" className="rounded-xl border border-white/40 bg-white/10 placeholder-white/80 text-white px-5 py-4 focus:outline-none focus:ring-2 focus:ring-white/60" />
                    <input value={talkForm.company} onChange={(e)=>updateTalkForm('company', e.target.value)} placeholder="Company Name" className="rounded-xl border border-white/40 bg-white/10 placeholder-white/80 text-white px-5 py-4 focus:outline-none focus:ring-2 focus:ring-white/60" />
                    <input type="date" value={talkForm.date} onChange={(e)=>updateTalkForm('date', e.target.value)} className="rounded-xl border border-white/40 bg-white/10 placeholder-white/80 text-white px-5 py-4 focus:outline-none focus:ring-2 focus:ring-white/60 md:col-span-1" />
                  </div>
                  <div className="mt-4">
                    <textarea value={talkForm.requirements} onChange={(e)=>updateTalkForm('requirements', e.target.value)} rows={4} placeholder="Specific Requirements..." className="w-full rounded-xl border border-white/40 bg-white/10 placeholder-white/80 text-white px-5 py-4 focus:outline-none focus:ring-2 focus:ring-white/60" />
                  </div>
                  <div className="mt-6 flex justify-center gap-3">
                    <button type="submit" className="rounded-full bg-white text-rose-700 hover:bg-rose-50 px-10 py-3 text-lg font-semibold">BOOK A TOUR</button>
                    <button onClick={()=>setShowTalkModal(false)} type="submit" className="rounded-full bg-white text-rose-700 hover:bg-rose-50 px-10 py-3 text-lg font-semibold">Cancel</button>
                 
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Landing