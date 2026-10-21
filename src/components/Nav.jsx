import { useState } from "react";
import { useIsMobile, useScrollDirection } from "../hooks/usePortfolioHooks";
import { NAV_COLORS as COLORS, TYPOGRAPHY } from "../theme/tokens";

export function Nav({ scrollY }) {
  const sections = ["home", "about", "skills", "project-demos", "projects", "activity", "contact"];
  const desktopSections = sections.filter((section) => section !== "contact");
  const dir = useScrollDirection();
  const isMobile = useIsMobile();

  const [menuOpen, setMenuOpen] = useState(false);

  const scrolled = scrollY > 60;
  const isHidden = isMobile && dir === "down" && !menuOpen;

  return (
    <>
      <nav
        className="nav-container"
        style={{
          position: "fixed",
          top: isMobile ? 12 : 18,
          left: "50%",
          width: isMobile
            ? "calc(100% - 28px)"
            : "min(1120px, calc(100% - 56px))",
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
            fontFamily: TYPOGRAPHY.body,
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
                  fontFamily: TYPOGRAPHY.body,
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
                {s === "project-demos" ? "Proj Demo" : s}
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
              fontFamily: TYPOGRAPHY.body,
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
                transform: "none",
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
                opacity: 1,
                transform: "none",
                transition: "0.3s",
              }}
            />
            <span
              style={{
                width: 18,
                height: 2,
                background: COLORS.white,
                borderRadius: 10,
                transform: "none",
                opacity: menuOpen ? 0 : 1,
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
                fontFamily: TYPOGRAPHY.body,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ${i * 0.08}s ease`,
              }}
            >
              {s === "project-demos" ? "Proj Demo" : s}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

/* ── Hero ── */
