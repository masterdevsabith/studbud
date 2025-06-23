"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: {
          color: { value: "#000000" }, // pure black
        },
        particles: {
          number: { value: 100, density: { enable: true, area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: {
            value: 0.5,
            random: true,
          },
          size: {
            value: 1.5,
            random: true,
          },
          move: {
            enable: true,
            speed: 0.3,
            direction: "none",
            outModes: "out",
          },
        },
        detectRetina: true,
      }}
    />
  );
}
