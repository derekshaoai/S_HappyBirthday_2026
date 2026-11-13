import { useState, type ReactNode } from "react";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  fallback?: ReactNode;
  onClick?: () => void;
};

/**
 * Character artwork is a transparent PNG/WebP generated separately.
 * If the file is not in place yet, it renders the fallback (or nothing),
 * so the layout never breaks while the assets are being generated.
 */
export function Character({
  src,
  alt = "",
  className = "",
  fallback = null,
  onClick,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) return <>{fallback}</>;

  return (
    <img
      className={`character${onClick ? " is-clickable" : ""}${className ? ` ${className}` : ""}`}
      src={src}
      alt={alt}
      draggable={false}
      onError={() => setFailed(true)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    />
  );
}
