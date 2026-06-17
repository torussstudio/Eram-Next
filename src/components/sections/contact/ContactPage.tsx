"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// ─── Static data ───────────────────────────────────────────────────────────────

interface ContactItemProps {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
}

const CONTACT_ITEMS: ContactItemProps[] = [
  {
    label: "Address",
    value:
      "Eram Education, Eram Nagar, Prabhapuram, Mannengode (PO), Palakkad — 679307",
    href: "https://maps.google.com/?q=Eram+Education+Palakkad",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.75A1.75 1.75 0 1 1 8 4.25a1.75 1.75 0 0 1 0 3.5z"
          fill="currentColor"
        />
      </svg>
    ),
  },

  {
    label: "Phone",
    value: "+91 9048166313",
    href: "tel:+919048166313",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M3.5 1A1.5 1.5 0 0 0 2 2.5v1C2 9.9 6.1 14 12.5 14h1a1.5 1.5 0 0 0 1.5-1.5v-1.26a1.5 1.5 0 0 0-1.11-1.45l-2-.5a1.5 1.5 0 0 0-1.62.7l-.4.67A6.53 6.53 0 0 1 6.84 7.1l.67-.4a1.5 1.5 0 0 0 .7-1.63l-.5-2A1.5 1.5 0 0 0 6.26 2H5A1.5 1.5 0 0 0 3.5 1z"
          fill="currentColor"
        />
      </svg>
    ),
  },

  {
    label: "Email",
    value: "manager@eram.edu.in",
    href: "mailto:manager@eram.edu.in",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect
          x="1"
          y="3"
          width="14"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
];

interface FieldData {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}

const TEXT_FIELDS: FieldData[] = [
  { name: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "john@example.com",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "+91 98765 43210",
  },
];

const SUBJECT_CHIPS = [
  "Admissions",
  "Sports Arena Booking",
  "Institutional Enquiry",
  "Collaboration",
  "Other",
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  subject: "",
};

// ─── Sub-components ────────────────────────────────────────────────────────────

interface FieldProps extends FieldData {
  value: string;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

function Field({
  name,
  label,
  type,
  placeholder,
  value,
  isFocused,
  onFocus,
  onBlur,
  onChange,
  className = "",
}: FieldProps) {
  return (
    <div className={className}>
      <label className="block text-[11px] tracking-[0.09em] uppercase text-black/40 mb-2 font-rethink">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl text-sm text-[#1a1a1a] outline-none
          border-[1.5px]  appearance-none touch-manipulation
          placeholder:text-black/30 transition-all duration-200 font-rethink
          ${
            isFocused
              ? "border-[#ae1431] bg-[#fff9f9]"
              : "border-black/10 bg-[#fafafa]"
          }`}
      />
    </div>
  );
}

function ContactItem({ icon, label, value, href }: ContactItemProps) {
  return (
    <a
      href={href}
      target={label === "Address" ? "_blank" : undefined}
      rel={label === "Address" ? "noopener noreferrer" : undefined}
      className="flex gap-3.5 items-start group"
    >
      <div className="w-9 h-9 min-w-[36px] rounded-[10px] bg-white/[0.07] flex items-center justify-center text-[#ae1431] shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] tracking-[0.1em] uppercase text-white/35 mb-0.5">
          {label}
        </p>
        <p className="text-[13px] text-white/80 leading-relaxed break-words font-rethink">
          {value}
        </p>
      </div>
    </a>
  );
}

function SuccessState() {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 rounded-full bg-[#ae1431] flex items-center justify-center mx-auto mb-6">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M6 14l6 6 10-10"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="font-rethink text-[1.8rem]  text-[#1a1a1a] mb-3 tracking-tight">
        Message Received
      </h3>
      <p className="text-sm text-black/45 leading-relaxed font-rethink">
        Thank you for reaching out. Our team will
        <br />
        get back to you within 24 hours.
      </p>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      const letters = outlineRef.current?.querySelectorAll(".c-letter");
      if (!letters || letters.length === 0) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      gsap.set(letters, { y: "110%", skewX: 4 });
      gsap.set(taglineRef.current, { opacity: 0, y: 18 });
      gsap.set(formCardRef.current, { opacity: 0, y: 40 });
      gsap.set(infoCardRef.current, { opacity: 0, y: 40 });
      gsap.set(dividerRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      tl.to(
        letters || [],
        { y: "0%", skewX: 0, duration: 0.9, stagger: { each: 0.045 } },
        0,
      )
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.45)
        .to(
          dividerRef.current,
          { scaleX: 1, duration: 0.7, ease: "expo.out" },
          0.55,
        )
        .to(infoCardRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.62)
        .to(formCardRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.72);
    },
    { scope: pageRef },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleChip = (chip: string) => {
    setForm((p) => ({ ...p, subject: chip }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const focusProps = (name: string) => ({
    isFocused: focused === name,
    onFocus: () => setFocused(name),
    onBlur: () => setFocused(null),
  });

  return (
    <div
      ref={pageRef}
      className="bg-[#F5EFE8] min-h-svh overflow-x-hidden w-full"
    >
      {/* ── Page wrapper ── */}
      <div className="px-4 sm:px-7 lg:px-10 pb-16 sm:pb-20 max-w-[1400px] mx-auto w-full">
        {/* ── Hero ── */}
        <div className="relative mt-8 sm:mt-12 lg:mt-16 overflow-hidden">
          {/* Outline word */}
          <div
            ref={outlineRef}
            className="font-display leading-[0.88] tracking-[-0.045em] select-none pointer-events-none whitespace-nowrap"
            style={{
              fontFamily: "'Playfair Display'",
              fontSize: "clamp(3.6rem, 16vw, 13rem)",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(0,0,0,0.18)",
            }}
          >
            {"CONTACT".split("").map((l, i) => (
              <span key={i} className=" align-bottom">
                <span>{l}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          ref={dividerRef}
          className="h-px bg-black/[0.12] mt-4 sm:mt-2 mb-8 sm:mb-10 lg:mb-12"
        />

        {/* ── Main grid: stacked on mobile/tablet, side-by-side on md+ ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.65fr] gap-5 items-start">
          {/* ── Info card ── */}
          <div ref={infoCardRef} className="md:mt-0 lg:mt-22">
            <div className="bg-black rounded-2xl lg:rounded-[28px] p-6 sm:p-9 lg:p-11 text-white relative overflow-hidden flex flex-col gap-7 md:gap-0 md:justify-between md:min-h-[480px]">
              {/* Top section — "Get in Touch" overlaid on dark card header */}
              <div>
                <p className="font-display text-[2.2rem] lg:text-[3rem] leading-[0.9] tracking-[-0.04em] text-white mb-4">
                  Get in
                  <br />
                  Touch
                </p>
                <p className="text-[13.5px] font-rethink leading-[1.75] text-white/55 max-w-xs">
                  For admissions, institutional enquiries, partnerships, or
                  sports Arena bookings, our team will guide you to the right
                  department.
                </p>
              </div>

              {/* Contact items */}
              <div className="flex flex-col gap-4 sm:gap-5">
                {CONTACT_ITEMS.map((item) => (
                  <ContactItem key={item.label} {...item} />
                ))}
              </div>
            </div>
          </div>

          {/* ── Form card ── */}
          <div ref={formCardRef}>
            <div className="bg-white rounded-2xl lg:rounded-[28px] p-6 sm:p-8 lg:p-11 shadow-[0_2px_40px_rgba(0,0,0,0.06)]">
              {submitted ? (
                <SuccessState />
              ) : (
                <>
                  {/* Header */}
                  <div className="mb-7 sm:mb-9">
                    <h3 className="font-rethink tracking-[-0.025em] text-[#1a1a1a] mb-2 text-[1.45rem] sm:text-[1.7rem] ">
                      Send us an Enquiry
                    </h3>
                    <p className="text-[13.5px] font-rethink text-black/45 leading-relaxed">
                      Fill in the form and the relevant department will respond
                      at the earliest.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Name + Email: 2-col on sm+, stacked on mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {TEXT_FIELDS.slice(0, 2).map((f) => (
                        <Field
                          key={f.name}
                          {...f}
                          value={form[f.name as keyof FormState]}
                          onChange={handleChange}
                          {...focusProps(f.name)}
                        />
                      ))}
                    </div>

                    {/* Phone */}
                    <Field
                      {...TEXT_FIELDS[2]}
                      value={form.phone}
                      onChange={handleChange}
                      {...focusProps("phone")}
                    />

                    {/* Subject chips */}
                    <div>
                      <p className="block text-[11px] tracking-[0.09em] uppercase text-black/40 mb-2 font-rethink">
                        Regarding
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {SUBJECT_CHIPS.map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => handleChip(chip)}
                            className={`px-3.5 py-1.5 rounded-full text-[12px] border font-rethink
                              transition-all duration-[180ms] cursor-pointer
                              touch-manipulation min-h-[36px] leading-none
                              ${
                                form.subject === chip
                                  ? "bg-[#ae1431] border-[#ae1431] text-white"
                                  : "bg-transparent border-black/[0.13] text-black/60 hover:border-[#ae1431]/50"
                              }`}
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[11px] tracking-[0.09em] uppercase text-black/40 mb-2 font-rethink">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        placeholder="Tell us about your query..."
                        rows={5}
                        className={`w-full px-4 py-3.5 rounded-xl text-sm text-[#1a1a1a] font-rethink
                          outline-none border-[1.5px] resize-none transition-all duration-200
                           leading-relaxed appearance-none placeholder:text-black/30
                          ${
                            focused === "message"
                              ? "border-[#ae1431] bg-[#fff9f9]"
                              : "border-black/10 bg-[#fafafa]"
                          }`}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full flex items-center font-rethink justify-center gap-2
                        px-8 py-4 min-h-[48px] rounded-xl border-none cursor-pointer
                        bg-[#ae1431] hover:bg-[#8f1028] active:scale-[0.98]
                        text-white text-sm tracking-[0.04em]
                        transition-all duration-200 touch-manipulation "
                    >
                      Send Message
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M2 8h12M9 4l4 4-4 4"
                          stroke="white"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
