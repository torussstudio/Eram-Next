import {
  Phone,
  MapPin,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#ae1431] font-rethink text-white px-6 py-12">
      <div className="max-w-[1200px] mx-auto">

        <div className="grid md:grid-cols-4 gap-8">

          {/* LOGO + TEXT */}
          <div>
            <img src="/eramwhite.webp" alt="ERAM" className="h-12 mb-6" />

            <p className="text-sm leading-[1.6] text-white/90 max-w-[280px]">
              To empower and excel students to acquire value based quality
              education providing an equal nurturing grounds for the overall
              growth and development of our students.
            </p>

            <h4 className="mt-5 font-semibold tracking-wide">
              STAY CONNECTED
            </h4>

            <div className="flex gap-5 mt-4 text-xl">
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold tracking-wide relative inline-block mb-6">
              QUICK LINKS
              <span className="absolute left-0 bottom-[-6px] w-10 h-[2px] bg-white" />
            </h4>

            <ul className="space-y-1.5 text-sm text-white/90">
              <li>About Us</li>
              <li>Admissions</li>
              <li>Academics</li>
              <li>Facilities</li>
              <li>Faculty</li>
              <li>Contact Us</li>
              <li>Download Prospectus</li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h4 className="font-semibold tracking-wide relative inline-block mb-6">
              RESOURCES
              <span className="absolute left-0 bottom-[-6px] w-10 h-[2px] bg-white" />
            </h4>

            <ul className="space-y-2 text-sm text-white/90">
              <li>FAQs</li>
              <li>Gallery</li>
              <li>News and Updates</li>
              <li>Parent Portal</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Safety Guidelines</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold tracking-wide relative inline-block mb-6">
              CONTACT
              <span className="absolute left-0 bottom-[-6px] w-10 h-[2px] bg-white" />
            </h4>

            <ul className="space-y-3 text-sm text-white/90">
              <li className="flex gap-3 items-start">
                <Phone className="mt-1 w-4 h-4" />
                90481 66313
              </li>

              <li className="flex gap-3 items-start">
                <Phone className="mt-1 w-4 h-4" />
                85929 66234
              </li>

              <li className="flex gap-3 items-start">
                <Mail className="mt-1 w-4 h-4" />
                eram.edu.in
              </li>

              <li className="flex gap-3 items-start">
                <Mail className="mt-1 w-4 h-4" />
                manager@eram.edu.in
              </li>

              <li className="flex gap-3 items-start">
                <MapPin className="mt-1 w-4 h-4" />
                <span>
                  Eram Education, Eram nagar, Prabhapuram, Mannengode (PO),
                  Palakkad-679307
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="mt-8 border-t border-white/40" />

        {/* COPYRIGHT */}
        <p className="text-center text-sm mt-6 tracking-wide text-white/90">
          COPYRIGHT © ERAM EDUCATION 2026.
        </p>

      </div>
    </footer>
  );
}