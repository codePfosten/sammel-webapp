# Aktueller Auftrag und Umfang

Stand: 23.10.2026. Ergänzt den unverändert übernommenen ursprünglichen Projektkontext.

## Neueste ausdrückliche Vorgaben

- Konkrete Architektur und Struktur sollen jetzt den Einstieg ermöglichen; spätere Funktionen müssen noch nicht vollständig spezifiziert sein.
- Zuerst lokal laufende Website, später WebApp. Ausschließlich Privatgebrauch, keine öffentliche Bereitstellung.
- Ein Agent soll aus diesem Kontext das Repository möglichst weit vorbereiten, ohne bereits große Logikteile umzusetzen.
- UI-Konzept, verständliche visuelle Übersichten und ein separat nutzbarer Agentenprompt gehören zum Ergebnis.
- Oberfläche und fachliche bzw. speicherbezogene Logik müssen sauber getrennt sein.

## Erste Umsetzung: Gerüst und Demo (M0)

Ein React-/TypeScript-Projekt mit laufender Navigation, App-Shell, wiederverwendbaren Komponenten, separaten Datenverträgen, austauschbarer Read-only-Demoquelle und klar gekennzeichneten Beispielansichten. Formulare sind visuell vorbereitet; produktive Speicherung, umfassende CRUD-Logik und externe Dienste sind nicht Teil des Bootstrap-Auftrags. Ein Memory-Adapter darf Listen und einzelne Datensätze lesen. Aktionsbuttons erklären ausdrücklich, wenn eine Funktion noch nicht verfügbar ist.

## Danach: manuelle benutzbare Version (M1)

Sammlungen und einzelne Exemplare manuell verwalten, Bilder übernehmen, String-Attribute bearbeiten, Werte berechnen und im Browser dauerhaft speichern. Referenzielle Integrität und Fehlerzustände gehören dazu. Sicherung/Import bleibt eine Empfehlung, vor echten wertvollen Beständen als bewusste Produktentscheidung zu behandeln.

## Später (M2+)

Privater iPhone-/PWA-Betrieb, Backup, Suche/Filter/Sortierung, Favoriten, Erkennung und Preise, Analyse; News zuletzt. Zwischen diesen Erweiterungen ist keine abschließende Reihenfolge beschlossen. Cloud ist optional. Keine Anbieterentscheidung erforderlich, um M0 oder M1 zu beginnen.

Lokales Ausführen und Speicherung sind unterschiedliche Entscheidungen: Dieser Entwurf wählt für M1 lokale IndexedDB als austauschbare Arbeitsannahme. Der Nutzer hat damit keinen bestimmten Speicheranbieter endgültig festgelegt.
