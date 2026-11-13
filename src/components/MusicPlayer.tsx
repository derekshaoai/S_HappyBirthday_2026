import { useEffect, useState } from "react";
import { music, type MusicState } from "../lib/music";

type Props = {
  stage: string;
};

export function MusicPlayer({ stage }: Props) {
  const [state, setState] = useState<MusicState>(() => music.getState());

  useEffect(() => music.subscribe(setState), []);

  useEffect(() => {
    music.preload();

    const onPointerDown = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest(".music-toggle")) return;
      music.start();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      window.removeEventListener("keydown", onKeyDown);
      music.start();
    };

    window.addEventListener("pointerdown", onPointerDown, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    music.transition();
  }, [stage]);

  if (!state.available) return null;

  const label = state.muted
    ? "开启背景音乐"
    : state.playing
      ? "关闭背景音乐"
      : "开启背景音乐";

  return (
    <button
      type="button"
      className={`music-toggle${state.muted ? " is-muted" : ""}${
        state.started ? "" : " is-idle"
      }`}
      onClick={() => music.toggle()}
      aria-label={label}
      aria-pressed={state.muted}
      title={label}
    >
      <span aria-hidden="true">♪</span>
    </button>
  );
}
