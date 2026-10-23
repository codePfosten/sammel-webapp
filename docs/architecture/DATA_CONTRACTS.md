# Datenmodell und Schnittstellen · Entwurf v0.1

Alle folgenden Festlegungen sind konkrete Arbeitsannahmen für die Architektur, soweit sie nicht bereits im Produktkontext beschlossen sind. M0 erzeugt daraus Typen und Read-only-Verträge; M1 implementiert Regeln und Schreiben.

## Datenmodell

| Typ | Felder | Bedeutung / Default |
|---|---|---|
| Category | id, name, kind | kind: `lego`, `cards` oder `custom`; eigene Kategorie nur Name |
| Collection | id, name, categoryId, createdAt | Name `""`, Anzeige „Unbenannte Sammlung“; categoryId technisch gesetzt |
| Collectible | id, collectionId, name, catalogId, marketValueMinor, currency, imageId, attributes, createdAt | ein physisches Exemplar; siehe unten |
| CustomAttribute | id, key, value | key und value Strings; eigene technische Zeilen-ID |
| ImageAsset | id, blob, mimeType, width, height | Infrastrukturtyp; Blob nicht Teil des JSON-Fachmodells |

Ein Exemplar gehört zunächst genau einer Sammlung. Eine Sammlung gehört einer Kategorie; eine Kategorie kann mehreren Sammlungen zugeordnet sein. Das Exemplar erbt die Kategorie über seine Sammlung. Keine zusätzliche catalog-product-Entität nötig. Je Exemplar höchstens ein Bild; Mehrbildunterstützung später entscheiden.

```ts
// Blueprint für src/domain/model.ts, nicht bereits installierter Code.
export type EntityId = string;
export type ImageId = string;
export type CategoryKind = 'lego' | 'cards' | 'custom';
export interface Category {
  id: EntityId; name: string; kind: CategoryKind;
}
export interface Collection {
  id: EntityId; name: string; categoryId: EntityId; createdAt: string;
}
export interface CustomAttribute {
  id: EntityId; key: string; value: string;
}
export interface Collectible {
  id: EntityId;
  collectionId: EntityId;
  name: string;
  catalogId: string;
  marketValueMinor: number | null;
  currency: 'EUR';
  imageId: ImageId | null;
  attributes: CustomAttribute[];
  createdAt: string;
}
```

IDs werden technisch erzeugt, nicht eingegeben. Beim Erstellen von M1-Objekten Clock/IdGenerator injizieren oder zentral kapseln; keine Pflicht zur Verwendung einer bestimmten UUID-Bibliothek. Bei Verwendung von crypto.randomUUID dessen Laufzeitverfügbarkeit prüfen. `createdAt`: UTC ISO-8601. Technische IDs in normaler UI unsichtbar. `catalogId` ist frei, optional und nicht eindeutig.

## Arbeitsdefaults und Regeln

- Name/Katalog-ID: leerer String; Anzeige „Unbenanntes Objekt“ nur als UI-Fallback, nicht als künstlicher gespeicherter Name.
- Bild: null, in der UI neutraler Platzhalter. Attribute: leeres Array.
- Marktwert: null = nicht bewertet; explizit 0 = bewertet mit null Euro.
- EUR als Startwährung, ganzzahlige Centbeträge mit `Number.isSafeInteger`, mindestens 0. Keine Fließkomma-Eurobeträge in Summen speichern. Eingaben mit mehr als zwei Nachkommastellen zurückweisen oder klar korrigieren lassen; keine heimliche Rundung.
- Die Wertsumme enthält jeden vorhandenen Wert einmal, pro Exemplar. Zusätzlich bewertete/gesamte Anzahl anzeigen. Bei null Bewertungen „Noch keine Bewertung“; bei bewerteten Nullwerten „0,00 €“. Summen nicht dauerhaft speichern, sondern ableiten.
- Eigene Attribute als Array, nicht als Objektmap: doppelte und leere Keys bleiben möglich und überschreiben einander nicht. Leerer Key wird als „Ohne Bezeichnung“ angezeigt. Edit/Delete erfolgt über die technische Attribut-ID. Kein numerischer Typzwang.
- collectionId und categoryId müssen auf vorhandene Datensätze zeigen. Das sind technische Beziehungen, keine Pflicht-Textfelder im Objektformular.
- Eigene Kategorie braucht im Startentwurf keinen Pflichtnamen; leerer Name bekommt einen UI-Fallback. Die Kategorie wird beim Sammlungserstellen ausgewählt bzw. automatisch als technische neue Kategorie angelegt.
- Sammlungslöschung bleibt zunächst deaktiviert, solange sie Objekte enthält. Keine ungefragte Kaskadenlöschung. Kategorie-Löschung und Verschieben sind spätere Tasks.

## Read-Ports für M0

```ts
import type { Category, Collection, Collectible, ImageId } from '../../domain/model';
export interface InventoryReader {
  listCategories(): Promise<readonly Category[]>;
  listCollections(): Promise<readonly Collection[]>;
  getCollection(id: string): Promise<Collection | null>;
  listItems(collectionId?: string): Promise<readonly Collectible[]>;
  getItem(id: string): Promise<Collectible | null>;
}
export interface ImageReader {
  getImage(id: ImageId): Promise<Blob | null>;
}
```

Auflistungen sind für etwa 50 Objekte ausreichend; keine Pagination vorweg bauen. Adapter liefern Kopien/geschützte Daten, sodass Formularzustand die gespeicherten Records nicht beiläufig verändert. Fehlende einzelne ID liefert null, technische Fehler werfen einen AppError. M0-Fixtures sind deterministisch und enthalten zwei identische Exemplare mit verschiedenen IDs sowie null und 0 als Preisfälle. Die UI erfindet keine eigenen fachlichen Beispieldaten außerhalb dieser Quelle.

## Schreibgrenze für M1 – vorbereiten, noch nicht implementieren

Der InventoryWriter bildet konkrete atomare Änderungen ab, kein beliebiger SQL-/Dexie-Zugriff. Sinnvoller Vertragsentwurf:

```ts
interface InventoryWriter {
  createCollection(collection: Collection, newCategory?: Category): Promise<void>;
  saveItem(item: Collectible, imageChange: ImageChange): Promise<void>;
  deleteItem(itemId: string): Promise<void>;
  deleteEmptyCollection(collectionId: string): Promise<void>;
}
type ImageChange =
  | { kind: 'keep' }
  | { kind: 'remove' }
  | { kind: 'replace'; image: ImageAsset };
```

Writer und notwendige Typen dürfen in M0 als kompilierbare, nicht verwendete Verträge angelegt werden. `saveItem` erstellt oder aktualisiert das durch ID bestimmte Exemplar. Erzeugung/Validierung des vollständigen Exemplars liegt im Anwendungsfall. Der Adapter prüft Beziehungen auch innerhalb der Transaktion. Bei replace muss `item.imageId` der neuen Bild-ID entsprechen, bei remove null, bei keep der bisherigen ID. Ein Bild gehört im Startmodell nur einem Exemplar; keine geteilte Referenzzählung.

Lokaler Adapter: Bildänderung und Exemplaränderung gemeinsam committen oder vollständig zurückrollen. Delete entfernt das Exemplar und sein zugehöriges Bild atomar. UI darf erst nach erfolgreichem Commit Erfolg melden. Fehlgeschlagene Updates lassen den vorherigen Bestand bestehen. Neue Kategorien mit Sammlung gemeinsam speichern. Keine direkten UI-Aufrufe dieser Writer; UI ruft Anwendungsfälle.

## Fehler und Persistenzversionen

AppError trägt `code` (NOT_FOUND, INVALID_INPUT, CONFLICT, STORAGE_UNAVAILABLE, QUOTA_EXCEEDED, UNKNOWN) und eine interne Ursache; Präsentation übersetzt in verständliche deutsche Meldungen. Fehlendes Bild darf als Platzhalter erscheinen, ein Speicherfehler darf nicht als Erfolg erscheinen. M0 kann diese Zustände mit kontrollierten Demo-Szenarien zeigen.

M1: IndexedDB-Datenbank `sammel-app`, erste Schema-Version 1. Stores: categories (id), collections (id, categoryId), items (id, collectionId), images (id). Keine eindeutigen Indizes auf Name/Katalog-ID. Migrationen beim späteren Schemawechsel explizit versionieren und mit bestehendem Bestand prüfen. Keine Seed-Daten automatisch in eine echte Nutzerdatenbank schreiben.

Exportformat bleibt separat zu spezifizieren: versioniertes Manifest plus Datensätze und Bilddateien; Import muss validieren und bestehende Daten schützen. DB-Schemaversion und spätere Exportformatversion sind unterschiedliche Verträge. In M0 keinerlei Backup-Erfolg simulieren.
