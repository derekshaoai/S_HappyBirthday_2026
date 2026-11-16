import { motion } from "framer-motion";
import type { Trip } from "../data/trips";
import { PosterArt } from "./PosterArt";

type Props = {
  trip: Trip;
  done: boolean;
  onClose: () => void;
  onPlay: () => void;
};

export function TripDetail({ trip, done, onClose, onPlay }: Props) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <motion.div
        className="modal-card trip-detail"
        role="dialog"
        aria-modal="true"
        aria-label={`${trip.city} 的旅行回忆`}
        onMouseDown={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 22, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="关闭">
          ×
        </button>

        <PosterArt trip={trip} done={done} onPlay={onPlay} />

        <div className="trip-detail-body">
          <div className="detail-kicker">
            STOP {trip.stop} · {trip.date} · {trip.country}
          </div>
          <h3>{trip.title}</h3>
          <p className="detail-memory">{trip.memory}</p>

          <div className="detail-actions">
            <button type="button" className="primary-btn" onClick={onPlay}>
              {done ? "再看一遍" : "播放这段回忆"}
            </button>
            <span className="detail-hint">视频结束后会自动盖章</span>
          </div>

          {done && <div className="done-badge">✓ 这一站已经盖章</div>}
        </div>
      </motion.div>
    </div>
  );
}
