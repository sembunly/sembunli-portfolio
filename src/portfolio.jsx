import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ecomImg from "./assets/ecom.jpg";
//import profileImgMobile from "./assets/me2.png";
import profileImg from "./assets/me.png";
import paymentImg from "./assets/payment.jpg";
import uspImg from "./assets/usp1.jpg";
import AiChat from "./assets/vs-code-extension.jpg";
import classFeedbackImg from "./assets/biu-se/class-feedback.jpg";
import tripImg from "./assets/biu-se/trip.jpg";
import NetworkBackground from "./components/NetworkBackground";
import { FaCode, FaDatabase, FaLayerGroup, FaTools } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";
import {
  SiAndroidstudio, SiC, SiCakephp, SiCplusplus, SiCss, SiDart,
  SiExpress, SiFlutter, SiGit, SiGithub, SiGitlab, SiHtml5, SiIntellijidea,
  SiJavascript, SiLaravel, SiMysql, SiOpenjdk, SiPhp, SiPostgresql,
  SiPostman, SiReact, SiSpringboot, SiTailwindcss,
} from "react-icons/si";

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

const skillGroups = [
  {
    title: "Programming",
    icon: FaCode,
    description: "Programming languages I use to solve problems and build applications.",
    items: [
      ["C", SiC, "#a8b9cc"], ["C++", SiCplusplus, "#659ad2"],
      ["C#", TbBrandCSharp, "#9b4f96"], ["Java", SiOpenjdk, "#f89820"],
      ["JavaScript", SiJavascript, "#f7df1e"], ["PHP", SiPhp, "#777bb4"],
      ["Dart", SiDart, "#0175c2"],
    ],
  },
  {
    title: "FullStack Development",
    icon: FaLayerGroup,
    description: "Frameworks and databases for building complete applications.",
    items: [
      ["Laravel", SiLaravel, "#ff2d20"], ["CakePHP", SiCakephp, "#d33c43"],
      ["Spring Boot", SiSpringboot, "#6db33f"], ["Express.js", SiExpress, "#f0f4ff"],
      ["React", SiReact, "#61dafb"], ["Flutter", SiFlutter, "#54c5f8"],
      ["HTML", SiHtml5, "#e34f26"], ["CSS", SiCss, "#1572b6"],
      ["Tailwind CSS", SiTailwindcss, "#38bdf8"], ["MySQL", SiMysql, "#4479a1"],
      ["SQL Server", FaDatabase, "#cc2927"], ["PostgreSQL", SiPostgresql, "#4169e1"],
      ["Oracle", FaDatabase, "#f80000"],
    ],
  },
  {
    title: "Tools",
    icon: FaTools,
    description: "Tools I use for development, version control, and testing.",
    items: [
      ["Git", SiGit, "#f05032"], ["GitHub", SiGithub, "#f0f4ff"],
      ["GitLab", SiGitlab, "#fc6d26"], ["VS Code", FaCode, "#22a7f2"],
      ["Visual Studio", FaCode, "#a179dc"], ["Postman", SiPostman, "#ff6c37"],
      ["IntelliJ IDEA", SiIntellijidea, "#f24e1e"], ["Android Studio", SiAndroidstudio, "#3ddc84"],
    ],
  },
];

const projects = [
  {
    num: "01",
    name: "University Student Portal",
    desc: "A comprehensive portal for students to manage their academic records, course schedules, and personal information.",
    type: "PHP / Laravel / MySQL",
    year: "2026",
    color: COLORS.accent,
    img: uspImg,
    imgAlt: "University student portal",
    link: "https://github.com/sembunly/university-student-portal",
  },
  {
    num: "02",
    name: "Laravel-KHQR-Payment Gateway",
    desc: "A Laravel package that integrates the KHQR Bakong payment gateway.",
    type: "PHP / Laravel",
    year: "2026",
    color: COLORS.accent2,
    img: paymentImg,
    imgAlt: "Laravel-KHQR-Payment Gateway",
    link: "https://github.com/sembunly/Laravel-KHQR-Payment",
  },
  // {
  //   num: "03",
  //   name: "Calculator",
  //   desc: "A mobile-style calculator built with React, featuring a phone-like UI and basic arithmetic operations.",
  //   type: "JavaScript",
  //   year: "2025",
  //   color: COLORS.accent,
  //   img: calculatorImg,
  //   imgAlt: "Calculator app UI",
  //   link: "https://github.com/sembunly/calculator-app",
  //   path: "/project/calculator",
  // },

  {
    num: "03",
    name: "E-commerce Management System",
    desc: "A Laravel + MySQL based e-commerce management system with product CRUD, order processing, and admin dashboards.",
    type: "Laravel / MySQL",
    year: "2026",
    color: COLORS.accent3,
    img: ecomImg,
    imgAlt: "UI design mockup on screen",
    link: "https://github.com/sembunly/ems",
  },
  {
    num: "04",
    name: "VS Code Extension for AI Chat",
    desc: "A VS Code extension that integrates with an AI chatbot for enhanced coding assistance.",
    type: "JavaScript / TypeScript",
    year: "2026",
    color: COLORS.accent,
    img: AiChat,
    imgAlt: "UI design mockup on screen",
    link: "https://github.com/sembunly/vscode-ai-chat-extension",
  },

  //   {
  //   num: "03",
  //   name: "Fashtion E-commerce",
  //   desc: "A modern e-commerce platform for fashion products, featuring a sleek design and seamless shopping experience.",
  //   type: "React / Tailwind",
  //   year: "2026",
  //   color: COLORS.accent3,
  //   img: fashtionImg,
  //   imgAlt: "UI design mockup on screen",
  //   link: "https://seven8-shop.vercel.app/",
  // },
];

const university = [
  {
    num: "01",
    name: "Class Feedback Session",
    desc: "Presenting work and receiving feedback during a university classroom session.",
    type: "Academic Activity",
    year: "2026",
    color: COLORS.accent,
    img: classFeedbackImg,
    imgAlt: "University class feedback session",
  },
  {
    num: "02",
    name: "University Field Trip",
    desc: "A group learning experience with classmates and university faculty.",
    type: "Student Activity",
    year: "2024",
    color: COLORS.accent2,
    img: tripImg,
    imgAlt: "University field trip group photo",
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
      //setVal(target);
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
  const items = skillGroups.flatMap(({ items: groupItems }) =>
    groupItems.map(([name, Icon, color]) => ({ name, Icon, color })),
  );

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
        {doubled.map(({ name, Icon, color }, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "22px",
              padding: "0 28px",
              flexShrink: 0,
            }}
          >
            <Icon
              title={name}
              aria-label={name}
              style={{
                fontSize: 26,
                color,
                flexShrink: 0,
              }}
            />

          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Nav ── */
function Nav({ scrollY }) {
  const sections = ["about", "skills", "projects", "contact"];
  const desktopSections = sections.filter((section) => section !== "contact");
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
          top: isMobile ? 12 : 18,
          left: "50%",
          width: isMobile ? "calc(100% - 28px)" : "min(1120px, calc(100% - 56px))",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "9px 10px 9px 18px" : "9px 10px 9px 22px",
          border: `1px solid ${scrolled ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: 999,
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          background: scrolled ? "rgba(5,8,22,0.94)" : "rgba(5,8,22,0.78)",
          boxShadow: "0 12px 36px rgba(0,0,0,0.22)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: `translateX(-50%) ${isHidden ? "translateY(-160%)" : "translateY(0)"}`,
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: isMobile ? 15 : 16,
            fontWeight: 900,
            letterSpacing: "0.11em",
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
              gap: 4,
              padding: "0 10px",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 999,
              background: "rgba(255,255,255,0.035)",
            }}
          >
            {desktopSections.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.01em",
                  textTransform: "capitalize",
                  color: COLORS.white,
                  textDecoration: "none",
                  transition: "0.25s ease",
                  padding: "11px 16px",
                  borderRadius: 999,
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = COLORS.accent;
                  e.target.style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = COLORS.white;
                  e.target.style.background = "transparent";
                }}
              >
                {s}
              </a>
            ))}
          </div>
        )}

        {!isMobile && (
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 18px",
              borderRadius: 999,
              background: COLORS.accent,
              color: "#03110e",
              textDecoration: "none",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 900,
              fontSize: 13,
              whiteSpace: "nowrap",
            }}
          >
            Contact <span aria-hidden="true">↗</span>
          </a>
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
            paddingTop: 90,
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
                fontFamily: "'Nunito', sans-serif",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
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
        minHeight: "min(900px, 100svh)",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "112px clamp(24px, 7vw, 104px) 56px",
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 77% 48%, rgba(77,240,192,0.07), transparent 38%), #050816",
      }}
    >
      <NetworkBackground />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: "580px",
          height: "580px",
          borderRadius: "50%",
          background: `${COLORS.accent}0a`,
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
          flex: "1 1 540px",
            minWidth: "280px",
          paddingBottom: "24px",
          }}
        >
          <div style={{ ...anim(0.1), display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 26, color: COLORS.accent, fontSize: 12, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.accent, boxShadow: `0 0 14px ${COLORS.accent}` }} />
            Backend developer · Phnom Penh, Cambodia
          </div>
          <h1
            style={{
              ...anim(0.2),
              fontFamily: "'Nunito', sans-serif",
              fontSize: "clamp(76px, 11.4vw, 154px)",
              lineHeight: 0.82,
              letterSpacing: "-0.075em",
              margin: 0,
              textTransform: "uppercase",
              fontWeight: 800,
            }}
          >
            <span style={{ color: COLORS.white }}>Sem</span>
            <br />
            <span style={{ color: COLORS.accent }}>Bunly</span>
          </h1>

          <p
            style={{
              ...anim(0.35),
              marginTop: "28px",
              color: COLORS.white,
              fontSize: "clamp(19px, 2.1vw, 27px)",
              lineHeight: 1.35,
              maxWidth: "520px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            Software engineering student
          </p>

          <div
            style={{
              ...anim(0.5),
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "30px",
            }}
          >
            <a
              href="#projects"
              style={{
                padding: "14px 22px",
                borderRadius: "8px",
                background: COLORS.accent,
                color: "#000",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "14px",
                letterSpacing: "0.02em",
              }}
            >
              View Projects
            </a>
            {/* <Link
              to="/resume"
              style={{
                padding: "13px 22px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: COLORS.white,
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "14px",
                letterSpacing: "0.02em",
              }}
            >
              View Resume
            </Link> */}
          </div>
        </div>

        {/* Portrait */}
        <div
          className="hero-image"
          style={{
            ...anim(0.3, "translateY(20px)"),
            flex: "1 1 390px",
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
          <div
            className="hero-portrait-wrap"
            style={{
              position: "relative",
              width: "min(100%, 560px)",
              height: "clamp(400px, 44vw, 610px)",
              minHeight: "400px",
              overflow: "hidden",
              borderRadius: "28px",
              background: "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.008))",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <img
              src={profileImg}
              alt="Sem Bunly"
              style={{
                position: "absolute",
                left: "50%",
                bottom: "-4px",
                transform: "translateX(-50%)",
                width: "min(104%, 620px)",
                maxHeight: "100%",
                height: "auto",
                objectFit: "contain",
                display: "block",
                zIndex: 2,
                userSelect: "none",
                pointerEvents: "none",
                filter: "drop-shadow(0 25px 45px rgba(19, 60, 48, 0.18))",
              }}
            />
          </div>

          {/* <picture
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
          </picture> */}
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
        padding: "132px 56px 148px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(42px, 7vw, 96px)",
        alignItems: "center",
      }}
    >
      <Reveal>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <span style={{ width: 28, height: 1, background: COLORS.accent }} />
          <span style={{ color: COLORS.accent, fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>About Me</span>
        </div>
        <h2
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "clamp(54px,7vw,88px)",
            lineHeight: 0.98,
            letterSpacing: "-0.055em",
            color: COLORS.white,
            marginBottom: 30,
          }}
        >
          ABOUT
        </h2>
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: 15,
            lineHeight: 1.85,
            color: "#aab4c5",
            marginBottom: 18,
            maxWidth: 620,
          }}
        >
          I'm a third-year Software Engineering student at Beltei International University (BIU), currently working as a Backend Developer. I have a foundation in both backend and frontend development, with experience in building applications and designing user-friendly interfaces.
        </p>
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: 15,
            lineHeight: 1.85,
            color: COLORS.muted,
            marginBottom: 0,
            maxWidth: 620,
          }}
        >
          I believe great applications start with strong engineering principles, thoughtful design, and well-structured systems.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <div
          className="about-stats-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 12 }}
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
        background: hov ? "linear-gradient(145deg,rgba(77,240,192,0.09),rgba(255,255,255,0.025))" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hov ? "rgba(77,240,192,0.42)" : "rgba(220,228,240,0.12)"}`,
        padding: "24px 22px",
        minHeight: 158,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition: "all 0.3s",
      }}
    >
      <div
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: typeof num === "string" && num === "CAMBODIA" ? 21 : 44,
          color: COLORS.accent,
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
          minHeight: 48,
          fontWeight: 800,
          letterSpacing: typeof num === "string" && num === "CAMBODIA" ? "0.02em" : "-0.04em",
        }}
      >
        {icon ? (
          <span className="material-symbols-outlined" style={{ fontSize: 34 }}>
            {icon}
          </span>
        ) : (
          <Counter target={num} />
        )}
      </div>
      <div
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: 12,
          letterSpacing: "0.02em",
          color: COLORS.muted,
          lineHeight: 1.5,
          marginTop: 12,
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
            fontFamily: "'Nunito', sans-serif",
            fontSize: "clamp(48px,7vw,88px)",
            lineHeight: 1,
            color: COLORS.white,
            marginBottom: 42,
          }}
        >
          Skills
        </h2>
      </Reveal>
      <div
        className="skill-groups"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 28,
          alignItems: "stretch",
        }}
      >
        {skillGroups.map((group, i) => (
          <SkillGroup key={group.title} {...group} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}

function SkillGroup({ title, icon: GroupIcon, description, items, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="skill-group-card" style={{ height: "100%" }}>
        <GroupIcon aria-hidden="true" style={{ color: COLORS.accent2, fontSize: 32, marginBottom: 22 }} />
        <div
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "clamp(22px, 2vw, 28px)",
            fontWeight: 700,
            letterSpacing: "0.01em",
            color: COLORS.white,
            marginBottom: 12,
          }}
        >
          {title}
        </div>
        <p className="skill-group-description">{description}</p>
        <div className="skill-tile-list" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {items.map(([name, Icon, color]) => (
            <div
              key={name}
              className="skill-tile"
              style={{
                minHeight: 44,
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "7px 11px",
                border: "1px solid rgba(220,228,240,0.15)",
                background: "rgba(255,255,255,0.035)",
                color: COLORS.white,
                fontSize: 13,
                fontWeight: 700,
                whiteSpace: "nowrap",
                transition: "background 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
              }}
            >
              <Icon aria-hidden="true" style={{ color, fontSize: 20, flexShrink: 0 }} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ── University ── */
function University() {
  return (
    <section
      id="university"
      className="section-padding"
      style={{ padding: "0 56px 140px" }}
    >
      <Reveal>
        <SectionLabel>Education</SectionLabel>
        <h2
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "clamp(52px,7vw,100px)",
            lineHeight: 1,
            color: COLORS.white,
            marginBottom: 60,
          }}
        >
          <span style={{ color: COLORS.accent }}>University</span>
        </h2>
      </Reveal>
      <div
        className="projects-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}
      >
        {university.map((item, i) => (
          <ProjectCard key={item.num} {...item} delay={i * 0.1} />
        ))}
      </div>
    </section>
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
            fontFamily: "'Nunito', sans-serif",
            fontSize: "clamp(52px,7vw,100px)",
            lineHeight: 1,
            color: COLORS.white,
            marginBottom: 60,
          }}
        >
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
            fontFamily: "'Nunito', sans-serif",
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
            fontFamily: "'Nunito', sans-serif",
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
              fontFamily: "'Nunito', sans-serif",
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
            fontFamily: "'Nunito', sans-serif",
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
              fontFamily: "'Nunito', sans-serif",
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
        <Link to={path} style={{ textDecoration: "none" }}>
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
            fontFamily: "'Nunito', sans-serif",
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
            fontFamily: "'Nunito', sans-serif",
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
              fontFamily: "'Nunito', sans-serif",
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
              fontFamily: "'Nunito', sans-serif",
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
        fontFamily: "'Nunito', sans-serif",
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
        fontFamily: "'Nunito', sans-serif",
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
          fontFamily: "'Nunito', sans-serif",
          fontSize: 17,
          letterSpacing: "0.1em",
          color: COLORS.muted,
        }}
      >
        SEM BUNLY
      </div>
      <div
        style={{
          fontFamily: "'Nunito', sans-serif",
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
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .skill-group-card { padding:32px 28px; border:1px solid rgba(220,228,240,0.15); background:linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)); transition:background 0.25s ease; }
        .skill-group-card:hover { background:linear-gradient(145deg,rgba(77,240,192,0.055),rgba(255,255,255,0.015)); }
        .skill-group-description { min-height:44px; margin:0 0 22px; color:${COLORS.muted}; font-size:13px; line-height:1.7; }
        .skill-tile:hover { background:rgba(255,255,255,0.08) !important; border-color:rgba(77,240,192,0.5) !important; transform:translateY(-2px); }
        html{scroll-behavior:smooth;}
        body{background:${COLORS.bg};color:${COLORS.text};overflow-x:hidden;font-family:'Nunito',sans-serif;}
        body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");pointer-events:none;z-index:1000;opacity:0.3;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:${COLORS.bg};}
        ::-webkit-scrollbar-thumb{background:${COLORS.border};}

        @media (max-width: 1024px) {
          .nav-links { gap: 20px !important; }
          .hero-section { padding: 0 5% !important; }
          .about-section, .contact-section { grid-template-columns: 1fr !important; gap: 40px !important; }
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .skill-groups { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .interactive[style*="display: grid"] { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hero-content { flex-direction: column !important; text-align: center !important; }
          .hero-text { flex: none !important; margin-bottom: 40px !important; }
          .hero-image { flex: none !important; width: 100% !important; }
          .hero-portrait-wrap { height: min(112vw, 520px) !important; min-height: 360px !important; }
          .hero-image-container { flex: none !important; width: 80% !important; transform: translateY(0) !important; }
          .hero-bottom { position: static !important; margin-top: 60px !important; padding: 0 !important; flex-direction: column !important; align-items: center !important; gap: 40px !important; }
          .hero-desc { text-align: center !important; max-width: 100% !important; }
          .section-padding { padding: 100px 24px !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .skill-groups { grid-template-columns: 1fr !important; gap: 30px !important; }
          .skill-group-card { padding:26px 22px !important; }
          .skill-tile { min-height: 42px !important; padding: 7px 10px !important; font-size: 12px !important; }
          .about-section { padding: 100px 24px !important; }
          .contact-section { padding: 0 24px 100px !important; }


        }
      `}</style>
      <Nav scrollY={scrollY} />
      <Hero />
      <Marquee />
      <About />
      <Divider />
      <Skills />
      <Divider />
      <University />
      <Divider />
      <Projects />
      <Divider />
      <Contact />
      <Footer />
    </>
  );
}
