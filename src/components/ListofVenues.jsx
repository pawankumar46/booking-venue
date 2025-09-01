import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import Calendar from './Calendar'
import { FaCarAlt, FaMotorcycle, FaMapMarkerAlt , FaParking } from 'react-icons/fa'
import { TiTick, TiTimes } from 'react-icons/ti'
import { IoIosPerson, IoIosPeople } from 'react-icons/io'
import { IoBed } from "react-icons/io5"
import { SiLevelsdotfyi } from "react-icons/si"
import { IoClose } from "react-icons/io5"
import { MdTableRestaurant, MdTableBar } from "react-icons/md"
import rectTable from "../assets/6-table.svg"
import roundTable from "../assets/circular.svg"
import theaterTable from "../assets/theater.svg"
import classroomTable from "../assets/class.svg"

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
  const [selectedGuestOption, setSelectedGuestOption] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [searchLocation, setSearchLocation] = useState('')
  const [distanceWithin, setDistanceWithin] = useState(0)
  
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
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false)
  const [selectedVenueAmenities, setSelectedVenueAmenities] = useState([])
  const [showSeatingModal, setShowSeatingModal] = useState(false)
  const [selectedVenueSeating, setSelectedVenueSeating] = useState([])
  const startCalRef = useRef(null)
  const endCalRef = useRef(null)

  // Carousel state for each venue
  const [carouselStates, setCarouselStates] = useState({})

  // Geo Location
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

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

  // Geo Location
  //   useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         const { latitude, longitude } = position.coords;

  //         try {
  //           // Example using OpenStreetMap's free reverse geocoding API
  //           const res = await fetch(
  //             `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  //           );
  //           const data = await res.json();
  //           console.log(data)
  //           setLocation(data.address.quarter);
  //         } catch (err) {
  //           setError("Failed to fetch location");
  //         }
  //       },
  //       (err) => {
  //         setError(err.message);
  //       }
  //     );
  //   } else {
  //     setError("Geolocation is not supported by this browser.");
  //   }
  // }, []);

  // Auto-play carousel for all venues
  useEffect(() => {
    const intervals = {}
    
    Object.keys(carouselStates).forEach(venueId => {
      const state = carouselStates[venueId]
      if (state.isAutoPlaying) {
        intervals[venueId] = setInterval(() => {
          nextCarouselImage(parseInt(venueId))
        }, 3000) // Change image every 3 seconds
      }
    })
    
    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval))
    }
  }, [carouselStates])


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
    'Bandra West', 'Andheri West', 'Worli', 'Lower Parel', 'Powai', 'Juhu', 'Vashi', 'BKC'," VidyamanyaNagar"
  ]
  
  const venueTypes = [
    'Banquet Hall', 'Hotel', 'Resort', 'Garden', 'Farmhouse', 'Rooftop', 'Beachfront', 'Heritage'
  ]

  const list = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      name: `Premier Venue ${i + 1}`,
      capacity: 300 + i * 100,
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
      bikeParking: 20 + i * 3,
      externalDecorationAllowed: Math.random() > 0.5,
      externalCatererAllowed: Math.random() > 0.5,
      amenities: [
        'AC',
        'Natural Lighting',
        'WiFi',
        'Sound System',
        'Projector',
        'Stage',
        'Dance Floor',
        'Bar Setup',
        'Kitchen',
        'Parking',
        'Security',
        'Catering Service'
      ].slice(0, Math.floor(Math.random() * 8) + 4), // Random 4-11 amenities
      seatingArrangements: [
        { type: 'Round Table', capacity: 8, icon: 'round' },
        { type: 'Rectangular Table', capacity: 6, icon: 'rectangular' },
        { type: 'Theater Style', capacity: 150, icon: 'theater' },
        { type: 'Classroom Style', capacity: 80, icon: 'classroom' },
        { type: 'Banquet Style', capacity: 200, icon: 'banquet' },
        { type: 'U-Shape', capacity: 40, icon: 'ushape' },
        { type: 'Cocktail Style', capacity: 120, icon: 'cocktail' },
        { type: 'Boardroom', capacity: 20, icon: 'boardroom' }
      ].slice(0, Math.floor(Math.random() * 4) + 2), // Random 2-5 seating arrangements
      features: {
        veg: Math.random() > 0.3,
        nonVeg: Math.random() > 0.2,
        outsideFood: Math.random() > 0.4,
        outsideLiquor: Math.random() > 0.5,
        rooftop: Math.random() > 0.6
      }
    }))
  }, [city, venueImages, localities, venueTypes])

  // Determine minimum accepted pax across venues (based on displayed Minimum Pax)
  const minAcceptedPax = useMemo(() => {
    if (!list.length) return 0
    return list.reduce((min, v) => {
      const venueMin = Math.min(100, v.capacity)
      return Math.min(min, venueMin)
    }, Number.POSITIVE_INFINITY)
  }, [list])

  const isBelowMinPax = useMemo(() => {
    if (!guestCount) return false
    const val = parseInt(guestCount)
    if (Number.isNaN(val)) return false
    return val < minAcceptedPax
  }, [guestCount, minAcceptedPax])

  // Filter venues based on selected criteria
  const filteredVenues = useMemo(() => {
    return list.filter(venue => {
      // Locality filter
      if (selectedLocality && venue.locality !== selectedLocality) return false
      
      // Venue type filter
      if (selectedVenueType && venue.venueType !== selectedVenueType) return false
      
      // Search by location/locality
      if (searchLocation || location) {
        const q = searchLocation.trim().toLowerCase() || location.trim().toLowerCase()
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
    setSelectedGuestOption('')
  }

  const openAmenitiesModal = (amenities) => {
    setSelectedVenueAmenities(amenities)
    setShowAmenitiesModal(true)
  }

  const openSeatingModal = (seatingArrangements) => {
    setSelectedVenueSeating(seatingArrangements)
    setShowSeatingModal(true)
  }

  const renderSeatingIcon = (iconType) => {
    switch (iconType) {
      case 'round':
        return <img src={roundTable} alt="Round table" className="h-4 w-4" />
      case 'rectangular':
        return <img src={rectTable} alt="Rectangular table" className="h-4 w-4" />
      case 'theater':
        return  <img src={theaterTable} alt="Theater table" className="h-4 w-4" />
      case 'classroom':
        return <img src={classroomTable} alt="Classroom table" className="h-4 w-4" />
      case 'banquet':
        return <MdTableRestaurant className="w-4 h-4 text-blue-600" />
      case 'ushape':
        return <div className="w-4 h-4 border-2 border-gray-600 flex items-center justify-center"><div className="w-2 h-2 border border-gray-600 rounded-t-lg"></div></div>
      case 'cocktail':
        return <MdTableBar className="w-4 h-4 text-gray-600" />
      case 'boardroom':
        return <div className="w-4 h-4 border-2 border-gray-600 rounded flex items-center justify-center"><div className="w-2 h-1 bg-gray-600 rounded"></div></div>
      default:
        return <div className="w-4 h-4 border-2 border-gray-600 rounded"></div>
    }
  }

  const changeLocation=(e)=>{
    setSearchLocation(e.target.value)
    setLocation(e.target.value)
  }

  // Carousel functions
  const getCarouselState = (venueId) => {
    return carouselStates[venueId] || { currentIndex: 0, isAutoPlaying: false }
  }

  const updateCarouselState = (venueId, updates) => {
    setCarouselStates(prev => ({
      ...prev,
      [venueId]: { ...getCarouselState(venueId), ...updates }
    }))
  }

  const nextCarouselImage = (venueId) => {
    const venue = list.find(v => v.id === venueId)
    if (!venue) return
    
    const currentState = getCarouselState(venueId)
    const nextIndex = (currentState.currentIndex + 1) % venueImages.length
    updateCarouselState(venueId, { currentIndex: nextIndex })
  }

  const prevCarouselImage = (venueId) => {
    const venue = list.find(v => v.id === venueId)
    if (!venue) return
    
    const currentState = getCarouselState(venueId)
    const prevIndex = (currentState.currentIndex - 1 + venueImages.length) % venueImages.length
    updateCarouselState(venueId, { currentIndex: prevIndex })
  }

  const goToImage = (venueId, index) => {
    updateCarouselState(venueId, { currentIndex: index })
  }

  const toggleAutoPlay = (venueId) => {
    const currentState = getCarouselState(venueId)
    updateCarouselState(venueId, { isAutoPlaying: !currentState.isAutoPlaying })
  }

  // Calculate price based on guest count
  const getPricePerPax = (guestOption) => {
    switch (guestOption) {
      case '150':
        return 450
      case '200':
        return 440
      case '250':
        return 430
      case '300+':
        return 410
      default:
        return 400 // Default price
    }
  }

  return (
    <div className="min-h-screen bg-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-5 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-7">
          
        {/* Sidebar Filters */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Search Location</label>
              <input
                type="text"
                value={searchLocation || location}
                onChange={changeLocation}
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
      {distanceWithin} kms
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
              <select
                value={selectedGuestOption}
                onChange={(e) => {
                  setSelectedGuestOption(e.target.value)
                  setGuestCount(e.target.value)
                }}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-white text-gray-800"
              >
                <option value="">Select guest count</option>
                <option value="150">150 guests</option>
                <option value="200">200 guests</option>
                <option value="250">250 guests</option>
                <option value="300+">300+ guests</option>
              </select>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700">Decorator</label>
              <select
                value={decorator}
                onChange={(e) => setDecorator(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-white text-gray-800"
              >
                <option value="">Any</option>
                <option value="allowed">External decorator allowed</option>
                <option value="not_allowed">External decorator not allowed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Caterer</label>
              <select
                value={caterer}
                onChange={(e) => setCaterer(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-white text-gray-800"
              >
                <option value="">Any</option>
                <option value="allowed">External caterers allowed</option>
                <option value="not_allowed">External caterers not allowed</option>
              </select>
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
          </div>
        </aside>

        {/* Main Content */}
          <main className="lg:col-span-3 order-1 lg:order-2 space-y-6">
         
                    
          {/* Venue Rows */}
          {!isBelowMinPax && (
          <div className="space-y-6">
            {filteredVenues.map((v) => (
              <div key={v.id} className="bg-white h-57 rounded-lg shadow-sm border overflow-hidden">
                {/* Mobile Layout */}
                <div className=" block lg:hidden">
                {/* Image Carousel */}
                  <div className="relative h-64 sm:h-72 w-full bg-center bg-cover overflow-hidden" style={{ backgroundImage: `url(${venueImages[getCarouselState(v.id).currentIndex]})` }}>
                    {/* Navigation Arrows */}
                    <button
                      onClick={() => prevCarouselImage(v.id)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                      aria-label="Previous image"
                    >
                      <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => nextCarouselImage(v.id)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                      aria-label="Next image"
                    >
                      <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {getCarouselState(v.id).currentIndex + 1} / {venueImages.length}
                    </div>

                    {/* Auto-play Toggle */}
                    <button
                      onClick={() => toggleAutoPlay(v.id)}
                      className={`absolute bottom-2 right-2 px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        getCarouselState(v.id).isAutoPlaying 
                          ? 'bg-red-600 text-white hover:bg-red-700' 
                          : 'bg-white/80 text-gray-800 hover:bg-white'
                      }`}
                    >
                      {getCarouselState(v.id).isAutoPlaying ? '⏸️' : '▶️'}
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
                      {venueImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(v.id, index)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                            getCarouselState(v.id).currentIndex === index 
                              ? 'bg-white scale-125' 
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div >
                    {/* Location (single row) */}
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="text-lg font-semibold text-gray-800 flex items-center gap-2 whitespace-nowrap">
                        <FaMapMarkerAlt className="text-blue-600" /> 
                        {v.locality}, {v.location}
                      </div>
                      <span className="text-gray-300">•</span>
                      <div className="text-sm text-gray-600 truncate flex-1">{v.address}</div>
                    </div>

                    {/* Basic Info Grid */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <IoIosPerson className="h-5 w-5 text-gray-600" />
                        <div>
                          
                          <div className="font-semibold">
                            {selectedGuestOption ? selectedGuestOption : Math.min(50, v.capacity)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoIosPeople className="h-5 w-5 text-gray-600"/>
                        <div>
                          
                          <div className="font-semibold">{v.capacity}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoBed className="h-5 w-5 text-gray-600" />
                        <div>
                          
                          <div className="font-semibold">{v.rooms}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <SiLevelsdotfyi className="h-5 w-5 text-gray-600"/>
                        <div>
                        
                          <div className="font-semibold">{v.floors}</div>
                        </div>
                      </div>
                    </div>

                    {/* Parking and Permissions */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <FaParking className="h-5 w-5 text-gray-600" />
                        <div className="flex gap-4">
                          <div className="flex items-center gap-1">
                            <FaMotorcycle className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">{v.bikeParking}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaCarAlt className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">{v.carParking}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <div className={`${v.externalDecorationAllowed ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'} border rounded px-3 py-2 text-center text-xs font-medium flex items-center gap-2`}> 
                          {v.externalDecorationAllowed ? <TiTick className="text-green-600 w-4 h-4" /> : <TiTimes className="text-red-600 w-4 h-4" />}
                          <span>Decor</span>
                        </div>
                        <div className={`${v.externalCatererAllowed ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'} border rounded px-3 py-2 text-center text-xs font-medium flex items-center gap-2`}> 
                          {v.externalCatererAllowed ? <TiTick className="text-green-600 w-4 h-4" /> : <TiTimes className="text-red-600 w-4 h-4" />}
                          <span>Caterer</span>
                        </div>
                      </div>
                    </div>

                    {/* Amenities and Seating */}
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Amenities</div>
                        <div className="flex flex-wrap gap-2">
                          {v.amenities.slice(0, 3).map((amenity, index) => (
                            <div key={index} className="bg-gray-100 rounded px-3 py-1 text-xs font-medium text-gray-700">
                              {amenity}
                            </div>
                          ))}
                          {v.amenities.length > 3 && (
                            <button
                              onClick={() => openAmenitiesModal(v.amenities)}
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium underline"
                            >
                              +{v.amenities.length - 3} more
                            </button>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Seating</div>
                        <div className="flex flex-wrap gap-2">
                          {v.seatingArrangements.slice(0, 2).map((seating, index) => (
                            <div key={index} className="bg-blue-50 rounded px-3 py-1 text-xs font-medium text-gray-700 flex items-center gap-1">
                              {renderSeatingIcon(seating.icon)}
                              <span>{seating.type}</span>
                            </div>
                          ))}
                          {v.seatingArrangements.length > 2 && (
                            <button
                              onClick={() => openSeatingModal(v.seatingArrangements)}
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium underline"
                            >
                              +{v.seatingArrangements.length - 2} more
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          
                          <div className="text-sm text-gray-600">{getPricePerPax(selectedGuestOption)} / Pax • Inclusive of food</div>
                        </div>
                        <Link
                          to={`/venue/${encodeURIComponent(city)}/${v.id}`}
                          state={v}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                          Select
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-12 gap-4 p-4">
                  {/* Image Carousel */}
                  <div className="lg:col-span-3 flex items-center">
                    <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-sm">
                      <div 
                        className="w-full h-full bg-center bg-cover transition-all duration-500 hover:scale-95" 
                        style={{ backgroundImage: `url(${venueImages[getCarouselState(v.id).currentIndex]})` }}
                      >
                        {/* Navigation Arrows */}
                        <button
                          onClick={() => prevCarouselImage(v.id)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                          aria-label="Previous image"
                        >
                          <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={() => nextCarouselImage(v.id)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                          aria-label="Next image"
                        >
                          <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        {/* Image Counter */}
                        <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {getCarouselState(v.id).currentIndex + 1} / {venueImages.length}
                        </div>

                        {/* Auto-play Toggle */}
                        <button
                          onClick={() => toggleAutoPlay(v.id)}
                          className={`absolute bottom-2 right-2 px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                            getCarouselState(v.id).isAutoPlaying 
                              ? 'bg-red-600 text-white hover:bg-red-700' 
                              : 'bg-white/80 text-gray-800 hover:bg-white'
                          }`}
                        >
                          {getCarouselState(v.id).isAutoPlaying ? '⏸️' : '▶️'}
                        </button>
                      </div>

                      {/* Thumbnail Navigation */}
                      <div className="absolute -bottom-8 left-0 right-0 flex gap-1 justify-center">
                        {venueImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToImage(v.id, index)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              getCarouselState(v.id).currentIndex === index 
                                ? 'bg-blue-600 scale-125' 
                                : 'bg-gray-400 hover:bg-gray-600'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                {/* Details */}
                  <div className="lg:col-span-7">
                  
                                    {/* Row 1: Capacity and Rooms */}
                  <div className="mt-3 flex items-center gap-6 text-sm">
                    <div className="text-sm text-gray-800 font-semibold flex items-center gap-3"><FaMapMarkerAlt /> {v.locality}, {v.location}</div>
                  <div className="text-xs text-gray-600 mt-1 truncate w-100" title={v.address}>{v.address}</div>
                    <div className="flex items-center gap-2">
                      <IoIosPerson className="h-5 w-5 text-gray-700" />
                      <div className="text-gray-800 font-medium">
                        {selectedGuestOption ? `${selectedGuestOption} Pax` : `${Math.min(100, v.capacity)} Pax`}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <IoIosPeople className="h-5 w-5 text-gray-700"/>
                      <div className="text-gray-800 font-medium">{v.capacity} Pax</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <IoBed className="h-5 w-5 text-gray-700" />
                      <div className="text-gray-800 font-medium">{v.rooms}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <SiLevelsdotfyi className="h-5 w-5 text-gray-700"/>
                      <div className="text-gray-800 font-medium">{v.floors}</div>
                    </div>
                  </div>

                  {/* Row 2: Parking and Permissions */}
                  <div className="mt-3 flex items-center gap-6 text-sm">
                    {/* Parking */}
                    <div className="flex items-center gap-2">
                      <FaParking className="h-5 w-5 text-gray-700" />
                      <div className="flex gap-3">
                        <div className="flex items-center gap-1">
                          <FaMotorcycle className="h-4 w-4 text-gray-600" />
                          <span className="text-xs font-medium text-black">{v.bikeParking}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaCarAlt className="h-4 w-4 text-gray-600" />
                          <span className="text-xs font-medium text-black">{v.carParking}</span>
                        </div>
                      </div>
                    </div>

                    {/* Permissions */}
                    <div className="flex gap-2">
                      <div className={`${v.externalDecorationAllowed ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'} border rounded px-2 py-1 text-center text-xs font-medium flex items-center gap-1 h-7 relative group`}> 
                        {v.externalDecorationAllowed ? <TiTick className="text-green-600 w-3 h-3" /> : <TiTimes className="text-red-600 w-3 h-3" />}
                        <span className="truncate">External Decorator</span>
                        {/* Hover Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                          External Decorator {v.externalDecorationAllowed ? 'Allowed' : 'Not Allowed'}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                        </div>
                      </div>
                      <div className={`${v.externalCatererAllowed ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'} border rounded px-2 py-1 text-center text-xs font-medium flex items-center gap-1 h-7 relative group`}> 
                        {v.externalCatererAllowed ? <TiTick className="text-green-600 w-3 h-3" /> : <TiTimes className="text-red-600 w-3 h-3" />}
                        <span className="truncate">External Caterer</span>
                        {/* Hover Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                          External Caterers {v.externalCatererAllowed ? 'Allowed' : 'Not Allowed'}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Amenities and Seating in Columns */}
                  <div className="mt-3 grid grid-cols-2 gap-6 text-sm">
                    {/* Amenities Column */}
                    <div>
                      <div className="text-xs text-gray-600 font-medium mb-2">Amenities:</div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {v.amenities.slice(0, 3).map((amenity, index) => (
                          <div key={index} className="bg-gray-100 rounded px-2 py-1 text-xs font-medium text-gray-700">
                            {amenity}
                          </div>
                        ))}
                      </div>
                      {v.amenities.length > 3 && (
                        <button
                          onClick={() => openAmenitiesModal(v.amenities)}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium underline"
                        >
                          +{v.amenities.length - 3} more amenities
                        </button>
                      )}
                    </div>

                    {/* Seating Column */}
                    <div>
                      <div className="text-xs text-gray-600 font-medium mb-2">Seating:</div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {v.seatingArrangements.slice(0, 3).map((seating, index) => (
                          <div key={index} className="bg-gray-100 rounded px-2 py-1 text-xs font-medium text-gray-700">
                            {renderSeatingIcon(seating.icon)}
                          </div>
                        ))}
                      </div>
                      {/* {v.seatingArrangements.length > 3 && (
                        <button
                          onClick={() => openSeatingModal(v.seatingArrangements)}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium underline"
                        >
                          +{v.seatingArrangements.length - 3} more options
                        </button>
                      )} */}
                    </div>
                  </div>
                </div>

                {/* Amenities Section */}
                {/* <div className="lg:col-span-1 flex flex-col justify-center">
                  
                </div> */}

                {/* Seating Capacity Section */}
                {/* <div className="lg:col-span-1 flex flex-col justify-center">
                  
                </div> */}
                
                {/* Price & Actions */}
                <div className="lg:col-span-2 flex flex-col items-center justify-center gap-2">
        
                  <div className="text-xl text-black"> {getPricePerPax(selectedGuestOption)} / Pax</div>
                  <div className="text-xs text-gray-600">Inclusive of food</div>
                      <Link
                        to={`/venue/${encodeURIComponent(city)}/${v.id}`}
                        state={v}
                    className="w-full text-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                    Select
                      </Link>
                </div>
                  </div>
                </div>
              ))}
            </div>
          )}

            {(filteredVenues.length === 0 || isBelowMinPax) && (
              <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {isBelowMinPax
                  ? 'Unfortunately we do not have any venue that accept less than mentioned pax'
                  : searchLocation || location
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

      {/* Amenities Modal */}
      {showAmenitiesModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">All Amenities</h3>
              <button
                onClick={() => setShowAmenitiesModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {selectedVenueAmenities.map((amenity, index) => (
                <div key={index} className="bg-gray-100 rounded px-3 py-2 text-sm font-medium text-gray-700">
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Seating Arrangements Modal */}
      {showSeatingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Seating Arrangements</h3>
              <button
                onClick={() => setShowSeatingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-3">
              {selectedVenueSeating.map((seating, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {renderSeatingIcon(seating.icon)}
                    <div>
                      <div className="font-medium text-gray-800">{seating.type}</div>
                      <div className="text-sm text-gray-600">Capacity: {seating.capacity} people</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListofVenues


