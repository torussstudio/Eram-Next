import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ScrollToTop from "../components/layout/ScrollToTop";

// Layout
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Pages
const Home = lazy(() => import("../pages/home/Home"));
const About = lazy(() => import("../pages/about-us/About"));
const TheTrust = lazy(() => import("../pages/the-trust/TheTrust"));
const Facilities = lazy(() => import("../pages/facilities/Facilities"));
const Contact = lazy(() => import("../pages/contact/Contact"));
const Gallery = lazy(() => import("../pages/gallery/Gallery"));
const ExploreArena = lazy(() => import("../pages/explore-arena/ExploreArena"));
const MmHss = lazy(() => import("../pages/mmhss/MmHss"));
const Mmps = lazy(() => import("../pages/mmps/Mmps"));
const Amlp = lazy(() => import("../pages/amlp/Amlp"));
const Mmite = lazy(() => import("../pages/mmite/Mmite"));

// Preload helpers
const preloadAbout = () => import("../pages/about-us/About");
const preloadTheTrust = () => import("../pages/the-trust/TheTrust");
const preloadFacilities = () => import("../pages/facilities/Facilities");
const preloadContact = () => import("../pages/contact/Contact");
const preloadGallery = () => import("../pages/gallery/Gallery");

// Loader
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#F5EFE8] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#ae1431] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />

      <div className="overflow-x-clip bg-[#F5EFE8] font-display text-[#111111] leading-[1.4]">
        <Navbar
          onAboutHover={preloadAbout}
          onTheTrustHover={preloadTheTrust}
          onFacilitiesHover={preloadFacilities}
          onContactHover={preloadContact}
          onGalleryHover={preloadGallery}
        />

        {/* Routes */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/the-trust" element={<TheTrust />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/explore-arena" element={<ExploreArena />} />
            <Route path="/mmhss" element={<MmHss />} />
            <Route path="/mmps" element={<Mmps />} />
            <Route path="/amlp" element={<Amlp />} />
            <Route path="/mmite" element={<Mmite />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
