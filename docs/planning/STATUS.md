# Tatsächlicher Projektstand

Stand: 23.10.2026 · Einfacher HTML-/CSS-/JavaScript-Website-Prototyp.

Der Projektinhaber hat diesen vereinfachten Umfang ausdrücklich angeordnet. [Anordnung und Abweichungen](../product/PROTOTYPE_DIRECTIVE.md) · [technische Übergabe](../development/PROTOTYPE.md).

## Implementiert

- Website ohne Framework, TypeScript, Bundler oder Runtime-Paketabhängigkeiten. `npm start` benötigt nur Node ab 22, keine Paketinstallation.
- Startseite mit Gesamtwert, Anzahl und Link zur festen LEGO-Sammlung.
- LEGO-Sammlung mit gleich großen Bildkacheln und Leerzustand.
- Einzelne Gegenstände manuell anlegen, ansehen, bearbeiten und nach Bestätigung löschen. Name, LEGO-/Katalog-ID, Preis und ein Bild sind optional.
- Defaults für fehlende Felder; null und explizit 0 unterschieden; EUR-Cent-Summen zentral abgeleitet. Gleiche Exemplare bleiben unabhängig.
- Einfache lokale Speicherung als versionierter localStorage-Snapshot inklusive Bild-Data-URLs. Reload erhält den Bestand im selben Browser/Origin.
- Responsive CSS, zwei feste Navigationsziele, sichtbarer Tastaturfokus, Skiplink, verständliche Fehler und unbekannte ID-/Routenzustände.
- Browser-Speicherfehler werden angezeigt. Beschädigte Daten werden nicht still gelöscht. Bilder werden nicht bearbeitet und bleiben lokal.

## Ausgeführte Prüfungen

Umgebung: Node 24.19.0, npm 11.9.0, Chromium via Playwright 1.64.1.

| Befehl / Szenario | Ergebnis |
|---|---|
| `npm ci` | bestanden; drei Pakete ausschließlich für Browsertests |
| `npm run lint` | bestanden; Syntax und direkte Importgrenzen von zehn JS-Dateien geprüft |
| `npm test` | vier Tests bestanden |
| `npm run test:e2e` | fünf Chromium-Tests bestanden, 11,9 s |
| `git diff --check` | bestanden |

Node-Tests: Eurovalidierung, null/0, Defaults, getrennte Duplikate, Bearbeiten/Löschen, gespeicherte Bilder, erneutes Lesen nach Reload, Quota-Fehler ohne Teiländerung, Schutz beschädigter Bestände und fehlendes Bild.

Drei Browserabläufe bei **320, 390 und 1024 px**: Übersicht → LEGO-Sammlung → Gegenstand mit Bild/Preis/Name/Katalog-ID anlegen → Neuladen mit Bild → identisches Exemplar anlegen → Raster → Bearbeiten/Bild entfernen/Wert 0 → Löschung abbrechen/bestätigen → Übersicht. Geprüft: Werte/Bewertungsabdeckung, aktive Navigation, horizontaler Überlauf im Raster, feste Navigation und sichtbarer Tastaturfokus. Mobile Raster-/Startseitenscreenshots wurden zusätzlich angesehen. Keine JS-Laufzeitfehler in diesen drei Abläufen.

Weitere Browserprüfungen: vollständig leere Erfassung, ungültiger Preis, Abbrechen ohne Mutation, HTML-Eingaben als Text, unbekannte ID ohne falschen aktiven Tab, Speicherlimit und beschädigte gespeicherte Daten ohne Überschreiben.

Es gibt absichtlich **keinen Build- oder TypeScript-Prüfschritt**: HTML/CSS/JS werden direkt ausgeliefert. Nicht ausgeführt: echte Safari-/iPhone-/Android-Geräte, mobile Bildschirmtastatur, 200-%-Zoom, Browser-Privatmodi und Mehrtab-Konflikttests. Kein produktiver Datenbanktest erforderlich, da keine DB implementiert ist.

## Bewusst nicht implementiert

Sammlungen erstellen/konfigurieren, eigener Attributeditor, Such-/Filterfunktionen, Bildbearbeitung, Erkennung, externe Preise, APIs, IndexedDB, Import/Export/Backup, Authentifizierung, Cloud, News, Analyse, PWA oder Website-Deployment. Die umfassende M1-Stufe ist nicht abgeschlossen.

localStorage ist klein und synchron. Bildlimit 2 MB je Datei; der Gesamtspeicher kann früher voll sein. Browserdatenlöschung verliert den Bestand. Parallel schreibende Tabs können einander überschreiben. Normale Navigation verwirft ungespeicherte Formularentwürfe; Schließen/Reload fragt die Browserwarnung an.

## Übergabe und nächster Schritt

Neue Dateien: Website-Einstieg, CSS, fünf JS-Module, lokaler statischer Server, Syntax-/Importcheck, Node-/Browsertests, Paket-/Lock-/Node-Konfiguration und Entwicklungsübergabe. README, AGENTS, Scope, Architekturhinweise und die vier menschlichen Übersichten wurden konsistent angepasst. Original-ZIP und HTML-/SVG-Designreferenzen bleiben unverändert. Die frühere lokale React-Arbeit wird nicht als parallele App in dieses Repository übernommen.

Der Stand wird als regulärer Commit auf GitHub bereitgestellt, ohne Website-Deployment. Nächster sinnvoller Schritt: Projektinhaber erprobt diesen kleinen Umfang; anschließend eine konkrete Erweiterung auswählen. Keine automatische Rückkehr zum größeren React-/M1-Plan.
