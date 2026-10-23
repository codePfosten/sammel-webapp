# So funktioniert die Website jetzt

Stand: 23.10.2026 · Einfacher, manuell bedienbarer Prototyp.

```mermaid
flowchart TD
  Start[Übersicht] --> Collection[LEGO-Sammlung]
  Start --> Add[Gegenstand hinzufügen]
  Collection --> Add
  Add -->|lokal speichern| Detail[Detailansicht]
  Collection -->|Kachel öffnen| Detail
  Detail --> Edit[Bearbeiten]
  Edit -->|lokal speichern| Detail
  Detail -->|Löschen bestätigen| Collection
  Collection --> Start
```

Alle Ansichten lesen denselben lokalen Bestand neu. Ein Neuladen erhält die gespeicherten Gegenstände und Bilder. Abbrechen verwirft den Entwurf. Gleiche Figuren bleiben getrennte Exemplare. Die feste Navigation führt jederzeit zu Übersicht oder Sammlung.

Der Projektinhaber hat die frühere größere Planung bewusst auf diese Website reduziert. Zuerst den gewünschten Produktumfang anhand dieses Prototyps beurteilen. Weitere Sammlungen, Attribute, Datenbank und APIs sind jeweils neue Aufgaben. [Anordnung](docs/product/PROTOTYPE_DIRECTIVE.md) · [Status](docs/planning/STATUS.md).
