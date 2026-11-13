import { useMemo } from "react";
import { motion } from "framer-motion";
import { Character } from "./Character";

type Props = {
  onBack: () => void;
  onReset: () => void;
};

function Cake() {
  return (
    <svg className="cake" viewBox="0 0 240 200" aria-hidden="true">
      <ellipse cx="120" cy="184" rx="84" ry="10" fill="rgba(0,0,0,.25)" />
      <ellipse cx="120" cy="176" rx="88" ry="12" fill="#f3dfb4" opacity=".2" />

      <rect x="48" y="118" width="144" height="58" rx="16" fill="#f3c6a4" />
      <rect x="48" y="118" width="144" height="18" rx="9" fill="#fbe4d1" />
      <rect x="64" y="88" width="112" height="40" rx="13" fill="#f2b3c1" />
      <rect x="64" y="88" width="112" height="14" rx="7" fill="#fbd3dc" />
      <rect x="82" y="62" width="76" height="34" rx="11" fill="#f6d7b8" />
      <rect x="82" y="62" width="76" height="12" rx="6" fill="#fcebdc" />

      {[98, 120, 142].map((x, index) => (
        <g key={x}>
          <rect
            x={x - 2.5}
            y={36}
            width={5}
            height={28}
            rx={2.5}
            fill={index === 1 ? "#f4a7bd" : "#fff7ec"}
          />
          <path
            className="flame"
            d={`M${x} 22 C ${x + 6} 28, ${x + 5} 34, ${x} 38 C ${x - 5} 34, ${x - 6} 28, ${x} 22 Z`}
            fill="#f6c453"
            style={{ animationDelay: `${index * 0.18}s` }}
          />
          <path
            d={`M${x} 28 C ${x + 3} 31, ${x + 3} 34, ${x} 36 C ${x - 3} 34, ${x - 3} 31, ${x} 28 Z`}
            fill="#fff3c4"
          />
        </g>
      ))}

      <circle cx="76" cy="146" r="2.5" fill="#ef8b7c" />
      <circle cx="98" cy="158" r="2.5" fill="#8ecae6" />
      <circle cx="146" cy="150" r="2.5" fill="#f4a7bd" />
      <circle cx="166" cy="162" r="2.5" fill="#d5a24a" />
      <circle cx="88" cy="106" r="2.5" fill="#fff7ec" opacity=".8" />
      <circle cx="152" cy="108" r="2.5" fill="#fff7ec" opacity=".8" />
    </svg>
  );
}

export function Finale({ onBack, onReset }: Props) {
  const confetti = useMemo(() => {
    const colors = ["#f4a7bd", "#f0c36a", "#8ecae6", "#ef8b7c", "#fff3d6"];
    return Array.from({ length: 30 }, (_, index) => ({
      left: `${(index * 37) % 100}%`,
      delay: `${(index % 10) * 0.4}s`,
      duration: `${4.5 + (index % 5) * 0.7}s`,
      background: colors[index % colors.length],
      rotate: `${(index * 47) % 360}deg`,
    }));
  }, []);

  return (
    <motion.div
      className="finale"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="confetti" aria-hidden="true">
        {confetti.map((piece, index) => (
          <span
            key={index}
            className="confetti-piece"
            style={{
              left: piece.left,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
              background: piece.background,
              transform: `rotate(${piece.rotate})`,
            }}
          />
        ))}
      </div>

      <div className="finale-card">
        <div className="finale-kicker">THE PASSPORT IS FULL</div>
        <h1>生日快乐，露比</h1>
        <p className="finale-sub">七枚印章，七个地方，都是和你。</p>

        <Character
          src="/media/characters/duo-celebrate.webp"
          alt="波比和露比一起庆祝生日"
          className="finale-duo"
          fallback={<Cake />}
        />

        <div className="letter">
          <p>
            从 2025 冬天到 2026 秋天，我们去了很多地方。看了雪山，吃了鸡煲和海胆，在布达佩斯的夜船上裹过同一条毯子，潜进海里，画了山，还在红土场上一起干了活。
          </p>
          <p>但最喜欢的不是这些地方，是每个地方都有你。</p>
          <p>生日快乐，露比。下一站，还是和你。</p>
        </div>

        <div className="finale-actions">
          <button type="button" className="primary-btn" onClick={onBack}>
            回到旅行地图
          </button>
          <button type="button" className="ghost-btn light" onClick={onReset}>
            重新开始
          </button>
        </div>

        <p className="finale-sign">— 波比</p>
      </div>
    </motion.div>
  );
}
