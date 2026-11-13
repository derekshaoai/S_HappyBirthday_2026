import { useEffect, useRef, useState } from "react";
import type { Trip } from "../data/trips";
import { music } from "../lib/music";
import { Character } from "./Character";

type Props = {
  trip: Trip;
  count: number;
  total: number;
  onComplete: (id: string) => void;
  onClose: () => void;
};

export function VideoModal({ trip, count, total, onComplete, onClose }: Props) {
  const [errored, setErrored] = useState(false);
  const [ended, setEnded] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    setErrored(false);
    setEnded(false);
    completedRef.current = false;
  }, [trip.id]);

  useEffect(() => {
    music.duck();
    return () => music.unduck();
  }, [trip.id]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete(trip.id);
    setEnded(true);
  };

  return (
    <div className="video-backdrop" onMouseDown={onClose} role="presentation">
      <div
        className="video-shell"
        role="dialog"
        aria-modal="true"
        aria-label={`${trip.city} 的视频`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="video-head">
          <div>
            <div className="video-kicker">
              STOP {trip.stop} · {trip.country}
            </div>
            <h2>
              {trip.city} · {trip.title}
            </h2>
          </div>
          <button type="button" className="video-close" onClick={onClose} aria-label="关闭视频">
            ×
          </button>
        </header>

        <div className="video-frame">
          {!errored ? (
            <video
              key={trip.id}
              src={trip.video}
              autoPlay
              controls
              playsInline
              preload="metadata"
              onEnded={finish}
              onError={() => setErrored(true)}
            />
          ) : (
            !ended && (
              <div className="video-missing">
                <Character
                  src="/media/characters/loopy-wave.webp"
                  alt=""
                  className="video-loopy"
                  fallback={
                    <div className="video-missing-icon" aria-hidden="true">
                      🎬
                    </div>
                  }
                />
                <h3>这段视频还在路上</h3>
                <p>
                  把文件放到 <code>public{trip.video}</code>，刷新就能播放。
                </p>
                <button type="button" className="ghost-btn" onClick={finish}>
                  预览：先盖章
                </button>
              </div>
            )
          )}

          {ended && (
            <div className="stamp-burst" aria-live="polite">
              <div className="stamp">已盖章</div>
              <Character
                src="/media/characters/poby-thumbs-up.webp"
                alt=""
                className="stamp-poby"
              />
            </div>
          )}
        </div>

        <footer className="video-foot">
          {ended ? (
            <>
              <span>
                {count >= total ? "护照集满了。去最后一页看看吧。" : "印章盖好了。继续去下一站吧。"}
              </span>
              <button type="button" className="primary-btn small" onClick={onClose}>
                继续旅行
              </button>
            </>
          ) : (
            <span className="video-hint">视频结束后会自动盖章 · 建议开声音</span>
          )}
        </footer>
      </div>
    </div>
  );
}
