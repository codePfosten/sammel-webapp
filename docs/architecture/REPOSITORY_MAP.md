# Zielstruktur und Dateizuständigkeiten

Das vorliegende Paket enthält bereits die Dokumentation. Die nachfolgenden `src`-, Test- und Tooldateien sind ein **Zielplan für den Bootstrap-Agenten**, noch keine existierenden App-Dateien. Ein einziges npm-Projekt in der Repository-Wurzel.

| Zielpfad | Inhalt / Eigentümer der Verantwortung |
|---|---|
| `package.json`, `package-lock.json`, `.nvmrc` | Tooling, Scripts und reproduzierbare Versionen |
| `index.html`, `vite.config.ts`, `tsconfig*.json` | App-Einstieg und Build-Konfiguration |
| `eslint.config.*`, `.gitignore` | Importgrenzen/Lint; node_modules, dist, private Daten und Secrets ausschließen |
| `src/main.tsx` | React-Einstieg |
| `src/app/App.tsx` | App-Komposition mit Providern |
| `src/app/router.tsx` | Hash-Routen und Fallback |
| `src/app/createServices.ts` | einzige Auswahl konkreter Adapter |
| `src/app/ServicesProvider.tsx` | injizierte Services, keine Fachlogik |
| `src/domain/model.ts` | Category, Collection, Collectible, Attribute, ImageId |
| `src/domain/valuation.ts` | später reine Summenregeln; M0 nur bei tatsächlicher Nutzung anlegen |
| `src/application/ports/InventoryReader.ts` | async Lesen von Beständen |
| `src/application/ports/InventoryWriter.ts` | später atomare Schreibvorgänge; M0 nur Vertrag |
| `src/application/ports/ImageReader.ts` | Blob-Auflösung nach Bild-ID |
| `src/application/queries/` | M0 dünne Lese-Funktionen; später Gesamtübersichten |
| `src/application/commands/` | M1 Erzeugen, Ändern, Löschen; M0 README statt Fake-Implementierung |
| `src/infrastructure/memory/MemoryInventoryReader.ts` | Read-only-Demoquelle |
| `src/infrastructure/memory/fixtures.ts` | zentrale fiktive Beispieldaten |
| `src/infrastructure/indexeddb/README.md` | M0 Reservierung; M1 DB, Migrationen und Adapter |
| `src/infrastructure/browser/` | später Bildverarbeitung, ID-Erzeugung und Browserintegration |
| `src/presentation/layout/AppShell.tsx` | Header, Content, dauerhaft sichtbare untere Navigation |
| `src/presentation/components/` | Button, ValueCard, CollectionRow, ItemGrid, ItemCard, EmptyState, StatusMessage |
| `src/presentation/features/dashboard/` | DashboardPage und zuständiger Hook |
| `src/presentation/features/collections/` | Listen-, Detail-, Formularansichten von Sammlungen |
| `src/presentation/features/items/` | Alle-, Detail-, Formularansichten von Exemplaren |
| `src/presentation/features/settings/` | Einstellungen und Speichermodus-Hinweis |
| `src/presentation/features/future/` | kleine, ehrliche News-/Analyse-Platzhalter |
| `src/presentation/hooks/` | wirklich gemeinsam genutzte Hooks, z. B. useImageUrl |
| `src/presentation/styles/tokens.css`, `global.css` | Designvariablen, Reset, Safe-Area |
| `public/demo/` | ausschließlich künstliche lokale Demo-Bilder |
| `tests/` | übergreifende Integrations-/spätere E2E-Tests |
| `src/**/*.test.ts(x)` | Tests direkt neben fachlichem oder UI-Code |
| `docs/product/` | unveränderte Quellen und aktueller Umfang |
| `docs/architecture/` | Architektur, Verträge, Entscheidungen und diese Zuordnung |
| `docs/ui/` | technische UI-Spezifikation |
| `docs/preview/` | menschliche Designvorschau, kein App-Quellcode |
| `docs/planning/` | Aufgaben, Status, Abnahme |
| `prompts/` | kopierbare Aufträge, kein Runtime-Code |
| Wurzel: `README.md`, `AGENTS.md`, fünf Übersichten inklusive README | verständlicher Einstieg und Agentenregeln |

Dateinamen in Code Englisch, sichtbare UI-Texte und Projektdokumentation Deutsch. React-Komponenten PascalCase, Hooks useCamelCase. Funktionen und Types statt erzwungener Klassen. Kein zweites Projekt in einem zusätzlichen `frontend/`-Unterordner. Keine leeren Verzeichniswälder; geplante Bereiche mit einer kurzen README reservieren oder nur hier dokumentieren.

## Welche Dokumente braucht welcher Agent?

| Aufgabe | Mindestkontext nach AGENTS/CURRENT_SCOPE/STATUS |
|---|---|
| Gerüst | ARCHITECTURE, REPOSITORY_MAP, DATA_CONTRACTS, UI_SPEC, Bootstrap-Prompt |
| UI | UI_SPEC, DATA_CONTRACTS, relevante Übersicht; Vorschau als Referenz |
| Daten/Persistenz | ARCHITECTURE, DATA_CONTRACTS, DECISIONS, ACCEPTANCE |
| Fachlogik | Produktkontext, DATA_CONTRACTS, relevante TASKS/ACCEPTANCE |
| Übersichtspflege | tatsächlicher Code/Tests und technische Änderungen; VISUAL_OVERVIEW_CONTEXT |

Statuspflege gehört zur jeweiligen Aufgabe. Ein Agent darf nicht aus einer schönen Vorschau auf fertige Funktionen schließen.
