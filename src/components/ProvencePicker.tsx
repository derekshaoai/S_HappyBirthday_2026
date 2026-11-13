import { motion } from "framer-motion";
import { FRANCE_TRIPS, type Trip } from "../data/trips";
import { PosterArt } from "./PosterArt";

type Props = {
  done: string[];
  onClose: () => void;
  onSelect: (trip: Trip) => void;
};

export function ProvencePicker({ done, onClose, onSelect }: Props) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <motion.div
        className="modal-card provence-card"
        role="dialog"
        aria-modal="true"
        aria-label="普罗旺斯的三站"
        onMouseDown={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 22, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="关闭">
          ×
        </button>

        <div className="provence-head">
          <div className="panel-kicker">PROVENCE · 3 STOPS</div>
          <h2>普罗旺斯的三站</h2>
          <p>2026.09 · 三个地方离得很近，像一串被海风吹在一起的邮票。</p>
        </div>

        <div className="provence-grid">
          {FRANCE_TRIPS.map((trip) => {
            const isDone = done.includes(trip.id);
            return (
              <button
                key={trip.id}
                type="button"
                className={`provence-item${isDone ? " done" : ""}`}
                onClick={() => onSelect(trip)}
              >
                <PosterArt trip={trip} done={isDone} compact />
                <span className="provence-item-body">
                  <span className="trip-stop">{trip.stop}</span>
                  <strong>{trip.city}</strong>
                  <span>
                    {trip.date} · {trip.sub}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
