import { validateState } from "../domain/inventory.js";
export const STORAGE_KEY = "sammelraum.simple.v1";

/** Ein kleiner austauschbarer Snapshot-Port. Einzelner setItem-Aufruf ersetzt Text und Bilder gemeinsam. */
export function createLocalStorageRepository(storage) {
  return {
    async read() {
      let raw;
      try {
        raw = storage.getItem(STORAGE_KEY);
      } catch {
        throw new Error(
          "Der lokale Browserspeicher ist nicht verfügbar. Bitte die Browsereinstellungen prüfen.",
        );
      }
      if (raw === null) return { version: 1, items: [], images: {} };
      let state;
      try {
        state = JSON.parse(raw);
      } catch {
        throw new Error(
          "Die lokalen Daten sind beschädigt. Sie wurden nicht überschrieben.",
        );
      }
      return validateState(state);
    },
    async write(state) {
      validateState(state);
      const serialized = JSON.stringify(state);
      try {
        storage.setItem(STORAGE_KEY, serialized);
      } catch (error) {
        if (error?.name === "QuotaExceededError")
          throw new Error(
            "Der lokale Speicher ist voll. Bitte ein kleineres Bild wählen. Die bisherigen Daten bleiben erhalten.",
          );
        throw new Error(
          "Speichern ist in diesem Browser nicht möglich. Die Änderung wurde nicht übernommen.",
        );
      }
    },
  };
}
