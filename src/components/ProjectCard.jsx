import { useState } from "react";
import { Link } from "react-router-dom";
import { COLORS, TYPOGRAPHY } from "../theme/tokens";
import { Reveal } from "./portfolio/Animations";

export function ProjectCard({
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
            fontFamily: TYPOGRAPHY.body,
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
            fontFamily: TYPOGRAPHY.body,
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
              fontFamily: TYPOGRAPHY.body,
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
            fontFamily: TYPOGRAPHY.body,
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
              fontFamily: TYPOGRAPHY.body,
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
