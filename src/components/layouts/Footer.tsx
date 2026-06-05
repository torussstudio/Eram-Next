import React from "react";
import Image from "next/image";
import { Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#ae1431] font-rethink text-white px-6 py-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* LOGO + TEXT */}
          <div>
            <div className="relative w-[150px] h-[48px] mb-6">
              <Image
                src="/eramwhite.webp"
                alt="ERAM Logo"
                fill
                sizes="150px"
                style={{ objectFit: "contain", objectPosition: "left" }}
              />
            </div>

            <p className="text-sm leading-[1.6] text-white/90 max-w-[280px]">
              To empower and excel students to acquire value based quality
              education providing an equal nurturing grounds for the overall
              growth and development of our students.
            </p>

            <h4 className="mt-5 font-semibold tracking-wide uppercase text-xs">
              STAY CONNECTED
            </h4>

            <div className="flex gap-5 mt-4 text-xl"></div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold tracking-wide relative inline-block mb-6 uppercase text-sm">
              QUICK LINKS
              <span className="absolute left-0 bottom-[-6px] w-10 h-[2px] bg-white" />
            </h4>

            <ul className="space-y-1.5 text-sm text-white/90">
              <li className="cursor-pointer hover:underline">About Us</li>
              <li className="cursor-pointer hover:underline">Admissions</li>
              <li className="cursor-pointer hover:underline">Academics</li>
              <li className="cursor-pointer hover:underline">Facilities</li>
              <li className="cursor-pointer hover:underline">Faculty</li>
              <li className="cursor-pointer hover:underline">Contact Us</li>
              <li className="cursor-pointer hover:underline">Download Prospectus</li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h4 className="font-semibold tracking-wide relative inline-block mb-6 uppercase text-sm">
              RESOURCES
              <span className="absolute left-0 bottom-[-6px] w-10 h-[2px] bg-white" />
            </h4>

            <ul className="space-y-2 text-sm text-white/90">
              <li className="cursor-pointer hover:underline">FAQs</li>
              <li className="cursor-pointer hover:underline">Gallery</li>
              <li className="cursor-pointer hover:underline">News and Updates</li>
              <li className="cursor-pointer hover:underline">Parent Portal</li>
              <li className="cursor-pointer hover:underline">Privacy Policy</li>
              <li className="cursor-pointer hover:underline">Terms & Conditions</li>
              <li className="cursor-pointer hover:underline">Safety Guidelines</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold tracking-wide relative inline-block mb-6 uppercase text-sm">
              CONTACT
              <span className="absolute left-0 bottom-[-6px] w-10 h-[2px] bg-white" />
            </h4>

            <ul className="space-y-3 text-sm text-white/90">
              <li className="flex gap-3 items-start">
                <Phone className="mt-1 w-4 h-4 shrink-0" />
                <span>+91 90481 66313</span>
              </li>

              <li className="flex gap-3 items-start">
                <Mail className="mt-1 w-4 h-4 shrink-0" />
                <span className="break-all">manager@eram.edu.in</span>
              </li>

              <li className="flex gap-3 items-start">
                <MapPin className="mt-1 w-4 h-4 shrink-0" />
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
        <p className="text-center text-sm mt-6 tracking-wide text-white/90 font-rethink">
          COPYRIGHT © ERAM EDUCATION 2026.
        </p>
      </div>
    </footer>
  );
}
