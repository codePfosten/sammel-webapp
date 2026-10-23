# Entscheidungsprotokoll

Stand: 23.10.2026. „Arbeitsannahme“ heißt: für den Feldversuch umsetzen, bei Bedarf bewusst ändern; keine erneute Grundsatzabfrage nötig.

| ID | Entscheidung | Status / Begründung |
|---|---|---|
| A01 | statische SPA, zunächst lokal und privat | lokale/private Nutzung vorgegeben; SPA konkrete Architekturwahl |
| A02 | React + TypeScript + Vite, ein npm-Projekt | Arbeitsannahme; klare Komponenten und wenig Betriebsaufwand |
| A03 | Domain/Application/Infrastructure/Presentation plus App-Komposition | Arbeitsannahme; austauschbare Technik ohne großen Frameworkapparat |
| A04 | zunächst kein Backend-Server | Arbeitsannahme; manuelle Abläufe brauchen ihn nicht |
| A05 | M0 Read-only-Memory, M1 IndexedDB/Dexie | Arbeitsannahme; Persistenz später austauschbar |
| A06 | ein Exemplar in genau einer Sammlung | Arbeitsannahme; verhindert ungewollte Mehrfachzählung |
| A07 | EUR-Cent, null ≠ 0, leere Texte | Arbeitsannahme; klare Werte und keine Pflichtfelder |
| A08 | eigene Attribute als Array mit Zeilen-ID | Arbeitsannahme; String-Paare auch mit gleichen Keys verlustfrei |
| A09 | sechs Tabs in verlangter Reihenfolge, News/Analyse mit „Später“ | Arbeitsannahme; spätere Struktur bereits sichtbar |
| A10 | 2 Rasterspalten mobil, quadratische contain-Bilder | Arbeitsannahme; Objekte vollständig sehen |
| A11 | unterer Tab folgt dem Routenbereich; eigene Detailroute unter Alle | Arbeitsannahme; Herkunft und Zurück konsistent |
| A12 | gefüllte Sammlung nicht löschen | konservative Arbeitsannahme bis zur separaten Produktentscheidung |
| A13 | PWA, Backup, APIs nicht im Bootstrap | Umfangsgrenze; benötigt jeweils eine eigene Abnahme |

## Nicht jetzt festlegen

Anbieter für Erkennung/Preise; Hosting und privater iPhone-Zugang; endgültige Bildkompression; Analyse-Standardwerte und Geltungsbereich; rückwirkende Berechnungen; News-Quellen; Cloud-Sync; mehrere Bilder; endgültiger Designstil. Keine Platzhalter mit vorgetäuschter API oder Fake-Preisprognose.

## Änderungen

Bei Änderung eine datierte Zeile ergänzen: Anlass, betroffene Entscheidung, neue Regel, betroffene Verträge und nötige Datenmigration. Eine Änderung am Entwurf ist kein Architekturfehler; undokumentierte Widersprüche sind zu vermeiden.


## Angeordnete Vereinfachung · 23.10.2026

Der Projektinhaber ersetzt A02/A05/A09 für den aktuellen Prototyp: HTML/CSS/JS ohne React/TS/Vite, einfache lokale Speicherung über localStorage, zwei Navigationsziele Übersicht/LEGO-Sammlung. Eine feste Sammlung ersetzt vorerst Sammlungserstellung/-konfiguration. A07 (Cent/null/0), individuelle Exemplar-IDs und grundsätzliche Schichtentrennung bleiben. Bilder unverändert als Data-URLs, maximal 2 MB pro Datei; keine Bildbearbeitung. Quelle: [PROTOTYPE_DIRECTIVE](../product/PROTOTYPE_DIRECTIVE.md). Kein vollständiger M1-Abschluss und kein Website-Deployment.
