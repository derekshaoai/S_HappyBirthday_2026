export type MusicState = {
  available: boolean;
  playing: boolean;
  muted: boolean;
  started: boolean;
};

const STORAGE_KEY = "sbirthday.music.muted";
const BASE_VOLUME = 0.32;

/**
 * One continuous BGM track.
 * - starts on the first pointer gesture (browser autoplay policy)
 * - loops forever
 * - 1.5s fade-in on start
 * - 1.5s soft volume dip on page transitions
 * - ducks while a video is open
 * - mute preference persists in localStorage
 */
class MusicController {
  private audio: HTMLAudioElement | null = null;
  private state: MusicState = {
    available: true,
    playing: false,
    muted: false,
    started: false,
  };
  private listeners = new Set<(state: MusicState) => void>();
  private fadeTimer: number | null = null;
  private ducked = false;
  private startedAt = 0;

  constructor() {
    if (typeof window !== "undefined") {
      this.state.muted = window.localStorage.getItem(STORAGE_KEY) === "1";
    }
  }

  private ensureAudio(): HTMLAudioElement {
    if (this.audio) return this.audio;

    const audio = new Audio("/music/music_lce.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;

    audio.addEventListener("play", () => {
      this.state = { ...this.state, playing: true };
      this.emit();
    });
    audio.addEventListener("pause", () => {
      this.state = { ...this.state, playing: false };
      this.emit();
    });
    audio.addEventListener("error", () => {
      this.state = {
        ...this.state,
        available: false,
        playing: false,
      };
      this.emit();
    });

    // Kept in the DOM for Safari/iOS media reliability; no visible controls.
    audio.style.display = "none";
    audio.setAttribute("playsinline", "true");
    if (typeof document !== "undefined") {
      document.body.appendChild(audio);
    }

    this.audio = audio;
    return audio;
  }

  getState(): MusicState {
    return this.state;
  }

  subscribe(listener: (state: MusicState) => void) {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  preload() {
    this.ensureAudio();
  }

  start() {
    const audio = this.ensureAudio();

    if (!this.state.started) {
      this.startedAt = performance.now();
      this.state = { ...this.state, started: true };
      this.emit();
    }

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          this.fadeTo(this.volumeTarget(), 1500);
        })
        .catch(() => {
          // If the browser blocks it, the music button can retry on a click.
        });
    }
  }

  toggle() {
    this.ensureAudio();

    if (!this.state.started) {
      // First click on the music button: start unmuted, don't start-and-mute.
      this.state = { ...this.state, muted: false };
      this.start();
      return;
    }

    const muted = !this.state.muted;
    this.state = { ...this.state, muted };
    window.localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
    this.emit();
    this.fadeTo(this.volumeTarget(), 350);
  }

  transition() {
    if (!this.audio || this.audio.paused || this.state.muted) return;
    if (performance.now() - this.startedAt < 1600) return;

    const base = this.volumeTarget();
    this.fadeTo(base * 0.45, 350, () => {
      this.fadeTo(base, 1150);
    });
  }

  duck() {
    this.ducked = true;
    if (!this.audio) return;
    this.fadeTo(this.volumeTarget(), 350);
  }

  unduck() {
    this.ducked = false;
    if (!this.audio) return;
    this.fadeTo(this.volumeTarget(), 650);
  }

  private volumeTarget() {
    if (this.state.muted || !this.audio) return 0;
    return this.ducked ? BASE_VOLUME * 0.1 : BASE_VOLUME;
  }

  private fadeTo(target: number, duration: number, done?: () => void) {
    const audio = this.audio;
    if (!audio) return;

    if (this.fadeTimer !== null) {
      window.clearInterval(this.fadeTimer);
      this.fadeTimer = null;
    }

    const start = audio.volume;
    const started = performance.now();

    this.fadeTimer = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - started) / duration);
      audio.volume = start + (target - start) * progress;

      if (progress >= 1) {
        if (this.fadeTimer !== null) {
          window.clearInterval(this.fadeTimer);
          this.fadeTimer = null;
        }
        done?.();
      }
    }, 30);
  }
}

export const music = new MusicController();
