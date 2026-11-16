import { motion } from "framer-motion";
import type { Trip } from "../data/trips";
import { MapGuide } from "./MapGuide";
import { PassportPanel } from "./PassportPanel";
import { WorldMap } from "./WorldMap";

type Props = {
  done: string[];
  count: number;
  total: number;
  onOpenTrip: (trip: Trip) => void;
  onOpenProvence: () => void;
  onOpenFinale: () => void;
  onReset: () => void;
  onCover: () => void;
};

export function MapView({
  done,
  count,
  total,
  onOpenTrip,
  onOpenProvence,
  onOpenFinale,
  onReset,
  onCover,
}: Props) {
  return (
    <motion.div
      className="map-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            ✦
          </div>
          <div>
            <div className="brand-title">Loopy &amp; Poby&apos;s Travel Journal</div>
            <div className="brand-sub">给露比的生日护照</div>
          </div>
        </div>

        <div className="topbar-right">
          <div className="topbar-progress" aria-label={`已收集 ${count} 枚印章，共 ${total} 枚`}>
            <span className="topbar-count">
              {count}
              <em>/{total}</em>
            </span>
            <span className="topbar-label">枚印章</span>
          </div>
          <button type="button" className="ghost-btn" onClick={onCover}>
            封面
          </button>
        </div>
      </header>

      <main className="map-layout">
        <section className="map-card" aria-label="可探索的世界地图">
          <WorldMap done={done} onOpenTrip={onOpenTrip} onOpenProvence={onOpenProvence} />
          <MapGuide done={done} onOpenTrip={onOpenTrip} onOpenFinale={onOpenFinale} />
        </section>

        <PassportPanel
          done={done}
          count={count}
          onOpenTrip={onOpenTrip}
          onOpenFinale={onOpenFinale}
        />
      </main>

      <footer className="page-foot">
        <span>MADE WITH ♥ FOR LOOPY</span>
        <button type="button" className="link-btn" onClick={onReset}>
          重新开始
        </button>
      </footer>
    </motion.div>
  );
}
