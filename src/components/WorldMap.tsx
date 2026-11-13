import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { geoGraticule10, geoInterpolate, geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, LineString } from "geojson";
import { PROVENCE, ROUTE, TRIPS, type Trip } from "../data/trips";

type Props = {
  done: string[];
  onOpenTrip: (trip: Trip) => void;
  onOpenProvence: () => void;
};

type PinProps = {
  x: number;
  y: number;
  label: string;
  done: boolean;
  cluster?: boolean;
  clusterCount?: number;
  side?: "left" | "right";
  dy?: number;
  onClick: () => void;
};

function MapPin({
  x,
  y,
  label,
  done,
  cluster = false,
  clusterCount = 0,
  side = "right",
  dy = -14,
  onClick,
}: PinProps) {
  const labelRef = useRef<SVGTextElement | null>(null);
  const [labelWidth, setLabelWidth] = useState(() =>
    Math.max(56, label.length * 14 + 28)
  );

  useLayoutEffect(() => {
    const node = labelRef.current;
    if (!node) return;
    try {
      const width = node.getBBox().width;
      if (width > 0) {
        setLabelWidth(Math.max(56, Math.ceil(width + 30)));
      }
    } catch {
      // Hidden labels (mobile) may not report a box; keep the estimate.
    }
  }, [label]);

  const labelX = side === "left" ? -labelWidth - 20 : 20;

  return (
    <g
      className={`map-pin${done ? " is-done" : ""}${cluster ? " is-cluster" : ""}`}
      transform={`translate(${x} ${y})`}
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
    >
      <circle className="pin-halo" r={18} />
      <circle className="pin-ring" r={15} />
      <circle className="pin-core" r={7} />
      {done && <path className="pin-check" d="M -4 0 L -1 3 L 5 -3" />}

      {cluster && (
        <g transform="translate(0 -24)">
          <circle className="pin-badge" r={9} />
          <text className="pin-badge-text" y={3.5}>
            {clusterCount}
          </text>
        </g>
      )}

      <g className="pin-label" transform={`translate(${labelX} ${dy})`}>
        <rect className="pin-label-bg" x={0} y={-15} width={labelWidth} height={30} rx={15} />
        <text ref={labelRef} className="pin-label-text" x={15} y={5}>
          {label}
        </text>
      </g>
    </g>
  );
}

export function WorldMap({ done, onOpenTrip, onOpenProvence }: Props) {
  const [land, setLand] = useState<FeatureCollection | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/data/countries-110m.json")
      .then((response) => {
        if (!response.ok) throw new Error("map data unavailable");
        return response.json();
      })
      .then((topo: any) => {
        if (cancelled) return;
        const collection = feature(
          topo,
          topo.objects.countries
        ) as unknown as FeatureCollection;
        const filtered: FeatureCollection = {
          ...collection,
          features: collection.features.filter(
            (item) => (item.properties as { name?: string } | null)?.name !== "Antarctica"
          ),
        };
        setLand(filtered);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const projection = useMemo(() => {
    if (!land) return null;
    return geoNaturalEarth1().fitExtent(
      [
        [12, 12],
        [988, 548],
      ],
      land
    );
  }, [land]);

  const path = useMemo(() => (projection ? geoPath(projection) : null), [projection]);

  const route = useMemo(() => {
    if (!projection) return "";

    const points: [number, number][] = [];

    for (let leg = 0; leg < ROUTE.length - 1; leg += 1) {
      const interpolate = geoInterpolate(ROUTE[leg], ROUTE[leg + 1]);
      for (let index = 0; index < 64; index += 1) {
        points.push(interpolate(index / 64) as [number, number]);
      }
    }
    points.push(ROUTE[ROUTE.length - 1]);

    const line: LineString = { type: "LineString", coordinates: points };
    return geoPath(projection)(line) ?? "";
  }, [projection]);

  const soloTrips = TRIPS.filter((trip) => !trip.region);
  const provenceTrips = TRIPS.filter((trip) => trip.region === "provence");
  const provenceDone = provenceTrips.filter((trip) => done.includes(trip.id)).length;
  const provencePoint = projection?.(PROVENCE.coords) ?? null;

  return (
    <div className="map-wrap">
      {!land && !error && <div className="map-state">正在展开地图…</div>}
      {error && <div className="map-state">地图加载失败，刷新试试。</div>}

      {land && projection && path && (
        <svg
          className="world-map"
          viewBox="0 0 1000 560"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`世界地图，标记了 ${TRIPS.length} 段旅行回忆`}
        >
          <defs>
            <radialGradient id="oceanGradient" cx="48%" cy="42%" r="72%">
              <stop offset="0%" stopColor="#edf8f8" />
              <stop offset="100%" stopColor="#d5eaec" />
            </radialGradient>
          </defs>

          <rect width="1000" height="560" fill="url(#oceanGradient)" />
          <path className="graticule" d={path(geoGraticule10()) ?? ""} />

          <g className="countries">
            {land.features.map((item, index) => (
              <path
                key={String(item.id ?? index)}
                className="country"
                d={path(item) ?? ""}
              />
            ))}
          </g>

          <path className="route-under" d={route} />
          <path className="route-line" d={route} />

          {soloTrips.map((trip) => {
            const point = projection(trip.coords);
            if (!point) return null;
            return (
              <MapPin
                key={trip.id}
                x={point[0]}
                y={point[1]}
                label={trip.mapLabel ?? trip.city}
                done={done.includes(trip.id)}
                side={trip.mapSide ?? "right"}
                dy={trip.mapDy ?? -14}
                onClick={() => onOpenTrip(trip)}
              />
            );
          })}

          {provencePoint && (
            <MapPin
              x={provencePoint[0]}
              y={provencePoint[1]}
              label={
                provenceDone === provenceTrips.length
                  ? "普罗旺斯 · 已集满"
                  : `普罗旺斯 ${provenceDone}/${provenceTrips.length}`
              }
              done={provenceDone === provenceTrips.length}
              cluster
              clusterCount={provenceTrips.length}
              side="left"
              dy={-20}
              onClick={onOpenProvence}
            />
          )}
        </svg>
      )}

      <div className="map-caption">THE WORLD, WITH YOU</div>
      <div className="map-compass" aria-hidden="true">
        <span>N</span>
        <i />
      </div>
    </div>
  );
}
