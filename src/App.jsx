import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom'
import Blogs from './components/Blogs'
import Contact from './components/Contact'
import Venues from './components/Venues'
import ListofVenues from './components/ListofVenues'
import IndividualVenue from './components/IndividualVenue'
import Landing from './components/Landing'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import Login from './components/Login'
import ChatBot from './components/ChatBot'
import Resources from './pages/Resources'
import './App.css'
import GalaxyBack from './components/GalaxyBack'
import ListYourBusiness from './components/ListYourBusiness'
import Services from './pages/Services'
import ListofServices from './pages/ListofServices'
import IndividualServices from './pages/IndividualServices'
import PaymentGateway from './pages/PaymentGateway'
import IndividualResources from './pages/IndividualResources'
import AddToCart from './pages/AddToCart'
import Galaxy from './components/GalaxyBack'


function App() {
  const RouterComponent = (typeof window !== 'undefined' && window.location.protocol === 'file:')
    ? HashRouter
    : BrowserRouter
  return (
    <RouterComponent gestureEnabled={false}>
      <div className="App min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/business" element={<ListYourBusiness/>}/>
            <Route path="/venues" element={<Venues />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/services" element={<Services/>}/>
            <Route path="/venues/:city" element={<ListofVenues />} />
            <Route path="/venue/:city/:venueId" element={<IndividualVenue />} />
            <Route path="/services/:city" element={<ListofServices/>}/>
            <Route path="/services/:serviceType/:serviceId" element={<IndividualServices/>}/>
            <Route path="/pay" element={<PaymentGateway/>}/>
            <Route path="/resources" element={<Resources/>}/>
            <Route path="/resources/:resourceId" element={<IndividualResources/>}/>
            <Route path="/cart" element={<AddToCart/>}/>
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </RouterComponent>
  )
}

export default App
