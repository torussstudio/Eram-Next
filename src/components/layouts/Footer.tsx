"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, MapPin, Mail, ChevronDown } from "lucide-react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { IoLogoYoutube } from "react-icons/io";

interface AcademicsItem {
  title: string;
  href: string;
}


const academicsLinks: AcademicsItem[] = [
  { title: "EASE (CBSE)", href: "https://ease.edu.in/" },
  { title: "MMHSS (Hr. Sec)", href: "/mmhss/academics" },
  { title: "MMPS (HS)", href: "/mmps/academics" },
  { title: "AMLP (LP)", href: "/amlp/academics" },
  { title: "MMITE (D. El. Edc)", href: "/mmite/academics" },
  
];

function AcademicsAccordionItem() {
  const [open, setOpen] = useState(false);

  return (
    <li>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 hover:underline cursor-pointer"
      >
        Institutions
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        style={{
          maxHeight: open ? "220px" : "0px",
          transition: "max-height 300ms cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
        }}
      >
        <ul className="mt-2 flex flex-col gap-1.5 border-l border-white/30 pl-3">
          {academicsLinks.map((item) => {
            const isExternal = item.href.startsWith("http");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="text-white/80 hover:text-white hover:underline text-[13px]"
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

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

            <h4 className="mt-5 text-xs font-semibold uppercase tracking-wide">
              STAY CONNECTED
            </h4>

            <div className="mt-4 flex items-center gap-5">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-110"
              >
                <FaInstagram className="text-[25px]" />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-110"
              >
                <FaLinkedinIn className="text-[25px]" />
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-110"
              >
                <IoLogoYoutube className="text-[30px]" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold tracking-wide relative inline-block mb-6 uppercase text-sm">
              QUICK LINKS
              <span className="absolute left-0 bottom-[-6px] w-10 h-[2px] bg-white" />
            </h4>

            <ul className="space-y-1.5 text-sm text-white/90">
              <li>
                <Link href="/about-us" className="hover:underline">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:underline">
                  Admissions
                </Link>
              </li>

              <AcademicsAccordionItem />

              <li>
                <Link href="/about-us" className="hover:underline">
                  Facilities
                </Link>
              </li>

              <li>
                <Link href="/faculty" className="hover:underline">
                  Faculty
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>

              <li>
                <a href="/downloads" download className="hover:underline">
                  Download Prospectus
                </a>
              </li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h4 className="font-semibold tracking-wide relative inline-block mb-6 uppercase text-sm">
              RESOURCES
              <span className="absolute left-0 bottom-[-6px] w-10 h-[2px] bg-white" />
            </h4>

            <ul className="space-y-2 text-sm text-white/90">
              <li>
                <Link href="/faqs" className="hover:underline">
                  FAQs
                </Link>
              </li>

              <li>
                <Link href="/gallery" className="hover:underline">
                  Gallery
                </Link>
              </li>

              <li>
                <Link href="/events" className="hover:underline">
                  News and Updates
                </Link>
              </li>

              <li>
                <Link href="/portal" className="hover:underline">
                  Parent Portal
                </Link>
              </li>

              <li>
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link href="/safety-guidelines" className="hover:underline">
                  Safety Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold tracking-wide relative inline-block mb-6 uppercase text-sm">
              CONTACT
              <span className="absolute left-0 bottom-[-6px] w-10 h-[2px] bg-white" />
            </h4>

            <ul className="space-y-4 text-sm text-white/90">
              {/* PHONE */}
              <li>
                <a
                  href="tel:+919048166313"
                  className="flex items-start gap-3 hover:text-white transition"
                >
                  <Phone className="mt-1 h-4 w-4 shrink-0" />
                  <span>+91 90481 66313</span>
                </a>
              </li>

              {/* EMAIL */}
              <li>
                <a
                  href="mailto:manager@eram.edu.in"
                  className="flex items-start gap-3 hover:text-white transition"
                >
                  <Mail className="mt-1 h-4 w-4 shrink-0" />
                  <span className="break-all">manager@eram.edu.in</span>
                </a>
              </li>

              {/* LOCATION */}
              <li>
                <a
                  href="https://maps.google.com/?q=Eram+Education+Palakkad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-white transition"
                >
                  <MapPin className="mt-1 h-4 w-4 shrink-0" />

                  <span>
                    Eram Education, Eram nagar, Prabhapuram, Mannengode (PO),
                    Palakkad-679307
                  </span>
                </a>
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