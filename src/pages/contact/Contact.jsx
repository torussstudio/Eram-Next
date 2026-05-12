import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin();

// ─── Static data (outside component to avoid re-creation on renders) ───────────

const CONTACT_ITEMS = [
  {
    label: "Address",
    value: "ERAM Sports Arena, Perinthalmanna, Kerala — 679322",
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
    value: "+91 97462 00000",
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
    value: "contact@eramsports.in",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
];

const TEXT_FIELDS = [
  { name: "name",  label: "Full Name",     type: "text",  placeholder: "John Doe" },
  { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
  { name: "phone", label: "Phone Number",  type: "tel",   placeholder: "+91 98765 43210" },
];

const SUBJECT_CHIPS = ["Sports Programs", "Infrastructure", "Events", "Partnerships", "Other"];

const INITIAL_FORM = { name: "", email: "", phone: "", message: "", subject: "" };

// ─── Style tokens ──────────────────────────────────────────────────────────────

const tk = {
  bg:      "#F5EFE8",
  dark:    "#1a1209",
  white:   "#ffffff",
  red:     "#ae1431",
  redDark: "#8f1028",
  text:    "#1a1a1a",
  muted:   "rgba(0,0,0,0.45)",
  border:  "rgba(0,0,0,0.1)",
  serif:   "'Playfair Display', serif",
  sans:    "'Rethink Sans', sans-serif",
};

const labelStyle = {
  display: "block",
  fontSize: 11,
  letterSpacing: "0.09em",
  textTransform: "uppercase",
  color: "rgba(0,0,0,0.4)",
  marginBottom: 8,
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function Field({ name, label, type, placeholder, value, isFocused, onFocus, onBlur, onChange }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "13px 16px",
          borderRadius: 12,
          border: `1.5px solid ${isFocused ? tk.red : tk.border}`,
          background: isFocused ? "#fff9f9" : "#fafafa",
          fontSize: 14,
          color: tk.text,
          outline: "none",
          transition: "border-color 0.2s, background 0.2s",
          fontFamily: tk.sans,
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function ContactItem({ icon, label, value }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div
        style={{
          width: 36, height: 36, borderRadius: 10,
          background: "rgba(255,255,255,0.07)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: tk.red, flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 2 }}>
          {label}
        </p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>
          {value}
        </p>
      </div>
    </div>
  );
}

function SuccessState() {
  return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <div
        style={{
          width: 64, height: 64, borderRadius: "50%",
          background: tk.red, display: "flex",
          alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M6 14l6 6 10-10" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 style={{ fontFamily: tk.serif, fontSize: "1.8rem", fontWeight: 700, color: tk.text, marginBottom: 12, letterSpacing: "-0.02em" }}>
        Message Received
      </h3>
      <p style={{ fontSize: 14, color: tk.muted, lineHeight: 1.7 }}>
        Thank you for reaching out. Our team will
        <br />get back to you within 24 hours.
      </p>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function ContactPage() {
  const pageRef     = useRef(null);
  const outlineRef  = useRef(null);
  const taglineRef  = useRef(null);
  const formCardRef = useRef(null);
  const infoCardRef = useRef(null);
  const dividerRef  = useRef(null);

  const [form, setForm]         = useState(INITIAL_FORM);
  const [focused, setFocused]   = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(() => {
    const letters = outlineRef.current?.querySelectorAll(".c-letter");
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    gsap.set(letters,            { y: "110%", skewX: 4 });
    gsap.set(taglineRef.current, { opacity: 0, y: 18 });
    gsap.set(formCardRef.current,{ opacity: 0, y: 40 });
    gsap.set(infoCardRef.current,{ opacity: 0, y: 40 });
    gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: "left center" });

    tl.to(letters,             { y: "0%", skewX: 0, duration: 0.9, stagger: { each: 0.045 } }, 0)
      .to(taglineRef.current,  { opacity: 1, y: 0, duration: 0.6 }, 0.45)
      .to(dividerRef.current,  { scaleX: 1, duration: 0.7, ease: "expo.out" }, 0.55)
      .to(infoCardRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.62)
      .to(formCardRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.72);
  }, { scope: pageRef });

  const handleChange  = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleChip    = (chip) => setForm((p) => ({ ...p, subject: chip }));
  const handleSubmit  = (e) => { e.preventDefault(); setSubmitted(true); };
  const focusProps    = (name) => ({
    isFocused: focused === name,
    onFocus: () => setFocused(name),
    onBlur:  () => setFocused(null),
  });

  return (
    <div
      ref={pageRef}
      style={{ background: tk.bg, minHeight: "100svh", fontFamily: tk.sans }}
      className="overflow-hidden"
    >
      {/* Top bar */}
      <div
        style={{ borderBottom: `1px solid rgba(0,0,0,0.08)`, padding: "22px 40px" }}
        className="max-[640px]:px-5 max-[640px]:py-4"
      />

      <div style={{ padding: "0 40px 80px", maxWidth: 1400, margin: "0 auto" }} className="max-[640px]:px-5">

        {/* Hero outline word */}
        <div style={{ position: "relative", marginTop: -8, overflow: "hidden" }}>
          <div
            ref={outlineRef}
            style={{
              fontFamily: tk.serif,
              fontSize: "clamp(5.2rem, 13vw, 13rem)",
              fontWeight: 700,
              lineHeight: 0.88,
              letterSpacing: "-0.045em",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(0,0,0,0.18)",
              whiteSpace: "nowrap",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {"CONTACT".split("").map((l, i) => (
              <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                <span className="c-letter" style={{ display: "inline-block" }}>{l}</span>
              </span>
            ))}
          </div>

          <div
            ref={taglineRef}
            style={{ position: "absolute", bottom: 16, right: 0, textAlign: "right" }}
            className="max-[640px]:hidden"
          >
            <p style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: tk.red, marginBottom: 4 }}>
              ERAM Sports Trust
            </p>
            <p style={{ fontSize: 13, color: tk.muted, lineHeight: 1.6 }}>
              We'd love to hear from you.<br />Reach out anytime.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          style={{ height: 1, background: "rgba(0,0,0,0.12)", marginBottom: 48 }}
          className="max-[640px]:mb-8"
        />

        {/* Main grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1.65fr", gap: 24, alignItems: "start" }}
          className="max-[860px]:grid-cols-1"
        >
          {/* Info card */}
          <div ref={infoCardRef}>
            <div
              style={{
                background: tk.dark,
                borderRadius: 28,
                padding: "44px 38px",
                color: tk.white,
                position: "relative",
                overflow: "hidden",
                minHeight: 480,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              className="max-[640px]:rounded-2xl max-[640px]:p-7 max-[640px]:min-h-0"
            >
              {/* Decorative circle */}
              <div style={{
                position: "absolute", top: -60, right: -60,
                width: 240, height: 240, borderRadius: "50%",
                background: "rgba(174,20,49,0.18)",
                pointerEvents: "none",
              }} />

              <div>
                <span style={{
                  display: "inline-block", background: tk.red, color: tk.white,
                  fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
                  padding: "5px 12px", borderRadius: 20, marginBottom: 28,
                }}>
                  Get in Touch
                </span>

                <h2 style={{
                  fontFamily: tk.serif,
                  fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)",
                  fontWeight: 700, lineHeight: 1.2,
                  letterSpacing: "-0.02em", marginBottom: 16,
                }}>
                  Let's build something<br />great together.
                </h2>

                <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", maxWidth: 300 }}>
                  Whether it's about sports programs, infrastructure, events, or partnerships — our team is ready to respond.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 40 }}>
                {CONTACT_ITEMS.map((item) => (
                  <ContactItem key={item.label} {...item} />
                ))}
              </div>
            </div>
          </div>

          {/* Form card */}
          <div ref={formCardRef}>
            <div
              style={{
                background: tk.white,
                borderRadius: 28,
                padding: "44px",
                boxShadow: "0 2px 40px rgba(0,0,0,0.06)",
              }}
              className="max-[640px]:rounded-2xl max-[640px]:p-6"
            >
              {submitted ? (
                <SuccessState />
              ) : (
                <>
                  <div style={{ marginBottom: 36 }}>
                    <h3 style={{
                      fontFamily: tk.serif,
                      fontSize: "clamp(1.5rem, 2.8vw, 2rem)",
                      fontWeight: 700, letterSpacing: "-0.025em",
                      color: tk.text, marginBottom: 8,
                    }}>
                      Send us a message
                    </h3>
                    <p style={{ fontSize: 13.5, color: tk.muted, lineHeight: 1.65 }}>
                      Fill in the form and we'll respond as soon as possible.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Name + Email row */}
                    <div
                      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}
                      className="max-[500px]:grid-cols-1"
                    >
                      {TEXT_FIELDS.slice(0, 2).map((f) => (
                        <Field key={f.name} {...f} value={form[f.name]} onChange={handleChange} {...focusProps(f.name)} />
                      ))}
                    </div>

                    {/* Phone row */}
                    <div style={{ marginBottom: 16 }}>
                      <Field {...TEXT_FIELDS[2]} value={form.phone} onChange={handleChange} {...focusProps("phone")} />
                    </div>

                    {/* Subject chips */}
                    <div style={{ marginBottom: 20 }}>
                      <p style={labelStyle}>Regarding</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {SUBJECT_CHIPS.map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => handleChip(chip)}
                            style={{
                              padding: "7px 16px",
                              borderRadius: 20,
                              border: `1px solid ${form.subject === chip ? tk.red : "rgba(0,0,0,0.13)"}`,
                              background: form.subject === chip ? tk.red : "transparent",
                              color: form.subject === chip ? tk.white : "rgba(0,0,0,0.6)",
                              fontSize: 12.5,
                              cursor: "pointer",
                              transition: "all 0.18s ease",
                              letterSpacing: "0.01em",
                            }}
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div style={{ marginBottom: 28 }}>
                      <label style={labelStyle}>Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        placeholder="Tell us about your query..."
                        rows={5}
                        style={{
                          width: "100%",
                          padding: "14px 16px",
                          borderRadius: 14,
                          border: `1.5px solid ${focused === "message" ? tk.red : tk.border}`,
                          background: focused === "message" ? "#fff9f9" : "#fafafa",
                          fontSize: 14,
                          color: tk.text,
                          outline: "none",
                          resize: "none",
                          transition: "border-color 0.2s, background 0.2s",
                          fontFamily: tk.sans,
                          boxSizing: "border-box",
                          lineHeight: 1.65,
                        }}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      style={{
                        width: "100%",
                        padding: "16px 32px",
                        background: tk.red,
                        color: tk.white,
                        border: "none",
                        borderRadius: 14,
                        fontSize: 14,
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        cursor: "pointer",
                        fontFamily: tk.sans,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        transition: "background 0.2s, transform 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = tk.redDark)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = tk.red)}
                      onMouseDown={(e)  => (e.currentTarget.style.transform = "scale(0.98)")}
                      onMouseUp={(e)    => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 8h12M9 4l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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