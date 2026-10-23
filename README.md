# sammel-webapp · Start-/Kontextpaket

Eine WebApp für den Privatgebrauch, welche am Ende eine digitale Übersicht über gesammelte Gegenstände sein soll.

Stand: 23.10.2026 · Architekturentwurf 0.1 · Privates Projekt

Dieses Repository enthält aktuell das **Sammel-App-Startpaket** als Projektkontext. Es enthält Planung, Agentenregeln und eine eigenständig öffnende UI-Vorschau. **Es enthält noch keine implementierte Sammel-App und kein fertig eingerichtetes React-Projekt.**

## Struktur im Repository

- Root: `AGENTS.md`, `PROJECT_FLOW.md`, `CLASS_DIAGRAM.md`, `FEATURE_CHECKLIST.md`, `UI_PREVIEW.md`
- `docs/product`: Produktkontext und aktueller Umfang
- `docs/architecture`: Architektur, Datenverträge, Entscheidungen, Quellen, Zielstruktur
- `docs/ui`: UI-Spezifikation
- `docs/planning`: Aufgaben, Abnahmekriterien, Status
- `docs/preview`: lokale Offline-Vorschau (`ui-preview.html`, `screens.svg`)
- `prompts`: Startprompt für den nächsten Coding-Agenten
- `Sammel-App-Startpaket.zip`: Original-Archivquelle (bewusst beibehalten)

## So startest du mit dem Kontext

1. [UI-Vorschau öffnen](docs/preview/ui-preview.html) (lokal/offline im Browser). Alternativ [Bildübersicht](docs/preview/screens.svg).
2. [AGENTS.md](AGENTS.md) und [docs/planning/STATUS.md](docs/planning/STATUS.md) lesen.
3. Danach den Prompt aus [prompts/BOOTSTRAP_AGENT_PROMPT.md](prompts/BOOTSTRAP_AGENT_PROMPT.md) mit dem gesamten Repository-Kontext an den nächsten Coding-Agenten geben.

## Empfohlener nächster konkreter Entwicklungsschritt

Gemäß [docs/planning/TASKS.md](docs/planning/TASKS.md): **B01** starten (Repository prüfen, Vite/React/TS einrichten, lokale Skripte aufsetzen). Erst danach folgen B02–B05.

## Lokal starten – erst nach dem Bootstrap

Die Befehle `npm run dev`, `npm run build`, `npm run typecheck`, `npm run lint` und `npm run test:run` sind erst nach der Bootstrap-Umsetzung verfügbar.
