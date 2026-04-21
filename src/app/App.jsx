import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Footer from "../components/layout/Footer"
import Navbar from "../components/layout/Navbar"
import About from "../pages/about-us/About"
import Contact from "../pages/contact/Contact"
import Courses from "../pages/courses/Courses"
import Facilities from "../pages/facilities/Facilities"
import Gallery from "../pages/gallery/Gallery"
import Home from "../pages/home/Home"

export default function App() {
  return (
    <Router>
      <div className="overflow-x-clip bg-[#F5EFE8] font-display text-[#111111] leading-[1.4]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}
