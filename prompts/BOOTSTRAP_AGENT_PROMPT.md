# Startprompt für den Repository-Agenten

Du erhältst das vollständige Sammel-App-Startpaket als Kontext. Setze jetzt dessen **M0: Repository-Gerüst und navigierbaren UI-Prototyp** in einem lokalen Repository um. Liefere eine tatsächlich startbare Grundlage, auf der spätere Agenten gezielt arbeiten können. Große Fachlogik, persistente Speicherung und externe Integrationen gehören nicht in diesen Auftrag.

## 1. Vorbereiten

Prüfe das vorhandene Repository, seine Anweisungen und uncommittete Änderungen. Falls kein Projekt existiert, initialisiere das lokale Projekt im vorgesehenen Arbeitsordner. Keine vorhandenen Dateien blind überschreiben, keine Remote-/Hosting-Konfiguration erfinden, nichts öffentlich veröffentlichen. Falls das Startpaket außerhalb des Repositorys liegt, übernimm seine Dokumente an die vorgesehenen Pfade; integriere vorhandene README-/AGENTS-Inhalte statt sie zu ersetzen.

Lies in dieser Reihenfolge:
1. AGENTS.md
2. docs/product/CURRENT_SCOPE.md und docs/planning/STATUS.md
3. docs/product/SAMMEL_APP_PROJEKTKONTEXT.md
4. docs/architecture/ARCHITECTURE.md, REPOSITORY_MAP.md, DATA_CONTRACTS.md und DECISIONS.md
5. docs/ui/UI_SPEC.md und die lokale Vorschau docs/preview/ui-preview.html
6. docs/planning/TASKS.md und ACCEPTANCE.md

Arbeitsannahmen darfst du für diesen Feldversuch verwenden. Stelle nicht wegen jeder kleinen UI-Entscheidung Rückfragen. Wenn tatsächlicher Code der Planung widerspricht, prüfe den Grund, erhalte bestehende Funktionalität und dokumentiere deine Lösung. Bezeichne keine geplante Funktion als fertig.

## 2. Technisches Fundament

Ein einziges npm-Projekt mit React, TypeScript strict und Vite. Wähle kompatible stabile Versionen, prüfe deren Node-Voraussetzungen und halte die tatsächlich installierten Versionen über Lockdatei und .nvmrc fest. Richte dev/build/typecheck/lint/test:run ein. Dev standardmäßig nur lokal erreichbar, kein Deployment. Kein Backend-Server, SSR, Monorepo oder großes State-Management-Framework.

Lege die Schichten gemäß REPOSITORY_MAP an: domain, application, infrastructure, presentation und app als Composition Root. Domain/Application bleiben frei von React, DOM und Dexie. UI greift nicht direkt auf Infrastructure zu. Kontrolliere die Importgrenzen mit einer kleinen geeigneten Lint-/Check-Konfiguration.

## 3. Datenverträge und Demo

Erzeuge die beschriebenen Typen und asynchronen Read-Ports. Implementiere einen kleinen Read-only-Memory-Adapter mit zentralen fiktiven Fixtures. Zwei gleiche Exemplare mit unterschiedlichen IDs, leere Felder, null-Wert und explizit 0 müssen vorkommen. Verwende die Werte aus UI_PREVIEW oder halte alle Demoanzeigen nach einer bewussten Änderung konsistent.

Verdrahte Reader und dünne Lese-Anwendungsfälle über createServices und einen Provider. Keine echte IndexedDB, Cloud oder HTTP-Aufrufe. Der spätere Writer darf als reiner Vertrag vorhanden sein, aber keine Fake-Schreibimplementierung mit Erfolgsmeldungen erhalten. Für noch nicht implementierte Bereiche genügen kurze zuständige README-Dateien. Keine ungenutzten Funktionsgerippe mit Dutzenden TODOs erzeugen.

Kleine rein lesende Ableitungen für Anzeigeanzahl und Demo-Wertsummen sind erlaubt, wenn sie zentral im Domain-/Application-Bereich liegen. Keine produktive Bewertungs-/Analyse-Engine und keine duplizierten Berechnungen in Komponenten.

## 4. Oberfläche

Setze die AppShell, mobile Tokens, Bildraster und wiederverwendbare Komponenten um. Implementiere alle Routen aus UI_SPEC mit echten Demo-Lesezugriffen: Dashboard, Sammlungsliste, Sammlung, Alle, Details, Formularansichten, Einstellungen und ehrliche News-/Analyse-Platzhalter.

Die sechs Tabs bleiben in der geforderten Reihenfolge sichtbar, inklusive Unterseiten. Die Herkunft einer Detailroute bestimmt aktiven Tab und Zurücklink. Unknown-Route und Unknown-ID erhalten verständliche Zustände. Halte Fachdaten aus JSX-Fixtures heraus.

Formulare dürfen Eingaben lokal anzeigen, speichern jedoch noch nicht. Speichern klar deaktivieren und den Grund daneben nennen. Keine still wirkungslosen Aktionen, vorgetäuschten Löschungen, Exporte, Erkennungen oder Preisabfragen. Demo-Modus in der Oberfläche erkennbar kennzeichnen. Rasterbilder aus lokalen künstlichen Assets oder CSS-Platzhaltern, keine externen Hotlinks.

## 5. Prüfen

Führe build, typecheck, lint und die sinnvollen kleinen Smoke-Tests aus. Prüfe die Kernnavigation und Darstellung bei 320, 390 und 1024 px sowie Fokus/Tastatur und die feste untere Navigation. Verwende vorhandene Browser-Testwerkzeuge, soweit verfügbar. Falls etwas nicht ausführbar ist, dokumentiere es exakt; behaupte keine Prüfung. Behebe Fehler im beauftragten Umfang.

## 6. Dokumentieren und übergeben

Aktualisiere README mit echten Installations-/Startbefehlen, Node-Voraussetzung und Hinweis auf flüchtige Demo-Daten. Aktualisiere STATUS, FEATURE_CHECKLIST, CLASS_DIAGRAM, PROJECT_FLOW und UI_PREVIEW entsprechend dem tatsächlichen Ergebnis. Trenne „UI vorhanden“ von „Funktion implementiert“.

Schließe mit einer kurzen Übergabe ab: Was läuft? Wie starte ich es? Welche Prüfungen bestanden? Was fehlt bewusst? Welcher konkrete Task folgt? Verweise auf passende Pfade. Ziel ist ein konsistentes und prüfbares Gerüst, keine möglichst große Dateizahl.

Arbeite selbstständig bis die M0-Abnahmekriterien erfüllt sind oder ein konkreter technischer Blocker vorliegt. Beginne anschließend nicht ungefragt M1.
