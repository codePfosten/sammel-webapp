# Vom Projektinhaber angeordnete Vereinfachung

Datum: 23.10.2026. Quelle: ausdrücklicher Folgeauftrag des Projektinhabers im Entwicklungschat. Diese Anordnung hat gemäß AGENTS.md Vorrang vor dem älteren React-/M0-/M1-Entwurf.

Der Projektinhaber hat ausdrücklich angeordnet:

> „Bleib dabei klassisch bei HTML, CSS und JS.“

> „es reicht wenn eine Default Sammlung für Lego Figuren schon vorhanden ist.“

Ziel ist ein einfacher, funktionaler Website-Prototyp, um den gewünschten Umfang einer ersten Produktversion beurteilen zu können. Hauptfokus: Startseite mit Übersicht, Navigation zur Sammlung, Gegenstände manuell hinzufügen und entfernen. Bild, Preis, LEGO-/Katalog-ID und Name sind optional; neutrale Defaults gelten bei fehlenden Angaben. Ermittlung von Attributen, Nutzerkonfiguration, Sammlungsverwaltung und Bildbearbeitung sind vorerst nicht erforderlich.

## Konkrete Umsetzung dieses Auftrags

- Native HTML-/CSS-/JavaScript-Website, ohne React, TypeScript, Vite oder andere Runtime-Pakete.
- Feste Sammlung „LEGO-Figuren“, leerer Startbestand. Kein Anlegen/Konfigurieren von Sammlungen.
- Zwei Hauptziele: Übersicht und LEGO-Sammlung. Die früher geplanten sechs Tabs sind für diesen Zwischenstand zurückgestellt.
- Erstellen, Ansehen, einfaches Bearbeiten und bestätigtes Löschen einzelner Exemplare.
- Ein ausgewähltes Bild unverändert übernehmen; keine Bearbeitung oder externen Dienste.
- Einfache lokale Speicherung in `localStorage`; Bilder als Data-URLs im selben JSON-Datensatz. Das ist eine pragmatische Prototypentscheidung, keine endgültige Speicherarchitektur.
- Kleine Module für fachliche Regeln, Anwendungsfälle, Speicher und Darstellung erhalten sinnvolle Erweiterungsgrenzen.
- Code im GitHub-Repository bereitstellen. Das ist keine Freigabe für ein öffentliches Website-Deployment.

## Abgrenzung zur bisherigen Planung

Das ursprüngliche Startpaket, HTML-/SVG-Designreferenzen und Bootstrap-Prompt bleiben als historische Quellen erhalten. Ihre React-/TypeScript-/Dexie- und Mehrsammlungspläne beschreiben mögliche spätere Stufen, nicht den aktuellen Implementierungsauftrag. Der frühere ausschließlich lokale React-Versuch wird nicht parallel in diese Website übernommen.

Dieser reduzierte Prototyp erfüllt nicht den gesamten ursprünglichen M1-Umfang. Keine neue Framework-Migration, komplexe Datenbank, zusätzlichen Tabs oder Konfigurationsoberflächen ohne separaten Auftrag anfangen. Zuerst Rückmeldung des Projektinhabers zur bedienbaren Website einholen.

Technische Übergabe: [PROTOTYPE.md](../development/PROTOTYPE.md). Tatsächliche Prüfung: [STATUS.md](../planning/STATUS.md).
