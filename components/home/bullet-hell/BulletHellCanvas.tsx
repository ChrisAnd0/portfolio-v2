"use client";

import { useEffect, useMemo, useRef } from "react";
import { useMantineTheme } from "@mantine/core";
import type {
  BulletHellColors,
  BulletHellGameApi,
} from "./use-bullet-hell-game";

const MAX_DELTA_SECONDS = 0.05;

interface BulletHellCanvasProps {
  game: BulletHellGameApi;
}

export function BulletHellCanvas({ game }: BulletHellCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useMantineTheme();

  const colors = useMemo<BulletHellColors>(
    () => ({
      player: theme.colors[theme.primaryColor]?.[5] ?? theme.colors.violet[5],
      bullet: theme.colors.red[6],
      background: theme.colors.dark[9],
    }),
    [theme],
  );

  // Read via refs inside the rAF loop so the loop never needs to be torn down
  // and restarted just because `game`/`colors` get new identities on re-render.
  const gameRef = useRef(game);
  const colorsRef = useRef(colors);

  useEffect(() => {
    gameRef.current = game;
  }, [game]);

  useEffect(() => {
    colorsRef.current = colors;
  }, [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;

    function resize() {
      const parent = canvas!.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
    }

    resize();
    window.addEventListener("resize", resize);

    let frameId = 0;
    let lastTime = performance.now();
    let paused = false;

    function frame(now: number) {
      const dt = Math.min((now - lastTime) / 1000, MAX_DELTA_SECONDS);
      lastTime = now;

      if (!paused) {
        gameRef.current.tick(dt, width, height);
        ctx!.save();
        ctx!.scale(dpr, dpr);
        gameRef.current.draw(ctx!, width, height, colorsRef.current);
        ctx!.restore();
      }

      frameId = requestAnimationFrame(frame);
    }

    function handleVisibilityChange() {
      paused = document.hidden;
      if (!paused) lastTime = performance.now();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    frameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        display: "block",
        width: "100%",
        height: "100%",
      }}
    />
  );
}
