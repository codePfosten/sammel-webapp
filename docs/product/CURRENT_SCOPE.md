# Aktueller Produktumfang — LEGO-Minifiguren (24.10.2026)

**Dieses Dokument ersetzt für die laufende Entwicklung alle früheren umfangreichen Zielbilder.** Historische Dokumente sind keine Feature-Liste. Bestehende Website und lokale Daten erhalten.

## Eine einzige Produktidee
Eine **klassische, unkomplizierte Website**, mit der der Projektinhaber seine **eigene LEGO-Minifiguren-Sammlung digitalisiert**. Erst wenn die Erfahrung, Erkennung und Preisermittlung überzeugen, wird über einen größeren Umfang nachgedacht. Keine universelle Sammel-App entwickeln.

### A. Vorhandene Basis behalten
- Eine feste LEGO-Figuren-Sammlung, Startseite/Übersicht und Figurenraster.
- Figur manuell anlegen, ansehen, bearbeiten und löschen.
- Optional: eigenes Foto, Name, LEGO-/Katalognummer, Preis. Unvollständige Daten sind erlaubt; Duplikate sind separate Exemplare.
- Übersicht mit Anzahl und aus vorhandenen Beträgen abgeleitetem geschätzten Gesamtwert.
- Lokale Speicherung im Browser (`localStorage`) ohne fremden Speicheranbieter. Keine automatische Synchronisation, kein Cloud-Backend.
- Implementierung in HTML/CSS/JavaScript, wie sie heute im Repository besteht. Keine React-/TypeScript-Neuimplementierung ohne ausdrücklichen Wunsch.

### B. Die zwei nächsten Kernfähigkeiten (geplant, noch nicht umgesetzt)
1. **Bildgestützte Identifizierung:** Foto einer LEGO-Minifigur auswählen/aufnehmen; System schlägt mögliche Figur(en) samt Kennnummer und ggf. Daten vor. Nutzer bestätigt oder korrigiert den Treffer. Erst dann werden vorhandene Formularfelder übernommen; manuelle Eingabe funktioniert weiterhin unabhängig.
2. **Aktueller Preis:** Für identifizierte Figuren eine begründete aktuelle Marktwert-Schätzung ermitteln und anzeigen. Falls möglich auf tatsächlichen Verkäufen beruhen; wenn nur Angebotspreise vorliegen, ausdrücklich als solche kennzeichnen. Quelle, Aktualität und Unsicherheit transparent machen, keine Gewissheit vortäuschen. Nutzer kann den Wert weiterhin manuell eingeben oder überschreiben.

**Wichtig:** Das gewünschte Ergebnis ist definiert, aber noch kein Erkennungsmodell, Preis-API, Anbieter, Genauigkeitsniveau oder Kostenbudget ausgewählt. Vor Implementation dieser externen Funktionen Machbarkeit, Datenquelle, Bedingungen, Kosten und Datenweitergabe prüfen. Fotos nicht ohne informierte Entscheidung an einen Dienst hochladen. Für die Speicherung bleibt es beim eigenen Browser.

### C. Explizit nicht im aktuellen Projektumfang
Mehrere Sammlungen; andere Sammelarten/Kategorien; frei konfigurierbare Attribute und Kategorien; universeller Inventareditor; Suche, Filter, Sortierung, Favoriten; Analyse/Gewinne/Preisverläufe; News; Nutzerkonten; Cloudspeicher/Sync; PWA/App-Store; Erweiterungsframeworks. Diese Funktionen **nicht vorsorglich vorbereiten**, sofern nicht für A/B technisch unvermeidlich.

## Entwicklungsprinzip
**Weniger ist besser.** Die aktuelle Website beibehalten und gezielt vervollständigen. Nur nachweislich benötigte Eingabefelder und Interaktionen entwickeln. Keine automatische Preisschätzung als echtes Händlerangebot ausgeben. Keine fremden Anbieter für die Speicherung. UI soll einen einfachen Ablauf unterstützen: **Foto → Vorschlag → Bestätigung → bei Bedarf Korrektur/Preis → Speichern → Sammlung ansehen**.

## Definition des ersten angestrebten Ergebnisses
Die Website lässt eine LEGO-Sammlung manuell verwalten, erleichtert die Erfassung mit bestätigungspflichtiger Bilderkennung und zeigt eine nachvollziehbare aktuelle Preisorientierung, ohne dass diese Dienste zwingend funktionieren müssen, damit man manuell speichern kann.

## Tatsächlicher Stand
Siehe [STATUS](../planning/STATUS.md) und [Entwicklungsübergabe](../development/PROTOTYPE.md). Die automatischen Funktionen sind noch **nicht** gebaut.
