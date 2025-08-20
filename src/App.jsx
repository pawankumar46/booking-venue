import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom'
import Blogs from './components/Blogs'
import Contact from './components/Contact'
import Venues from './components/Venues'
import ListofVenues from './components/ListofVenues'
import IndividualVenue from './components/IndividualVenue'
import Landing from './components/Landing'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import './App.css'
import ListYourBusiness from './components/ListYourBusiness'


function App() {
  const RouterComponent = (typeof window !== 'undefined' && window.location.protocol === 'file:')
    ? HashRouter
    : BrowserRouter
  return (
    <RouterComponent>
      <div className="App min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/business" element={<ListYourBusiness/>}/>
            <Route path="/venues" element={<Venues />} />
            <Route path="/venues/:city" element={<ListofVenues />} />
            <Route path="/venue/:city/:venueId" element={<IndividualVenue />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </RouterComponent>
  )
}

export default App
