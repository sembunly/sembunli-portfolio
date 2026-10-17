import { COLORS, TYPOGRAPHY } from "../../theme/tokens";

export function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontFamily: TYPOGRAPHY.body,
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

export function Divider() {
  return (
    <div style={{ height: 1, background: COLORS.border, margin: "0 56px" }} />
  );
}

export function Footer() {
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
          fontFamily: TYPOGRAPHY.body,
          fontSize: 17,
          letterSpacing: "0.1em",
          color: COLORS.muted,
        }}
      >
        SEM BUNLY
      </div>
      <div
        style={{
          fontFamily: TYPOGRAPHY.body,
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
