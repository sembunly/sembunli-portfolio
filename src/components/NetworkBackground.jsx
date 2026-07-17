import { memo, useEffect, useRef } from "react";

function NetworkBackground({ className = "", style }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!container || !canvas || !context) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let width = 0;
    let height = 0;
    let nodes = [];
    let animationFrame = 0;

    const randomBetween = (minimum, maximum) =>
      minimum + Math.random() * (maximum - minimum);
    const randomVelocity = () =>
      randomBetween(0.22, 0.48) * (Math.random() < 0.5 ? -1 : 1);

    const buildNodes = () => {
      const nodeCount = Math.min(
        125,
        Math.max(55, Math.floor((width * height) / 11000)),
      );

      nodes = Array.from({ length: nodeCount }, (_, index) => ({
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        vx: reduceMotion ? 0 : randomVelocity(),
        vy: reduceMotion ? 0 : randomVelocity(),
        radius:
          index % 13 === 0
            ? randomBetween(2.1, 3.2)
            : randomBetween(0.8, 1.8),
        glow: index % 13 === 0,
      }));
    };

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      buildNodes();
    };

    const moveNodes = () => {
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < -8 || node.x > width + 8) node.vx *= -1;
        if (node.y < -8 || node.y > height + 8) node.vy *= -1;
      });
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const connectionDistance = width < 640 ? 105 : 145;

      for (let first = 0; first < nodes.length; first += 1) {
        for (let second = first + 1; second < nodes.length; second += 1) {
          const deltaX = nodes[first].x - nodes[second].x;
          const deltaY = nodes[first].y - nodes[second].y;
          const distance = Math.hypot(deltaX, deltaY);

          if (distance > connectionDistance) continue;

          const opacity = (1 - distance / connectionDistance) * 0.42;
          context.beginPath();
          context.moveTo(nodes[first].x, nodes[first].y);
          context.lineTo(nodes[second].x, nodes[second].y);
          context.strokeStyle = `rgba(77, 240, 192, ${opacity})`;
          context.lineWidth = 0.65;
          context.stroke();
        }
      }

      nodes.forEach((node) => {
        if (node.glow) {
          const glow = context.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            14,
          );
          glow.addColorStop(0, "rgba(153, 255, 224, 0.8)");
          glow.addColorStop(0.22, "rgba(77, 240, 192, 0.3)");
          glow.addColorStop(1, "rgba(77, 240, 192, 0)");
          context.fillStyle = glow;
          context.beginPath();
          context.arc(node.x, node.y, 14, 0, Math.PI * 2);
          context.fill();
        }

        context.fillStyle = node.glow
          ? "#b8ffe9"
          : "rgba(77, 240, 192, 0.88)";
        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fill();
      });

      if (!reduceMotion) {
        moveNodes();
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const handleVisibility = () => {
      window.cancelAnimationFrame(animationFrame);
      if (!document.hidden && !reduceMotion) draw();
    };

    const resizeObserver = new ResizeObserver(() => {
      window.cancelAnimationFrame(animationFrame);
      resize();
      draw();
    });

    resize();
    draw();
    resizeObserver.observe(container);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        background:
          "radial-gradient(circle at 85% 85%, rgba(77, 240, 192, 0.1), transparent 42%), #020d1c",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default memo(NetworkBackground);
