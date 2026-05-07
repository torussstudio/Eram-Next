// import { lazy, Suspense } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Footer from "../components/layout/Footer";
// import Navbar from "../components/layout/Navbar";
// import ScrollToTop from "../components/layout/ScrollToTop";
// import SmoothScrollProvider from "../providers/SmoothScrollProvider";


// // ✅ Lazy load pages (BEST PRACTICE)
// const Home = lazy(() => import("../pages/home/Home"));
// const About = lazy(() => import("../pages/about-us/About"));
// const TheTrust = lazy(() => import("../pages/the-trust/TheTrust"));
// const Facilities = lazy(() => import("../pages/facilities/Facilities"));
// const Contact = lazy(() => import("../pages/contact/Contact"));
// const Gallery = lazy(() => import("../pages/gallery/Gallery"));
// const ExploreArena = lazy(() => import("../pages/explore-arena/ExploreArena"));
// const MmHss = lazy(()=> import("../pages/mmhss/MmHss"))

// // ✅ Preload helpers (instant navigation feel)
// const preloadAbout = () => import("../pages/about-us/About");
// const preloadTheTrust = () => import("../pages/the-trust/TheTrust");
// const preloadFacilities = () => import("../pages/facilities/Facilities");
// const preloadContact = () => import("../pages/contact/Contact");
// const preloadGallery = () => import("../pages/gallery/Gallery");


// // ✅ Loader
// function PageLoader() {
//   return (
//     <div className="min-h-screen bg-[#F5EFE8] flex items-center justify-center">
//       <div className="w-8 h-8 border-4 border-[#ae1431] border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <ScrollToTop />

//       <div className="overflow-x-clip bg-[#F5EFE8] font-display text-[#111111] leading-[1.4]">
//         <SmoothScrollProvider>
//           {/* 👉 Pass preload handlers to Navbar (optional improvement) */}
//           <Navbar
//             onAboutHover={preloadAbout}
//             onTheTrustHover={preloadTheTrust}
//             onFacilitiesHover={preloadFacilities}
//             onContactHover={preloadContact}
//             onGalleryHover={preloadGallery}
//           />

//           <Suspense fallback={<PageLoader />}>
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/about-us" element={<About />} />
//               <Route path="/the-trust" element={<TheTrust />} />
//               <Route path="/facilities" element={<Facilities />} />
//               <Route path="/contact" element={<Contact />} />
//               <Route path="/gallery" element={<Gallery />} />
//               <Route path="/explore-arena" element={<ExploreArena />} />
//               <Route path="/mmhss" element={<MmHss />} />
//             </Routes>
//           </Suspense>

//           <Footer />
//         </SmoothScrollProvider>
//       </div>
//     </Router>
//   );
// }

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ScrollToTop from "../components/layout/ScrollToTop";

// Layout
const Navbar = lazy(() => import("../components/layout/Navbar"));
const Footer = lazy(() => import("../components/layout/Footer"));

// Pages
const Home = lazy(() => import("../pages/home/Home"));
const About = lazy(() => import("../pages/about-us/About"));
const TheTrust = lazy(() => import("../pages/the-trust/TheTrust"));
const Facilities = lazy(() => import("../pages/facilities/Facilities"));
const Contact = lazy(() => import("../pages/contact/Contact"));
const Gallery = lazy(() => import("../pages/gallery/Gallery"));
const ExploreArena = lazy(() =>
  import("../pages/explore-arena/ExploreArena")
);
const MmHss = lazy(() => import("../pages/mmhss/MmHss"));

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

        {/* Navbar */}
        <Suspense fallback={null}>
          <Navbar
            onAboutHover={preloadAbout}
            onTheTrustHover={preloadTheTrust}
            onFacilitiesHover={preloadFacilities}
            onContactHover={preloadContact}
            onGalleryHover={preloadGallery}
          />
        </Suspense>

        {/* Routes */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/the-trust" element={<TheTrust />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/explore-arena" element={<ExploreArena />} />
            <Route path="/mmhss" element={<MmHss />} />
          </Routes>
        </Suspense>

        {/* Footer */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>

      </div>
    </Router>
  );
}