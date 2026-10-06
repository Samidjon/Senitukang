"use client";

import { motion, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(finePointer);
    if (!finePointer) return;

    document.documentElement.classList.add("custom-cursor");

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button, [data-cursor]")));
    };

    const onLeave = () => setHovering(false);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className={`custom-cursor-dot ${hovering ? "is-hovering" : ""}`}
      style={{ x, y }}
      aria-hidden="true"
    />
  );
}
