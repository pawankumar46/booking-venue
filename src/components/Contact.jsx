import React, { useState, useRef } from 'react'
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
 const [form1, setForm] = useState({ user_name: '', user_email: '', user_mobile: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    console.log(form1)
    emailjs
      .sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, 
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form.current, {
                publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      })
      .then(
        () => {
          
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
    setForm({ user_name: '', user_email: '', user_mobile: '', message: ''})
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <form ref={form} onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900">Contact us</h2>
          <p className="text-gray-600 mt-1">We’ll get back within 24 hours.</p>

          <div className="mt-6 grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="user_name"
                name="user_name"
                type="text"
                value={form1.user_name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="user_email"
                type="email"
                value={form1.user_email}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile number</label>
              <input
                id="mobile"
                name="user_mobile"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                placeholder="10-digit number"
                value={form1.user_mobile}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={form1.message}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <button type="submit" className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700">
            Send message
          </button>
          {submitted && (
            <p className="mt-3 text-green-600 text-sm">Thanks! We’ll get in touch soon.</p>
          )}
        </form>

        <div className="relative h-80 md:h-full rounded-xl overflow-hidden">
          <img
src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop"
alt="Event celebration"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </div>
    </div>
  )
}

export default Contact