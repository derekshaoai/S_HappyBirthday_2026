import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Cover } from "./components/Cover";
import { Finale } from "./components/Finale";
import { MapView } from "./components/MapView";
import { MusicPlayer } from "./components/MusicPlayer";
import { ProvencePicker } from "./components/ProvencePicker";
import { TripDetail } from "./components/TripDetail";
import { VideoModal } from "./components/VideoModal";
import { TOTAL, type Trip } from "./data/trips";
import { useProgress } from "./hooks/useProgress";

type Stage = "cover" | "map" | "finale";

function initialStage(): Stage {
  const value = new URLSearchParams(window.location.search).get("stage");
  return value === "map" || value === "finale" ? value : "cover";
}

export default function App() {
  const [stage, setStage] = useState<Stage>(() => initialStage());
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const [playingTrip, setPlayingTrip] = useState<Trip | null>(null);
  const [provenceOpen, setProvenceOpen] = useState(false);
  const { done, markDone, reset, count, total } = useProgress(TOTAL);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (playingTrip) {
        setPlayingTrip(null);
      } else if (activeTrip) {
        setActiveTrip(null);
      } else if (provenceOpen) {
        setProvenceOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeTrip, playingTrip, provenceOpen]);

  useEffect(() => {
    const open = Boolean(activeTrip || playingTrip || provenceOpen);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeTrip, playingTrip, provenceOpen]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [stage]);

  const openTrip = (trip: Trip) => {
    setProvenceOpen(false);
    setActiveTrip(trip);
  };

  const openVideo = (trip: Trip) => {
    setPlayingTrip(trip);
  };

  const handleReset = () => {
    if (!window.confirm("清空所有印章，从封面重新开始？")) return;
    reset();
    setActiveTrip(null);
    setPlayingTrip(null);
    setProvenceOpen(false);
    setStage("cover");
  };

  const openFinale = () => {
    setActiveTrip(null);
    setPlayingTrip(null);
    setProvenceOpen(false);
    setStage("finale");
  };

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {stage === "cover" && <Cover key="cover" onStart={() => setStage("map")} />}

        {stage === "map" && (
          <MapView
            key="map"
            done={done}
            count={count}
            total={total}
            onOpenTrip={openTrip}
            onOpenProvence={() => setProvenceOpen(true)}
            onOpenFinale={openFinale}
            onReset={handleReset}
            onCover={() => setStage("cover")}
          />
        )}

        {stage === "finale" && (
          <Finale key="finale" onBack={() => setStage("map")} onReset={handleReset} />
        )}
      </AnimatePresence>

      {provenceOpen && (
        <ProvencePicker
          done={done}
          onClose={() => setProvenceOpen(false)}
          onSelect={openTrip}
        />
      )}

      {activeTrip && (
        <TripDetail
          trip={activeTrip}
          done={done.includes(activeTrip.id)}
          onClose={() => setActiveTrip(null)}
          onPlay={() => openVideo(activeTrip)}
        />
      )}

      {playingTrip && (
        <VideoModal
          trip={playingTrip}
          count={count}
          total={total}
          onComplete={markDone}
          onClose={() => setPlayingTrip(null)}
        />
      )}

      <MusicPlayer stage={stage} />
    </div>
  );
}
