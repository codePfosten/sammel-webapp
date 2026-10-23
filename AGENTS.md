# Arbeitsregeln für alle Agenten

## Vor jeder Aufgabe

Lies `docs/product/CURRENT_SCOPE.md`, `docs/planning/STATUS.md` und die für die Aufgabe passenden Dokumente. Prüfe vorhandenen Code, Repository-Anweisungen und den Arbeitsbaum. Dieses Paket beschreibt ein Zielbild, keinen Beweis implementierter Funktionen. Verändere keine fremden Änderungen und überschreibe bestehende README-/Konfigurationsdateien nicht blind.

Priorität: neueste ausdrückliche Nutzeranweisung > CURRENT_SCOPE > ursprünglicher Produktkontext > Architektur/Verträge > UI-Spezifikation > menschliche Übersichten. Dokumentiere Widersprüche; passe die nachrangigen Dokumente an. Arbeitsannahmen aus DECISIONS sind für den Feldversuch verwendbar, aber keine bestätigten Produktentscheidungen.

## Architekturgrenzen

- `presentation`: React, Formulare, Ansichten, Formatierung, Hooks. Kein direkter Datenbankzugriff, keine Preisberechnung als duplizierte UI-Logik.
- `application`: Anwendungsfälle und Ports. Keine React-, DOM-, Router- oder Dexie-Imports.
- `domain`: reine Typen und fachliche Regeln. Keine Browser-, Speicher- oder UI-Abhängigkeiten.
- `infrastructure`: Implementierungen der Ports, Browser- und Datenbankzugriffe.
- `app`: verdrahtet diese Teile als einziger Composition Root.
- Kein Ordner `backend` ohne tatsächlichen Server. Backend-artige Aufgaben gehören zunächst in application/domain/infrastructure.
- Keine unnötigen Klassen, Basis-Repositories, globalen Event-Busse oder DI-Frameworks. TypeScript-Typen und Funktionen genügen.

## Inhaltliche Grenzen

Keine Pflichtnamen und keine Eindeutigkeit von Namen/Katalognummern. Jedes Exemplar hat eine eigene interne ID. Eigene Attribute bleiben String-Paare. Keine stillen API-Aufrufe, Telemetrie, Cloud-Dienste oder Veröffentlichung. Keine Geheimnisse im Client; auch `.env` macht Clientwerte nicht geheim. Keine automatische öffentliche Deployment-Pipeline.

## Zusammenarbeit und Abschluss

Lies für UI-Aufgaben zusätzlich UI_SPEC; für Datenaufgaben DATA_CONTRACTS; für Gerüstaufgaben REPOSITORY_MAP und den Bootstrap-Prompt. Bearbeite nur den beauftragten Umfang. Nutze vorhandene Muster, statt parallele Alternativen einzuführen. Bei späterer paralleler Arbeit vorab exklusive Dateizuständigkeiten vereinbaren; gemeinsam genutzte Verträge zuerst abstimmen.

Jede Übergabe nennt: geänderte Dateien, tatsächliches Verhalten, ausgeführte Prüfungen mit Ergebnis, Einschränkungen und nächsten sinnvollen Task. Aktualisiere STATUS und betroffene Übersichten. Markiere Features nur nach Umsetzung und passender Prüfung als fertig. Nicht ausführbare Prüfungen heißen „nicht ausgeführt“, nicht „bestanden“.

Die Dateien CLASS_DIAGRAM, PROJECT_FLOW, UI_PREVIEW und FEATURE_CHECKLIST sind für den Menschen; verbindliche technische Details liegen in docs/architecture und docs/ui. Falls später VISUAL_OVERVIEW_AGENT.md bereitgestellt wird, beachte deren zusätzliche Anweisung. Erfinde ihren Inhalt nicht.
