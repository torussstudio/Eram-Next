import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Footer from "../components/layout/Footer"
import Navbar from "../components/layout/Navbar"

// Lazy load all pages for route-based code splitting
const Home = lazy(() => import("../pages/home/Home"))
const About = lazy(() => import("../pages/about-us/About"))
const Courses = lazy(() => import("../pages/courses/Courses"))
const Facilities = lazy(() => import("../pages/facilities/Facilities"))
const Contact = lazy(() => import("../pages/contact/Contact"))
const Gallery = lazy(() => import("../pages/gallery/Gallery"))

// Page loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#F5EFE8] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin">
          <div className="w-8 h-8 border-4 border-[#ae1431] border-t-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <div className="overflow-x-clip bg-[#F5EFE8] font-display text-[#111111] leading-[1.4]">
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  )
}
