import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Properties", "About", "Services", "Testimonials", "Contact"];

const PROPERTIES = [
  {
    id: 1,
    title: "The Meridian Penthouse",
    location: "Victoria Island, Lagos",
    price: "₦485,000,000",
    beds: 4,
    baths: 5,
    sqft: "6,200",
    type: "Penthouse",
    tag: "Featured",
    tagColor: "#C9A96E",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    id: 2,
    title: "Lekki Garden Estate",
    location: "Lekki Phase 1, Lagos",
    price: "₦210,000,000",
    beds: 5,
    baths: 4,
    sqft: "4,800",
    type: "Detached Villa",
    tag: "New",
    tagColor: "#4D8C6F",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    id: 3,
    title: "The Monarch Residences",
    location: "Ikoyi, Lagos",
    price: "₦320,000,000",
    beds: 3,
    baths: 3,
    sqft: "3,500",
    type: "Luxury Apartment",
    tag: "Exclusive",
    tagColor: "#7B5EA7",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  },
  {
    id: 4,
    title: "Seaside Court Duplex",
    location: "Oniru, Lagos",
    price: "₦175,000,000",
    beds: 4,
    baths: 4,
    sqft: "3,900",
    type: "Duplex",
    tag: "For Sale",
    tagColor: "#B04A3A",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  },
];

const STATS = [
  { value: "1,240+", label: "Properties Sold" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "18", label: "Years of Excellence" },
  { value: "₦2.4B+", label: "Transactions Closed" },
];

const SERVICES = [
  {
    icon: "🏛",
    title: "Premium Listings",
    desc: "Handpicked luxury properties across Lagos's most prestigious addresses.",
  },
  {
    icon: "📋",
    title: "Property Management",
    desc: "Full-service management so your investment performs while you live your life.",
  },
  {
    icon: "🤝",
    title: "Expert Negotiation",
    desc: "Our seasoned agents secure the best terms — for buyers and sellers alike.",
  },
  {
    icon: "📊",
    title: "Investment Advisory",
    desc: "Data-backed insights to help you grow a profitable real estate portfolio.",
  },
  {
    icon: "⚖️",
    title: "Legal & Documentation",
    desc: "End-to-end title verification, C of O processing, and legal due diligence.",
  },
  {
    icon: "🔑",
    title: "Relocation Services",
    desc: "Seamless local and international relocation — from search to key handover.",
  },
];

const TESTIMONIALS = [
  {
    name: "Chukwuemeka Obi",
    role: "CEO, Obi Capital",
    quote:
      "Atharry Home found us a penthouse in Ikoyi that exceeded every expectation. Their discretion and attention to detail are world-class.",
    avatar: "CO",
    color: "#C9A96E",
  },
  {
    name: "Dr. Funmi Adeyemi",
    role: "Medical Director",
    quote:
      "From the first call to key collection, the process was flawless. I felt guided, not pressured. Truly a premium experience.",
    avatar: "FA",
    color: "#4D8C6F",
  },
  {
    name: "Bola & Temi Fashola",
    role: "Family Clients",
    quote:
      "They understood exactly what we wanted for our family home. The negotiation saved us over ₦12 million. Exceptional team.",
    avatar: "BF",
    color: "#7B5EA7",
  },
];

const FILTER_TABS = ["All", "For Sale", "Penthouse", "Villa", "Apartment"];

function useOnScreen(ref) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return isVisible;
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function PropertyCard({ p, idx }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const visible = useOnScreen(ref);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: hovered
          ? "0 24px 60px rgba(30,20,10,0.18)"
          : "0 4px 24px rgba(30,20,10,0.08)",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        transform: visible
          ? hovered
            ? "translateY(-8px)"
            : "translateY(0)"
          : "translateY(48px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${idx * 80}ms`,
        cursor: "pointer",
      }}
    >
      <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
        <img
          src={p.img}
          alt={p.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.6s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(10,8,5,0.55) 0%, transparent 60%)",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            background: p.tagColor,
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            padding: "4px 12px",
            borderRadius: 20,
            textTransform: "uppercase",
          }}
        >
          {p.tag}
        </span>
        <span
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(6px)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 500,
            padding: "4px 12px",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          {p.type}
        </span>
        <div style={{ position: "absolute", bottom: 14, left: 16, right: 16 }}>
          <p style={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{p.title}</p>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, margin: "4px 0 0" }}>📍 {p.location}</p>
        </div>
      </div>
      <div style={{ padding: "20px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#1A1208" }}>{p.price}</span>
        </div>
        <div style={{ display: "flex", gap: 20, borderTop: "1px solid #F0EBE0", paddingTop: 14 }}>
          {[
            { icon: "🛏", val: p.beds, lbl: "Beds" },
            { icon: "🚿", val: p.baths, lbl: "Baths" },
            { icon: "📐", val: p.sqft, lbl: "sqft" },
          ].map((i) => (
            <div key={i.lbl} style={{ textAlign: "center", flex: 1 }}>
              <p style={{ fontSize: 13, color: "#9A8A6A", margin: 0 }}>{i.icon} {i.lbl}</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#3A2C14", margin: "3px 0 0" }}>{i.val}</p>
            </div>
          ))}
        </div>
        <button
          style={{
            marginTop: 18,
            width: "100%",
            padding: "12px 0",
            borderRadius: 10,
            border: "1.5px solid #C9A96E",
            background: hovered ? "#C9A96E" : "transparent",
            color: hovered ? "#fff" : "#C9A96E",
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: "0.04em",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          View Property →
        </button>
      </div>
    </div>
  );
}

export default function AtharryHome() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", interest: "", message: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredProps = activeFilter === "All"
    ? PROPERTIES
    : PROPERTIES.filter((p) =>
        p.tag === activeFilter || p.type.toLowerCase().includes(activeFilter.toLowerCase())
      );

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FDFAF5", color: "#1A1208", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(253,250,245,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,169,110,0.2)" : "none",
        transition: "all 0.4s ease",
        padding: "0 5%",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 76 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, background: "#C9A96E", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 18 }}>A</span>
            </div>
            <div>
              <p style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: scrolled ? "#1A1208" : "#fff", lineHeight: 1 }}>Atharrys</p>
              <p style={{ margin: 0, fontSize: 10, letterSpacing: "0.22em", color: scrolled ? "#C9A96E" : "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>Home</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{
                fontSize: 14, fontWeight: 500, color: scrolled ? "#3A2C14" : "rgba(255,255,255,0.88)",
                textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.2s",
                display: window.innerWidth < 768 ? "none" : "block",
              }}>
                {l}
              </a>
            ))}
            <a href="#contact" style={{
              background: "#C9A96E", color: "#fff", padding: "10px 22px", borderRadius: 8,
              textDecoration: "none", fontSize: 14, fontWeight: 600, letterSpacing: "0.03em",
              transition: "background 0.2s",
            }}>
              Book Consultation
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", height: "100vh", minHeight: 680, display: "flex", alignItems: "center" }}>
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: "linear-gradient(135deg, #0D0A04 0%, #2C1E08 60%, #1A1208 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 1, overflow: "hidden",
          backgroundImage: "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80')",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.28,
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 200, zIndex: 2,
          background: "linear-gradient(to top, #FDFAF5, transparent)",
        }} />

        <div style={{ position: "relative", zIndex: 3, maxWidth: 1280, margin: "0 auto", padding: "0 5%", width: "100%" }}>
          <div style={{ maxWidth: 740 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28,
              background: "rgba(201,169,110,0.18)", border: "1px solid rgba(201,169,110,0.35)",
              borderRadius: 30, padding: "6px 18px",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A96E", display: "inline-block" }} />
              <span style={{ color: "#C9A96E", fontSize: 12, letterSpacing: "0.14em", fontWeight: 500, textTransform: "uppercase" }}>
                Lagos's Premier Real Estate
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(44px, 7vw, 82px)",
              fontWeight: 800,
              color: "#FDFAF5",
              lineHeight: 1.08,
              margin: "0 0 24px",
            }}>
              Where Luxury<br />
              <em style={{ color: "#C9A96E", fontStyle: "italic" }}>Finds Home</em>
            </h1>
            <p style={{ color: "rgba(253,250,245,0.65)", fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 300, lineHeight: 1.7, marginBottom: 44, maxWidth: 560 }}>
              s Home curates extraordinary properties across Lagos — crafted for those who refuse to compromise on elegance.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="#properties" style={{
                background: "#C9A96E", color: "#fff", padding: "16px 36px",
                borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 15,
                letterSpacing: "0.03em", display: "inline-flex", alignItems: "center", gap: 8,
              }}>
                Explore Properties <span>→</span>
              </a>
              <a href="#services" style={{
                background: "rgba(255,255,255,0.1)", color: "#FDFAF5",
                border: "1px solid rgba(255,255,255,0.25)",
                padding: "16px 36px", borderRadius: 10, textDecoration: "none",
                fontWeight: 500, fontSize: 15, backdropFilter: "blur(8px)",
              }}>
                Our Services
              </a>
            </div>
          </div>
        </div>

        {/* Floating stats strip */}
        <div style={{
          position: "absolute", bottom: 36, right: "5%", zIndex: 3,
          background: "rgba(253,250,245,0.95)", backdropFilter: "blur(12px)",
          borderRadius: 16, padding: "20px 32px",
          display: "flex", gap: 40, boxShadow: "0 8px 40px rgba(30,20,10,0.18)",
          border: "1px solid rgba(201,169,110,0.2)",
        }}>
          {STATS.slice(0, 3).map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#C9A96E", margin: 0, lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: 11, color: "#9A8A6A", margin: "5px 0 0", letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEARCH BAR */}
      <section style={{ background: "#fff", padding: "0 5%", boxShadow: "0 2px 24px rgba(30,20,10,0.07)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 0", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          {[
            { label: "Location", placeholder: "Lagos, Nigeria" },
            { label: "Property Type", placeholder: "Any Type" },
            { label: "Price Range", placeholder: "Any Budget" },
          ].map((f) => (
            <div key={f.label} style={{ flex: 1, minWidth: 180 }}>
              <label style={{ fontSize: 11, color: "#9A8A6A", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 4 }}>{f.label}</label>
              <input
                placeholder={f.placeholder}
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #EAE0CC",
                  fontSize: 14, color: "#3A2C14", background: "#FDFAF5",
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
          ))}
          <button style={{
            background: "#C9A96E", color: "#fff", border: "none",
            padding: "14px 32px", borderRadius: 8, fontWeight: 600,
            fontSize: 15, cursor: "pointer", whiteSpace: "nowrap", marginTop: 18,
          }}>
            Search Properties
          </button>
        </div>
      </section>

      {/* PROPERTIES */}
      <section id="properties" style={{ padding: "100px 5%" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 48 }}>
              <div>
                <p style={{ fontSize: 12, color: "#C9A96E", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 10px" }}>CURATED SELECTION</p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, margin: 0, color: "#1A1208", lineHeight: 1.15 }}>
                  Featured Properties
                </h2>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {FILTER_TABS.map((t) => (
                  <button key={t} onClick={() => setActiveFilter(t)} style={{
                    padding: "8px 20px", borderRadius: 24, fontSize: 13, fontWeight: 500, cursor: "pointer",
                    border: activeFilter === t ? "none" : "1px solid #EAE0CC",
                    background: activeFilter === t ? "#C9A96E" : "#fff",
                    color: activeFilter === t ? "#fff" : "#6A5A3A",
                    transition: "all 0.25s ease",
                  }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28 }}>
            {(filteredProps.length ? filteredProps : PROPERTIES).map((p, i) => (
              <PropertyCard key={p.id} p={p} idx={i} />
            ))}
          </div>

          <AnimatedSection delay={200}>
            <div style={{ textAlign: "center", marginTop: 52 }}>
              <a href="#" style={{
                display: "inline-block", border: "1.5px solid #C9A96E", color: "#C9A96E",
                padding: "14px 42px", borderRadius: 10, textDecoration: "none",
                fontWeight: 600, fontSize: 15, letterSpacing: "0.04em",
              }}>
                View All Properties →
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: "#1A1208", padding: "100px 5%", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: -80, right: -80, width: 400, height: 400,
          borderRadius: "50%", border: "1px solid rgba(201,169,110,0.12)",
        }} />
        <div style={{
          position: "absolute", bottom: -120, left: -60, width: 500, height: 500,
          borderRadius: "50%", border: "1px solid rgba(201,169,110,0.08)",
        }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <AnimatedSection>
            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1560185009-dddecae67ce0?w=800&q=80"
                alt="s team"
                style={{ width: "100%", borderRadius: 16, objectFit: "cover", height: 520 }}
              />
              <div style={{
                position: "absolute", bottom: -28, right: -28,
                background: "#C9A96E", borderRadius: 14, padding: "24px 32px",
                boxShadow: "0 16px 48px rgba(201,169,110,0.4)",
              }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1 }}>18</p>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, margin: "4px 0 0", letterSpacing: "0.06em", textTransform: "uppercase" }}>Years of Trust</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <p style={{ fontSize: 12, color: "#C9A96E", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 16px" }}>OUR STORY</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 3.5vw, 48px)", fontWeight: 700, color: "#FDFAF5", lineHeight: 1.18, margin: "0 0 24px" }}>
              Built on Trust,<br />Driven by Elegance
            </h2>
            <p style={{ color: "rgba(253,250,245,0.6)", fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
              Founded in 2006, s Home has grown into Lagos's most trusted name in luxury real estate. We don't just sell properties — we help discerning clients find sanctuaries that reflect their ambition and lifestyle.
            </p>
            <p style={{ color: "rgba(253,250,245,0.6)", fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>
              Our team of 40+ certified professionals brings unmatched market knowledge, negotiation mastery, and a deeply personal approach to every transaction.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 40 }}>
              {STATS.map((s) => (
                <div key={s.label} style={{ background: "rgba(201,169,110,0.1)", borderRadius: 12, padding: "20px 24px", border: "1px solid rgba(201,169,110,0.15)" }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#C9A96E", margin: 0 }}>{s.value}</p>
                  <p style={{ color: "rgba(253,250,245,0.55)", fontSize: 13, margin: "4px 0 0" }}>{s.label}</p>
                </div>
              ))}
            </div>

            <a href="#contact" style={{
              display: "inline-block", background: "#C9A96E", color: "#fff",
              padding: "15px 36px", borderRadius: 10, textDecoration: "none",
              fontWeight: 600, fontSize: 15,
            }}>
              Meet Our Team →
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "100px 5%" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: 12, color: "#C9A96E", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 12px" }}>WHAT WE OFFER</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, margin: 0, color: "#1A1208" }}>
                Full-Spectrum Services
              </h2>
              <p style={{ color: "#9A8A6A", fontSize: 17, marginTop: 16, maxWidth: 520, margin: "16px auto 0", lineHeight: 1.7 }}>
                From first viewing to final signature — we handle every detail with precision.
              </p>
            </div>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28 }}>
            {SERVICES.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 60}>
                <ServiceCard s={s} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ background: "#F5EDD9", padding: "100px 5%" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: 12, color: "#C9A96E", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 12px" }}>CLIENT VOICES</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, margin: 0, color: "#1A1208" }}>
                What Our Clients Say
              </h2>
            </div>
          </AnimatedSection>

          <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", minHeight: 240 }}>
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                style={{
                  position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center",
                  textAlign: "center", padding: "48px 40px",
                  background: "#fff", borderRadius: 20,
                  boxShadow: "0 8px 48px rgba(30,20,10,0.1)",
                  opacity: activeTestimonial === i ? 1 : 0,
                  transform: activeTestimonial === i ? "scale(1)" : "scale(0.96)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                  pointerEvents: activeTestimonial === i ? "auto" : "none",
                }}
              >
                <div style={{
                  width: 60, height: 60, borderRadius: "50%", background: t.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: 20,
                }}>
                  {t.avatar}
                </div>
                <p style={{
                  fontFamily: "'Playfair Display', serif", fontSize: "clamp(16px, 2vw, 20px)",
                  fontStyle: "italic", color: "#3A2C14", lineHeight: 1.7, margin: "0 0 24px",
                }}>
                  "{t.quote}"
                </p>
                <p style={{ fontWeight: 600, color: "#1A1208", margin: 0, fontSize: 16 }}>{t.name}</p>
                <p style={{ color: "#9A8A6A", margin: "4px 0 0", fontSize: 13 }}>{t.role}</p>
              </div>
            ))}
            <div style={{ visibility: "hidden", padding: "48px 40px" }}>
              <div style={{ height: 60, marginBottom: 20 }} />
              <p style={{ fontSize: 20, lineHeight: 1.7, margin: "0 0 24px" }}>placeholder for height</p>
              <p style={{ fontSize: 16 }}>name</p>
              <p style={{ fontSize: 13 }}>role</p>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 32 }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{
                width: activeTestimonial === i ? 32 : 10,
                height: 10, borderRadius: 5, border: "none",
                background: activeTestimonial === i ? "#C9A96E" : "#D4C4A0",
                cursor: "pointer", transition: "all 0.3s ease",
                padding: 0,
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{
        background: "linear-gradient(135deg, #1A1208, #3A2008)",
        padding: "80px 5%", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: 600, height: 600, borderRadius: "50%",
          border: "1px solid rgba(201,169,110,0.1)",
          pointerEvents: "none",
        }} />
        <AnimatedSection>
          <p style={{ fontSize: 12, color: "#C9A96E", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 16px" }}>READY TO BEGIN?</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4.5vw, 58px)", color: "#FDFAF5", fontWeight: 700, lineHeight: 1.15, margin: "0 0 20px" }}>
            Your Dream Home<br />Is One Call Away
          </h2>
          <p style={{ color: "rgba(253,250,245,0.55)", fontSize: 17, maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Let our experts guide you to the perfect property. No pressure, just expertise.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#contact" style={{
              background: "#C9A96E", color: "#fff", padding: "16px 40px",
              borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 15,
            }}>
              Book a Free Consultation
            </a>
            <a href="tel:+234800000000" style={{
              background: "transparent", color: "#C9A96E",
              border: "1.5px solid #C9A96E",
              padding: "16px 40px", borderRadius: 10, textDecoration: "none",
              fontWeight: 600, fontSize: 15,
            }}>
              📞 Call Us Now
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 5%", background: "#FDFAF5" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <AnimatedSection>
            <p style={{ fontSize: 12, color: "#C9A96E", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 12px" }}>GET IN TOUCH</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 3.5vw, 48px)", fontWeight: 700, color: "#1A1208", margin: "0 0 20px", lineHeight: 1.2 }}>
              Start Your Property Journey
            </h2>
            <p style={{ color: "#9A8A6A", fontSize: 16, lineHeight: 1.8, marginBottom: 40 }}>
              Fill in the form and one of our specialist consultants will reach out within 24 hours to understand your needs.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: "📍", label: "Head Office", val: "5 Admiralty Way, Lekki Phase 1, Lagos" },
                { icon: "📞", label: "Phone", val: "+234 800 000 0000" },
                { icon: "✉️", label: "Email", val: "hello@shome.com" },
                { icon: "🕐", label: "Hours", val: "Mon–Fri: 8am – 6pm | Sat: 9am – 4pm" },
              ].map((c) => (
                <div key={c.label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    width: 44, height: 44, background: "#F5EDD9", borderRadius: 10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, flexShrink: 0,
                  }}>
                    {c.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: "#9A8A6A", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>{c.label}</p>
                    <p style={{ fontSize: 15, color: "#3A2C14", fontWeight: 500, margin: "3px 0 0" }}>{c.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <div style={{
              background: "#fff", borderRadius: 20, padding: "40px 36px",
              boxShadow: "0 8px 48px rgba(30,20,10,0.09)",
              border: "1px solid #EAE0CC",
            }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#1A1208", margin: "0 0 28px" }}>
                Send Us a Message
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { id: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                  { id: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                  { id: "phone", label: "Phone Number", type: "tel", placeholder: "+234 XXX XXX XXXX" },
                ].map((f) => (
                  <div key={f.id}>
                    <label style={{ fontSize: 12, color: "#9A8A6A", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 6 }}>{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={formData[f.id]}
                      onChange={(e) => setFormData({ ...formData, [f.id]: e.target.value })}
                      style={{
                        width: "100%", padding: "12px 16px", borderRadius: 10,
                        border: "1px solid #EAE0CC", fontSize: 15, color: "#3A2C14",
                        background: "#FDFAF5", outline: "none", boxSizing: "border-box",
                        transition: "border-color 0.2s",
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 12, color: "#9A8A6A", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 6 }}>I Am Interested In</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    style={{
                      width: "100%", padding: "12px 16px", borderRadius: 10,
                      border: "1px solid #EAE0CC", fontSize: 15, color: "#3A2C14",
                      background: "#FDFAF5", outline: "none", boxSizing: "border-box",
                    }}
                  >
                    <option value="">Select an option</option>
                    <option>Buying a Property</option>
                    <option>Selling a Property</option>
                    <option>Property Investment</option>
                    <option>Property Management</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "#9A8A6A", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 6 }}>Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your needs..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: "100%", padding: "12px 16px", borderRadius: 10,
                      border: "1px solid #EAE0CC", fontSize: 15, color: "#3A2C14",
                      background: "#FDFAF5", outline: "none", resize: "vertical",
                      boxSizing: "border-box", fontFamily: "inherit",
                    }}
                  />
                </div>
                <button style={{
                  width: "100%", background: "#C9A96E", color: "#fff",
                  border: "none", padding: "16px", borderRadius: 10,
                  fontWeight: 600, fontSize: 16, cursor: "pointer",
                  letterSpacing: "0.03em",
                }}>
                  Send Message →
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0D0A04", padding: "60px 5% 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, background: "#C9A96E", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 17 }}>A</span>
                </div>
                <div>
                  <p style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 17, color: "#FDFAF5", lineHeight: 1 }}>s Home</p>
                  <p style={{ margin: 0, fontSize: 9, letterSpacing: "0.2em", color: "#C9A96E", textTransform: "uppercase" }}>Premium Real Estate</p>
                </div>
              </div>
              <p style={{ color: "rgba(253,250,245,0.45)", fontSize: 14, lineHeight: 1.8, maxWidth: 280 }}>
                Lagos's most trusted luxury real estate company, delivering extraordinary homes to extraordinary people since 2006.
              </p>
            </div>
            {[
              { heading: "Company", links: ["About Us", "Our Team", "Careers", "Press"] },
              { heading: "Services", links: ["Buy a Property", "Sell a Property", "Property Management", "Investment Advisory"] },
              { heading: "Contact", links: ["Lagos Office", "+234 800 000 0000", "hello@shome.com", "Mon–Sat 8am–6pm"] },
            ].map((col) => (
              <div key={col.heading}>
                <p style={{ color: "#C9A96E", fontWeight: 600, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 16px" }}>{col.heading}</p>
                {col.links.map((l) => (
                  <a key={l} href="#" style={{ display: "block", color: "rgba(253,250,245,0.45)", fontSize: 14, textDecoration: "none", marginBottom: 10, lineHeight: 1.5 }}>
                    {l}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(201,169,110,0.15)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ color: "rgba(253,250,245,0.35)", fontSize: 13, margin: 0 }}>© 2026 s Home. All rights reserved.</p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
                <a key={l} href="#" style={{ color: "rgba(253,250,245,0.35)", fontSize: 13, textDecoration: "none" }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ s }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#1A1208" : "#fff",
        border: `1.5px solid ${hovered ? "#C9A96E" : "#EAE0CC"}`,
        borderRadius: 16, padding: "32px 28px",
        transition: "all 0.35s ease",
        cursor: "pointer",
        boxShadow: hovered ? "0 16px 48px rgba(30,20,10,0.16)" : "none",
      }}
    >
      <div style={{
        width: 52, height: 52, background: hovered ? "rgba(201,169,110,0.15)" : "#F5EDD9",
        borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, marginBottom: 20, transition: "background 0.3s",
      }}>
        {s.icon}
      </div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: hovered ? "#FDFAF5" : "#1A1208", margin: "0 0 12px", transition: "color 0.3s" }}>
        {s.title}
      </h3>
      <p style={{ color: hovered ? "rgba(253,250,245,0.6)" : "#9A8A6A", fontSize: 15, lineHeight: 1.7, margin: 0, transition: "color 0.3s" }}>
        {s.desc}
      </p>
      {hovered && (
        <p style={{ color: "#C9A96E", fontSize: 14, fontWeight: 600, marginTop: 16, marginBottom: 0 }}>
          Learn more →
        </p>
      )}
    </div>
  );
}
