import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TiTick, TiTimes } from 'react-icons/ti'
import { FaCarAlt, FaMotorcycle, FaStar, FaMapMarkerAlt, FaParking, FaBed } from 'react-icons/fa'
import { MdPeopleAlt } from 'react-icons/md'

const Landing = () => {
  const FeaturedCard = ({ venue }) => {
    const [index, setIndex] = useState(0)
    const total = venue.photos.length
    const goPrev = () => setIndex((i) => (i - 1 + total) % total)
    const goNext = () => setIndex((i) => (i + 1) % total)
    return (
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow ring-1 ring-black/5 overflow-hidden">
        <div className="relative h-56">
          <img src={venue.photos[index]} alt={`${venue.name} photo ${index + 1}`} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-sm font-semibold text-green-700 shadow">
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
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-gray-700">
              <MdPeopleAlt /> {venue.paxCapacity}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-gray-700">
              <FaBed /> {venue.rooms} rooms
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-gray-700">
              <FaParking /> {venue.parking.cars} parking
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className={`rounded-md border px-3 py-2 text-center text-xs font-medium flex items-center justify-center gap-1 ${venue.externalDecorationAllowed ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
              {venue.externalDecorationAllowed ? <TiTick className="text-green-600" /> : <TiTimes className="text-red-600" />}
              <span>External Decor {venue.externalDecorationAllowed ? 'Allowed' : 'Not Allowed'}</span>
            </div>
            <div className={`rounded-md border px-3 py-2 text-center text-xs font-medium flex items-center justify-center gap-1 ${venue.externalCatererAllowed ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
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
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedOccasion, setSelectedOccasion] = useState('')
  const [selectedPax, setSelectedPax] = useState('')
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
    const url = `/venues/${encodeURIComponent(selectedCity)}${query ? `?${query}` : ''}`
    navigate(url)
  }
  return (
    <div className="relative bg-gray-100">
      <section className="w-full py-10 md:py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-2xl bg-white shadow-xl ring-1 ring-black/5 px-8 py-12 md:px-12 md:py-16 text-center">
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
              <span className="block">Find Your Perfect</span>
              <span className="block bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                Party Venue
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-2xl text-gray-600">
              Discover amazing party halls for weddings, birthdays, corporate events, and celebrations. Book your dream venue in just a few clicks.
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto px-3 mt-8 mb-20">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
          <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-end gap-4">
            <div className="w-full">
              <label htmlFor="landing-city" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <select
                  id="landing-city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none cursor-pointer"
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="" className="text-gray-500">Select city</option>
                  {cities.map((city) => (
                    <option key={city} value={city} className="text-gray-900 py-2">{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="landing-type" className="block text-sm font-medium text-gray-700 mb-2">Venue Type</label>
              <div className="relative">
                <select
                  id="landing-type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none cursor-pointer"
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="" className="text-gray-900">Select type</option>
                  {venueTypes.map((t) => (
                    <option key={t} value={t} className="text-gray-900 py-2">{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="landing-occasion" className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
              <div className="relative">
                <select
                  id="landing-occasion"
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none cursor-pointer"
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="" className="text-gray-900">Occasion type</option>
                  {occasionTypes.map((o) => (
                    <option key={o} value={o} className="text-gray-900 py-2">{o}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="landing-pax" className="block text-sm font-medium text-gray-700 mb-2">Pax</label>
              <div className="relative">
                <select
                  id="landing-pax"
                  value={selectedPax}
                  onChange={(e) => setSelectedPax(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none cursor-pointer"
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="" className="text-gray-900">Select pax</option>
                  {paxRanges.map((p) => (
                    <option key={p} value={p} className="text-gray-900 py-2">{p}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="h-[50px] w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 transition-colors duration-200 shadow-sm"
            >
              Find venues →
            </button>
          </form>
        </div>
      </div>
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="relative flex items-center justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">Featured Venues</h2>
          <Link to="/venues/featured" className="absolute right-0 text-red-600 hover:text-red-700 font-medium">View all</Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-8">
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
          <Link
            to="/venues/all"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 text-lg font-semibold shadow-md hover:opacity-95"
          >
            Browse All Venues
          </Link>
          <Link
            to="/business"
            className="inline-flex items-center justify-center rounded-xl border-2 border-purple-300 text-purple-700 px-8 py-4 text-lg font-semibold hover:border-purple-400"
          >
            List Your Venue
          </Link>
        </div>
      </section>

      
    </div>
  )
}

export default Landing