# Agentenanweisungen — LEGO-Minifiguren-Website

**Aktiver Produktumfang:** [CURRENT_SCOPE](docs/product/CURRENT_SCOPE.md). Diese Datei und der tatsächliche Code sind maßgeblich. Frühere Mehrsammlungs-, React-, PWA-, Analyse- und News-Pläne sind **nicht** der Entwicklungsauftrag. Bei Widersprüchen gilt die jüngste ausdrückliche Nutzeranweisung vor diesem Scope.

## Vor dem Bearbeiten
1. Lies `docs/product/CURRENT_SCOPE.md`, `docs/planning/STATUS.md` und `docs/development/PROTOTYPE.md`.
2. Prüfe den realen Code und die Tests. Behalte die vorhandene **HTML/CSS/JavaScript**-Website; keine ungefragte Framework-Migration.
3. Lies nur die für den konkreten Task nötigen weiteren Dokumente. Die historischen Pläne unter `docs/architecture/`, `docs/ui/`, die ursprüngliche Projektkontextdatei und der Bootstrap-Prompt sind **Archiv/Entwürfe**, keine Implementierungsvorgaben.

## Technische Leitlinien
- Eine feste LEGO-Minifiguren-Sammlung, ein Nutzer, klassische Website.
- Bestehende Trennung beibehalten: `src/domain` (Regeln), `src/application` (Anwendungsfälle), `src/infrastructure` (lokaler Speicher), `src/presentation` (Ansichten), `src/app.js` (Verdrahtung).
- Daten bleiben zunächst **lokal im Browser**. Keine Drittanbieter für Speicherung, kein Cloud-Account, kein Backend allein aus Vorsicht.
- Externe Datenquellen **dürfen später nur für Figurenerkennung und Preisrecherche** erwogen werden. Kein Anbieter wurde festgelegt. Preise als nachvollziehbare Schätzungen darstellen; Inseratspreis ist kein nachgewiesener Verkaufspreis.
- Keine unnötigen Kategorie-, Mehrsammlungs-, Attributschema-, Dashboard-, News-, Analyse-, PWA- oder Sync-Abstraktionen.
- Bestehenden Bestand schützen: keine ungefragten `localStorage`-Resets, Schemaänderungen ohne Migration, Massenlöschung oder heimliche Datenübertragung.
- Jede Änderung gezielt testen, tatsächliche Ergebnisse von Plänen unterscheiden und README/STATUS/FEATURE_CHECKLIST bei relevanten Änderungen nachführen.

## Zielreihenfolge
1. Aktuelle einfache LEGO-Website beurteilen und nur nötige UX-Probleme beheben.
2. Foto einer Minifigur → **Erkennungsvorschläge** → manuelle Bestätigung/Korrektur → vorhandenes Eingabeformular befüllen.
3. Geschätzter **aktueller Markt-/Handelspreis** mit erkennbarer Quelle, Datenstand, Zuverlässigkeit und manueller Korrekturmöglichkeit.
4. Erst nach Nutzerbewertung über weitere Funktionen entscheiden.

Keine der beiden automatischen Funktionen ist derzeit implementiert. Implementiere sie erst nach einem konkreten Auftrag einschließlich Datenquellen-/Kosten-/Datenschutzentscheidung.
