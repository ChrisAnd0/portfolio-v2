"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "@mantine/hooks";

export type GameStatus = "playing" | "gameOver";

interface Vec2 {
  x: number;
  y: number;
}

interface LinearBullet {
  kind: "linear";
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface LaneBullet {
  kind: "lane";
  x: number;
  y: number;
  vx: number;
  baseY: number;
  radius: number;
  spawnTime: number;
}

type Bullet = LinearBullet | LaneBullet;

interface InternalGameState {
  status: GameStatus;
  player: { x: number; y: number; radius: number };
  bullets: Bullet[];
  survivalMs: number;
  grazeMs: number;
  lastHudUpdateMs: number;
  width: number;
  height: number;
  spawnTimers: { volley: number; burst: number; lane: number };
}

export interface BulletHellColors {
  player: string;
  bullet: string;
  background: string;
}

export interface BulletHellGameApi {
  status: GameStatus;
  elapsedMs: number;
  bestMs: number;
  grazeMs: number;
  bestGrazeMs: number;
  tick: (dt: number, width: number, height: number) => void;
  draw: (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    colors: BulletHellColors,
  ) => void;
  restart: () => void;
}

const PLAYER_SPEED = 260;
const PLAYER_RADIUS = 6;
const GRAZE_RADIUS_MULTIPLIER = 2.5;
const BULLET_RADIUS = 5;
const BOUNDS_MARGIN = 60;

const VOLLEY_INTERVAL_BASE = 0.5;
const VOLLEY_BULLETS_PER_WAVE = 3;
const VOLLEY_SPEED_BASE = 140;

const BURST_INTERVAL_BASE = 2.2;
const BURST_BULLET_COUNT = 14;
const BURST_SPEED_BASE = 110;
const BURST_UNLOCK_MS = 8000;

const LANE_INTERVAL_BASE = 1.1;
const LANE_SPEED_BASE = 160;
const LANE_AMPLITUDE = 60;
const LANE_FREQUENCY = 2.4;
const LANE_UNLOCK_MS = 18000;

const DIFFICULTY_RAMP_MS = 30000;
const MAX_DIFFICULTY = 2.2;

const BEST_TIME_KEY = "bullet-hell-best-ms";
const BEST_GRAZE_TIME_KEY = "bullet-hell-best-graze-ms";

const CONTROL_KEYS = new Set([
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "a",
  "d",
  "w",
  "s",
]);

function normalizeKey(key: string) {
  return key.length === 1 ? key.toLowerCase() : key;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function movementVector(keys: Set<string>): Vec2 {
  let x = 0;
  let y = 0;
  if (keys.has("ArrowLeft") || keys.has("a")) x -= 1;
  if (keys.has("ArrowRight") || keys.has("d")) x += 1;
  if (keys.has("ArrowUp") || keys.has("w")) y -= 1;
  if (keys.has("ArrowDown") || keys.has("s")) y += 1;
  if (x !== 0 && y !== 0) {
    const inv = Math.SQRT1_2;
    x *= inv;
    y *= inv;
  }
  return { x, y };
}

function getDifficulty(survivalMs: number) {
  return Math.min(1 + survivalMs / DIFFICULTY_RAMP_MS, MAX_DIFFICULTY);
}

function createInitialState(): InternalGameState {
  return {
    status: "playing",
    player: { x: -1, y: -1, radius: PLAYER_RADIUS },
    bullets: [],
    survivalMs: 0,
    grazeMs: 0,
    lastHudUpdateMs: 0,
    width: 0,
    height: 0,
    spawnTimers: {
      volley: 0,
      burst: BURST_INTERVAL_BASE,
      lane: LANE_INTERVAL_BASE,
    },
  };
}

function spawnVolley(state: InternalGameState, difficulty: number) {
  const speed = VOLLEY_SPEED_BASE * difficulty;
  for (let i = 0; i < VOLLEY_BULLETS_PER_WAVE; i += 1) {
    state.bullets.push({
      kind: "linear",
      x: Math.random() * state.width,
      y: -BULLET_RADIUS,
      vx: 0,
      vy: speed,
      radius: BULLET_RADIUS,
    });
  }
}

function spawnBurst(state: InternalGameState, difficulty: number) {
  const originX = state.width * (0.3 + Math.random() * 0.4);
  const originY = state.height * (0.15 + Math.random() * 0.2);
  const speed = BURST_SPEED_BASE * difficulty;
  for (let i = 0; i < BURST_BULLET_COUNT; i += 1) {
    const angle = (i / BURST_BULLET_COUNT) * Math.PI * 2;
    state.bullets.push({
      kind: "linear",
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: BULLET_RADIUS,
    });
  }
}

function spawnLane(state: InternalGameState, difficulty: number) {
  const fromLeft = Math.random() < 0.5;
  const baseY = state.height * (0.1 + Math.random() * 0.8);
  const speed = LANE_SPEED_BASE * difficulty;
  state.bullets.push({
    kind: "lane",
    x: fromLeft ? -BULLET_RADIUS : state.width + BULLET_RADIUS,
    y: baseY,
    baseY,
    vx: fromLeft ? speed : -speed,
    radius: BULLET_RADIUS,
    spawnTime: state.survivalMs,
  });
}

function spawnBullets(state: InternalGameState, dt: number) {
  const difficulty = getDifficulty(state.survivalMs);

  state.spawnTimers.volley -= dt;
  if (state.spawnTimers.volley <= 0) {
    spawnVolley(state, difficulty);
    state.spawnTimers.volley = VOLLEY_INTERVAL_BASE / difficulty;
  }

  if (state.survivalMs >= BURST_UNLOCK_MS) {
    state.spawnTimers.burst -= dt;
    if (state.spawnTimers.burst <= 0) {
      spawnBurst(state, difficulty);
      state.spawnTimers.burst = BURST_INTERVAL_BASE / difficulty;
    }
  }

  if (state.survivalMs >= LANE_UNLOCK_MS) {
    state.spawnTimers.lane -= dt;
    if (state.spawnTimers.lane <= 0) {
      spawnLane(state, difficulty);
      state.spawnTimers.lane = LANE_INTERVAL_BASE / difficulty;
    }
  }
}

function advanceBullets(state: InternalGameState, dt: number) {
  const survivalMs = state.survivalMs;
  state.bullets = state.bullets.filter((bullet) => {
    if (bullet.kind === "lane") {
      bullet.x += bullet.vx * dt;
      const age = (survivalMs - bullet.spawnTime) / 1000;
      bullet.y = bullet.baseY + Math.sin(age * LANE_FREQUENCY) * LANE_AMPLITUDE;
    } else {
      bullet.x += bullet.vx * dt;
      bullet.y += bullet.vy * dt;
    }
    return (
      bullet.x > -BOUNDS_MARGIN &&
      bullet.x < state.width + BOUNDS_MARGIN &&
      bullet.y > -BOUNDS_MARGIN &&
      bullet.y < state.height + BOUNDS_MARGIN
    );
  });
}

function hasCollision(state: InternalGameState) {
  if (state.player.x < 0) return false;
  return state.bullets.some((bullet) => {
    const dx = bullet.x - state.player.x;
    const dy = bullet.y - state.player.y;
    return Math.hypot(dx, dy) < bullet.radius + state.player.radius;
  });
}

function isGrazing(state: InternalGameState) {
  if (state.player.x < 0) return false;
  return state.bullets.some((bullet) => {
    const dx = bullet.x - state.player.x;
    const dy = bullet.y - state.player.y;
    const dist = Math.hypot(dx, dy);
    const hitDistance = bullet.radius + state.player.radius;
    const grazeDistance =
      bullet.radius + state.player.radius * GRAZE_RADIUS_MULTIPLIER;
    return dist >= hitDistance && dist < grazeDistance;
  });
}

export function useBulletHellGame(active: boolean): BulletHellGameApi {
  const [status, setStatus] = useState<GameStatus>("playing");
  const [elapsedMs, setElapsedMs] = useState(0);
  const [grazeMs, setGrazeMs] = useState(0);
  const [bestMs, setBestMs] = useLocalStorage({
    key: BEST_TIME_KEY,
    defaultValue: 0,
  });
  const [bestGrazeMs, setBestGrazeMs] = useLocalStorage({
    key: BEST_GRAZE_TIME_KEY,
    defaultValue: 0,
  });

  const stateRef = useRef<InternalGameState>(createInitialState());
  const pressedKeysRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!active) return;
    const pressedKeys = pressedKeysRef.current;

    function handleKeyDown(event: KeyboardEvent) {
      const key = normalizeKey(event.key);
      if (CONTROL_KEYS.has(key)) event.preventDefault();
      pressedKeys.add(key);
    }
    function handleKeyUp(event: KeyboardEvent) {
      pressedKeys.delete(normalizeKey(event.key));
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      pressedKeys.clear();
    };
  }, [active]);

  const restart = useCallback(() => {
    stateRef.current = createInitialState();
    setStatus("playing");
    setElapsedMs(0);
    setGrazeMs(0);
  }, []);

  const tick = useCallback(
    (dt: number, width: number, height: number) => {
      const state = stateRef.current;
      if (state.status === "gameOver") return;

      state.width = width;
      state.height = height;

      if (state.player.x < 0) {
        state.player.x = width / 2;
        state.player.y = height * 0.85;
      }

      state.survivalMs += dt * 1000;

      const move = movementVector(pressedKeysRef.current);
      state.player.x = clamp(
        state.player.x + move.x * PLAYER_SPEED * dt,
        state.player.radius,
        width - state.player.radius,
      );
      state.player.y = clamp(
        state.player.y + move.y * PLAYER_SPEED * dt,
        state.player.radius,
        height - state.player.radius,
      );

      spawnBullets(state, dt);
      advanceBullets(state, dt);

      if (hasCollision(state)) {
        state.status = "gameOver";
        const finalMs = Math.floor(state.survivalMs);
        const finalGrazeMs = Math.floor(state.grazeMs);
        setStatus("gameOver");
        setElapsedMs(finalMs);
        setGrazeMs(finalGrazeMs);
        setBestMs((prevBest) => Math.max(prevBest, finalMs));
        setBestGrazeMs((prevBest) => Math.max(prevBest, finalGrazeMs));
        return;
      }

      if (isGrazing(state)) {
        state.grazeMs += dt * 1000;
      }

      if (state.survivalMs - state.lastHudUpdateMs >= 100) {
        state.lastHudUpdateMs = state.survivalMs;
        setElapsedMs(Math.floor(state.survivalMs));
        setGrazeMs(Math.floor(state.grazeMs));
      }
    },
    [setBestMs, setBestGrazeMs],
  );

  const draw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      colors: BulletHellColors,
    ) => {
      const state = stateRef.current;

      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = colors.bullet;
      for (const bullet of state.bullets) {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (state.player.x >= 0) {
        ctx.globalAlpha = 0.35;
        ctx.strokeStyle = colors.player;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(
          state.player.x,
          state.player.y,
          state.player.radius * GRAZE_RADIUS_MULTIPLIER,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.fillStyle = colors.player;
        ctx.beginPath();
        ctx.arc(
          state.player.x,
          state.player.y,
          state.player.radius,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
    },
    [],
  );

  return {
    status,
    elapsedMs,
    bestMs,
    grazeMs,
    bestGrazeMs,
    tick,
    draw,
    restart,
  };
}
