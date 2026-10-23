# Aufgabenfolge

Kein Kalenderplan. Jede Zeile ist ein eigenständig übergebbarer Auftrag. Zuerst M0 vollständig abschließen; weitere Tasks erst als eigener Umfang.

| ID | Aufgabe | Abhängigkeit | Ergebnis / Abnahme |
|---|---|---|---|
| B01 | Repository prüfen, Dokumente einordnen, Vite/React/TS einrichten | keine | lokale Scripts, Lockdatei, strict TS, Build erfolgreich |
| B02 | Domain-Typen, Ports, Demoquelle, Service-Injektion | B01 | keine UI-/DB-Imports im Kern; zwei gleiche Figuren getrennt |
| B03 | AppShell, Design-Tokens, Routen, Navigation | B01 | sechs Tabs, Deep Links und aktive Zustände |
| B04 | Listen, Raster, Dashboard, Details und Formularansichten | B02+B03 | zentrale Beispieldaten; ehrliche nicht implementierte Aktionen |
| B05 | Zustände, Smoke-Prüfungen und Statuspflege | B04 | M0-Kriterien erfüllt, Übersicht entspricht Code |
| M11 | Create/Update/Delete-Anwendungsfälle und Summenregeln | M0 | Defaults, null/0, Duplikate, Referenzen getestet |
| M12 | IndexedDB-Adapter, Migration v1, Bildtransaktionen | M11-Verträge | Refresh erhält Daten/Bilder, Speicherfehler bleiben sichtbar |
| M13 | UI-Schreiben und Bildübernahme anschließen | M11+M12 | vollständige manuelle Abläufe; keine Fake-Erfolge |
| M14 | M1-Abnahme und Backup-Entscheidung | M13 | echte Nutzung bewusst freigeben; Grenzen dokumentieren |
| E01 | Sicherung und Import inklusive Bildern | separat entscheiden | validiertes Format und Roundtrip |
| E02 | privater iPhone-/PWA-Betrieb | eigenes Betriebskonzept | vertrauenswürdiges HTTPS, Offline-Start, Updates getestet |
| E03 | Suche/Filter/Sortierung, ggf. Favoriten | M1 | eigener kleiner Auftrag, keine übergroße Sucharchitektur |
| E04 | Erkennung/Preisquellen | Anbieterentscheidung | Vorschläge bestätigen; Kosten und Geheimnisse geklärt |
| E05 | Analyse | fachliche Regeln klären | Kaufpreise/Defaults/Historie ausdrücklich definiert |
| E06 | News | zuletzt | Quellen und Auswahlregel vor Implementierung |

Späterer Fachlogik-Agent: M11, Schwerpunkt domain/application. Speicher-Agent: M12, infrastructure. UI-Agent: B03/B04 oder M13, presentation. Gemeinsame Verträge zuerst stabilisieren; diese Rollen sind Aufgabenzuschnitte, keine Anweisung, automatisch mehrere Agenten zu starten.
