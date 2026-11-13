import { TRIPS, type Trip } from "../data/trips";
import { Character } from "./Character";

type Props = {
  done: string[];
  onOpenTrip: (trip: Trip) => void;
  onOpenFinale: () => void;
};

export function MapGuide({ done, onOpenTrip, onOpenFinale }: Props) {
  const nextTrip = TRIPS.find((trip) => !done.includes(trip.id));
  const complete = !nextTrip;

  const label = complete
    ? "护照集满了"
    : nextTrip.region === "provence"
      ? "普罗旺斯"
      : nextTrip.city;

  const sub = complete ? "去最后一页看看吧" : `${nextTrip.date} · 点我直接出发`;

  const handleClick = () => {
    if (nextTrip) {
      onOpenTrip(nextTrip);
    } else {
      onOpenFinale();
    }
  };

  return (
    <div className={`map-guide${complete ? " is-complete" : ""}`}>
      <button type="button" className="guide-bubble" onClick={handleClick}>
        <span className="guide-kicker">POBY SAYS</span>
        <strong>{complete ? "护照集满了" : `下一站：${label}`}</strong>
        <span className="guide-sub">{sub}</span>
      </button>

      <Character
        src="/media/characters/poby-point.webp"
        alt=""
        className="guide-poby"
      />
    </div>
  );
}
