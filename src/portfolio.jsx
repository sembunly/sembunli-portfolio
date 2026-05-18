import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import profileImg from "./assets/me.png";
import profileImgMobile from "./assets/me2.png";
import calculatorImg from "./assets/calculator.png";
import ecomImg from "./assets/ecom.jpg";
import fashtionImg from "./assets/fashion-shopping.jpg";

const COLORS = {
  bg: "#000000",
  surface: "#080808",
  card: "#0d0d0d",
  border: "#1a1a1a",
  accent: "#4df0c0",
  accent2: "#4db8f0",
  accent3: "#f0c04d",
  text: "#dce4f0",
  muted: "#5a6478",
  white: "#f0f4ff",
};

const skills = [
  {
    icon: "💻",
    title: "Frontend Development",
    desc: "Building performant, pixel-perfect interfaces. Clean, maintainable code with thoughtful micro-interactions that elevate user experience.",
    tags: ["HTML/CSS", "JavaScript", "React", "Tailwind"],
    color: COLORS.accent,
  },
  {
    icon: "⚙️",
    title: "Backend Development",
    desc: "Building scalable and efficient server-side applications, designing RESTful APIs, and managing databases to support reliable systems.",
    tags: ["Laravel", "REST API", "MySQL", "PHP"],
    color: COLORS.accent2,
  },
  {
    icon: "📱",
    title: "Mobile Development",
    desc: "Developing cross-platform mobile applications using Flutter, focusing on responsive UI, navigation, and basic app functionality.",
    tags: ["Flutter", "Dart", "UI Widgets", "Mobile Apps"],
    color: COLORS.accent3,
  },
  {
    icon: "🔧",
    title: "Tools",
    desc: "Proficient in using various development tools and technologies to enhance productivity and code quality.",
    tags: ["Git", "GitHub", "VS Code", "Visual Studio", "Postman"],
    color: COLORS.accent,
  },
];

const projects = [
  {
    num: "01",
    name: "Calculator",
    desc: "A mobile-style calculator built with React, featuring a phone-like UI and basic arithmetic operations.",
    type: "JavaScript",
    year: "2025",
    color: COLORS.accent,
    img: calculatorImg,
    imgAlt: "Calculator app UI",
    path: "/project/calculator",
  },
  {
    num: "02",
    name: "E-commerce Management System",
    desc: "A Laravel + MySQL based e-commerce management system with product CRUD, order processing, and admin dashboards.",
    type: "Laravel / MySQL",
    year: "2026",
    color: COLORS.accent2,
    img: ecomImg,
    imgAlt: "UI design mockup on screen",
    link: "https://github.com/sembunly/laptop-store",
  },
    {
    num: "03",
    name: "Fashtion E-commerce",
    desc: "A modern e-commerce platform for fashion products, featuring a sleek design and seamless shopping experience.",
    type: "React / Tailwind",
    year: "2026",
    color: COLORS.accent3,
    img: fashtionImg,
    imgAlt: "UI design mockup on screen",
    link: "https://seven8-shop.vercel.app/",
  },
];

const contacts = [
  {
    icon: "mail",
    label: "Email",
    value: "sembunly2005@gmail.com",
    href: "mailto:sembunly2005@gmail.com",
    target: "_blank",
  },
  {
    icon: "code",
    label: "GitHub",
    value: "github.com/sembunly",
    href: "https://github.com/sembunly",
    target: "_blank",
  },
  {
    icon: "link",
    label: "LinkedIn",
    value: "linkedin.com/in/sembunly",
    href: "https://www.linkedin.com/in/sembunly/",
    target: "_blank",
  },
  {
    icon: "public",
    label: "Facebook",
    value: "facebook.com/sem.bunlisem.14jan",
    href: "https://www.facebook.com/sem.bunlisem.14jan",
    target: "_blank",
  },
];

/* ── Hooks ── */
// Ref-based mouse position — zero re-renders, RAF-driven DOM updates only
function useMousePosition() {
  const posRef = useRef({ x: -100, y: -100 });
  useEffect(() => {
    const h = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return posRef; // consumers read posRef.current inside RAF loops
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useScrollDirection() {
  const [dir, setDir] = useState("up");
  const lastScroll = useRef(0);
  useEffect(() => {
    const h = () => {
      const current = window.scrollY;
      if (current < 10) {
        setDir("up");
        return;
      }
      if (current > lastScroll.current && current > 100) setDir("down");
      else if (current < lastScroll.current) setDir("up");
      lastScroll.current = current;
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return dir;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth <= 768);
    h();
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return isMobile;
}

/* ── Cursor ── */
function Cursor({ mouseRef }) {
  const dotEl = useRef(null);
  const ringEl = useRef(null);
  const ring = useRef({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const rafRef = useRef();

  useEffect(() => {
    const handleMouseOver = (e) => {
      const isInteractive = !!e.target.closest(
        'a, button, [role="button"], .interactive, [onmouseenter]',
      );
      setHovered(isInteractive);
    };
    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  useEffect(() => {
    const animate = () => {
      const { x, y } = mouseRef.current;
      // dot snaps instantly
      if (dotEl.current) {
        dotEl.current.style.left = x + "px";
        dotEl.current.style.top = y + "px";
      }
      // ring lags behind smoothly
      ring.current.x += (x - ring.current.x) * 0.1;
      ring.current.y += (y - ring.current.y) * 0.1;
      if (ringEl.current) {
        ringEl.current.style.left = ring.current.x + "px";
        ringEl.current.style.top = ring.current.y + "px";
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mouseRef]);

  return (
    <>
      <div
        ref={dotEl}
        className="cursor-el"
        style={{
          position: "fixed",
          width: 8,
          height: 8,
          background: COLORS.accent,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transform: `translate(-50%,-50%) scale(${hovered ? 0 : 1})`,
          opacity: hovered ? 0 : 1,
          mixBlendMode: "difference",
          transition: "transform 0.3s ease, opacity 0.3s ease",
        }}
      />
      <div
        ref={ringEl}
        className="cursor-el"
        style={{
          position: "fixed",
          width: 32,
          height: 32,
          border: `1px solid ${COLORS.accent}`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transform: `translate(-50%,-50%) scale(${hovered ? 2.5 : 1})`,
          opacity: hovered ? 0.2 : 0.45,
          transition:
            "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
        }}
      />
    </>
  );
}

/* ── FadeIn wrapper ── */
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.85s ${delay}s ease, transform 0.85s ${delay}s ease`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Animated counter ── */
function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    if (isNaN(target)) {
      setVal(target);
      return;
    }
    let start = 0;
    const step = () => {
      start += Math.ceil((target - start) / 8) || 1;
      setVal(start);
      if (start < target) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return (
    <span ref={ref}>
      {isNaN(target) ? target : val}
      {suffix}
    </span>
  );
}

/* ── Marquee ── */
function Marquee() {
  const items = [
    "C#",
    "C++",
    "PHP",
    "JavaScript",
    "Laravel",
    "REST API",
    "MSSQL",
    "MySQL",
    "Git",
    "GitHub",
    "GitLab",
    "Postman",
    "Visual Studio",
  ];

  const doubled = [...items, ...items];

  const COLORS = {
    accent: "#4DF0C0",
    bg: "#050816",
    muted: "#94A3B8",
  };

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        borderTop: `1px solid ${COLORS.accent}40`,
        borderBottom: `1px solid ${COLORS.accent}40`,
        background: COLORS.bg,
        padding: "16px 0",
        position: "relative",
        zIndex: 10,
      }}
    >
      <style>
        {`
          @keyframes marqueeScroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .marquee-track {
            width: max-content;
            display: flex;
            align-items: center;
            white-space: nowrap;
            animation: marqueeScroll 18s linear infinite;
          }

          .marquee-track:hover {
            animation-play-state: paused;
          }

          @media (max-width: 768px) {
            .marquee-track {
              animation-duration: 12s;
            }
          }
        `}
      </style>

      {/* Fade Left */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "80px",
          background: `linear-gradient(to right, ${COLORS.bg}, transparent)`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Fade Right */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "80px",
          background: `linear-gradient(to left, ${COLORS.bg}, transparent)`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "26px",
              padding: "0 28px",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "clamp(12px, 1vw, 14px)",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: COLORS.muted,
                textTransform: "uppercase",
              }}
            >
              {item}
            </span>

            <span
              style={{
                color: COLORS.accent,
                fontSize: 16,
                opacity: 0.9,
              }}
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Nav ── */
function Nav({ scrollY }) {
  const sections = ["about", "skills", "projects", "contact"];
  const dir = useScrollDirection();
  const isMobile = useIsMobile();

  const [menuOpen, setMenuOpen] = useState(false);

  const scrolled = scrollY > 60;
  const isHidden = isMobile && dir === "down" && !menuOpen;

  const COLORS = {
    accent: "#4DF0C0",
    muted: "#B5B5B5",
    white: "#FFFFFF",
    border: "rgba(255,255,255,0.08)",
    bg: "#050816",
  };

  return (
    <>
      <nav
        className="nav-container"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "18px 20px" : "22px 56px",
          borderBottom: `1px solid ${
            scrolled ? COLORS.border : "transparent"
          }`,
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          background: scrolled
            ? "rgba(5,8,22,0.88)"
            : "rgba(5,8,22,0.2)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: isHidden ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isMobile ? 24 : 28,
            letterSpacing: "0.12em",
            color: COLORS.accent,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          SEM BUNLY
        </a>

        {/* Desktop Menu */}
        {!isMobile && (
          <div
            className="nav-links"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 36,
            }}
          >
            {sections.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: COLORS.muted,
                  textDecoration: "none",
                  transition: "0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = COLORS.accent;
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = COLORS.muted;
                  e.target.style.transform = "translateY(0)";
                }}
              >
                {s}
              </a>
            ))}
          </div>
        )}

        {/* Mobile Button */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              border: `1px solid ${COLORS.border}`,
              background: "rgba(255,255,255,0.04)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            <span
              style={{
                width: 18,
                height: 2,
                background: COLORS.white,
                borderRadius: 10,
                transform: menuOpen
                  ? "rotate(45deg) translateY(5px)"
                  : "rotate(0)",
                transition: "0.3s",
              }}
            />
            <span
              style={{
                width: 18,
                height: 2,
                background: COLORS.white,
                borderRadius: 10,
                opacity: menuOpen ? 0 : 1,
                transition: "0.3s",
              }}
            />
            <span
              style={{
                width: 18,
                height: 2,
                background: COLORS.white,
                borderRadius: 10,
                transform: menuOpen
                  ? "rotate(-45deg) translateY(-5px)"
                  : "rotate(0)",
                transition: "0.3s",
              }}
            />
          </button>
        )}
      </nav>

      {/* Mobile Menu */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: menuOpen ? 0 : "-100%",
            width: "100%",
            height: "100vh",
            background: "rgba(5,8,22,0.98)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 32,
            transition: "0.45s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {sections.map((s, i) => (
            <a
              key={s}
              href={`#${s}`}
              onClick={() => setMenuOpen(false)}
              style={{
                color: COLORS.white,
                textDecoration: "none",
                fontSize: 28,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontFamily: "'Bebas Neue', sans-serif",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen
                  ? "translateY(0)"
                  : "translateY(20px)",
                transition: `all 0.5s ${i * 0.08}s ease`,
              }}
            >
              {s}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

/* ── Hero ── */
function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const COLORS = {
    white: "#ffffff",
    accent: "#4DF0C0",
    muted: "#b8b8b8",
    bg: "#050816",
  };

  const anim = (delay, targetTransform = "translateY(0)") => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? targetTransform : "translateY(40px)",
    transition: `all 1s ${delay}s cubic-bezier(0.22,1,0.36,1)`,
  });

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 6% 40px",
        position: "relative",
        overflow: "hidden",
        background: COLORS.bg,
      }}
    >
      {/* Grid Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(77,240,192,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(77,240,192,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 40%, transparent 100%)",
          maskImage:
            "radial-gradient(circle at center, black 40%, transparent 100%)",
          zIndex: 0,
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: `${COLORS.accent}10`,
          filter: "blur(100px)",
          top: "10%",
          right: "-100px",
          zIndex: 0,
        }}
      />

      <div
        className="hero-content"
        style={{
          width: "100%",
          maxWidth: "1400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
          position: "relative",
          zIndex: 2,
          flexWrap: "wrap",
        }}
      >
        {/* LEFT */}
        <div
          className="hero-text"
          style={{
            flex: "1 1 500px",
            minWidth: "280px",
          }}
        >
          <h1
            style={{
              ...anim(0.2),
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(70px, 15vw, 180px)",
              lineHeight: 0.85,
              letterSpacing: "-0.01em",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: COLORS.white }}>Sem</span>
            <br />
            <span style={{ color: COLORS.accent }}>Bunly</span>
          </h1>

          <p
            style={{
              ...anim(0.35),
              marginTop: "18px",
              color: COLORS.muted,
              fontSize: "clamp(16px, 2vw, 28px)",
              lineHeight: 1.6,
              maxWidth: "650px",
              fontWeight: 400,
              letterSpacing: "0.02em",
            }}
          >
            3rd Year Software Engineering Student
          </p>

          <div
            style={{
              ...anim(0.5),
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              marginTop: "32px",
            }}
          >
            <a
              href="#projects"
              style={{
                padding: "14px 28px",
                borderRadius: "999px",
                background: COLORS.accent,
                color: "#000",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "15px",
              }}
            >
              View Projects
            </a>

            <a
              href="#contact"
              style={{
                padding: "14px 28px",
                borderRadius: "999px",
                border: `1px solid ${COLORS.accent}`,
                color: COLORS.white,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "15px",
                backdropFilter: "blur(10px)",
              }}
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className="hero-image"
          style={{
            ...anim(0.3, "translateY(20px)"),
            flex: "1 1 450px",
            minWidth: "280px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            position: "relative",
          }}
        >
          {/* Image Glow */}
          <div
            style={{
              position: "absolute",
              width: "50%",
              height: "50%",
              borderRadius: "50%",
              background: `${COLORS.accent}20`,
              filter: "blur(80px)",
              zIndex: -1,
            }}
          />

          <picture
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <source media="(max-width: 768px)" srcSet={profileImgMobile} />
            <img
              src={profileImg}
              alt="Sem Bunly"
              style={{
                width: "100%",
                maxWidth: "620px",
                height: "auto",
                objectFit: "contain",
                display: "block",
                marginBottom: "-20px",
                userSelect: "none",
                pointerEvents: "none",
                filter: "drop-shadow(0 25px 45px rgba(77,240,192,0.18))",
              }}
            />
          </picture>
        </div>
      </div>
    </section>
  );
}

/* ── About ── */
function About() {
  const stats = [
    { num: "3rd", label: "Year at BELTEI International University" },
    { num: 3, label: "Disciplines" },
    { icon: "all_inclusive", label: "Curiosity" },
    { num: "CAMBODIA", label: "Phnom Penh" },
  ];
  return (
    <section
      id="about"
      className="about-section section-padding"
      style={{
        padding: "140px 56px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 80,
        alignItems: "center",
      }}
    >
      <Reveal>
        <SectionLabel>About Me</SectionLabel>
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(34px,3.5vw,52px)",
            lineHeight: 1.1,
            color: COLORS.white,
            marginBottom: 26,
          }}
        >
          Crafting with{" "}
          <em style={{ color: COLORS.accent, fontStyle: "italic" }}>code</em>.
        </h2>
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 13,
            lineHeight: 1.9,
            color: COLORS.muted,
            marginBottom: 14,
          }}
        >
          I'm a third-year Software Engineering student at Beltei International
          University (BUI). I build scalable, user-focused web applications with
          an emphasis on clean design and reliable systems.
        </p>
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 13,
            lineHeight: 1.9,
            color: COLORS.muted,
            marginBottom: 32,
          }}
        >
          I believe great applications are built on strong logic and clean
          design. My work focuses on building reliable systems with efficient
          architecture.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <div
          className="skills-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
        >
          {stats.map((s, i) => (
            <StatCard key={i} {...s} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function StatCard({ num, icon, label }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="interactive"
      style={{
        background: hov ? "#161b22" : COLORS.card,
        border: `1px solid ${hov ? COLORS.accent : COLORS.border}`,
        padding: "28px 24px",
        transition: "all 0.3s",
      }}
    >
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 52,
          color: COLORS.accent,
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
          minHeight: 52,
        }}
      >
        {icon ? (
          <span className="material-symbols-outlined" style={{ fontSize: 48 }}>
            {icon}
          </span>
        ) : (
          <Counter target={num} />
        )}
      </div>
      <div
        style={{
          fontFamily: "monospace",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: COLORS.muted,
          marginTop: 6,
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ── Skills ── */
function Skills() {
  return (
    <section
      id="skills"
      className="section-padding"
      style={{ padding: "0 56px 140px" }}
    >
      <Reveal>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(52px,7vw,100px)",
            lineHeight: 1,
            color: COLORS.white,
            marginBottom: 56,
          }}
        >
          Skills
        </h2>
      </Reveal>
      <div
        className="skills-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 2,
        }}
      >
        {skills.map((s, i) => (
          <SkillCard key={i} {...s} delay={i * 0.12} />
        ))}
      </div>
    </section>
  );
}

function SkillCard({ icon, title, desc, tags, color, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="interactive"
        style={{
          background: hov ? "#14181f" : COLORS.card,
          border: `1px solid ${hov ? color : COLORS.border}`,
          padding: "40px 32px",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.4s",
          height: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg,${color}0a 0%,transparent 60%)`,
            opacity: hov ? 1 : 0,
            transition: "opacity 0.4s",
          }}
        />
        <div style={{ fontSize: 34, marginBottom: 18, color }}>{icon}</div>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 28,
            letterSpacing: "0.04em",
            color: COLORS.white,
            marginBottom: 14,
          }}
        >
          {title}
        </div>
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            lineHeight: 1.85,
            color: COLORS.muted,
            marginBottom: 24,
          }}
        >
          {desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {tags.map((t, i) => (
            <span
              key={i}
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "5px 12px",
                border: `1px solid ${hov ? color + "55" : COLORS.border}`,
                color: hov ? color : COLORS.muted,
                transition: "all 0.3s",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ── Projects ── */
function Projects() {
  return (
    <section
      id="projects"
      className="section-padding"
      style={{ padding: "0 56px 140px" }}
    >
      <Reveal>
        <SectionLabel>Work</SectionLabel>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(52px,7vw,100px)",
            lineHeight: 1,
            color: COLORS.white,
            marginBottom: 60,
          }}
        >
          Selected
          <br />
          <span style={{ color: COLORS.accent }}>Projects</span>
        </h2>
      </Reveal>
      {/* Featured top row: 2 wide cards */}
      <div
        className="projects-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 3,
          marginBottom: 3,
        }}
      >
        {projects.slice(0, 2).map((p, i) => (
          <ProjectCard key={i} {...p} delay={i * 0.1} />
        ))}
      </div>
      {/* Bottom row: 2 wide + list hybrid */}
      <div
        className="projects-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}
      >
        {projects.slice(2, 4).map((p, i) => (
          <ProjectCard key={i} {...p} delay={0.2 + i * 0.1} />
        ))}
      </div>
      <div
        className="projects-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}
      >
        {projects.slice(4, 6).map((p, i) => (
          <ProjectCard key={i} {...p} delay={0.2 + i * 0.1} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  num,
  name,
  desc,
  type,
  year,
  color,
  img,
  imgAlt,
  delay,
  path,
  link,
}) {
  const [hov, setHov] = useState(false);
  const CardContent = (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="interactive"
      style={{
        background: COLORS.card,
        border: `1px solid ${hov ? color : COLORS.border}`,
        overflow: "hidden",
        position: "relative",
        transition: "border-color 0.4s",
        cursor: "none",
        height: "100%",
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          aspectRatio: "1.9 / 1",
        }}
      >
        <img
          src={img}
          alt={imgAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.6s ease",
            display: "block",
          }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, transparent 30%, ${COLORS.bg}dd 100%)`,
          }}
        />
        {/* Color tint on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: color + "22",
            opacity: hov ? 1 : 0,
            transition: "opacity 0.4s",
          }}
        />
        {/* Type badge top-right */}
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            fontFamily: "monospace",
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: color,
            border: `1px solid ${color}55`,
            background: COLORS.bg + "cc",
            padding: "4px 12px",
            backdropFilter: "blur(8px)",
          }}
        >
          {type}
        </div>
        {/* Number top-left */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 15,
            letterSpacing: "0.1em",
            color: COLORS.muted,
          }}
        >
          {num}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 28px 28px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 19,
              color: COLORS.white,
              lineHeight: 1.25,
            }}
          >
            {name}
          </div>
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: 20,
              color: hov ? color : COLORS.muted,
              transform: hov ? "translate(2px,-2px)" : "none",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
          >
            north_east
          </span>
        </div>
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            color: COLORS.muted,
            lineHeight: 1.7,
            marginBottom: 18,
          }}
        >
          {desc}
        </p>
        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: 32,
              height: 1,
              background: `linear-gradient(to right,${color},transparent)`,
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: COLORS.muted,
            }}
          >
            {year}
          </span>
        </div>
      </div>

      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: color,
          transform: hov ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "top",
          transition: "transform 0.4s ease",
        }}
      />
    </div>
  );

  return (
    <Reveal delay={delay}>
      {path ? (
        <Link to={path} style={{ textDecoration: "none", cursor: "none" }}>
          {CardContent}
        </Link>
      ) : link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          {CardContent}
        </a>
      ) : (
        CardContent
      )}
    </Reveal>
  );
}

/* ── Contact ── */
function Contact() {
  return (
    <section
      id="contact"
      className="contact-section section-padding"
      style={{
        padding: "0 56px 120px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 80,
        alignItems: "center",
      }}
    >
      <Reveal>
        <SectionLabel>Contact</SectionLabel>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(64px,9vw,120px)",
            lineHeight: 0.88,
            color: COLORS.white,
          }}
        >
          Let's
          <br />
          <span style={{ color: COLORS.accent }}>Work.</span>
        </h2>
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 18,
            color: COLORS.muted,
            marginTop: 20,
          }}
        >
          Open to projects, collaborations & opportunities.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {contacts.map((c, i) => (
            <ContactRow key={i} {...c} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function ContactRow({ icon, label, value, href, target }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="interactive"
      style={{
        background: hov ? "#101418" : COLORS.card,
        border: `1px solid ${hov ? COLORS.accent : COLORS.border}`,
        padding: "22px 26px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        textDecoration: "none",
        transition: "all 0.3s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 22, color: COLORS.accent }}
        >
          {icon}
        </span>
        <div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: COLORS.muted,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 13,
              color: COLORS.white,
              marginTop: 3,
            }}
          >
            {value}
          </div>
        </div>
      </div>
      <span
        className="material-symbols-outlined"
        style={{
          color: hov ? COLORS.accent : COLORS.muted,
          transform: hov ? "translate(2px,-2px)" : "none",
          transition: "all 0.2s",
          fontSize: 20,
        }}
      >
        north_east
      </span>
    </a>
  );
}

/* ── Shared ── */
function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontFamily: "monospace",
        fontSize: 10,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: COLORS.accent,
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 28,
          height: 1,
          background: COLORS.accent,
        }}
      />
      {children}
    </div>
  );
}

function CtaButton({ href, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: hov ? COLORS.accent2 : COLORS.accent,
        color: COLORS.bg,
        fontFamily: "monospace",
        fontSize: 11,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        padding: "15px 26px",
        textDecoration: "none",
        fontWeight: 600,
        transform: hov ? "translateY(-2px)" : "none",
        transition: "all 0.2s",
      }}
    >
      {children}
    </a>
  );
}

function Divider() {
  return (
    <div style={{ height: 1, background: COLORS.border, margin: "0 56px" }} />
  );
}

function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${COLORS.border}`,
        padding: "28px 56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 17,
          letterSpacing: "0.1em",
          color: COLORS.muted,
        }}
      >
        SEM BUNLY
      </div>
      <div
        style={{
          fontFamily: "monospace",
          fontSize: 11,
          color: COLORS.muted,
          letterSpacing: "0.1em",
        }}
      >
        © 2026 · Software Engineering · BIU · Phnom Penh
      </div>
    </footer>
  );
}

/* ── Root ── */
export default function Portfolio() {
  const mouseRef = useMousePosition(); // ref, not state — no re-renders
  const scrollY = useScrollY();
  const [fullscreenData, setFullscreenData] = useState(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!fullscreenData) return;
      if (e.key === "Escape") setFullscreenData(null);
      if (
        e.key === "ArrowRight" &&
        fullscreenData.index < fullscreenData.images.length - 1
      ) {
        setFullscreenData((prev) => ({ ...prev, index: prev.index + 1 }));
      }
      if (e.key === "ArrowLeft" && fullscreenData.index > 0) {
        setFullscreenData((prev) => ({ ...prev, index: prev.index - 1 }));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullscreenData]);

  return (
    <>
      {fullscreenData && (
        <div
          className="interactive"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.95)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setFullscreenData(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFullscreenData(null);
            }}
            style={{
              position: "absolute",
              top: 40,
              right: 40,
              background: "none",
              border: "none",
              color: COLORS.white,
              cursor: "none",
              zIndex: 1001,
            }}
          >
            <span
              className="material-symbols-outlined interactive"
              style={{ fontSize: 36 }}
            >
              close
            </span>
          </button>

          {fullscreenData.index > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenData((prev) => ({
                  ...prev,
                  index: prev.index - 1,
                }));
              }}
              style={{
                position: "absolute",
                left: 40,
                background: "none",
                border: "none",
                color: COLORS.white,
                cursor: "none",
                zIndex: 1001,
              }}
            >
              <span
                className="material-symbols-outlined interactive"
                style={{ fontSize: 48 }}
              >
                chevron_left
              </span>
            </button>
          )}

          {fullscreenData.index < fullscreenData.images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenData((prev) => ({
                  ...prev,
                  index: prev.index + 1,
                }));
              }}
              style={{
                position: "absolute",
                right: 40,
                background: "none",
                border: "none",
                color: COLORS.white,
                cursor: "none",
                zIndex: 1001,
              }}
            >
              <span
                className="material-symbols-outlined interactive"
                style={{ fontSize: 48 }}
              >
                chevron_right
              </span>
            </button>
          )}

          <img
            src={fullscreenData.images[fullscreenData.index]}
            style={{ maxWidth: "85%", maxHeight: "85%", objectFit: "contain" }}
            alt="Fullscreen"
          />
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@1,400;1,700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:${COLORS.bg};color:${COLORS.text};cursor:none;overflow-x:hidden;}
        body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");pointer-events:none;z-index:1000;opacity:0.3;}
        a{cursor:none;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:${COLORS.bg};}
        ::-webkit-scrollbar-thumb{background:${COLORS.border};}

        @media (max-width: 1024px) {
          .nav-links { gap: 20px !important; }
          .hero-section { padding: 0 5% !important; }
          .about-section, .contact-section { grid-template-columns: 1fr !important; gap: 40px !important; }
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .interactive[style*="display: grid"] { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 768px) {
          body { cursor: default !important; }
          .cursor-el { display: none !important; }
          .nav-container { padding: 16px 24px !important; }
          .nav-links { display: none !important; }
          .hero-content { flex-direction: column !important; text-align: center !important; }
          .hero-text { flex: none !important; margin-bottom: 40px !important; }
          .hero-image-container { flex: none !important; width: 80% !important; transform: translateY(0) !important; }
          .hero-bottom { position: static !important; margin-top: 60px !important; padding: 0 !important; flex-direction: column !important; align-items: center !important; gap: 40px !important; }
          .hero-desc { text-align: center !important; max-width: 100% !important; }
          .section-padding { padding: 100px 24px !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .about-section { padding: 100px 24px !important; }
          .contact-section { padding: 0 24px 100px !important; }
          
          
        }
      `}</style>
      <Cursor mouseRef={mouseRef} />
      <Nav scrollY={scrollY} />
      <Hero />
      <Marquee />
      <About />
      <Divider />
      <Skills />
      <Divider />
      <Projects />
      <Divider />
      <Contact />
      <Footer />
    </>
  );
}
