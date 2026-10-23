import {
  COLLECTION,
  isImageDataUrl,
  parsePrice,
  summarize,
} from "../domain/inventory.js";

/** Repository: async read()/write(snapshot); ID und Uhr sind für Tests injizierbar. */
export function createInventory(repository, { createId, now }) {
  return {
    async overview() {
      const state = await repository.read();
      return {
        ...state,
        collection: COLLECTION,
        summary: summarize(state.items),
      };
    },
    async save(input, itemId) {
      const state = await repository.read();
      const previous = itemId
        ? state.items.find((item) => item.id === itemId)
        : null;
      if (itemId && !previous)
        throw new Error("Dieser Gegenstand existiert nicht mehr.");
      const id = previous?.id ?? createId();
      const image =
        input.image === undefined
          ? (state.images[previous?.imageId] ?? null)
          : input.image;
      if (image !== null && !isImageDataUrl(image))
        throw new Error("Bitte eine gültige Bilddatei auswählen.");
      const item = {
        id,
        collectionId: COLLECTION.id,
        name: input.name ?? "",
        catalogId: input.catalogId ?? "",
        marketValueMinor: parsePrice(input.price),
        currency: "EUR",
        imageId: image ? id : null,
        attributes: [],
        createdAt: previous?.createdAt ?? now(),
      };
      const next = {
        version: 1,
        items: previous
          ? state.items.map((entry) => (entry.id === id ? item : entry))
          : [...state.items, item],
        images: { ...state.images },
      };
      if (image) next.images[id] = image;
      else delete next.images[id];
      summarize(next.items);
      await repository.write(next);
      return item;
    },
    async remove(id) {
      const state = await repository.read();
      if (!state.items.some((item) => item.id === id))
        throw new Error("Dieser Gegenstand existiert nicht mehr.");
      const next = {
        version: 1,
        items: state.items.filter((item) => item.id !== id),
        images: { ...state.images },
      };
      delete next.images[id];
      await repository.write(next);
    },
  };
}
