import React, { useEffect, useMemo, useState } from 'react'
import { FiStar, FiMapPin, FiPhone, FiBriefcase, FiCamera, FiCoffee, FiMusic } from 'react-icons/fi'
import { GiPalette } from 'react-icons/gi'
import { useParams, useNavigate } from 'react-router-dom'

const categoryTheme = {
  Photography: {
    bar: 'bg-sky-500',
    ring: 'ring-sky-200',
    chipBg: 'bg-sky-50 text-sky-800 ring-sky-200',
    chipBgMuted: 'bg-sky-50 text-sky-700 ring-sky-200',
    badgeBg: 'bg-sky-100 text-sky-700',
    button: 'bg-sky-600 hover:bg-sky-700',
    iconBg: 'bg-sky-100 text-sky-600'
  },
  Caterers: {
    bar: 'bg-emerald-500',
    ring: 'ring-emerald-200',
    chipBg: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
    chipBgMuted: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    badgeBg: 'bg-emerald-100 text-emerald-700',
    button: 'bg-emerald-600 hover:bg-emerald-700',
    iconBg: 'bg-emerald-100 text-emerald-600'
  },
  Decoration: {
    bar: 'bg-fuchsia-500',
    ring: 'ring-fuchsia-200',
    chipBg: 'bg-fuchsia-50 text-fuchsia-800 ring-fuchsia-200',
    chipBgMuted: 'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200',
    badgeBg: 'bg-fuchsia-100 text-fuchsia-700',
    button: 'bg-fuchsia-600 hover:bg-fuchsia-700',
    iconBg: 'bg-fuchsia-100 text-fuchsia-600'
  },
  Music: {
    bar: 'bg-orange-500',
    ring: 'ring-orange-200',
    chipBg: 'bg-orange-50 text-orange-800 ring-orange-200',
    chipBgMuted: 'bg-orange-50 text-orange-700 ring-orange-200',
    badgeBg: 'bg-orange-100 text-orange-700',
    button: 'bg-orange-600 hover:bg-orange-700',
    iconBg: 'bg-orange-100 text-orange-600'
  }
}

const categoryIcon = {
  Photography: FiCamera,
  Caterers: FiCoffee,
  Decoration: GiPalette,
  Music: FiMusic
}

const serviceProviders = [
  {
    id: 1,
    name: 'LensCraft Studios',
    contact: '+91 98765 43210',
    place: 'Mumbai, MH',
    services: ['Wedding Photography', 'Cinematic Video', 'Drone Shots'],
    rating: 4.8,
    category: 'Photography',
    photo: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'SpiceRoute Caterers',
    contact: '+91 98220 11122',
    place: 'Pune, MH',
    services: ['Multi-cuisine', 'Live Counters', 'Dessert Bar'],
    rating: 4.6,
    category: 'Caterers',
    photo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Aura Décor & Design',
    contact: '+91 90040 22233',
    place: 'Bengaluru, KA',
    services: ['Theme Decoration', 'Lighting', 'Floral Design'],
    rating: 4.7,
    category: 'Decoration',
    photo: 'https://images.unsplash.com/photo-1738225734899-30852be7e396?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'BeatBlaze DJs',
    contact: '+91 99670 55544',
    place: 'Delhi, DL',
    services: ['DJ', 'MC/Host', 'Sound & Lights'],
    rating: 4.5,
    category: 'Music',
    photo: 'https://images.unsplash.com/photo-1618409698966-6caa2b95733a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Royal Banquets Catering',
    contact: '+91 90909 12121',
    place: 'Hyderabad, TS',
    services: ['Veg & Non-Veg', 'Buffet', 'Custom Menu'],
    rating: 4.4,
    category: 'Caterers',
    photo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 6,
    name: 'FrameFusion Photography',
    contact: '+91 98111 90909',
    place: 'Chennai, TN',
    services: ['Pre-wedding', 'Candid', 'Photo Booth'],
    rating: 4.9,
    category: 'Photography',
    photo: 'https://images.unsplash.com/photo-1462926795244-b273f8a5454f?q=80&w=1006&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 7,
    name: 'Petal & Pearl Décor',
    contact: '+91 97000 88877',
    place: 'Kolkata, WB',
    services: ['Stage Setup', 'Entrance Arch', 'Backdrop'],
    rating: 4.6,
    category: 'Decoration',
    photo: 'https://plus.unsplash.com/premium_photo-1675720071914-25ad2af591aa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 8,
    name: 'Livewire Band',
    contact: '+91 99876 54321',
    place: 'Ahmedabad, GJ',
    services: ['Live Band', 'Singers', 'Instrumental'],
    rating: 4.7,
    category: 'Music',
    photo: 'https://images.unsplash.com/photo-1542628682-88321d2a4828?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1200&auto=format&fit=crop'
  }
]

const ListofServices = () => {
  const params = useParams()
  const city = decodeURIComponent(params.city)
  const navigate = useNavigate()
  const categories = ['Photography', 'Caterers', 'Decoration', 'Music']
  const [selectedCategories, setSelectedCategories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const filteredProviders = useMemo(() => {
    const byCategory = selectedCategories.length === 0
      ? serviceProviders
      : serviceProviders.filter((p) => selectedCategories.includes(p.category))

    const term = searchTerm.trim().toLowerCase()
    if (!term) return byCategory

    return byCategory.filter((p) => {
      const inName = p.name.toLowerCase().includes(term)
      const inPlace = p.place.toLowerCase().includes(term)
      const inCategory = p.category.toLowerCase().includes(term)
      const inServices = (p.services || []).some((s) => s.toLowerCase().includes(term))
      return inName || inPlace || inCategory || inServices
    })
  }, [selectedCategories, searchTerm])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategories, searchTerm])

  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredProviders.length / itemsPerPage) || 1
  const pagedProviders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredProviders.slice(start, start + itemsPerPage)
  }, [filteredProviders, currentPage])

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const handleServiceNavigate = (serviceProvider) => {
    // Navigate to individual service page with service data
    navigate(`/services/${serviceProvider.category.toLowerCase()}/${serviceProvider.id}`, {
      state: serviceProvider
    })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{city != ":city" ? `Service Providers in ${city}` : 'Service Providers'}</h1>
          <p className="text-gray-600 mt-2">Photography, Caterers, Decorations, Music (DJ) and more</p>
        </div>

        <div className="mb-6 bg-white rounded-xl ring-1 ring-gray-200 p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
            <div className="text-sm font-medium text-gray-700">Filter by category</div>
            <form onSubmit={(e)=>e.preventDefault()} className="w-full md:w-80">
              <input
                type="text"
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                placeholder="Search providers, location, category, services"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              />
            </form>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => {
              const checked = selectedCategories.includes(cat)
              const theme = categoryTheme[cat]
              return (
                <label key={cat} className={(checked ? `${theme.chipBg} ` : 'bg-gray-50 text-gray-700 ring-gray-200 ') + 'inline-flex items-center gap-2 px-3 py-1.5 rounded-full ring-1 cursor-pointer select-none text-sm'}>
                  <input
                    type="checkbox"
                    className="accent-current"
                    checked={checked}
                    onChange={() => toggleCategory(cat)}
                  />
                  <span className={checked ? '' : 'text-gray-700'}>{cat}</span>
                </label>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pagedProviders.map((sp) => {
            const theme = categoryTheme[sp.category]
            const Icon = categoryIcon[sp.category]
            return (
            <div key={sp.id} className={`relative bg-white rounded-xl shadow-sm ring-1 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all ${theme.ring}`}>
              <span className={`absolute inset-x-0 top-0 h-1 ${theme.bar}`}></span>
              <div className="h-36 w-full overflow-hidden">
                <img
                  src={sp.photo}
                  alt={sp.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">{sp.name}</h3>
                    <div className="mt-1 inline-flex items-center gap-1 text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar key={i} className={(i < Math.round(sp.rating) ? 'fill-amber-400 text-amber-400 ' : 'text-gray-300 ') + 'w-4 h-4'} />
                      ))}
                      <span className="ml-1 text-xs md:text-sm text-gray-600">{sp.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className={`shrink-0 h-9 w-9 rounded-lg grid place-items-center ${theme.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2"><FiMapPin className="text-gray-500" />{sp.place}</div>
                  <div className="flex items-center gap-2"><FiPhone className="text-gray-500" />{sp.contact}</div>
                  <div className="flex items-start gap-2">
                    <FiBriefcase className="mt-0.5 text-gray-500" />
                    <div className="flex flex-wrap gap-1.5">
                      {sp.services.map((s, idx) => (
                        <span key={idx} className={`px-2 py-0.5 rounded-full text-[11px] ring-1 ${theme.chipBgMuted}`}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className={`mt-1 inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full ${theme.badgeBg}`}>{sp.category}</div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button onClick={() => handleServiceNavigate(sp)} className={`inline-flex items-center justify-center rounded-full text-white px-3 py-1.5 text-xs sm:text-sm font-semibold transition-colors ${theme.button}`}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          )})}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 rounded-md text-sm ring-1 ${currentPage === 1 ? 'text-gray-400 ring-gray-200 cursor-not-allowed' : 'text-gray-700 ring-gray-300 hover:bg-gray-50'}`}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1
              const isActive = page === currentPage
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-8 h-8 rounded-md text-sm font-medium ring-1 ${isActive ? 'bg-gray-900 text-white ring-gray-900' : 'text-gray-700 ring-gray-300 hover:bg-gray-50'}`}
                >
                  {page}
                </button>
              )
            })}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 rounded-md text-sm ring-1 ${currentPage === totalPages ? 'text-gray-400 ring-gray-200 cursor-not-allowed' : 'text-gray-700 ring-gray-300 hover:bg-gray-50'}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ListofServices


