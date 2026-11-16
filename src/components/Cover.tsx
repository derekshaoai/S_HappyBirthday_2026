import { motion } from "framer-motion";
import { Character } from "./Character";

type Props = {
  onStart: () => void;
};

export function Cover({ onStart }: Props) {
  return (
    <motion.div
      className="cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="cover-inner">
        <div className="cover-copy">
          <p className="cover-kicker">A BIRTHDAY PASSPORT FOR LOOPY</p>
          <h1>
            给露比的
            <br />
            <em>生日护照</em>
          </h1>
          <p className="cover-lede">
            七个城市，七段回忆。点开地图，把散落的旅行印章一枚枚找回来。
          </p>

          <div className="cover-actions">
            <button type="button" className="primary-btn cover-btn" onClick={onStart}>
              <span>翻开护照</span>
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </button>
            <span className="cover-note">建议戴耳机 · 大约 7 分钟</span>
          </div>

          <div className="cover-meta">
            <span>7 STOPS</span>
            <span>3 COUNTRIES</span>
            <span>2025.12 — 2026.10</span>
          </div>
        </div>

        <div className="cover-passport-wrap">
          <div
            className="passport"
            role="button"
            tabIndex={0}
            aria-label="翻开护照"
            onClick={onStart}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onStart();
              }
            }}
          >
            <div className="passport-inner">
              <div className="passport-top">
                <div className="passport-emblem" aria-hidden="true">
                  ✦
                </div>
                <div>
                  <div className="passport-org">LOOPY &amp; POBY</div>
                  <div className="passport-type">BIRTHDAY PASSPORT</div>
                </div>
              </div>

              <div className="passport-photo">
                <div className="passport-photo-frame">
                  <svg viewBox="0 0 300 180" aria-hidden="true">
                  <rect width="300" height="180" fill="#f4dfc8" />
                  <circle cx="218" cy="58" r="26" fill="#e3a15e" />
                  <path
                    d="M0 152 L70 82 L122 128 L182 62 L252 132 L300 102 L300 180 L0 180 Z"
                    fill="#d9b08c"
                    opacity=".72"
                  />
                  <path
                    d="M0 168 L88 112 L160 150 L236 98 L300 138 L300 180 L0 180 Z"
                    fill="#b98560"
                    opacity=".55"
                  />
                  </svg>
                  <Character
                    src="/media/characters/passport-photo.webp"
                    alt="露比和波比的护照照片"
                    className="passport-photo-img"
                  />
                </div>
                <span className="passport-photo-caption">LOOPY · 生日特别版</span>
              </div>

              <div className="passport-fields">
                <div className="passport-field">
                  <span>NAME</span>
                  <strong>露比 / LOOPY</strong>
                </div>
                <div className="passport-field">
                  <span>ISSUED BY</span>
                  <strong>波比 / POBY</strong>
                </div>
                <div className="passport-field">
                  <span>VALID FOR</span>
                  <strong>所有和你一起的旅行</strong>
                </div>
              </div>

              <div className="passport-stamp" aria-hidden="true">
                7
                <small>STOPS</small>
              </div>
            </div>
          </div>

          <Character
            src="/media/characters/loopy-peek.webp"
            alt=""
            className="cover-loopy"
          />
        </div>
      </div>

      <div className="cover-foot">LOOPY &amp; POBY · BIRTHDAY EDITION · 2026</div>
    </motion.div>
  );
}
