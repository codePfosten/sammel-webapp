import { COLLECTION, displayName } from "../domain/inventory.js";

// Alle manuell eingegebenen Texte werden vor HTML-Ausgabe escaped.
export const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
export const formatPrice = (minor) =>
  minor === null
    ? "Nicht angegeben"
    : new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(minor / 100);
const image = (item, images, className = "") =>
  `<div class="item-image ${className}">${images[item.imageId] ? `<img src="${escapeHtml(images[item.imageId])}" alt="${escapeHtml(displayName(item))}" loading="lazy">` : '<span class="image-placeholder"><span aria-hidden="true">◇</span>Kein Bild</span>'}</div>`;
const valueCard = (summary) =>
  `<section class="value-card" aria-label="Wertübersicht"><span>Geschätzter Gesamtwert</span><strong>${summary.valuedCount ? formatPrice(summary.totalMinor) : "Noch keine Bewertung"}</strong><small>${summary.valuedCount} von ${summary.count} Gegenständen bewertet</small></section>`;

export function homeView({ summary }) {
  return `<p class="eyebrow">DEIN PERSÖNLICHES INVENTAR</p><h1>Deine Sammlung im Blick</h1><p class="intro">Ein Platz für deine LEGO-Figuren. Einfach manuell erfassen und wiederfinden.</p>${valueCard(summary)}<div class="section-heading"><h2>Deine Sammlung</h2><span>1 Sammlung</span></div><a class="collection-card" href="#/collection"><span class="collection-symbol" aria-hidden="true">▦</span><span><strong>${COLLECTION.name}</strong><small>${summary.count} ${summary.count === 1 ? "Gegenstand" : "Gegenstände"} · ${summary.valuedCount ? formatPrice(summary.totalMinor) : "Noch nicht bewertet"}</small></span><span aria-hidden="true">›</span></a><div class="home-actions"><a class="button primary" href="#/items/new">Gegenstand hinzufügen</a><a class="text-link" href="#/collection">Sammlung öffnen</a></div><p class="quiet-note">Name, LEGO-/Katalog-ID, Preis und ein Bild – mehr brauchst du für diesen Prototyp nicht.</p>`;
}

export function collectionView({ summary, items, images }) {
  return `<a class="back-link" href="#/">‹ Zur Übersicht</a><div class="section-heading"><div><h1>${COLLECTION.name}</h1><p>${summary.count} ${summary.count === 1 ? "Gegenstand" : "Gegenstände"}</p></div><a class="button primary" href="#/items/new">Gegenstand hinzufügen</a></div>${valueCard(summary)}${items.length ? `<div class="item-grid">${items.map((item) => `<a class="item-card" href="#/items/${encodeURIComponent(item.id)}" aria-label="${escapeHtml(displayName(item))}">${image(item, images)}<div class="item-caption"><strong>${escapeHtml(displayName(item))}</strong><small>${escapeHtml(item.catalogId || "Keine Katalog-ID")}</small><span>${formatPrice(item.marketValueMinor)}</span></div></a>`).join("")}</div>` : '<section class="empty-state"><span aria-hidden="true">◇</span><h2>Hier ist Platz für deine erste Figur</h2><p>Du kannst alle Angaben selbst eingeben. Auch ein leerer Eintrag ist erlaubt.</p><a class="button primary" href="#/items/new">Ersten Gegenstand hinzufügen</a></section>'}`;
}

export function detailView(item, images) {
  return `<a class="back-link" href="#/collection">‹ Zur LEGO-Sammlung</a><div class="detail-layout">${image(item, images, "hero-image")}<section><p class="eyebrow">${COLLECTION.name}</p><h1>${escapeHtml(displayName(item))}</h1><dl class="facts"><div><dt>LEGO-/Katalog-ID</dt><dd>${escapeHtml(item.catalogId || "Nicht angegeben")}</dd></div><div><dt>Geschätzter Preis</dt><dd>${formatPrice(item.marketValueMinor)}</dd></div></dl><div class="actions"><a class="button primary" href="#/items/${encodeURIComponent(item.id)}/edit">Bearbeiten</a><button type="button" class="danger" data-delete="${escapeHtml(item.id)}">Löschen</button></div><p id="action-error" role="alert" hidden></p></section></div>`;
}

export function formView(item, images) {
  const back = item ? `#/items/${encodeURIComponent(item.id)}` : "#/collection";
  return `<a class="back-link" href="${back}">‹ Zurück</a><h1>${item ? "Gegenstand bearbeiten" : "Gegenstand hinzufügen"}</h1><p>Alle Angaben sind optional. Gespeichert wird nur in diesem Browser.</p><form id="item-form" novalidate><fieldset><legend class="visually-hidden">Angaben zum Gegenstand</legend><div class="form-image" id="image-preview">${image(item ?? { name: "", imageId: null }, images)}</div><label for="photo">Bild auswählen</label><input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp,image/gif" aria-describedby="photo-help"><small id="photo-help">JPEG, PNG, WebP oder GIF, bis 2 MB. Das Bild wird unverändert übernommen.</small><button id="remove-image" type="button" ${item?.imageId ? "" : "hidden"}>Bild entfernen</button><label for="item-name">Name</label><input id="item-name" name="name" value="${escapeHtml(item?.name ?? "")}" placeholder="Unbenanntes Objekt"><label for="catalog-id">LEGO-/Katalog-ID</label><input id="catalog-id" name="catalogId" value="${escapeHtml(item?.catalogId ?? "")}" placeholder="Nicht angegeben"><label for="price">Geschätzter Preis in Euro</label><input id="price" name="price" inputmode="decimal" value="${item?.marketValueMinor == null ? "" : (item.marketValueMinor / 100).toFixed(2).replace(".", ",")}" placeholder="Nicht angegeben" aria-describedby="price-help"><small id="price-help">Leer = nicht bewertet. Eine eingegebene 0 zählt als 0,00 €.</small></fieldset><p id="form-error" role="alert" hidden></p><div class="actions"><button id="save" class="primary" type="submit">Speichern</button><a class="button secondary" href="${back}">Abbrechen</a></div></form>`;
}

export function missingView() {
  return '<h1>Nicht gefunden</h1><p>Diese Seite oder dieser Gegenstand existiert nicht.</p><a class="button primary" href="#/collection">Zur LEGO-Sammlung</a>';
}
export function errorView(message) {
  return `<h1>Sammlung nicht verfügbar</h1><p role="alert">${escapeHtml(message)}</p><button type="button" data-retry>Erneut versuchen</button><p>Es wurden keine vorhandenen Daten gelöscht.</p>`;
}
