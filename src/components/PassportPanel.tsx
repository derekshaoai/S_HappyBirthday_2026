import { TOTAL, TRIPS, type Trip } from "../data/trips";

type Props = {
  done: string[];
  count: number;
  onOpenTrip: (trip: Trip) => void;
  onOpenFinale: () => void;
};

export function PassportPanel({ done, count, onOpenTrip, onOpenFinale }: Props) {
  return (
    <aside className="passport-panel" aria-label="旅行护照">
      <div className="panel-head">
        <div className="panel-kicker">TRAVEL PASSPORT</div>
        <h2>露比的旅行护照</h2>
        <p>
          从 2025 冬天到 2026 秋天，点开地图上的城市，或从下面选一站。每看完一段视频，就会盖上一枚印章。
        </p>
      </div>

      <div className="progress-row">
        <div
          className="progress-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={TOTAL}
          aria-valuenow={count}
          aria-label="旅行印章进度"
        >
          <div className="progress-fill" style={{ width: `${(count / TOTAL) * 100}%` }} />
        </div>
        <span className="progress-label">
          {count}/{TOTAL}
        </span>
      </div>

      <div className="trip-list">
        {TRIPS.map((trip) => {
          const isDone = done.includes(trip.id);
          return (
            <button
              key={trip.id}
              type="button"
              className={`trip-row${isDone ? " done" : ""}`}
              onClick={() => onOpenTrip(trip)}
            >
              <span className="trip-stop">{trip.stop}</span>
              <span className="trip-row-main">
                <span className="trip-city">
                  {trip.city}
                  {trip.region === "provence" && <span className="trip-tag">PROVENCE</span>}
                </span>
                <span className="trip-sub">
                  {trip.date} · {trip.sub}
                </span>
              </span>
              <span className="trip-status" aria-hidden="true">
                {isDone ? "✓" : "→"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="panel-note">
        <span className="panel-note-kicker">NEXT STOP</span>
        <span className="panel-note-text">还是和你。</span>
        <span className="panel-note-stamp" aria-hidden="true">
          ✦
        </span>
      </div>

      {count >= TOTAL && (
        <button type="button" className="finale-cta" onClick={onOpenFinale}>
          <span className="finale-cta-kicker">PASSPORT COMPLETE</span>
          <span className="finale-cta-title">护照已集满 · 打开终章</span>
          <span className="finale-cta-arrow" aria-hidden="true">
            →
          </span>
        </button>
      )}

      <div className="panel-foot">
        <span>LOOPY &amp; POBY · 2026</span>
        <span>{TOTAL} STOPS · 3 COUNTRIES</span>
      </div>
    </aside>
  );
}
