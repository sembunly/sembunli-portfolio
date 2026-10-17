import { useEffect, useState } from "react";
import { useInView } from "../../hooks/usePortfolioHooks";
import { COLORS } from "../../theme/tokens";

export function Reveal({ children, delay = 0, style = {} }) {
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

export function ScrollText({ text }) {
  const [ref, inView] = useInView(0.3);

  return (
    <span
      ref={ref}
      className="scroll-text"
      role="text"
      aria-label={text}
      style={{ display: "inline-block" }}
    >
      {Array.from(text).map((character, index) => (
        <span
          key={`${character}-${index}`}
          className="scroll-text-char"
          aria-hidden="true"
          style={{
            display: "inline-block",
            opacity: inView ? 1 : 0,
            transform: inView
              ? "translateY(0) rotate(0)"
              : "translateY(0.55em) rotate(5deg)",
            filter: inView ? "blur(0)" : "blur(5px)",
            transition: `opacity 0.55s ease ${index * 0.035}s, transform 0.65s cubic-bezier(0.2,0.8,0.2,1) ${index * 0.035}s, filter 0.55s ease ${index * 0.035}s`,
          }}
        >
          {character === " " ? "\u00a0" : character}
        </span>
      ))}
    </span>
  );
}

export function Counter({ target, suffix = "" }) {
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
