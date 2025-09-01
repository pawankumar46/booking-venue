import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiCamera, FiCoffee, FiMusic, FiUsers, FiStar } from 'react-icons/fi'
import {GiPalette} from "react-icons/gi"
import {FaArrowRight } from "react-icons/fa"
import { BsFillAwardFill } from "react-icons/bs";

const Services = () => {
  const navigate = useNavigate()

  const cities = useMemo(
    () => [
      'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Pune'
    ],
    []
  )
  const serviceTypes = useMemo(
    () => [
      'Photography & Video', 'Decoration & Design', 'Catering Services', 'Music & Entertainment'
    ],
    []
  )
  const occasionTypes = useMemo(
    () => [
       'Corporate Events', 'Social Events', 'Religious Events', 'Politcal Events', 'Business Events'
    ],
    []
  )
  const paxRanges = useMemo(
    () => [
      'Up to 100', '100 - 200', '200 - 300', '300 - 500', '500+'
    ],
    []
  )

  const [selectedCity, setSelectedCity] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [selectedOccasion, setSelectedOccasion] = useState('')
  const [selectedPax, setSelectedPax] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (selectedService) params.set('service', selectedService)
    if (selectedOccasion) params.set('occasion', selectedOccasion)
    if (selectedPax) params.set('pax', selectedPax)
    const query = params.toString()
    const url = `/services/${encodeURIComponent(selectedCity || 'all')}${query ? `?${query}` : ''}`
    navigate(url)
  }
  return (
    <div className="min-h-screen bg-gray-300">

      <section className="w-full py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          {/* Block 1: Text left, photo right */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-r from-pink-400/40 via-fuchsia-400/40 to-purple-400/40">
            <div className="rounded-2xl bg-white/80 backdrop-blur shadow-xl ring-1 ring-gray-200 px-6 py-8 md:px-10 md:py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
                <div>
                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                    Professional Event Services
                  </h1>
                  <p className="mt-5 text-lg md:text-xl text-gray-700">
                    Connect with verified service providers who specialize in making your events extraordinary. From photography to catering, we have everything you need.
                  </p>
                </div>
                <div>
                  <div className="relative h-48 md:h-64 rounded-xl overflow-hidden ring-1 ring-black/5 shadow">
                    <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop" alt="Event services" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto px-3 -mt-4 mb-10">
        <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 p-4 md:p-6">
          <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-end gap-4">
            <div className="w-full">
              <label htmlFor="services-city" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <select
                  id="services-city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none cursor-pointer"
                >
                  <option value="" className="text-gray-500">Select city</option>
                  {cities.map((c) => (
                    <option key={c} value={c} className="text-gray-900 py-2">{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="services-type" className="block text-sm font-medium text-gray-700 mb-2">Service type</label>
              <div className="relative">
                <select
                  id="services-type"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none cursor-pointer"
                >
                  <option value="" className="text-gray-500">Select service</option>
                  {serviceTypes.map((t) => (
                    <option key={t} value={t} className="text-gray-900 py-2">{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="services-occasion" className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
              <div className="relative">
                <select
                  id="services-occasion"
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none cursor-pointer"
                >
                  <option value="" className="text-gray-500">Occasion type</option>
                  {occasionTypes.map((o) => (
                    <option key={o} value={o} className="text-gray-900 py-2">{o}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="services-pax" className="block text-sm font-medium text-gray-700 mb-2">Pax</label>
              <div className="relative">
                <select
                  id="services-pax"
                  value={selectedPax}
                  onChange={(e) => setSelectedPax(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none cursor-pointer"
                >
                  <option value="" className="text-gray-500">Select pax</option>
                  {paxRanges.map((p) => (
                    <option key={p} value={p} className="text-gray-900 py-2">{p}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="h-[50px] w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow ring-1 ring-red-500/20"
            >
              Search services
            </button>
          </form>
        </div>
      </div>

      {/* Category Cards */}
      <section className="w-full pb-14">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Photography & Videography */}
          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="p-6 bg-gradient-to-br from-sky-50 to-white">
              <div className="h-12 w-12 rounded-2xl bg-sky-100 text-sky-600 grid place-items-center">
                <FiCamera className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Photography & Video</h3>
              <p className="mt-2 text-sm text-gray-600">Professional photographers and videographers to capture your special moments.</p>
              <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
                <span className="inline-flex items-center gap-2"><FiUsers /> 45 providers</span>
                <span className="inline-flex items-center gap-1"><FiStar className="text-amber-500" /> 4.8+ rating</span>
              </div>
            </div>
            <div className="p-6 border-t">
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-sky-500"/>Event Photography</li>
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-sky-500"/>Cinematic Videos</li>
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-sky-500"/>Photo Booths</li>
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-sky-500"/>Drone Shots</li>
              </ul>
              <button className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 text-white py-2.5 font-semibold hover:bg-sky-700 ring-1 ring-sky-500/20">Explore <FaArrowRight className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Decoration & Design */}
          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="p-6 bg-gradient-to-br from-fuchsia-50 to-white">
              <div className="h-12 w-12 rounded-2xl bg-fuchsia-100 text-fuchsia-600 grid place-items-center">
                <GiPalette  className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Decoration & Design</h3>
              <p className="mt-2 text-sm text-gray-600">Creative decorators to transform your venue into a magical space.</p>
              <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
                <span className="inline-flex items-center gap-2"><FiUsers /> 38 providers</span>
                <span className="inline-flex items-center gap-1"><FiStar className="text-amber-500" /> 4.8+ rating</span>
              </div>
            </div>
            <div className="p-6 border-t">
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-fuchsia-500"/>Floral Arrangements</li>
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-fuchsia-500"/>Lighting Design</li>
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-fuchsia-500"/>Theme Decoration</li>
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-fuchsia-500"/>Backdrop Setup</li>
              </ul>
              <button className="mt-13 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-fuchsia-600 text-white py-2.5 font-semibold hover:bg-fuchsia-700 ring-1 ring-fuchsia-500/20">Explore <FaArrowRight className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Catering Services */}
          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-white">
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-600 grid place-items-center">
                <FiCoffee className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Catering Services</h3>
              <p className="mt-2 text-sm text-gray-600">Delicious food and beverage services for all types of events.</p>
              <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
                <span className="inline-flex items-center gap-2"><FiUsers /> 52 providers</span>
                <span className="inline-flex items-center gap-1"><FiStar className="text-amber-500" /> 4.8+ rating</span>
              </div>
            </div>
            <div className="p-6 border-t">
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500"/>Multi-Cuisine</li>
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500"/>Live Counters</li>
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500"/>Custom Menus</li>
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500"/>Dessert Stations</li>
              </ul>
              <button className="mt-13 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 text-white py-2.5 font-semibold hover:bg-emerald-700 ring-1 ring-emerald-500/20">Explore <FaArrowRight className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Music & Entertainment */}
          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="p-6 bg-gradient-to-br from-orange-50 to-white">
              <div className="h-12 w-12 rounded-2xl bg-orange-100 text-orange-600 grid place-items-center">
                <FiMusic className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Music & Entertainment</h3>
              <p className="mt-2 text-sm text-gray-600">DJs, live bands, and entertainers to keep your guests engaged.</p>
              <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
                <span className="inline-flex items-center gap-2"><FiUsers /> 29 providers</span>
                <span className="inline-flex items-center gap-1"><FiStar className="text-amber-500" /> 4.8+ rating</span>
              </div>
            </div>
            <div className="p-6 border-t">
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-orange-500"/>DJ Services</li>
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-orange-500"/>Live Bands</li>
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-orange-500"/>Sound Systems</li>
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-orange-500"/>Entertainment Shows</li>
              </ul>
              <button className="mt-13 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 text-white py-2.5 font-semibold hover:bg-orange-700 ring-1 ring-orange-500/20">Explore <FaArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </section>
       <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
            <BsFillAwardFill className="w-4 h-4" />
            <span className="text-sm font-medium">Join Our Network</span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold">Are You a Service Provider?</h3>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Join our platform and connect with thousands of customers looking for your services. 
            Grow your business and showcase your expertise.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold"></div>
              <div className="text-white/80"></div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">4.9★</div>
              <div className="text-white/80">Average Rating</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold"></div>
              <div className="text-white/80"></div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a  href='/business' className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-gray-800 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-sm ring-1 ring-white/40">
              Register Your Services
              <FaArrowRight  className="w-5 h-5" />
            </a>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-3 text-lg font-semibold">
              Learn More
            </button>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Services
