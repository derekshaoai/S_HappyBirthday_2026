import type { CSSProperties } from "react";
import type { Trip } from "../data/trips";

type Props = {
  trip: Trip;
  done?: boolean;
  onPlay?: () => void;
  compact?: boolean;
};

function Scene({ trip }: { trip: Trip }) {
  const { accent, id } = trip;

  if (id === "deqin") {
    return (
      <>
        <circle cx="640" cy="132" r="92" fill={accent} opacity="0.12" />
        <circle cx="640" cy="132" r="50" fill={accent} opacity="0.9" />

        <path
          d="M0 338 L90 252 L160 304 L262 186 L356 300 L468 214 L560 312 L660 236 L760 304 L800 276 L800 450 L0 450Z"
          fill={accent}
          opacity="0.18"
        />
        <path
          d="M0 390 L120 262 L218 346 L342 202 L468 334 L598 244 L724 334 L800 292 L800 450 L0 450Z"
          fill={accent}
          opacity="0.46"
        />

        <path d="M342 202 L306 256 L326 250 L342 270 L360 248 L382 258 Z" fill="#fffaf2" opacity="0.9" />
        <path d="M120 262 L92 306 L110 300 L122 316 L138 298 L154 306 Z" fill="#fffaf2" opacity="0.8" />
        <path d="M598 244 L568 292 L588 286 L602 302 L618 284 L634 292 Z" fill="#fffaf2" opacity="0.8" />

        <g transform="rotate(-4 250 150)">
          <path d="M70 150 L430 150" fill="none" stroke="#7d6858" strokeWidth="1.5" opacity="0.45" />
          {[
            "#e06f61",
            "#f3dfb4",
            "#8ecae6",
            "#7a9b76",
            "#fffaf2",
            "#e06f61",
            "#f3dfb4",
          ].map((color, index) => (
            <rect
              key={color + index}
              x={96 + index * 46}
              y={150}
              width="15"
              height="20"
              rx="2"
              fill={color}
              opacity="0.9"
              transform={`rotate(${index % 2 === 0 ? 5 : -5} ${103 + index * 46} 150)`}
            />
          ))}
        </g>

        <path d="M0 414 L800 404 L800 450 L0 450 Z" fill="#7d6858" opacity="0.16" />
      </>
    );
  }

  if (id === "shunde") {
    return (
      <>
        <circle cx="646" cy="118" r="46" fill={accent} opacity="0.8" />

        <path
          d="M0 310 Q 120 260 220 300 T 440 290 T 660 300 T 800 286 L800 450 L0 450Z"
          fill="#7a9b76"
          opacity="0.18"
        />
        <rect x="0" y="322" width="800" height="128" fill="#9fc9c5" opacity="0.72" />
        <path d="M0 350 Q 100 340 200 350 T 400 350 T 600 350 T 800 350" fill="none" stroke="#fffaf2" strokeWidth="2" opacity="0.55" />
        <path d="M0 382 Q 100 372 200 382 T 400 382 T 600 382 T 800 382" fill="none" stroke="#fffaf2" strokeWidth="1.5" opacity="0.35" />

        <path d="M80 338 Q 230 242 392 338" fill="none" stroke="#b9785a" strokeWidth="12" opacity="0.85" />
        <path d="M92 338 Q 230 256 380 338" fill="none" stroke="#f8dfd4" strokeWidth="3" opacity="0.6" />

        <rect x="620" y="270" width="130" height="72" fill="#b9785a" opacity="0.72" />
        <path d="M610 270 L685 230 L760 270 Z" fill="#8b4a3a" opacity="0.82" />
        <rect x="642" y="292" width="20" height="24" fill="#f8dfd4" opacity="0.72" />
        <rect x="700" y="292" width="20" height="24" fill="#f8dfd4" opacity="0.72" />

      </>
    );
  }

  if (id === "dalian") {
    return (
      <>
        <circle cx="650" cy="86" r="28" fill="#f6e7c8" opacity="0.9" />
        <circle cx="638" cy="78" r="28" fill="var(--soft)" opacity="0.8" />
        <g fill="#f6e7c8" opacity="0.65">
          <circle cx="120" cy="74" r="1.5" />
          <circle cx="222" cy="122" r="1.2" />
          <circle cx="318" cy="62" r="1.4" />
          <circle cx="470" cy="108" r="1.2" />
          <circle cx="548" cy="58" r="1.5" />
          <circle cx="742" cy="132" r="1.3" />
        </g>

        <rect x="0" y="300" width="800" height="150" fill="#162338" />
        <path d="M0 324 Q 100 314 200 324 T 400 324 T 600 324 T 800 324" fill="none" stroke="#e08a4a" strokeWidth="2" opacity="0.28" />
        <path d="M0 356 Q 100 346 200 356 T 400 356 T 600 356 T 800 356" fill="none" stroke="#8fb4d8" strokeWidth="1.5" opacity="0.22" />

        <path d="M620 300 L800 300 L800 372 L650 372 Z" fill="#0e1726" opacity="0.9" />
        <rect x="686" y="176" width="48" height="124" fill="#f3dfb4" opacity="0.92" />
        <rect x="678" y="152" width="64" height="26" fill="#e08a4a" />
        <path d="M672 152 L710 126 L748 152 Z" fill="#e06f61" />
        <rect x="702" y="206" width="16" height="22" rx="3" fill="#162338" opacity="0.6" />
        <rect x="702" y="244" width="16" height="22" rx="3" fill="#162338" opacity="0.6" />
        <path d="M710 140 L560 86 L560 194 Z" fill="#f6e7c8" opacity="0.08" />
        <path d="M0 380 Q 100 372 200 380 T 400 380 T 600 380 T 800 380" fill="none" stroke="#8fb4d8" strokeWidth="1.5" opacity="0.2" />
      </>
    );
  }

  if (id === "cassis") {
    return (
      <>
        <circle cx="400" cy="92" r="44" fill="#f6c453" opacity="0.9" />
        <rect x="0" y="290" width="800" height="160" fill="#5fa8b8" opacity="0.85" />
        <path d="M0 320 Q 100 310 200 320 T 400 320 T 600 320 T 800 320" fill="none" stroke="#fffaf2" strokeWidth="2" opacity="0.35" />
        <path d="M0 356 Q 100 346 200 356 T 400 356 T 600 356 T 800 356" fill="none" stroke="#fffaf2" strokeWidth="1.5" opacity="0.25" />

        <path d="M0 120 L190 120 L268 300 L190 450 L0 450 Z" fill="#f4f1e8" />
        <path d="M0 120 L190 120 L268 300 L210 320 L120 240 L0 250 Z" fill="#d8d3c5" opacity="0.7" />
        <path d="M800 80 L610 80 L536 300 L610 450 L800 450 Z" fill="#f4f1e8" />
        <path d="M800 80 L610 80 L536 300 L600 318 L700 240 L800 250 Z" fill="#d8d3c5" opacity="0.7" />

        <path d="M84 220 L104 160 L124 220 Z" fill="#4f6f5a" opacity="0.9" />
        <path d="M120 240 L144 168 L168 240 Z" fill="#4f6f5a" opacity="0.7" />
        <path d="M672 220 L696 150 L720 220 Z" fill="#4f6f5a" opacity="0.8" />

        <path d="M330 350 Q 400 380 470 350 L450 330 L350 330 Z" fill="#fffaf2" />
        <path d="M400 330 L400 290 L430 320 Z" fill="#fffaf2" opacity="0.9" />

        <g fill="#ddf0f2" opacity="0.7">
          <path d="M250 380 q 14 -10 28 0 q -14 10 -28 0 Z" />
          <path d="M520 400 q 12 -8 24 0 q -12 8 -24 0 Z" />
        </g>
      </>
    );
  }

  if (id === "aix") {
    return (
      <>
        <circle cx="636" cy="104" r="44" fill="#f6c453" opacity="0.85" />
        <path d="M0 300 L110 220 L210 266 L344 176 L470 250 L606 190 L720 250 L800 226 L800 360 L0 360 Z" fill="#a98bb5" opacity="0.45" />
        <path d="M0 328 L120 258 L230 300 L360 220 L486 292 L610 232 L730 292 L800 270 L800 390 L0 390 Z" fill="#a98bb5" opacity="0.25" />

        <path d="M0 370 Q 180 350 360 370 T 720 370 T 800 366" fill="none" stroke="#a98bb5" strokeWidth="3" opacity="0.5" />
        <path d="M0 396 Q 180 376 360 396 T 720 396 T 800 392" fill="none" stroke="#a98bb5" strokeWidth="2" opacity="0.35" />
        <path d="M0 422 Q 180 402 360 422 T 720 422 T 800 418" fill="none" stroke="#a98bb5" strokeWidth="2" opacity="0.25" />

        <path d="M84 360 Q 70 260 84 206 Q 98 260 106 360 Z" fill="#5f6f5a" opacity="0.9" />
        <path d="M142 360 Q 132 286 142 242 Q 154 286 160 360 Z" fill="#5f6f5a" opacity="0.7" />
        <path d="M760 360 Q 748 280 760 230 Q 772 280 778 360 Z" fill="#5f6f5a" opacity="0.8" />

        <g>
          <path d="M540 408 L570 300 L600 408" fill="none" stroke="#8b4a3a" strokeWidth="5" strokeLinecap="round" />
          <rect x="536" y="292" width="68" height="54" rx="3" fill="#fffaf2" stroke="#8b4a3a" strokeWidth="3" />
          <path d="M542 332 L562 308 L580 326 L594 312 L600 340 L542 340 Z" fill="#a98bb5" opacity="0.6" />
        </g>

        <g>
          <path
            d="M704 382 Q 704 397 716 397 Q 728 397 728 382 Z"
            fill="#a98bb5"
            opacity="0.45"
          />
          <g fill="none" stroke="#8b4a3a" strokeWidth="3" opacity="0.55">
            <path d="M700 388 Q 700 362 716 362 Q 732 362 732 388 Q 732 404 716 404 Q 700 404 700 388 Z" />
            <path d="M716 404 L716 426 M 704 428 L728 428" />
          </g>
        </g>
      </>
    );
  }

  if (id === "cagnes") {
    return (
      <>
        <circle cx="400" cy="96" r="42" fill="#f6c453" opacity="0.8" />
        <g>
          <path d="M48 232 Q 40 186 46 148" fill="none" stroke="#8b6a4a" strokeWidth="6" strokeLinecap="round" />
          <path d="M46 148 Q 4 128 -22 142 Q 10 154 42 158 Z" fill="#5f7a5a" opacity="0.9" />
          <path d="M46 148 Q 22 106 -10 96 Q 22 124 42 156 Z" fill="#5f7a5a" opacity="0.82" />
          <path d="M46 148 Q 52 102 72 76 Q 68 116 54 154 Z" fill="#5f7a5a" opacity="0.9" />
          <path d="M46 148 Q 84 108 118 108 Q 88 134 54 156 Z" fill="#5f7a5a" opacity="0.85" />
          <path d="M46 148 Q 98 142 124 166 Q 88 168 50 156 Z" fill="#5f7a5a" opacity="0.8" />
        </g>
        <g>
          <path d="M760 232 Q 768 186 762 148" fill="none" stroke="#8b6a4a" strokeWidth="6" strokeLinecap="round" />
          <path d="M762 148 Q 720 128 694 142 Q 726 154 758 158 Z" fill="#5f7a5a" opacity="0.9" />
          <path d="M762 148 Q 738 106 706 96 Q 738 124 758 156 Z" fill="#5f7a5a" opacity="0.82" />
          <path d="M762 148 Q 768 102 788 76 Q 784 116 770 154 Z" fill="#5f7a5a" opacity="0.9" />
          <path d="M762 148 Q 800 108 834 108 Q 804 134 770 156 Z" fill="#5f7a5a" opacity="0.85" />
          <path d="M762 148 Q 814 142 840 166 Q 804 168 766 156 Z" fill="#5f7a5a" opacity="0.8" />
        </g>

        <rect x="92" y="226" width="616" height="196" rx="12" fill="#d97757" opacity="0.3" />
        <path
          d="M400 226 L400 422 M222 226 L222 422 M578 226 L578 422 M92 324 L708 324"
          stroke="#fffaf2"
          strokeOpacity="0.55"
          strokeWidth="2"
        />

        <path d="M92 324 L708 324" stroke="#fffaf2" strokeWidth="4" opacity="0.7" />
        <path d="M92 310 L708 310 M92 338 L708 338" stroke="#fffaf2" strokeWidth="1" opacity="0.35" />
        {Array.from({ length: 14 }).map((_, index) => (
          <path
            key={index}
            d={`M${120 + index * 44} 310 L${120 + index * 44} 338`}
            stroke="#fffaf2"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}

      </>
    );
  }

  // Budapest
  return (
    <>
      <circle cx="660" cy="86" r="30" fill="#f6e7c8" opacity="0.92" />
      <circle cx="648" cy="78" r="30" fill="var(--soft)" opacity="0.78" />
      <g fill="#f6e7c8" opacity="0.7">
        <circle cx="130" cy="78" r="1.6" />
        <circle cx="226" cy="128" r="1.2" />
        <circle cx="318" cy="62" r="1.4" />
        <circle cx="470" cy="108" r="1.2" />
        <circle cx="548" cy="58" r="1.5" />
        <circle cx="742" cy="132" r="1.3" />
      </g>

      <rect x="0" y="322" width="800" height="128" fill="#223252" />

      <rect x="150" y="262" width="470" height="60" fill={accent} opacity="0.95" />
      <path d="M330 262 L330 222 Q 385 168 440 222 L440 262 Z" fill={accent} />
      <rect x="374" y="160" width="12" height="30" fill={accent} />
      <path d="M380 148 L373 168 L387 168 Z" fill={accent} />
      <path d="M190 262 L190 230 L210 218 L230 230 L230 262 Z" fill={accent} opacity="0.9" />
      <path d="M540 262 L540 230 L560 218 L580 230 L580 262 Z" fill={accent} opacity="0.9" />

      <g fill="#1b2440" opacity="0.55">
        {Array.from({ length: 18 }).map((_, index) => (
          <rect
            key={index}
            x={168 + index * 24}
            y={278}
            width={8}
            height={26}
            rx={3}
          />
        ))}
      </g>

      <g stroke={accent} strokeWidth="2" opacity="0.3">
        <path d="M180 344 L180 420" />
        <path d="M300 340 L300 438" />
        <path d="M430 346 L430 426" />
        <path d="M560 340 L560 434" />
      </g>
      <path
        d="M0 360 Q 80 352 160 360 T 320 360 T 480 360 T 640 360 T 800 360"
        fill="none"
        stroke="#8fb4d8"
        strokeWidth="1"
        opacity="0.25"
      />
      <path d="M415 382 L505 382 L492 396 L430 396 Z" fill="#0f1728" opacity="0.55" />
      <circle cx="505" cy="382" r="2.5" fill="#f0c36a" opacity="0.8" />
    </>
  );
}

export function PosterArt({ trip, done = false, onPlay, compact = false }: Props) {
  return (
    <div
      className={`poster-art${compact ? " compact" : ""}${trip.posterTheme === "dark" ? " dark" : ""}`}
      style={
        {
          "--accent": trip.accent,
          "--soft": trip.accentSoft,
        } as CSSProperties
      }
    >
      <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="800" height="450" fill="var(--soft)" />
        <Scene trip={trip} />
      </svg>

      <div className="poster-scrim" aria-hidden="true" />

      <div className="poster-top">
        <span className="poster-stop">STOP {trip.stop}</span>
        {done && <span className="poster-stamp">已盖章</span>}
      </div>

      <div className="poster-bottom">
        <span className="poster-city">{trip.city}</span>
        <span className="poster-sub">{trip.sub}</span>
      </div>

      {onPlay && (
        <button
          type="button"
          className="poster-play"
          onClick={onPlay}
          aria-label={`播放 ${trip.city} 的视频`}
        >
          <span className="play-triangle" />
        </button>
      )}
    </div>
  );
}
