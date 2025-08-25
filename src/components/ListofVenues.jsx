import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import Calendar from './Calendar'

const ListofVenues = () => {
  const params = useParams()
  const city = decodeURIComponent(params.city || '')
  
  // Filter states
  const [selectedLocality, setSelectedLocality] = useState('')
  const [selectedVenueType, setSelectedVenueType] = useState('')
  const [filters, setFilters] = useState({
    veg: false,
    nonVeg: false,
    outsideFood: false,
    outsideLiquor: false,
    rooftop: false
  })
  const [guestCount, setGuestCount] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [searchLocation, setSearchLocation] = useState('')
  const [distanceWithin, setDistanceWithin] = useState(0)
  const [typeOfFunction, setTypeOfFunction] = useState('')
  const [decorator, setDecorator] = useState('')
  const [caterer, setCaterer] = useState('')
  const [floor, setFloor] = useState('')
  const [startDateTime, setStartDateTime] = useState(null)
  const [endDateTime, setEndDateTime] = useState(null)
  const [pax, setPax] = useState('')
  const [sort, setSort] = useState('')
  const [slot, setSlot] = useState('')
  const [openStartCal, setOpenStartCal] = useState(false)
  const [openEndCal, setOpenEndCal] = useState(false)
  const startCalRef = useRef(null)
  const endCalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (openStartCal && startCalRef.current && !startCalRef.current.contains(e.target)) {
        setOpenStartCal(false)
      }
      if (openEndCal && endCalRef.current && !endCalRef.current.contains(e.target)) {
        setOpenEndCal(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [openStartCal, openEndCal])

  const venueImages = useMemo(
    () => [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526228076630-7f2c2c2a34f6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1600&auto=format&fit=crop',
    ],
    []
  )

  // Sample data for localities and venue types
  const localities = [
    'Bandra West', 'Andheri West', 'Worli', 'Lower Parel', 'Powai', 'Juhu', 'Vashi', 'BKC'
  ]
  
  const venueTypes = [
    'Banquet Hall', 'Hotel', 'Resort', 'Garden', 'Farmhouse', 'Rooftop', 'Beachfront', 'Heritage'
  ]

  const list = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i + 1,
      name: `Premier Venue ${i + 1}`,
      capacity: 300 + i * 50,
      price: 50000 + i * 5000,
      image: venueImages[i % venueImages.length],
      rating: 4 + (i % 2),
      location: city,
      locality: localities[i % localities.length],
      venueType: venueTypes[i % venueTypes.length],
      address: `123 Event Street, ${localities[i % localities.length]}, ${city}`,
      rooms: (i % 6) + 1,
      floors: (i % 4) + 1,
      carParking: 10 + i * 2,
      features: {
        veg: Math.random() > 0.3,
        nonVeg: Math.random() > 0.2,
        outsideFood: Math.random() > 0.4,
        outsideLiquor: Math.random() > 0.5,
        rooftop: Math.random() > 0.6
      }
    }))
  }, [city, venueImages, localities, venueTypes])

  // Filter venues based on selected criteria
  const filteredVenues = useMemo(() => {
    return list.filter(venue => {
      // Locality filter
      if (selectedLocality && venue.locality !== selectedLocality) return false
      
      // Venue type filter
      if (selectedVenueType && venue.venueType !== selectedVenueType) return false
      
      // Search by location/locality
      if (searchLocation) {
        const q = searchLocation.trim().toLowerCase()
        const matches = venue.locality.toLowerCase().includes(q) || venue.location.toLowerCase().includes(q)
        if (!matches) return false
      }
      
      // Guest count filter
      if (guestCount && venue.capacity < parseInt(guestCount)) return false
      
      // Feature filters
      if (filters.veg && !venue.features.veg) return false
      if (filters.nonVeg && !venue.features.nonVeg) return false
      if (filters.outsideFood && !venue.features.outsideFood) return false
      if (filters.outsideLiquor && !venue.features.outsideLiquor) return false
      if (filters.rooftop && !venue.features.rooftop) return false
      
      return true
    })
  }, [list, selectedLocality, selectedVenueType, filters, guestCount, searchLocation])

  const handleFilterChange = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }))
  }

  const handleApplyFilters = () => {
    // Filters are applied automatically through useMemo
    setShowFilters(false)
  }

  const clearFilters = () => {
    setSelectedLocality('')
    setSelectedVenueType('')
    setFilters({
      veg: false,
      nonVeg: false,
      outsideFood: false,
      outsideLiquor: false,
      rooftop: false
    })
    setGuestCount('')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <aside className="md:col-span-1 border rounded-lg p-4 bg-white">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Search Location</label>
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Search location"
                className="mt-1 w-full px-3 py-2 border rounded-md bg-white text-gray-800"
              />
      </div>

          <div>
              <label className="block text-sm font-medium text-gray-700">Distance within</label>
              <input
                type="range"
                min="0"
                max="100"
                value={distanceWithin}
                onChange={(e) => setDistanceWithin(parseInt(e.target.value))}
                className="mt-2 w-full"
              />
              <div className="text-xs text-gray-600 flex justify-between">
              <span className="text-sm font-medium text-gray-800 w-10">
      {distanceWithin}+
    </span>
              </div>
              </div>

                    <div>
              <label className="block text-sm font-medium text-gray-700">Venue Type</label>
                      <select
                value={selectedVenueType}
                onChange={(e) => setSelectedVenueType(e.target.value)}
                size={1}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-white text-gray-800"
              >
                <option value="">All</option>
                {venueTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div>
              <label className="block text-sm font-medium text-gray-700">Food Type</label>
                      <select
                value={filters.nonVeg ? 'nonVeg' : filters.veg ? 'veg' : ''}
                onChange={(e) => {
                  const val = e.target.value
                  setFilters(prev => ({ ...prev, veg: val === 'veg', nonVeg: val === 'nonVeg' }))
                }}
                size={1}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-white text-gray-800"
              >
                <option value="">Any</option>
                <option value="veg">Veg</option>
                <option value="nonVeg">Non-Veg</option>
                      </select>
                    </div>

                    <div>
              <label className="block text-sm font-medium text-gray-700">No of Guests</label>
                      <input
                        type="number"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                placeholder="e.g. 100"
                className="mt-1 w-full px-3 py-2 border rounded-md bg-white text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Type of Function</label>
              <input
                type="text"
                value={typeOfFunction}
                onChange={(e) => setTypeOfFunction(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-white text-gray-800"
                      />
                    </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Decorator</label>
                            <input
                type="text"
                value={decorator}
                onChange={(e) => setDecorator(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-white text-gray-800"
              />
                      </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Caterer</label>
              <input
                type="text"
                value={caterer}
                onChange={(e) => setCaterer(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-white text-gray-800"
              />
                    </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Floor</label>
              <input
                type="text"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-white text-gray-800"
              />
                  </div>

            <div className="flex gap-2 pt-2">
              <button onClick={handleApplyFilters} className="px-4 py-2 bg-blue-600 text-white rounded-md">Apply</button>
              <button onClick={clearFilters} className="px-4 py-2 bg-blue-100 rounded-md">Clear</button>
                  </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-3 space-y-4">
          {/* Top Controls */}
          <div className="flex flex-wrap items-center gap-2 bg-gray-50 p-2 rounded-md border">
            <div className="relative" ref={startCalRef}>
              <button type="button" onClick={() => setOpenStartCal(!openStartCal)} className="border rounded-md px-3 py-2 w-full sm:w-44 bg-white text-gray-800 text-left">
                {startDateTime ? startDateTime.toLocaleDateString() : 'Start Date'}
              </button>
              {openStartCal && (
                <div className="absolute z-20 mt-2">
                  <Calendar value={startDateTime || new Date()} onChange={(d) => { setStartDateTime(d); setOpenStartCal(false) }} minDate={new Date()} />
                </div>
              )}
            </div>
            <div className="relative" ref={endCalRef}>
              <button type="button" onClick={() => setOpenEndCal(!openEndCal)} className="border rounded-md px-3 py-2 w-full sm:w-44 bg-white text-gray-800 text-left">
                {endDateTime ? endDateTime.toLocaleDateString() : 'End Date'}
              </button>
              {openEndCal && (
                <div className="absolute z-20 mt-2">
                  <Calendar value={endDateTime || (startDateTime || new Date())} onChange={(d) => { setEndDateTime(d); setOpenEndCal(false) }} minDate={startDateTime || new Date()} />
                </div>
              )}
                  </div>
            <select
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              size={1}
              className="border rounded-md px-3 py-2 w-full sm:w-44 bg-white text-gray-800"
            >
              <option value="">Select Slot</option>
              <option value="morning">Morning 6:00 AM – 3:00 PM</option>
              <option value="afternoon">Afternoon 3:00 PM – 10:00 PM</option>
            </select>
            <input
              type="number"
              value={pax}
              onChange={(e) => setPax(e.target.value)}
              placeholder="PAX"
              className="border rounded-md px-3 py-2 w-24 bg-white text-gray-800"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              size={1}
              className="border rounded-md px-3 py-2 bg-white text-gray-800 w-full sm:w-44"
            >
              <option value="">Sort</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="capacityDesc">Capacity</option>
            </select>
                    </div>
                    
          {/* Venue Rows */}
          <div className="space-y-4">
            {filteredVenues.map((v) => (
              <div key={v.id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 border rounded-lg p-4 bg-white">
                {/* Image */}
                <div className="lg:col-span-3">
                  <div className="h-36 w-full rounded-md bg-center bg-cover" style={{ backgroundImage: `url(${v.image})` }} />
                </div>
                {/* Details */}
                <div className="lg:col-span-4">
                  <div className="text-sm text-gray-800 font-semibold">{v.locality}, {v.location}</div>
                  <div className="text-xs text-gray-600 mt-1">{v.address}</div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-600">Minimum Pax</div>
                      <div className="text-gray-800 font-medium">{Math.min(50, v.capacity)} Pax</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Max Floating Capacity</div>
                      <div className="text-gray-800 font-medium">{v.capacity} Pax</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Number of Rooms</div>
                      <div className="text-gray-800 font-medium">{v.rooms}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Floors</div>
                      <div className="text-gray-800 font-medium">{v.floors}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Car Parking</div>
                      <div className="text-gray-800 font-medium">{v.carParking}</div>
                    </div>
                  </div>
                </div>
                {/* Venue Photos Placeholder */}
                <div className="lg:col-span-3 flex items-center justify-center border rounded-md">
                  <span className="text-sm text-gray-600">Venue Photos</span>
                </div>
                {/* Price & Actions */}
                <div className="lg:col-span-2 flex flex-col items-center justify-center gap-3">
                  <div className="text-2xl font-bold">₹{v.price.toLocaleString('en-IN')}</div>
                  <div className="text-xl text-black"> 400 / Pax</div>
                      <Link
                        to={`/venue/${encodeURIComponent(city)}/${v.id}`}
                        state={v}
                    className="w-full text-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                    Select
                      </Link>
                  <a href='/contact' className="text-blue-700 text-sm">Contact Venue Admin</a>
                  </div>
                </div>
              ))}
            </div>

            {filteredVenues.length === 0 && (
              <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchLocation
                  ? `Venue in this area is not available`
                  : 'No venues match your current filters.'}
              </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                >
                  Clear All Filters
                </button>
              </div>
            )}
        </main>
          </div>
    </div>
  )
}

export default ListofVenues


