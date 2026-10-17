import { createElement } from "react";
import { skillGroups } from "../data/portfolioData";
import { COLORS, SURFACES } from "../theme/tokens";

export function Marquee() {
  const items = skillGroups.flatMap(({ items: groupItems }) =>
    groupItems.map(([name, Icon, color]) => ({ name, Icon, color })),
  );

  const doubled = [...items, ...items];

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        borderTop: `1px solid ${COLORS.accent}40`,
        borderBottom: `1px solid ${COLORS.accent}40`,
        background: SURFACES.navigation,
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
          background: `linear-gradient(to right, ${SURFACES.navigation}, transparent)`,
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
          background: `linear-gradient(to left, ${SURFACES.navigation}, transparent)`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div className="marquee-track">
        {doubled.map(({ name, Icon: IconComponent, color }, i) => (
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
            {createElement(IconComponent, {
              title: name,
              "aria-label": name,
              style: {
                fontSize: 26,
                color,
                flexShrink: 0,
              },
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Nav ── */
