export const COLLECTION = Object.freeze({
  id: "default-lego",
  name: "LEGO-Figuren",
  categoryId: "lego",
});
export const displayName = (item) => item.name || "Unbenanntes Objekt";

export function parsePrice(text = "") {
  const value = text.trim();
  if (!value) return null;
  if (!/^\d+(?:[,.]\d{1,2})?$/.test(value)) {
    throw new Error(
      "Bitte einen Betrag ab 0 mit höchstens zwei Nachkommastellen eingeben, zum Beispiel 12,50.",
    );
  }
  const [euros, cents = ""] = value.replace(",", ".").split(".");
  const minor = Number(euros) * 100 + Number(cents.padEnd(2, "0"));
  if (!Number.isSafeInteger(minor))
    throw new Error("Dieser Betrag ist zu groß.");
  return minor;
}

export function summarize(items) {
  let totalMinor = 0;
  let valuedCount = 0;
  for (const item of items) {
    if (item.marketValueMinor !== null) {
      totalMinor += item.marketValueMinor;
      valuedCount++;
    }
  }
  if (!Number.isSafeInteger(totalMinor))
    throw new Error("Die Wertsumme ist zu groß.");
  return { count: items.length, valuedCount, totalMinor };
}

export function validateState(state) {
  if (
    !state ||
    state.version !== 1 ||
    !Array.isArray(state.items) ||
    !state.images ||
    typeof state.images !== "object" ||
    Array.isArray(state.images)
  ) {
    throw new Error(
      "Das lokale Speicherformat ist unbekannt oder beschädigt. Die Daten wurden nicht verändert.",
    );
  }
  const ids = new Set();
  for (const item of state.items) {
    if (
      !item ||
      typeof item.id !== "string" ||
      !item.id ||
      ids.has(item.id) ||
      item.collectionId !== COLLECTION.id ||
      typeof item.name !== "string" ||
      typeof item.catalogId !== "string" ||
      item.currency !== "EUR" ||
      !Array.isArray(item.attributes) ||
      item.attributes.length ||
      typeof item.createdAt !== "string" ||
      Number.isNaN(Date.parse(item.createdAt)) ||
      (item.marketValueMinor !== null &&
        (!Number.isSafeInteger(item.marketValueMinor) ||
          item.marketValueMinor < 0)) ||
      (item.imageId !== null && item.imageId !== item.id)
    ) {
      throw new Error(
        "Ein lokal gespeicherter Gegenstand ist beschädigt. Die Daten wurden nicht verändert.",
      );
    }
    ids.add(item.id);
    // Ein fehlendes Bild darf einen Platzhalter ergeben, ohne die Textdaten zu verlieren.
    if (
      item.imageId &&
      state.images[item.imageId] !== undefined &&
      !isImageDataUrl(state.images[item.imageId])
    ) {
      throw new Error(
        "Ein lokal gespeichertes Bild ist ungültig. Die Daten wurden nicht verändert.",
      );
    }
  }
  if (
    Object.entries(state.images).some(
      ([id, image]) => !ids.has(id) || !isImageDataUrl(image),
    )
  ) {
    throw new Error(
      "Die lokalen Bilddaten sind beschädigt. Die Daten wurden nicht verändert.",
    );
  }
  summarize(state.items);
  return state;
}

export function isImageDataUrl(value) {
  return (
    typeof value === "string" &&
    /^data:image\/(?:png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(value)
  );
}
