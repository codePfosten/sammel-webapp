# LEGO-Minifiguren-Sammlung

Eine einfache **Website zur Digitalisierung einer privaten LEGO-Minifiguren-Sammlung**. Keine universelle Sammlerplattform.

**Aktueller Stand:** Manuelles Inventar funktioniert; automatische Bildidentifizierung und aktuelle Preisrecherche sind als nächste Kernfunktionen geplant, nicht implementiert.

## Lokal starten
Voraussetzung: Node.js **ab 22**. Im Repository:

```sh
npm start
```

Dann **http://127.0.0.1:5173** öffnen. Kein Framework-Build und keine Installation für die eigentliche Website notwendig. `file://` funktioniert wegen nativer JS-Module nicht.

## Jetzt nutzbar
- Feste LEGO-Sammlung mit Startseite, Gesamtwert und Figurenraster.
- Minifiguren mit optionalem Foto, Namen, Katalog-ID und manuell geschätztem Wert erfassen.
- Einträge öffnen, bearbeiten und nach Bestätigung löschen; doppelte Figuren sind getrennte Exemplare.
- Daten und Bilder werden ausschließlich lokal im Browser (`localStorage`) gespeichert und bleiben bei Reload desselben Browser-Origin erhalten.

**Speichergrenzen:** kein Backup, kein Geräteabgleich. Browserdaten löschen oder die Webadresse/den Browser wechseln kann Bestände unzugänglich machen. Fotos bis 2 MB pro Datei; `localStorage` kann auch vorher voll werden. Keine wertvollen Bestände ohne unabhängige Sicherung als einziges Exemplar betrachten.

## Nächste zwei Ziele
1. Foto → mögliche LEGO-Minifigur(en) erkennen → Nutzer bestätigt/korrigiert → Felder automatisch vorbelegen.
2. Aktuelle Marktwert-Schätzung aus transparent benannter Quelle (verkaufte Preise bevorzugt, sonst Angebotsdaten klar kennzeichnen); immer manuell überschreibbar.

**Noch nicht vorhanden:** Bilderkennung, Preisabfrage oder entsprechende Anbieterintegration. Keine Auswahl eines Dienstes oder laufende Kosten beschlossen.

## Entwicklung
```sh
npm ci
npm run lint
npm test
# Browser-Tests nach Installation der Chromium-Testumgebung:
npm run test:e2e
```

Website ohne React/Vite/TypeScript: `index.html`, `styles.css`, `src/app.js` und `src/{domain,application,infrastructure,presentation}/`.

Aktuelle Regeln: [AGENTS.md](AGENTS.md) · [Scope](docs/product/CURRENT_SCOPE.md) · [Status](docs/planning/STATUS.md) · [Entwicklungsdetails](docs/development/PROTOTYPE.md) · [Feature-Status](FEATURE_CHECKLIST.md).

**Historische Entwürfe:** `docs/architecture/`, `docs/ui/`, `docs/preview/`, `docs/product/SAMMEL_APP_PROJEKTKONTEXT.md`, `prompts/BOOTSTRAP_AGENT_PROMPT.md` und `Sammel-App-Startpaket.zip` stammen aus einer verworfenen breiteren Planung. Sie sind nicht Bestandteil des aktiven Arbeitsauftrags.
