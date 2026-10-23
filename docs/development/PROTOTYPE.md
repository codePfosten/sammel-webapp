# Einfache LEGO-Website weiterentwickeln

Stand: 23.10.2026. Diese Vereinfachung wurde [ausdrücklich vom Projektinhaber angeordnet](../product/PROTOTYPE_DIRECTIVE.md). Ältere React-/M1-Dokumente sind langfristiger Kontext und kein Auftrag, zusätzliche Funktionen einzubauen.

## Start und Dateien

Node ab 22, geprüft mit 24.19.0 (siehe `.nvmrc`). `npm start` startet ausschließlich auf http://127.0.0.1:5173. Für die Website sind keine npm-Pakete zu installieren. `index.html` direkt per `file://` ist wegen nativer ES-Module nicht der unterstützte Startweg. Alternativ genügt ein gewöhnlicher statischer HTTP-Server in der Repositorywurzel; dabei ändert sich mit Host/Port eventuell der lokale Speicherbereich.

| Datei | Verantwortung |
|---|---|
| `index.html` | semantischer Rahmen, Header, Navigation, Moduleinstieg |
| `styles.css` | einfache responsive Gestaltung, Tokens, Fokus, Safe-Area |
| `src/app.js` | Composition Root, Hash-Routen, Eventverdrahtung, Dateiübernahme |
| `src/domain/inventory.js` | feste Sammlung, Defaults, Europarser, Summen, Formatvalidierung |
| `src/application/inventory.js` | Lesen, Erstellen/Bearbeiten/Löschen über injizierten Repository-Port |
| `src/infrastructure/local-storage.js` | ausschließlich dieser Adapter greift auf den Speichervertrag zu |
| `src/presentation/views.js` | HTML-Ausgabe, Euroformatierung, Escaping aller manuellen Texte |
| `scripts/serve.mjs` | kleiner statischer lokaler Entwicklungsserver, keine fachliche API |
| `scripts/check.mjs` | Syntax- und Importgrenzenprüfung, keine vollständige ESLint-Analyse |
| `tests/` | Node-Regel-/Adaptertests und Playwright-Browserabläufe |

Domain und Application bleiben frei von Browserzugriffen. Presentation importiert keine Infrastructure. `app.js` verbindet die Module. Der Check kontrolliert direkte statische Imports; er ist keine allgemeine Architektur-/Sicherheitsanalyse. Vermeide neue globale Zustandscontainer und parallele Speicherimplementierungen in Komponenten.

## Routen und Datenfluss

`#/` Übersicht → `#/collection` LEGO-Raster → `#/items/new` Erfassung → `#/items/:id` Detail → `#/items/:id/edit` Bearbeitung. Zurücklinks haben feste Ziele, Browser-Zurück/Vorwärts löst ebenfalls Neulesen aus. Unbekannte Routen/IDs zeigen einen Fehlerzustand ohne falschen aktiven Navigationseintrag.

Formulare halten einen ungespeicherten lokalen Entwurf. Erst erfolgreiches `repository.write` führt zur Detailseite. Abbrechen und normale Navigation verwerfen den Entwurf. Beim Schließen/Reload eines geänderten Formulars wird die Browserwarnung angefragt. Feste untere Navigation bleibt sichtbar; beim Seitenwechsel Fokus auf main. Kein Rendern fachlicher Beispieldaten in HTML.

## Kleiner Speichervertrag

`read(): Promise<Snapshot>` und `write(snapshot): Promise<void>`. Ein Snapshot ist `{ version: 1, items: [], images: {} }`. `items` enthalten `id`, `collectionId: "default-lego"`, `name`, `catalogId`, `marketValueMinor`, `currency: "EUR"`, `imageId`, `attributes: []`, `createdAt`. `imageId` ist entweder null oder die eigene Exemplar-ID. `images[imageId]` enthält eine Data-URL. Die Attribute bleiben aus Kompatibilitätsgründen ein leeres Array; kein Attributeditor im aktuellen Umfang.

Key: **`sammelraum.simple.v1`**. Keine anderen localStorage-Keys lesen oder löschen. Ein einzelner `setItem` ersetzt Metadaten und Bilder gemeinsam. Bei Quota-/Zugriffsfehlern bleiben bisherige Daten unverändert und die Oberfläche zeigt einen Fehler. Fehlerhafte/unbekannte Versionen werden nicht still überschrieben oder zurückgesetzt. Bei späteren Schemaänderungen validieren, versionieren und gezielt migrieren.

Name/Katalog-ID bleiben intern leer; die Anzeige nutzt „Unbenanntes Objekt“ bzw. „Nicht angegeben“. Fehlendes Bild zeigt einen Platzhalter. Marktwert leer = null; explizit 0 = 0 Cent. Nur ganze sichere Centbeträge ≥ 0, maximal zwei Nachkommastellen in der Eingabe. Namen und Katalognummern sind niemals eindeutige Schlüssel. IDs/Zeit erzeugt der Anwendungsfall mit injizierten Funktionen; jedes Exemplar bleibt unabhängig.

## Bilder und Grenzen

JPEG, PNG, WebP, GIF bis 2 MB je Datei. FileReader und Bild-Decodierung laufen ausschließlich lokal; keine Größenänderung, kein Zuschneiden, kein Upload. Die Begrenzung hält den einfachen Speicher überschaubar, garantiert aber keinen freien Platz. Data-URLs brauchen mehr Platz als die Originaldatei; localStorage ist klein, synchron und browserabhängig. Für viele/große Fotos ist dieser Adapter ungeeignet. Keine dauerhafte Freigabe für wertvolle Bestände ohne Sicherungskonzept.

Daten bleiben nach Reload im selben Browser/Origin. Browserdaten löschen, Privatmodus, anderer Host/Port oder Browser können den Bestand verlieren/wechseln. Kein Backup, keine Synchronisierung. Parallel schreibende Tabs können Änderungen überschreiben; der storage-Listener aktualisiert nur gerade nicht bearbeitete Ansichten. Keine Mehrtab-Konfliktlösung behaupten.

Ein späterer IndexedDB-Adapter kann denselben async Snapshot-Port zunächst erfüllen; Bildspeicherung und Migration müssen dabei bewusst implementiert werden. Eine React-Umstellung ist ein eigenständiger Auftrag, keine Voraussetzung für weitere kleine Funktionen.

## Prüfen

```sh
npm ci
npm run lint
npm test
# Einmalig, falls kein System-Chromium vorhanden:
npx playwright install chromium
npm run test:e2e
```

Es gibt keinen Build- oder TypeScript-Schritt: Der Browser führt den JS-Quellcode direkt aus. Node-Tests prüfen Regeln und Speicherfehler, Browsertests reale Bedienabläufe und Reload inklusive Bildern. Ergebnis und nicht geprüfte Bereiche stehen in STATUS.md. Nach Änderungen an Datenmodell, Routen oder Speicher auch CURRENT_SCOPE, diese Übergabe und die menschlichen Übersichten aktualisieren.
