import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "sbirthday.progress.v1";

function readProgress(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function useProgress(total: number) {
  const [done, setDone] = useState<string[]>(() => readProgress());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
    } catch {
      // Private mode or storage full: the passport still works for this session.
    }
  }, [done]);

  const markDone = useCallback((id: string) => {
    setDone((current) => (current.includes(id) ? current : [...current, id]));
  }, []);

  const reset = useCallback(() => {
    setDone([]);
  }, []);

  const count = done.length;

  return {
    done,
    markDone,
    reset,
    count,
    total,
    complete: count >= total,
  };
}
