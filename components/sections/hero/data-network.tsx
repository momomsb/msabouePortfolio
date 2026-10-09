"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient "data network": drifting nodes, proximity links and packets of data
 * travelling along them. Plain Canvas 2D (no WebGL) to keep the hero light.
 * - Pauses when off-screen or when the tab is hidden.
 * - Renders a single static frame when the user prefers reduced motion.
 */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hub: boolean;
}

interface Packet {
  from: number;
  to: number;
  t: number;
  speed: number;
}

const LINK_DISTANCE = 150;
const ACCENT = "45, 226, 255";
const VIOLET = "143, 128, 255";

export function DataNetwork({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let frame = 0;
    let running = false;
    let visible = true;
    const pointer = { x: -9999, y: -9999 };

    function seed() {
      const count = Math.round(Math.min(84, Math.max(26, (width * height) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.2 + 0.6,
        hub: Math.random() < 0.12,
      }));
      packets = [];
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reducedMotion || !running) draw();
    }

    function spawnPacket() {
      const from = Math.floor(Math.random() * nodes.length);
      const a = nodes[from];
      let best = -1;
      let bestDistance = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        if (i === from) continue;
        const d = Math.hypot(nodes[i].x - a.x, nodes[i].y - a.y);
        if (d < LINK_DISTANCE && d > 40 && d < bestDistance && Math.random() > 0.35) {
          best = i;
          bestDistance = d;
        }
      }
      if (best >= 0) packets.push({ from, to: best, t: 0, speed: 0.008 + Math.random() * 0.01 });
    }

    function step() {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      }
      if (packets.length < 14 && Math.random() < 0.08) spawnPacket();
      packets = packets.filter((packet) => (packet.t += packet.speed) < 1);
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // Links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > LINK_DISTANCE) continue;
          const alpha = (1 - d / LINK_DISTANCE) * 0.16;
          ctx!.strokeStyle = `rgba(${ACCENT}, ${alpha})`;
          ctx!.lineWidth = 0.6;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
        // Pointer links
        const pd = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (pd < 180) {
          ctx!.strokeStyle = `rgba(${ACCENT}, ${(1 - pd / 180) * 0.35})`;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(pointer.x, pointer.y);
          ctx!.stroke();
        }
      }

      // Nodes
      for (const node of nodes) {
        const near = Math.hypot(node.x - pointer.x, node.y - pointer.y) < 180;
        ctx!.fillStyle = node.hub ? `rgba(${ACCENT}, ${near ? 1 : 0.75})` : `rgba(231, 237, 244, ${near ? 0.8 : 0.35})`;
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.hub ? node.r + 1 : node.r, 0, Math.PI * 2);
        ctx!.fill();
        if (node.hub) {
          ctx!.strokeStyle = `rgba(${ACCENT}, 0.18)`;
          ctx!.beginPath();
          ctx!.arc(node.x, node.y, node.r + 5, 0, Math.PI * 2);
          ctx!.stroke();
        }
      }

      // Packets
      for (const [index, packet] of packets.entries()) {
        const a = nodes[packet.from];
        const b = nodes[packet.to];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * packet.t;
        const y = a.y + (b.y - a.y) * packet.t;
        const color = index % 5 === 0 ? VIOLET : ACCENT;
        const glow = ctx!.createRadialGradient(x, y, 0, x, y, 7);
        glow.addColorStop(0, `rgba(${color}, 0.9)`);
        glow.addColorStop(1, `rgba(${color}, 0)`);
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(x, y, 7, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function loop() {
      step();
      draw();
      frame = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reducedMotion || !visible || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    visibilityObserver.observe(canvas);

    const onVisibilityChange = () => (document.hidden ? stop() : start());
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      if (reducedMotion) draw();
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
