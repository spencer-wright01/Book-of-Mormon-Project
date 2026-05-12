const STORAGE_KEY = "the-path-back-player";

export function loadPlayer() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("Unable to load player data.", error);
    return null;
  }
}

export function savePlayer(player) {
  if (typeof window === "undefined" || !player) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
  } catch (error) {
    console.error("Unable to save player data.", error);
  }
}

export function clearPlayer() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}

export { STORAGE_KEY };
