import { createInventory } from "./application/inventory.js";
import { createLocalStorageRepository } from "./infrastructure/local-storage.js";
import {
  collectionView,
  detailView,
  errorView,
  formView,
  homeView,
  missingView,
} from "./presentation/views.js";

const main = document.querySelector("main");
// localStorage-Zugriff wird verzögert: auch eine blockierte Property ergibt einen sichtbaren Fehler.
const repository = createLocalStorageRepository({
  getItem: (key) => window.localStorage.getItem(key),
  setItem: (key, value) => window.localStorage.setItem(key, value),
});
const inventory = createInventory(repository, {
  createId: () => crypto.randomUUID(),
  now: () => new Date().toISOString(),
});
let renderVersion = 0;

function showError(element, error) {
  element.textContent =
    error instanceof Error
      ? error.message
      : "Das hat leider nicht funktioniert. Bitte erneut versuchen.";
  element.hidden = false;
  element.scrollIntoView({ block: "center" });
}

async function render() {
  const version = ++renderVersion;
  const path = location.hash.slice(1) || "/";
  try {
    const data = await inventory.overview();
    if (version !== renderVersion) return;
    const match = path.match(/^\/items\/([^/]+)(\/edit)?$/);
    const item = match ? data.items.find((item) => item.id === match[1]) : null;
    let content;
    if (path === "/") content = homeView(data);
    else if (path === "/collection") content = collectionView(data);
    else if (path === "/items/new") content = formView(null, data.images);
    else if (item)
      content = match[2]
        ? formView(item, data.images)
        : detailView(item, data.images);
    else content = missingView();
    main.innerHTML = content;
    document.title = `${main.querySelector("h1").textContent} · Sammelraum`;
    const knownRoute =
      path === "/" ||
      path === "/collection" ||
      path === "/items/new" ||
      Boolean(item);
    document.querySelectorAll("[data-nav]").forEach((link) => {
      const active =
        knownRoute &&
        link.dataset.nav === (path === "/" ? "home" : "collection");
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    if (main.querySelector("form")) bindForm(item);
    const removeButton = main.querySelector("[data-delete]");
    removeButton?.addEventListener("click", async () => {
      if (!window.confirm("Diesen Gegenstand wirklich löschen?")) return;
      removeButton.disabled = true;
      try {
        await inventory.remove(removeButton.dataset.delete);
        location.hash = "/collection";
      } catch (error) {
        showError(main.querySelector("#action-error"), error);
        removeButton.disabled = false;
      }
    });
  } catch (error) {
    if (version !== renderVersion) return;
    main.innerHTML = errorView(error.message);
    main.querySelector("[data-retry]").addEventListener("click", render);
  }
  if (version === renderVersion) {
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }
}

function bindForm(item) {
  const form = main.querySelector("form");
  const fieldset = form.querySelector("fieldset");
  const save = form.querySelector("#save");
  const photo = form.querySelector("#photo");
  const removeImage = form.querySelector("#remove-image");
  const preview = form.querySelector("#image-preview");
  const errorElement = form.querySelector("#form-error");
  let selectedImage; // undefined = bisheriges Bild behalten, null = entfernen
  let reading = false;
  let dirty = false;
  form.addEventListener("input", () => {
    dirty = true;
  });
  // Dateien werden ausschließlich lokal gelesen. Kein Zuschneiden, Komprimieren oder Upload.
  photo.addEventListener("change", async () => {
    const file = photo.files[0];
    if (!file) return;
    reading = true;
    fieldset.disabled = true;
    save.disabled = true;
    errorElement.hidden = true;
    try {
      if (
        !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
          file.type,
        )
      )
        throw new Error("Bitte JPEG, PNG, WebP oder GIF auswählen.");
      if (file.size > 2 * 1024 * 1024)
        throw new Error(
          "Das Bild ist größer als 2 MB. Bitte eine kleinere Datei auswählen.",
        );
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () =>
          reject(new Error("Dieses Bild konnte nicht gelesen werden."));
        reader.readAsDataURL(file);
      });
      const image = new Image();
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = () =>
          reject(new Error("Die ausgewählte Datei ist kein lesbares Bild."));
        image.src = dataUrl;
      });
      if (!form.isConnected) return;
      selectedImage = dataUrl;
      dirty = true;
      const img = document.createElement("img");
      img.src = dataUrl;
      img.alt = "Vorschau des ausgewählten Bildes";
      preview.replaceChildren(img);
      removeImage.hidden = false;
    } catch (error) {
      if (form.isConnected) showError(errorElement, error);
    } finally {
      reading = false;
      fieldset.disabled = false;
      save.disabled = false;
      photo.value = "";
    }
  });
  removeImage.addEventListener("click", () => {
    selectedImage = null;
    dirty = true;
    preview.innerHTML =
      '<div class="item-image"><span class="image-placeholder"><span aria-hidden="true">◇</span>Kein Bild</span></div>';
    removeImage.hidden = true;
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (reading || save.disabled) return;
    fieldset.disabled = true;
    save.disabled = true;
    save.textContent = "Wird gespeichert …";
    errorElement.hidden = true;
    try {
      const record = await inventory.save(
        {
          name: form.elements.name.value,
          catalogId: form.elements.catalogId.value,
          price: form.elements.price.value,
          image: selectedImage,
        },
        item?.id,
      );
      dirty = false;
      location.hash = `/items/${record.id}`;
    } catch (error) {
      showError(errorElement, error);
      fieldset.disabled = false;
      save.disabled = false;
      save.textContent = "Speichern";
    }
  });
  // Nur Browser-Schließen/Reload warnen; normale Navigation verwirft den Entwurf.
  const warnOnClose = (event) => {
    if (form.isConnected && dirty) {
      event.preventDefault();
      event.returnValue = "";
    }
  };
  window.addEventListener("beforeunload", warnOnClose);
  // Ein einmaliger Handler räumt sich beim nächsten Routenwechsel auf.
  window.addEventListener(
    "hashchange",
    () => window.removeEventListener("beforeunload", warnOnClose),
    { once: true },
  );
}

document.querySelector(".skip-link").addEventListener("click", (event) => {
  event.preventDefault();
  main.focus();
  main.scrollIntoView();
});
window.addEventListener("hashchange", render);
// Anderer Tab: neu lesen, aber keine gerade bearbeiteten Formularfelder überschreiben.
window.addEventListener("storage", () => {
  if (!main.querySelector("form")) void render();
});
void render();
