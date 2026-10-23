# Ablauf — LEGO-Minifiguren-Website

**Aktuell funktional:**
```mermaid
flowchart TD
  A[Startseite und LEGO-Übersicht] --> B[Figurenraster]
  B --> C[Figur ansehen]
  B --> D[Figur manuell hinzufügen]
  C --> E[Bearbeiten]
  C --> F[Löschen nach Bestätigung]
  D --> C
  E --> C
```

**Nächste gewünschte Erweiterung (nicht implementiert):**
```mermaid
flowchart TD
  A[Foto auswählen] --> B[Figuren-Kandidaten erkennen]
  B --> C{Treffer bestätigen oder korrigieren}
  C --> D[Formular vorausfüllen]
  D --> E[Aktuellen Preis mit Quelle prüfen]
  E --> F[Manuell anpassen und speichern]
```

Kein allgemeines Sammlungs-/Kategorie-/Analyse-System. Tatsächlicher Status: [FEATURE_CHECKLIST.md](FEATURE_CHECKLIST.md).
