import React, { useState, useMemo } from 'react'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import { FiMapPin, FiClock, FiStar, FiHeart, FiShare2, FiPhone, FiMail, FiCamera, FiCoffee, FiMusic, FiBriefcase } from 'react-icons/fi'
import { GiPalette } from 'react-icons/gi'

const IndividualServices = () => {
  const { serviceType, serviceId } = useParams()
  const location = useLocation()
  const service = location.state || {}
  const navigate = useNavigate()
  
  const [activeTab, setActiveTab] = useState('about')
  const [isSaved, setIsSaved] = useState(false)

  // Service type configuration
  const serviceConfig = useMemo(() => {
    const configs = {
      Photography: {
        icon: FiCamera,
        color: 'sky',
        equipment: ['Professional DSLR/Mirrorless cameras', 'Cinematic video equipment', 'Drone photography setup', 'Studio lighting']
      },
      Caterers: {
        icon: FiCoffee,
        color: 'emerald',
        equipment: ['Professional kitchen equipment', 'Live cooking stations', 'Dessert bar setup', 'Hygienic food preparation']
      },
      Decoration: {
        icon: GiPalette,
        color: 'fuchsia',
        equipment: ['Theme decoration materials', 'LED lighting systems', 'Floral arrangements', 'Custom backdrops']
      },
      Music: {
        icon: FiMusic,
        color: 'orange',
        equipment: ['Professional sound systems', 'DJ equipment', 'MC/Host services', 'Lighting equipment']
      }
    }
    return configs[serviceType] || configs.Caterers
  }, [serviceType])

  // Service data from ListofServices or fallback
  const serviceData = useMemo(() => ({
    id: service.id || serviceId || '1',
    name: service.name || 'Artistry Studios',
    location: service.place || 'Mumbai, Delhi',
    experience: '8+ years experience',
    rating: service.rating || 4.9,
    reviewCount: 127,
    isFeatured: true,
    startingPrice: '₹25,000',
    responseTime: 'Within 2 hours',
    advanceBooking: '30 days',
    cancellation: 'Free up to 7 days',
    contact: service.contact || '+91 98765 43210',
    email: 'contact@artistrystudios.com',
    description: `With 8+ years of experience in ${serviceType?.toLowerCase() || 'photography'}, we specialize in creating beautiful memories that last a lifetime. Our team is passionate about capturing the perfect moments and delivering exceptional quality that exceeds expectations.`,
    services: service.services || ['Wedding Photography', 'Cinematic Video', 'Drone Shots'],
    portfolio: [
      service.photo || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?q=80&w=1218&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop'
    ],
    packages: [
      { name: 'Basic Package', price: '₹25,000', features: ['4 hours coverage', '50 edited photos', 'Online gallery'] },
      { name: 'Premium Package', price: '₹45,000', features: ['8 hours coverage', '100 edited photos', 'Online gallery', 'Print album'] },
      { name: 'Luxury Package', price: '₹75,000', features: ['Full day coverage', '200 edited photos', 'Premium album', 'Video highlights'] }
    ],
    reviews: [
      { name: 'Priya Sharma', rating: 5, comment: 'Amazing work! They captured every special moment beautifully.' },
      { name: 'Rajesh Kumar', rating: 5, comment: 'Professional team with excellent quality. Highly recommended!' },
      { name: 'Anita Singh', rating: 4, comment: 'Great service and timely delivery. Very satisfied with the results.' }
    ]
  }), [serviceId, service, serviceType])

  const IconComponent = serviceConfig.icon
  const colorClasses = {
    sky: {
      bg: 'bg-sky-50',
      text: 'text-sky-600',
      button: 'bg-sky-600 hover:bg-sky-700',
      badge: 'bg-sky-100 text-sky-700'
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      button: 'bg-emerald-600 hover:bg-emerald-700',
      badge: 'bg-emerald-100 text-emerald-700'
    },
    fuchsia: {
      bg: 'bg-fuchsia-50',
      text: 'text-fuchsia-600',
      button: 'bg-fuchsia-600 hover:bg-fuchsia-700',
      badge: 'bg-fuchsia-100 text-fuchsia-700'
    },
    orange: {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      button: 'bg-orange-600 hover:bg-orange-700',
      badge: 'bg-orange-100 text-orange-700'
    }
  }

  const currentColor = colorClasses[serviceConfig.color]

  const handleBookNow = () => {
    navigate('/pay', {
      state: {
        amount: 499,
        merchantName: 'Booking Website',
        description: `Booking advance for ${serviceData.name}`,
        customerName: 'John Doe',
        customerEmail: 'john.doe@example.com',
        customerPhone: '9999999999',
        logo: serviceData.portfolio?.[0]
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to={`/services/${serviceType}`} 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              ← Back to {serviceType}
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2 rounded-full ${isSaved ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
              >
                <FiHeart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-600">
                <FiShare2 className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-500">Share</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Header */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{serviceData.name}</h1>
                    {serviceData.isFeatured && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${currentColor.badge}`}>
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <FiMapPin className="w-4 h-4" />
                      <span>{serviceData.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      <span>{serviceData.experience}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-900 font-medium">{serviceData.rating}</span>
                    <span className="text-gray-500">({serviceData.reviewCount} reviews)</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${currentColor.bg}`}>
                  <IconComponent className={`w-8 h-8 ${currentColor.text}`} />
                </div>
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Portfolio</h2>
              <div className="grid grid-cols-3 gap-4">
                {serviceData.portfolio.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {['about', 'packages', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">About {serviceData.name}</h3>
                      <p className="text-gray-600 leading-relaxed">{serviceData.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-3">Services Offered</h4>
                      <div className="flex flex-wrap gap-2">
                        {serviceData.services.map((serviceItem, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {serviceItem}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-3">Equipment & Techniques</h4>
                      <div className="space-y-2">
                        {serviceConfig.equipment.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 text-gray-600">
                            <div className={`w-2 h-2 rounded-full ${currentColor.bg}`}></div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Packages Tab */}
                {activeTab === 'packages' && (
                  <div className="space-y-4">
                    {serviceData.packages.map((pkg, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{pkg.name}</h4>
                          <span className="text-xl font-bold text-gray-900">{pkg.price}</span>
                        </div>
                        <ul className="space-y-1">
                          {pkg.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2 text-gray-600">
                              <div className={`w-1.5 h-1.5 rounded-full ${currentColor.bg}`}></div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {serviceData.reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FiStar 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Info */}
          <div className="space-y-6">
            {/* Get in Touch */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <button onClick={handleBookNow} className={`w-full ${currentColor.button} text-white py-3 px-4 rounded-lg font-medium transition-colors`}>
                  Book Through Online
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <FiPhone className="w-4 h-4" />
                  Call Now for Booking
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <FiMail className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Starting Price:</span>
                  <span className="font-semibold text-gray-900">{serviceData.startingPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Time:</span>
                  <span className="font-semibold text-gray-900">{serviceData.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Advance Booking:</span>
                  <span className="font-semibold text-gray-900">{serviceData.advanceBooking}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cancellation:</span>
                  <span className="font-semibold text-gray-900">{serviceData.cancellation}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndividualServices