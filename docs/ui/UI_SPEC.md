> **Aktuell umgesetzter Umfang:** Auf [ausdrückliche Nutzeranordnung](../product/PROTOTYPE_DIRECTIVE.md) nur Übersicht, feste LEGO-Sammlung, Objektformular und Details, mit zwei dauerhaft sichtbaren Navigationszielen. Hash-Routen: `#/`, `#/collection`, `#/items/new`, `#/items/:id`, `#/items/:id/edit`. Manuell Bild, Name, LEGO-/Katalog-ID und Preis; kein Attributeditor/keine Einstellungen. Der folgende umfassende Sechs-Tab-Entwurf ist zurückgestellt. [Aktueller Implementierungsvertrag](../development/PROTOTYPE.md).

# UI-Konzept und Navigationsvertrag

Entwurf, nicht bestätigtes Enddesign. Ziel: ruhig, bildorientiert, auf dem iPhone gut lesbar. Die [HTML-Vorschau](../preview/ui-preview.html) ist ein Designartefakt, keine fertige Anwendung.

## Gestaltung

Heller warmer Hintergrund #F5F4F0, dunkler Text #20332F, dunkelgrüner Akzent #1E5A49. Weiße Karten, dezente Linien, 16–20 px Radius. Systemschrift statt externer Fonts. Fließtext 16 px, Haupttitel 28 px, große Werte 32 px. Abstände in 4-/8-px-Schritten. Buttons und Navigationsziele mindestens 44 px hoch/breit. Text neben Icons; Status nie allein durch Farbe.

App-Inhalt bis 1120 px, auf großen Displays mehrere Rasterspalten; mobile Ansichten ab 320 px testen. Raster: 2 Spalten mobil, 3 ab 600 px, 4 ab 900 px. Bilder quadratisch mit object-fit: contain. Unbeschriftete Bildkarten brauchen zugängliche Linknamen; Fallback „Unbenanntes Objekt“. Preise nicht zwingend im Raster anzeigen.

Untere Navigation immer sichtbar, Reihenfolge Dashboard / Sammlungen / News / Analyse / Alle / Einstellungen. Auf 320 px kompakte Beschriftungen „Start“, „Samml.“, „News“, „Analyse“, „Alle“, „Mehr“; zugängliche Namen bleiben vollständig, „Mehr“ öffnet direkt Einstellungen. Keine Tabs zusammenlegen. Diese Kurzlabels sind eine Arbeitsannahme. Ausreichend Abstand zum iPhone-Homeindikator durch env(safe-area-inset-bottom); Content erhält passenden unteren Innenabstand. Bei großer Schrift darf die Leiste höher werden statt Text abzuschneiden. Bildschirmtastatur und Safe-Area auf echtem iPhone später prüfen.

## Routen

Alle Angaben sind Hash-Pfade, zum Beispiel `/#/collections/demo-lego`.

| Route | Seite | Aktiver Tab |
|---|---|---|
| `/` | Dashboard | Dashboard |
| `/collections` | Sammlungsliste mit Verwaltungszugang | Sammlungen |
| `/collections/new` | Sammlung anlegen | Sammlungen |
| `/collections/:collectionId` | Sammlung und Bildraster | Sammlungen |
| `/collections/:collectionId/items/new` | Exemplarformular | Sammlungen |
| `/collections/:collectionId/items/:itemId` | Exemplardetail | Sammlungen |
| `/collections/:collectionId/items/:itemId/edit` | Exemplar bearbeiten | Sammlungen |
| `/all` | alle Exemplare | Alle |
| `/all/:itemId` | Exemplardetail aus Gesamtübersicht | Alle |
| `/all/:itemId/edit` | Bearbeiten aus Gesamtübersicht | Alle |
| `/news`, `/analysis` | später geplante Bereiche | entsprechender Tab |
| `/settings` | Einstellungen | Einstellungen |
| sonstige Route | Nicht gefunden + Startlink | kein falscher aktiver Tab |

Dashboard-Sammlungslinks aktivieren beim Öffnen den Tab Sammlungen. Beide Detailrouten rendern dieselbe Komponente mit verschiedenem Navigationskontext, keine zweite Fachimplementierung. Direktaufrufe erhalten einen definierten Zurücklink: zur Sammlung oder Alle; kein blindes history.back. Falsche collectionId/itemId-Kombination zeigt „Objekt gehört nicht zu dieser Sammlung“, ohne ein fremdes Objekt im falschen Kontext anzuzeigen.

## Ansichten

| Ansicht | Aufbau von oben nach unten | M0-Verhalten |
|---|---|---|
| Dashboard | Seitentitel; Gesamtwert mit Bewertungsabdeckung; kompakte Sammlungsliste mit Kategorie/Wert; Sammlung hinzufügen | navigierbar, sichtbarer Demo-Hinweis |
| Sammlungen | Titel + Hinzufügen; Sammlungskarten mit Kategorie, Anzahl und Wert | Auswahl/Navigation; Erstellung nur Formularvorschau |
| Einzelne Sammlung | Zurück; Titel/Kategorie; Wert + Anzahl; Objekt hinzufügen; Bildraster | echte Demo-Records, keine Fake-Suche |
| Alle | Titel; gesamte Anzahl/Wert; gleiches Bildraster wie Sammlung | keine Anlegeaktion ohne Sammlungsauswahl |
| Detail | Zurück/Bearbeiten; großes Bild; Name/Katalog-ID/Marktwert; eigene Attribute; Löschen | Bearbeiten öffnet Formular; Löschen klar noch nicht verfügbar |
| Objektformular | Bildauswahl; optionale Felder Name/Katalog-ID/Marktwert; Attributzeilen; Speichern/Abbrechen | lokale Formulareingaben möglich, kein Speichern; Hinweis statt Erfolg |
| Sammlungsformular | Name; Kategorieauswahl; bei custom freier Kategoriename; Speichern/Abbrechen | reine Formularvorschau |
| Einstellungen | Speichermodus; Demo-Hinweis; geplante Sicherung/Import und lokale Speicherung | kein Export-/Import- oder Reset-Erfolg vortäuschen |
| Analyse | erklärter Platzhalter; später Bewertung, Kaufpreise, Standardwerte, Verlauf | keine Zahlen aus angeblicher Berechnung |
| News | erklärter Platzhalter | keine externen Nachrichten laden |

## Zustände und Interaktion

Leere Sammlung: „Hier ist noch Platz für dein erstes Objekt“ mit Hinzufügen. Leerer Gesamtbestand: Einstieg zum Sammlungserstellen. Unbewertet: „Noch keine Bewertung“, nicht fälschlich null Euro Marktwert. Fehlendes Foto: neutraler lokaler Platzhalter. Ladezustand mit sichtbarer Meldung; Speicherfehler mit Wiederholen. Nicht vorhandene ID hat eigene Fehlerseite.

M0-Formulare: Speichern deaktiviert und unmittelbar daneben „Im UI-Prototyp noch ohne Speicherung“. Kein still wirkungsloser Button. M1: beim Speichern Ladezustand, Fehler inline; bei Erfolg Detailansicht; bei Abbrechen zurück ohne Mutation. Löschung erst M1, mit verständlicher Bestätigung. Ungespeicherte Änderungen beim Navigieren ab M1 berücksichtigen.

Fokusindikatoren sichtbar, alle Formulare mit Labels, Icons mit zugänglichen Namen, keine nur per Hover bedienbaren Aktionen. Farben/Kontrast, 200-%-Zoom, lange Namen und große Schrift prüfen. Dialoge später mit Fokusführung und Escape; zuerst separate Formularseiten verwenden, damit die untere Navigation erhalten bleibt.

## Verbindlichkeit der Vorschau

Demo-Werte sind erfunden. Der dunkle Wertblock und die Karten sind eine Stilrichtung, kein fertiges Produktdesign. Die HTML-Datei zeigt mehrere Ansichten als Galerie; die Links wählen Bildschirme, enthalten aber keine App-Logik. Code für die tatsächliche App wird separat aus Komponenten aufgebaut.
