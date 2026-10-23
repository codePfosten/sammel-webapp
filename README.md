# sammel-webapp · einfache LEGO-Website

Eine WebApp für den Privatgebrauch, welche am Ende eine digitale Übersicht über gesammelte Gegenstände sein soll.

Stand: 23.10.2026 · Angeordneter einfacher Website-Prototyp

Die Website ist als einfacher **HTML-/CSS-/JavaScript-Prototyp** bedienbar. Der Projektinhaber hat diese Vereinfachung ausdrücklich angeordnet; [Auftrag und Abweichungen zur alten Planung](docs/product/PROTOTYPE_DIRECTIVE.md) sind dokumentiert.

## Lokal starten

Node **ab 22** installieren (geprüft mit **24.19.0**, siehe `.nvmrc`), Repository herunterladen/klonen und im Repository-Ordner ausführen:

```sh
npm start
```

Dann **http://127.0.0.1:5173** öffnen. Für den Start müssen keine npm-Pakete installiert und keine Konfigurationsdateien geändert werden. Kein Build nötig. Die Website nutzt native ES-Module; direktes Öffnen per `file://` wird nicht unterstützt. Der lokale Server stellt nur statische Dateien bereit und lauscht auf dem eigenen Rechner.

## Selbst ausprobieren

1. Auf der Startseite **LEGO-Figuren** oder **Sammlung öffnen** wählen.
2. **Gegenstand hinzufügen**: optional Bild, Name, LEGO-/Katalog-ID und Preis eingeben.
3. **Speichern**, die Kachel in der Sammlung öffnen und den Eintrag ansehen/bearbeiten.
4. **Löschen** entfernt nach Bestätigung genau dieses Exemplar.

Gleiche Namen/Katalognummern sind erlaubt. Leere Angaben zeigen neutrale Defaults; ein leerer Preis bleibt unbewertet, eine eingegebene 0 zählt als 0,00 €. Die feste LEGO-Sammlung ist sofort vorhanden.

**Daten und Bilder werden nur in diesem Browser gespeichert (`localStorage`) und bleiben beim Neuladen erhalten. Keine Cloud oder Sicherung.** Browserdaten löschen, Privatmodus oder anderer Browser/Host/Port können den Bestand verlieren/wechseln. Bilder unverändert bis 2 MB je Datei; der gesamte Browserspeicher kann schon früher voll sein. Das ist ein Erprobungsprototyp, kein abgeschlossenes M1.

## Entwicklung und Prüfung

```sh
npm ci
npm run lint
npm test
# Einmalig, falls kein System-Chromium vorhanden:
npx playwright install chromium
npm run test:e2e
```

`npm ci` installiert ausschließlich die Browser-Testwerkzeuge; die Website selbst hat keine Paketabhängigkeiten. `lint` prüft JS-Syntax und direkte Importgrenzen. Keine TypeScript-/Build-Prüfung, da kein Compiler oder Bundler eingesetzt wird.

[Tatsächlicher Prüfstand](docs/planning/STATUS.md) · [Entwicklungsübergabe und Speichervertrag](docs/development/PROTOTYPE.md)

## Struktur im Repository

- Root: `AGENTS.md`, `PROJECT_FLOW.md`, `CLASS_DIAGRAM.md`, `FEATURE_CHECKLIST.md`, `UI_PREVIEW.md`
- `docs/product`: Produktkontext und aktueller Umfang
- `docs/architecture`: Architektur, Datenverträge, Entscheidungen, Quellen, Zielstruktur
- `docs/ui`: UI-Spezifikation
- `docs/planning`: Aufgaben, Abnahmekriterien, Status
- `docs/preview`: lokale Offline-Vorschau (`ui-preview.html`, `screens.svg`)
- `prompts`: Startprompt für den nächsten Coding-Agenten
- `Sammel-App-Startpaket.zip`: Original-Archivquelle (bewusst beibehalten)

## Kontext für die nächste Entwicklung

[AGENTS.md](AGENTS.md) → [CURRENT_SCOPE](docs/product/CURRENT_SCOPE.md) → [Nutzeranordnung](docs/product/PROTOTYPE_DIRECTIVE.md) → [technische Übergabe](docs/development/PROTOTYPE.md).

[Funktionsübersicht](FEATURE_CHECKLIST.md), [Abläufe](PROJECT_FLOW.md), [Modell](CLASS_DIAGRAM.md) und [UI-Konzept](UI_PREVIEW.md) unterscheiden den tatsächlichen Stand vom späteren Zielbild. Das Original-ZIP und die HTML-/SVG-Designvorschau bleiben erhalten. Der alte Bootstrap-Prompt beschreibt einen früheren React-Auftrag und soll nicht unverändert erneut ausgeführt werden.

Noch nicht enthalten: mehrere/konfigurierbare Sammlungen, eigener Attributeditor, Erkennung, Preisabfragen, Suche/Filter, Import/Export, Cloud, PWA und öffentliches Deployment. Zuerst den einfachen Prototyp beurteilen, danach den nächsten kleinen Umfang festlegen.
