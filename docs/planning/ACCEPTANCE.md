# Abnahme und sinnvolle Prüfungen

## M0 – Bootstrap fertig, App noch nicht produktiv

- Installierte Versionen und Node-Voraussetzung dokumentiert; npm-Lockdatei vorhanden. Neuinstallation über npm ci nachvollziehbar.
- dev startet lokal; build, typecheck und lint erfolgreich. Keine automatische Veröffentlichung.
- Navigation öffnet alle spezifizierten Routen, Detailseiten verwenden dieselbe Komponente; unbekannte IDs zeigen einen Fehlerzustand.
- Mindestens Dashboard → Sammlung → Exemplar → Zurück und Alle → Exemplar sind überprüft; aktiver Tab stimmt.
- Oberfläche bei 320, 390 und 1024 px geprüft, keine verdeckten Aktionen durch die untere Navigation. Tastaturbedienung und sichtbarer Fokus geprüft.
- Demo ist ausdrücklich markiert; Daten kommen aus zentraler Quelle; kein Erfolgssignal für nicht implementierte Speicherung.
- Kleine automatisierte Smoke-Tests für Routen/Rendern und Demo-Reader. Keine leeren Dummytests oder künstliche Coverage-Vorgabe.
- Importgrenzen per ESLint-Regeln oder gleichwertigem gezieltem Check kontrollieren: domain ohne äußere Imports, application ohne UI/Adapter, presentation ohne infrastructure.
- Übersichten/STATUS nennen Dateipfade und tatsächliche Ergebnisse. Keine Fachfunktion als „fertig“ bezeichnen, nur weil ihre Ansicht vorhanden ist.

## M1 – erste manuelle Version

1. Objekt ohne manuelle Felder erzeugen; technische ID/Zeit automatisch, null-Wert und Platzhalter korrekt.
2. Zwei identische Objekte unabhängig bearbeiten/löschen; Name/Katalog-ID führen nicht zu Deduplication.
3. 12,50 € + 0 € + unbewertet ergeben 12,50 € und 2 von 3 bewertet. Alles unbewertet zeigt keinen vermeintlich ermittelten Null-Marktwert.
4. Eigene Attribute mit gleichen/leeren Keys bleiben unabhängig editierbar; Strings wie „02“ bleiben unverändert.
5. Speichern/Reload/Schließen und erneutes Öffnen bewahren Datensätze und Bilder am selben Origin.
6. Ungültige Beziehungen und negative/ungültige Geldwerte werden kontrolliert zurückgewiesen.
7. Bild ersetzen/löschen und Objektänderung sind atomar; simuliertes Quota-/Transaktionsversagen lässt den alten Zustand bestehen.
8. Gefüllte Sammlung wird nicht ungefragt samt Inhalt gelöscht.
9. Dashboard/Sammlung/Alle sind nach Mutation konsistent. Keine veralteten Zahlen durch unabhängige UI-Caches.
10. Manuelle Abläufe brauchen keine externen Dienste. Echte Safari/iPhone-Prüfung vor Zusage der iPhone-Tauglichkeit.

Reine Regeltests für Werte/Defaults; Adapter-Vertragstests gegen Memory und IndexedDB; echte Browserintegration für Transaktionen/Bilder; wenige End-to-End-Abläufe für Kernaufgaben. Mocktests ersetzen keine Browser-Persistenzprüfung. Offline-Start gehört erst zur PWA-Abnahme; „Daten lokal“ allein beweist ihn nicht.
