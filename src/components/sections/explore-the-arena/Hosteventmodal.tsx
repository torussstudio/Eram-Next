"use client";

import React, { useEffect, useRef, useState } from "react";
import { getLenis } from "@/providers/SmoothScrollProvider";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import {
  X,
  User,
  CalendarDays,
  MapPin,
  FileText,
  ChevronDown,
  ArrowRight,
  Lock,
  Check,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface HostEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type EventDuration = "one-day" | "multi-day" | "recurring";

interface FormState {
  fullName: string;
  organisation: string;
  email: string;
  phone: string;
  role: string;
  eventName: string;
  eventType: string;
  sport: string;
  expectedParticipants: string;
  expectedAudience: string;
  preferredDate: string;
  alternativeDate: string;
  startTime: string;
  endTime: string;
  duration: EventDuration;
  endDate: string;
  facilities: string[];
  additionalDetails: string;
  hearAboutUs: string;
  specificRequests: string;
  agree: boolean;
}

const INITIAL_STATE: FormState = {
  fullName: "",
  organisation: "",
  email: "",
  phone: "",
  role: "",
  eventName: "",
  eventType: "",
  sport: "",
  expectedParticipants: "",
  expectedAudience: "",
  preferredDate: "",
  alternativeDate: "",
  startTime: "",
  endTime: "",
  duration: "one-day",
  endDate: "",
  facilities: [],
  additionalDetails: "",
  hearAboutUs: "",
  specificRequests: "",
  agree: false,
};

const EVENT_TYPES = [
  "Tournament",
  "Sports Meet",
  "Training / Coaching",
  "Corporate Event",
  "Community Event",
  "Other",
];

const SPORTS = [
  "Football",
  "Basketball",
  "Volleyball",
  "Badminton",
  "Handball",
  "Kabaddi",
  "Multi-Sport",
  "Other",
];

const FACILITIES = [
  "Sports Court / Playing Area",
  "Amphitheatre",
  "Floodlights",
  "Seating",
  "Other Facilities (Please Specify)",
];

/* ------------------------------------------------------------------ */
/* Shared field styles                                                */
/* ------------------------------------------------------------------ */

const inputClass =
  "w-full rounded-xl border border-[#e4dcd0] bg-white px-4 py-3 text-sm text-[#2a2420] placeholder:text-[#9a9186] outline-none transition-colors focus:border-[#ae1431] focus:ring-2 focus:ring-[#ae1431]/15";

const labelClass =
  "mb-1.5 block font-rethink text-[11px] uppercase tracking-wide text-[#9a9186]";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelClass}>
        {label} {required && <span className="text-[#ae1431]">*</span>}
      </label>
      {children}
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  index,
  title,
}: {
  icon: React.ElementType;
  index: number;
  title: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f6dde3]">
        <Icon className="h-4 w-4 text-[#ae1431]" strokeWidth={2} />
      </span>
      <h3 className="font-display text-[13px] tracking-wide text-[#2a2420]">
        {index}. {title}
      </h3>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Custom dropdown (matches maroon-highlight design spec)             */
/* ------------------------------------------------------------------ */

function CustomSelect({
  label,
  required,
  value,
  onChange,
  options,
  placeholder = "Select",
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <Field label={label} required={required}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`${inputClass} flex items-center cursor-pointer justify-between text-left font-rethink`}
        >
          <span className={value ? "text-[#2a2420]" : "text-[#9a9186]"}>
            {value || placeholder}
          </span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-[#9a9186] transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </Field>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-2xl bg-white py-2 shadow-2xl ring-1 ring-black/5">
          {options.map((option) => {
            const selected = option === value;
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-3 font-rethink text-sm uppercase tracking-wide transition-colors ${
                  selected
                    ? "bg-[#ae1431] text-white"
                    : "text-[#4a443c] hover:bg-[#f7f2ea]"
                }`}
              >
                {option}
                {selected && <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */

export default function HostEventModal({ isOpen, onClose }: HostEventModalProps) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isOpen) return;
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(cardRef.current, { opacity: 0, y: 24, scale: 0.97 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(overlayRef.current, { opacity: 1, duration: 0.35 }).to(
        cardRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.55 },
        "-=0.2"
      );
    },
    { dependencies: [isOpen] }
  );

  // Lock background page scroll while the modal is open, but let native
  // wheel/touch scrolling work normally *inside* the modal card.
  useEffect(() => {
    if (!isOpen) return;

    const { body } = document;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    // The site uses Lenis for smooth scrolling, which captures wheel events
    // globally and ignores nested overflow containers unless paused.
    const lenis = getLenis();
    lenis?.stop();

    const blockOutsideScroll = (e: WheelEvent | TouchEvent) => {
      const card = cardRef.current;
      if (card && !card.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    document.addEventListener("wheel", blockOutsideScroll, { passive: false });
    document.addEventListener("touchmove", blockOutsideScroll, {
      passive: false,
    });

    return () => {
      body.style.overflow = prevOverflow;
      lenis?.start();
      document.removeEventListener("wheel", blockOutsideScroll);
      document.removeEventListener("touchmove", blockOutsideScroll);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleFacility = (facility: string) => {
    setForm((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!form.agree) return;

  setSubmitting(true);
  try {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/host-event`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Submission failed");

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm(INITIAL_STATE);
      onClose();
    }, 1800);
  } catch (err) {
    console.error(err);
    // TODO: show error toast/message to user
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div
      ref={overlayRef}
      className="fixed inset-x-0 bottom-0 top-[56px] z-[90] flex items-start justify-center bg-black/60 p-4 backdrop-blur-sm sm:top-[64px] sm:items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={cardRef}
        data-lenis-prevent
        className="host-event-modal-scroll relative my-4 max-h-[calc(100dvh-56px-2rem)] w-full max-w-[900px] overflow-y-auto overscroll-contain rounded-[28px] bg-[#f7f2ea] p-8 shadow-2xl sm:my-8 sm:max-h-[calc(100dvh-64px-4rem)] sm:p-10"
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className=" cursor-pointer absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#eae3d8] text-[#2a2420] transition-colors hover:bg-[#e0d7c8]"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>

        {/* Header */}
        <div className="mb-6 flex items-start gap-4 pr-10">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f6dde3]">
            <CalendarDays className="h-6 w-6 text-[#ae1431]" strokeWidth={2} />
          </span>
          <div>
            <h2 className="font-display text-2xl text-[#2a2420] sm:text-3xl">
              Host an Event
            </h2>
            <p className="mt-1 font-rethink text-sm leading-relaxed text-[#8a8074]">
              Planning a sporting event, tournament, training programme or
              community gathering? Share your requirements with us and our
              team will get in touch to discuss availability and arrangements.
            </p>
          </div>
        </div>

        <div className="mb-6 h-px w-full bg-[#e4dcd0]" />

        {submitted ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f6dde3]">
              <CalendarDays className="h-6 w-6 text-[#ae1431]" />
            </span>
            <h3 className="font-display text-xl text-[#2a2420]">
              Enquiry sent!
            </h3>
            <p className="max-w-sm font-rethink text-sm text-[#8a8074]">
              Thanks for reaching out. Our team will get back to you shortly
              to discuss availability and arrangements.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Row 1: Your Details + Preferred Schedule */}
            <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
              {/* Left column: 1 + 2 */}
              <div className="space-y-8">
                <div>
                  <SectionHeader icon={User} index={1} title="YOUR DETAILS" />
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field label="Full Name" required>
                      <input
                        className={inputClass}
                        required
                        value={form.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                      />
                    </Field>
                    <Field label="Organisation / Institution Name">
                      <input
                        className={inputClass}
                        value={form.organisation}
                        onChange={(e) => update("organisation", e.target.value)}
                      />
                    </Field>
                    <Field label="Email Address" required>
                      <input
                        type="email"
                        className={inputClass}
                        required
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                      />
                    </Field>
                    <Field label="Phone Number" required>
                      <input
                        type="tel"
                        className={inputClass}
                        required
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                      />
                    </Field>
                    <div className="sm:col-span-2">
                      <CustomSelect
                        label="Your Role / Designation"
                        value={form.role}
                        onChange={(v) => update("role", v)}
                        placeholder="Select role"
                        options={[
                          "Individual",
                          "Teacher / Coach",
                          "Institution Admin",
                          "Event Organiser",
                          "Other",
                        ]}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <SectionHeader icon={FileText} index={2} title="EVENT DETAILS" />
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Field label="Event Name / Title" required>
                        <input
                          className={inputClass}
                          required
                          value={form.eventName}
                          onChange={(e) => update("eventName", e.target.value)}
                        />
                      </Field>
                    </div>
                    <CustomSelect
                      label="Event Type"
                      required
                      value={form.eventType}
                      onChange={(v) => update("eventType", v)}
                      placeholder="Select type"
                      options={EVENT_TYPES}
                    />
                    <CustomSelect
                      label="Sport / Activity"
                      required
                      value={form.sport}
                      onChange={(v) => update("sport", v)}
                      placeholder="Select sport"
                      options={SPORTS}
                    />
                    <Field label="Expected Number of Participants" required>
                      <input
                        type="number"
                        min={1}
                        className={inputClass}
                        required
                        value={form.expectedParticipants}
                        onChange={(e) =>
                          update("expectedParticipants", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="Expected Audience / Guests (optional)">
                      <input
                        type="number"
                        min={0}
                        className={inputClass}
                        value={form.expectedAudience}
                        onChange={(e) =>
                          update("expectedAudience", e.target.value)
                        }
                      />
                    </Field>
                  </div>
                </div>
              </div>

              {/* Right column: 3 */}
              <div>
                <SectionHeader icon={CalendarDays} index={3} title="PREFERRED SCHEDULE" />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Preferred Date" required>
                    <input
                      type="date"
                      className={inputClass}
                      required
                      value={form.preferredDate}
                      onChange={(e) => update("preferredDate", e.target.value)}
                    />
                  </Field>
                  <Field label="Alternative Date (optional)">
                    <input
                      type="date"
                      className={inputClass}
                      value={form.alternativeDate}
                      onChange={(e) =>
                        update("alternativeDate", e.target.value)
                      }
                    />
                  </Field>
                  <Field label="Start Time" required>
                    <input
                      type="time"
                      className={inputClass}
                      required
                      value={form.startTime}
                      onChange={(e) => update("startTime", e.target.value)}
                    />
                  </Field>
                  <Field label="End Time" required>
                    <input
                      type="time"
                      className={inputClass}
                      required
                      value={form.endTime}
                      onChange={(e) => update("endTime", e.target.value)}
                    />
                  </Field>
                </div>

                <div className="mt-4">
                  <label className={labelClass}>Is this a:</label>
                  <div className="flex flex-wrap gap-4 pt-1">
                    {(
                      [
                        { value: "one-day", label: "One-day Event" },
                        { value: "multi-day", label: "Multi-day Event" },
                        { value: "recurring", label: "Recurring Programme" },
                      ] as { value: EventDuration; label: string }[]
                    ).map((opt) => (
                      <label
                        key={opt.value}
                        className="flex cursor-pointer items-center gap-2 font-rethink text-sm text-[#2a2420]"
                      >
                        <input
                          type="radio"
                          name="duration"
                          value={opt.value}
                          checked={form.duration === opt.value}
                          onChange={() => update("duration", opt.value)}
                          className="h-4 w-4 accent-[#ae1431]"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                {form.duration === "multi-day" && (
                  <div className="mt-4 space-y-3">
                    <Field label="End Date" required>
                      <input
                        type="date"
                        className={inputClass}
                        required
                        value={form.endDate}
                        onChange={(e) => update("endDate", e.target.value)}
                      />
                    </Field>
                    <div className="flex items-start gap-2 rounded-xl bg-[#efe4d3] px-4 py-3">
                      <span className="mt-0.5 text-[#ae1431]">ⓘ</span>
                      <p className="font-rethink text-xs leading-relaxed text-[#7a6f5f]">
                        Since Multi-day Event is selected, our team will
                        confirm the final schedule with you.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="h-px w-full bg-[#e4dcd0]" />

            {/* Row 2: Venue Requirements + Additional Information */}
            <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
              <div>
                <SectionHeader icon={MapPin} index={4} title="VENUE REQUIREMENTS" />
                <label className={labelClass}>
                  Facilities Required <span className="text-[#ae1431]">*</span>
                </label>
                <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
                  {FACILITIES.map((facility) => (
                    <label
                      key={facility}
                      className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-[#e4dcd0] bg-white px-3.5 py-2.5 font-rethink text-sm text-[#2a2420] transition-colors hover:border-[#ae1431]/40"
                    >
                      <input
                        type="checkbox"
                        checked={form.facilities.includes(facility)}
                        onChange={() => toggleFacility(facility)}
                        className="h-4 w-4 accent-[#ae1431]"
                      />
                      {facility}
                    </label>
                  ))}
                </div>

                <div className="mt-4">
                  <Field label="Additional Requirements / Event Details">
                    <textarea
                      rows={3}
                      placeholder="Tell us anything else we should know about your event."
                      className={`${inputClass} resize-none`}
                      value={form.additionalDetails}
                      onChange={(e) =>
                        update("additionalDetails", e.target.value)
                      }
                    />
                  </Field>
                </div>
              </div>

              <div>
                <SectionHeader icon={FileText} index={5} title="ADDITIONAL INFORMATION" />
                <div className="space-y-4">
                  <CustomSelect
                    label="How did you hear about ERAM Sports Arena?"
                    value={form.hearAboutUs}
                    onChange={(v) => update("hearAboutUs", v)}
                    placeholder="Select option"
                    options={[
                      "Social Media",
                      "Friend / Referral",
                      "Google / Search",
                      "Attended an Event Here",
                      "Other",
                    ]}
                  />
                  <Field label="Any specific requests?">
                    <textarea
                      rows={3}
                      placeholder="Let us know if you have any specific requests or notes."
                      className={`${inputClass} resize-none`}
                      value={form.specificRequests}
                      onChange={(e) =>
                        update("specificRequests", e.target.value)
                      }
                    />
                  </Field>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-[#e4dcd0]" />

            {/* Consent + submit */}
            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <label className="flex max-w-md cursor-pointer items-start gap-2.5 font-rethink text-sm text-[#2a2420]">
                <input
                  type="checkbox"
                  required
                  checked={form.agree}
                  onChange={(e) => update("agree", e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[#ae1431]"
                />
                I agree to be contacted by the ERAM Sports Arena team
                regarding this enquiry.
              </label>

              <button
                type="submit"
                disabled={submitting || !form.agree}
                className="flex shrink-0 items-center gap-2 rounded-full bg-[#ae1431] px-7 py-3.5 font-rethink text-sm uppercase tracking-wide text-white transition-colors hover:bg-[#8f0f27] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Event Enquiry"}
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2 text-center">
              <Lock className="h-3.5 w-3.5 text-[#9a9186]" />
              <p className="font-rethink text-xs text-[#9a9186]">
                Your information is safe with us and will only be used to
                respond to your enquiry.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}