# Tatsächlicher Projektstand — 24.10.2026

## Laufende Website (bereits vor dieser Scope-Bereinigung vorhanden)
- Klassische Website mit HTML/CSS/JS und fest vorgegebener LEGO-Sammlung.
- Übersicht und Figurenraster, Formular für Bild/Name/Katalog-ID/manuellen Preis.
- Einträge anlegen, anzeigen, bearbeiten und bestätigt löschen.
- Werte in Euro (leer ≠ explizit 0), unabhängige doppelte Exemplare.
- Lokale Speicherung per `localStorage`, keine fremden Speicheranbieter.
- Manuelle Eingabe bleibt Kern der Bedienung.

Die ursprünglichen technischen Prüfungen wurden für den Website-Prototyp in der vorherigen STATUS-Fassung dokumentiert: `npm run lint`, `npm test` und `npm run test:e2e` waren dort als bestanden gemeldet. **Bei dieser Dokumentationsänderung wurden keine Code-/Browser-Tests neu ausgeführt.**

## Noch nicht implementiert
- Bildgestützte Erkennung einer LEGO-Minifigur mit Kandidaten und bestätigter Feldübernahme.
- Aktuelle nachvollziehbare Handelspreis-/Marktwertabfrage (inklusive Quelle und Stand).
- Backup und sichere Übertragbarkeit der ausschließlich browserlokalen Daten.

## Geänderte Priorität
Neu am 24.10.2026: **Ausschließlich die eine LEGO-Minifiguren-Website**, bis Erkennung, Preis und Darstellung überzeugen. Die Mehrsammlungs-/Universal-App sowie alle früheren Erweiterungen sind ausdrücklich *nicht* freigegeben. Bestehenden JS-Code und gespeicherte Daten erhalten; alte Konzeptdateien dienen nur als Archiv.

## Nächster Auftrag
Erst konkrete Erkennungsoptionen und geeignete Preisquellen einschließlich Kosten, technischer Grenzen und Datenschutz prüfen. Anschließend genau die benötigte Integration beauftragen. Keine automatische Anbieterentscheidung.

[Scope](../product/CURRENT_SCOPE.md) · [technische Übergabe](../development/PROTOTYPE.md).
