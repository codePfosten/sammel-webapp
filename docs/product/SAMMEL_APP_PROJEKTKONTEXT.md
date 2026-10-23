# Sammel-App – Projektkontext und Anforderungsstand

Stand: 23. Oktober 2026 · Version 1.0 · Grundlage für Planung und weitere KI-Agenten

## 1. Zweck und Verbindlichkeit

Dieses Dokument hält die bisher besprochene Produktidee, die ausdrücklich getroffenen Entscheidungen, die gewünschten späteren Erweiterungen und die offenen Fragen zusammenhängend fest. Es soll ohne Kenntnis des Chats als Kontext für Architektur, Planung, Design und Entwicklung dienen.

Es ist noch keine fertig ausgearbeitete technische Spezifikation. Es behauptet weder einen vorhandenen Programmcode noch bereits umgesetzte Funktionen. Ein Repository oder Implementierungsstand wurde für dieses Dokument nicht geprüft.

Es gelten folgende Unterscheidungen:

- **Festgelegt:** ausdrücklich vom Projektinhaber beschrieben oder entschieden.
- **Später gewünscht:** Teil der Zielvorstellung, aber keine Voraussetzung für die erste benutzbare Version.
- **Vorschlag/Arbeitsannahme:** im Gespräch empfohlen, noch nicht ausdrücklich bestätigt.
- **Offen:** muss bei der weiteren Planung entschieden oder konkretisiert werden.

Neuere ausdrückliche Aussagen des Projektinhabers ersetzen frühere Vorschläge. Insbesondere gelten keine verpflichtenden Namensfelder und keine vorgegebenen Datentypen für eigene Attribute.

## 2. Produktidee und Rahmen

Die App ist ein persönliches digitales Inventar für Sammelobjekte. Anfangs stehen LEGO-Minifiguren im Mittelpunkt. Die Struktur soll weitere Objektarten wie Sammelkarten und selbst benannte Kategorien zulassen.

Der Nutzer kann mehrere Sammlungen anlegen, Objekte darin erfassen, Bilder ansehen, Angaben bearbeiten und den geschätzten Gesamtwert seiner Bestände sehen. Die anfängliche Größenordnung beträgt voraussichtlich höchstens ungefähr 50 Objekte mit jeweils einem Bild und Textdaten. Dies ist eine Bedarfsschätzung, kein festes Produktlimit.

### Festgelegte Ziele

- Zunächst nur ein Nutzer: der Projektinhaber selbst. Allgemeine Formulierungen zu „Nutzern“ begründen keine Anforderung an ein Mehrbenutzersystem.
- Nutzung auf dem iPhone; bevorzugt als WebApp, die sich dauerhaft nutzen und möglichst wie eine App öffnen lässt.
- Möglichst keine laufenden Kosten.
- Übersichtlichkeit, einfache Bedienung und ein stark bildorientierter Aufbau.
- Früh eine tragfähige UI-Struktur, an die spätere Logik und Erweiterungen angeschlossen werden können.
- Zunächst vollständige manuelle Erfassung; keine externen Datenquellen als Voraussetzung.
- Der Speicherort muss später austauschbar sein, etwa bei einem Anbieterwechsel.

### Arbeitsweise bei der Umsetzung

Das fertige Produkt steht im Vordergrund. KI soll möglichst viel Implementierungsarbeit übernehmen. Der Projektinhaber möchte Architektur und Planung mitgestalten, passenden Kontext bereitstellen und die Ergebnisse nachvollziehen. Lernen ist erwünscht, aber kein Grund, die Umsetzung künstlich als Lernprojekt zu gestalten.

## 3. Fachliche Begriffe

| Begriff | Bedeutung |
|---|---|
| Sammlung | Ein vom Nutzer angelegter Bestand mit eigenem Namen und einer Kategorie. |
| Kategorie | Art der gesammelten Objekte, beispielsweise LEGO-Figuren oder Sammelkarten. Eigene Kategorien erhalten zunächst nur einen Namen. |
| Objekt/Exemplar | Ein einzelnes erfasstes Sammlerstück. Zwei identische Figuren sind zwei getrennte Exemplare. |
| Interne Objekt-ID | Automatisch erzeugte eindeutige Identität jedes Exemplars; für den Nutzer unsichtbar. |
| Katalog-ID | Optional eingetragene fachliche Kennung, etwa die Nummer einer LEGO-Figur. Sie kann bei mehreren Exemplaren gleich sein. |
| Preis/Marktwert | Gespeicherte grobe Bewertung eines Objekts. Anfangs manuell eingetragen und Grundlage der Wertsumme. |
| Kaufpreis | Später optional erfasster Anschaffungswert; vom Marktwert getrennt. |
| Eigenes Attribut | Frei eingegebenes Schlüssel-Wert-Paar; Schlüssel und Wert werden als Strings behandelt. |

Die Trennung von Sammlung und Kategorie ist wesentlich: Eine Sammlung ist der konkrete Bestand, eine Kategorie beschreibt dessen Objektart. Dass mehrere Sammlungen dieselbe Kategorie verwenden können, ist eine sinnvolle Arbeitsannahme; Details zur Wiederverwendung und Bearbeitung sind noch auszuarbeiten.

## 4. Entwicklungsstufen und Umfang

Die Bezeichnungen „Prototyp“ wurden im Gespräch zunächst breit verwendet. Die spätere Klarstellung unterscheidet einen UI-Prototyp von einer ersten wirklich benutzbaren Version:

### A. Früher UI-Prototyp

- Aufteilung der Oberfläche, Navigation und wesentliche Ansichten stehen weitgehend.
- Geplante Erweiterungen und spätere Logik lassen sich anschließen.
- Beispieldaten oder ein flüchtiger Speicher sind zulässig.
- Dauerhafte Speicherung ist hier noch nicht zwingend erforderlich.
- Keine externen Preis-, Katalog-, Nachrichten- oder Erkennungsdienste erforderlich.

### B. Erste benutzbare Version

- Sammlungen anlegen und ihre Kategorie auswählen bzw. eine eigene Kategorie benennen.
- Objekte zu einer Sammlung hinzufügen.
- Alle Angaben manuell eingeben und bearbeiten.
- Bilder aus der Fotobibliothek oder aus Dateien hinzufügen.
- Eigene Attribute als String-Schlüssel und String-Wert anlegen.
- Identische Figuren als getrennte Exemplare verwalten.
- Objekte in Bilderrastern und in einer Detailansicht anzeigen.
- Objekte bearbeiten und löschen.
- Sammlungswerte und Gesamtwert anzeigen.
- Daten dauerhaft speichern.
- Keine externe Datenbeschaffung voraussetzen.

Export und Import einschließlich Bildern sind für diese Stufe empfohlen, aber bislang keine ausdrücklich bestätigte Funktionsentscheidung. Der konkrete Umfang von Sammlungsbearbeitung und -löschung ist ebenfalls noch zu präzisieren.

### C. Später gewünschte Erweiterungen

- Suche, Filter und Sortierung nach den verschiedenen Attributen.
- Markierung einzelner Objekte als Favoriten; die genaue Einführungsstufe ist noch offen.
- Bilderkennung mit Vorschlägen, die der Nutzer bestätigt.
- Externe Preisabfragen für unterstützte Kategorien.
- Analysebereich mit Kaufpreisen, Standardwerten, potenziellem Gewinn und Preisverläufen.
- Gegebenenfalls Cloud-Speicherung oder Synchronisation; keine fest beschlossene Pflicht.
- Ganz zuletzt ein Nachrichten- und Marktbeobachtungsbereich.

Zwischen den späteren Erweiterungen besteht noch keine verbindliche vollständige Reihenfolge. Der Nachrichtenbereich wurde ausdrücklich ganz ans Ende gestellt.

## 5. Objekte, Identität und Attribute

### 5.1 Identische Exemplare

Jedes erfasste Exemplar erhält eine eigene automatisch generierte interne ID. Gleicher Name, gleiche Katalog-ID, gleiche Variante oder gleiche Werte sind kein Grund, Einträge zusammenzuführen oder abzulehnen.

Beispiel: Zwei identische Figuren dürfen dieselbe Katalognummer und denselben Namen haben, aber unterschiedliche interne IDs, Bilder und Preise. Namen sind ausdrücklich ungeeignet, um Eindeutigkeit sicherzustellen: Sie können sich auch bei unterschiedlichen Varianten überschneiden.

### 5.2 Grundangaben

| Angabe | Festgelegtes Verhalten |
|---|---|
| Interne ID | Automatisch erzeugt, eindeutig, keine Nutzereingabe und keine normale Anzeige nötig. |
| Bild | Vom Nutzer hinzugefügt; kein Pflichtfeld. |
| Name | Manuell eingebbar, nicht verpflichtend und nicht eindeutig. |
| Katalog-ID | Manuell eingebbar, nicht verpflichtend; getrennt von der internen ID. |
| Preis | Manuell eingebbar; Grundlage der Wertsumme. |
| Hinzugefügt am | Zeitpunkt der Aufnahme in die Sammlung automatisch speichern; muss nicht sichtbar sein. |
| Eigene Attribute | Beliebige zusätzlich erstellte Schlüssel-Wert-Paare als Strings. |

Es gibt keine festen Pflichtfelder für die Objekteingabe. Für fehlende Werte sollen Defaults existieren. Automatisch erzeugte technische Werte wie die interne ID sind davon zu unterscheiden.

**Noch nicht festgelegt:** die konkreten Defaults. Bisher vorgeschlagen wurden leere Texte, ein Platzhalterbild und ein nicht angegebener Preis, der nichts zur Summe beiträgt, aber von einer ausdrücklichen Bewertung mit 0 unterschieden werden kann. Diese Vorschläge nicht als bestätigte Vorgabe behandeln.

### 5.3 Eigene Attribute

Der Nutzer wählt „Eigenes Attribut erstellen“ und gibt einen Key und einen Value ein. Beide sind Strings. Ein verpflichtendes kategorieweites Schema oder ein Typeneditor für Zahl, Datum und Ja/Nein ist nicht gewünscht bzw. nicht beschlossen.

Die Aussage zu Strings betrifft die eigenen Attribute. Daraus folgt nicht, dass auch der eingebaute Preis oder das automatisch gespeicherte Datum intern Strings sein müssen. Ihre technische Repräsentation ist Teil der Architekturplanung.

Noch offen sind doppelte oder leere Schlüssel, das Umbenennen und Löschen eigener Attribute sowie die spätere Sortierlogik für Strings wie „2“ und „10“.

## 6. Sammlungen und Kategorien

Beim Anlegen einer Sammlung werden deren Name und die Art der gesammelten Objekte konfiguriert. Zur Auswahl sollen vorgefertigte Kategorien sowie eigene Kategorien stehen. Eine eigene Kategorie wird zunächst allein durch ihren Namen beschrieben.

Vorgefertigte Kategorien sollen später die Zuordnung passender Bilderkennung und Preisabfragen ermöglichen. Das bedeutet nicht, dass diese Dienste bereits im ersten Prototyp funktionieren müssen. Eigene Kategorien werden zunächst vollständig manuell verwendet.

Eigene Kategorien sind keine Aufforderung zu einem umfangreichen konfigurierbaren Datenbankschema. Die spätere Konfiguration von Standardwerten für Berechnungen soll nach der jüngsten Aussage im Analysebereich erfolgen.

## 7. Navigation und Oberflächen

### 7.1 Dauerhafte untere Navigation

Die Zielnavigation lautet in dieser Reihenfolge:

1. Dashboard
2. Sammlungen
3. News – später
4. Analyse – später
5. Alle
6. Einstellungen

Die Leiste bleibt in jeder Ansicht sichtbar, auch in untergeordneten Ansichten. Der aktive Bereich ist hervorgehoben. Das Verhalten beim Öffnen einer Sammlung direkt vom Dashboard sowie bei Detailansichten muss im Navigationskonzept konsistent festgelegt werden.

Noch offen ist, ob News und Analyse vor ihrer Umsetzung ausgeblendet oder als klar gekennzeichnete Platzhalter angezeigt werden. Sechs Einträge auf einem iPhone müssen bei der Layoutplanung auf Lesbarkeit und ausreichende Bedienflächen geprüft werden; ihre Zusammenlegung ist nicht beschlossen.

### 7.2 Dashboard

- Einstieg beim Öffnen der App.
- Oben Gesamtwert aller gespeicherten Objekte.
- Darunter alle Sammlungen in kompakter Listenform.
- Jeder Sammlungseintrag zeigt Sammlungsname, Kategorie und Gesamtwert.
- Antippen öffnet direkt die entsprechende Sammlungsansicht.
- Das Anlegen einer Sammlung muss zugänglich sein; die exakte Position der Aktion ist noch Teil des Designs.

### 7.3 Sammlungen

Ein eigener Navigationsbereich für Sammlungen ist vorgesehen. Seine genaue Abgrenzung zur bereits vorhandenen Sammlungsliste auf dem Dashboard wurde noch nicht im Detail festgelegt. Eine Übersicht mit Verwaltungsaktionen ist eine Arbeitsannahme.

### 7.4 Einzelne Sammlung

- Ganz oben der Sammlungsname als Titel.
- Zusammengefasste Informationen, insbesondere die Summe aller angegebenen Objektpreise.
- Möglichkeit, ein Objekt hinzuzufügen.
- Passende Bearbeitungsaktionen.
- Darunter die enthaltenen Objekte als Bildraster.
- Später Such-, Filter- und Sortierfunktionen.

### 7.5 Alle

Dieser Bereich zeigt sämtliche gespeicherten Objekte über die Sammlungen hinweg. Er verwendet grundsätzlich dasselbe Layout wie eine einzelne Sammlung: Titel und Informationen oben, passende Aktionen und später Suche/Filter, darunter das Bildraster.

### 7.6 Bildraster

- Alle Bildflächen haben dieselbe Größe und dasselbe Format.
- Zwischen den Bildern ist ausreichend Abstand.
- Weitere Attribute müssen in den einzelnen Rastereinträgen nicht sichtbar sein.
- Antippen eines Bildes öffnet die Detailansicht des entsprechenden Exemplars.

Vollständiges Einpassen eines Fotos in eine einheitliche Fläche wurde vorgeschlagen. Ob stattdessen beschnitten wird, welches Seitenverhältnis genutzt wird und wie viele Spalten angezeigt werden, ist noch nicht festgelegt.

### 7.7 Objektdetail und Bearbeitung

Die Detailansicht zeigt das Objekt mit großem Bild, sämtlichen sichtbaren Attributen und Bearbeitungsoptionen. Änderungen müssen manuell möglich sein. Das Objekt kann gelöscht werden. Die interne ID muss nicht angezeigt werden; das Hinzufügedatum darf verborgen bleiben.

Ob Bearbeitung direkt in der Detailansicht oder auf einem eigenen Formular erfolgt, ist noch eine Designentscheidung. Die untere Navigation soll sichtbar bleiben.

### 7.8 Einstellungen

Ein Einstellungsbereich ist vorgesehen. Sein vollständiger Inhalt ist noch nicht definiert. Sicherung, Import/Export und Speicherverwaltung wurden als mögliche Inhalte vorgeschlagen.

## 8. Bilder

Für die erste Version genügt das Hinzufügen aus der normalen Fotobibliothek oder aus Dateien. Ein integrierter Kameraablauf ist nicht erforderlich.

Verkleinerte und komprimierte lokale Bilder wurden vom Projektinhaber als mögliche Speicherstrategie erwogen. Als Vorschlag wurden maximal etwa 1.200 Pixel an der längsten Seite und JPEG/WebP genannt. Dies sind keine bestätigten Grenzwerte.

Zur Größenordnung: Bei angenommenen 100–300 KB pro verarbeitetem Bild wären 50 Bilder etwa 5–15 MB. Das ist eine Rechenannahme und keine garantierte Bildgröße. Mehrere Bilder pro Objekt, Bildzuschnitt und die Aufbewahrung von Originalen sind nicht beschlossen.

## 9. Werte, Analyse und externe Informationen

### 9.1 Erste Version

Der Gesamtwert einer Sammlung ist die Summe ihrer gespeicherten Objektpreise. Das Dashboard zeigt den Wert aller erfassten Exemplare. Doppelte Figuren zählen als getrennte Exemplare jeweils mit ihrem eigenen Preis.

Es reicht eine grobe Schätzung. Die erste Version braucht keine automatische Marktpreisermittlung. Eine Standardwährung Euro wurde vorgeschlagen, aber nicht ausdrücklich bestätigt. Die Behandlung fehlender Preise ist mit den Defaults festzulegen.

### 9.2 Spätere Preisabfrage und Bilderkennung

Preise dürfen aus einer externen Quelle übernommen werden. Gewünscht ist möglichst eine Orientierung daran, zu welchem Preis ein Objekt durchschnittlich angeboten wird. Angebotspreise sind dabei nicht automatisch erzielte Verkaufspreise.

Bilderkennung soll mögliche Treffer vorschlagen und eine Bestätigung durch den Nutzer verlangen. Anbieter, Erkennungsverfahren, Datenquellen, Aktualisierungsintervalle und Kosten sind nicht festgelegt. Automatische Ergebnisse dürfen nicht als bereits verfügbare Funktion dargestellt werden.

### 9.3 Analysebereich

Später sollen Kaufpreise optional erfasst und mit dem Marktwert verglichen werden. Es soll einen Standardkaufpreis geben, der verwendet wird, wenn bei einem Objekt kein individueller Kaufpreis hinterlegt ist.

Die jüngste Präferenz ist, Standardwerte und Einstellungen für solche Auswertungen im Analysebereich unterzubringen. Frühere Überlegungen zur Konfiguration bei Kategorie- oder Sammlungserstellung sind damit nicht als fertiger UI-Ablauf zu übernehmen.

Gewünschte Rechnung: potenzieller Gewinn = Marktwert minus Kaufpreis. Gebühren, Versandkosten, Steuern oder realisierte Gewinne sind nicht definiert. Der Geltungsbereich der Einstellungen – Kategorie, Sammlung oder global – ist noch offen. Ebenso offen ist, ob eine Änderung des Standardkaufpreises bestehende Objekte rückwirkend beeinflusst.

Preisverlaufsdiagramme sind gewünscht. Dafür wäre eine Historie mit Zeitpunkten und Bewertungen nötig. Beginn und Häufigkeit ihrer Erfassung wurden noch nicht entschieden.

### 9.4 News ganz am Ende

Ein später Nachrichtenbereich soll interessante Entwicklungen im jeweiligen Sammelgebiet sichtbar machen, etwa besonders hohe Verkäufe, neue Pokémon-Kartenauflagen oder Hinweise auf steigende Handelsaktivität und Preise. Datenquellen, Auswahlregeln und automatische Trendermittlung sind noch völlig offen.

## 10. Speicherung und Austauschbarkeit

### Festgelegt

- Speicherung ist für die erste benutzbare Version erforderlich, für einen frühen UI-Prototyp noch nicht zwingend.
- Der Speicherort soll im weiteren Verlauf gewechselt werden können.
- Anbieterwechsel sollen ohne grundlegenden Umbau der Oberfläche möglich sein.

Ursprünglich wurde lokale Speicherung auf dem iPhone genannt. Später wurde die Frage ausdrücklich wieder geöffnet: lokal mit verkleinerten Bildern, ein günstiger/kostenloser Datenbankserver oder externes Laden bei Bedarf wurden verglichen. Eine endgültige erneute Festlegung erfolgte nicht.

### Bisherige Empfehlung, nicht bestätigte Architektur

- Zunächst IndexedDB für lokale Objektinformationen und Bilder.
- Speicherzugriffe hinter einer klaren Schnittstelle kapseln.
- Daten- und Bildspeicher getrennt ansprechen können.
- Bilder über eigene stabile Kennungen referenzieren statt Anbieteradressen im fachlichen Datenmodell fest einzubauen.
- Im UI-Prototyp denselben Vertrag mit Beispieldaten oder flüchtigem Speicher bedienen.
- Später einen Cloud-Adapter ergänzen.
- Export und Import sämtlicher Daten einschließlich Bildern sowie ein versioniertes Datenformat vorsehen.

Ein Anbieterwechsel erfordert trotz dieser Vorbereitung einen neuen Adapter und die Migration der Daten. Gleichzeitige Synchronisation zwischen mehreren Speichern ist eine eigenständige, zusätzliche Aufgabe und keine automatisch enthaltene Funktion.

Lokale WebApp-Daten sind kein Ersatz für eine Sicherung. Dauerhafte Speicherung kann angefordert werden; Löschung durch den Nutzer oder Gerätewechsel muss dennoch berücksichtigt werden. Auch ein Wechsel der Webadresse kann eine Datenübertragung notwendig machen. Die genaue Sicherungsstrategie ist offen.

Supabase wurde als Beispiel für eine mögliche kostenlose Cloud-Lösung besprochen, nicht ausgewählt. Tarife und Limits sind vor einer Anbieterentscheidung erneut zu prüfen. Ein Cloud-Dienst würde außerdem Zugriffsschutz erfordern, auch bei nur einem Nutzer.

Externe Katalog- und Preis-APIs ersetzen nicht die Speicherung des eigenen Bestands, eigener Fotos und manueller Angaben. Sie sind getrennte Ergänzungen.

## 11. Visuelle Projektübersicht für den Projektinhaber

Die beigefügte Datei VISUAL_OVERVIEW_CONTEXT.txt wurde für dieses Dokument gelesen. Ihre Vorgaben betreffen zusätzliche menschlich verständliche Übersichten, besonders für die Betrachtung auf dem Smartphone.

| Datei | Aufgabe |
|---|---|
| README.md | Verständlicher Einstieg und Verweise auf die Übersichten; vorhandene Inhalte nicht blind überschreiben. |
| CLASS_DIAGRAM.md | UML-Klassendiagramm mit Kennzeichnung geplanter, in Arbeit befindlicher und fertiggestellter Klassen. |
| PROJECT_FLOW.md | Anschaulicher Ablauf des Projekts bzw. der Anwendung, vorzugsweise mit Mermaid. |
| UI_PREVIEW.md | Vorstellung des möglichen späteren Interfaces durch Mockups, Skizzen oder Bildverweise. |
| FEATURE_CHECKLIST.md | Verständliche Funktionsliste mit tatsächlichem Umsetzungsstand. |

Beim späteren Anlegen eines Projektgerüsts sind fehlende Dateien als klar erkennbare Entwürfe bzw. Platzhalter anzulegen und sinnvoll zu verlinken. Diese Aufgabe beinhaltet hier noch nicht die Erstellung eines Repository-Gerüsts.

Bei wesentlichen Änderungen an Architektur, Umfang, Oberfläche oder Implementierungsstatus sind betroffene Übersichten zu aktualisieren. Nach Möglichkeit ist der zuständige Visual-Overview-Agent mit VISUAL_OVERVIEW_AGENT.md einzubeziehen. Falls er nicht verfügbar ist, sind die Übersichten selbst konsistent zu halten oder ausstehende Aktualisierungen ausdrücklich zu markieren.

Die vollständige VISUAL_OVERVIEW_AGENT.md lag für dieses Dokument nicht als gelesene Quelle vor. Ihr Inhalt wird daher nicht rekonstruiert oder erfunden.

Die visuellen Übersichten sind keine maßgebliche Implementierungsspezifikation und kein Ersatz für technischen Agentenkontext. Sie sollen vor allem Orientierung geben. Keine Klassen als implementiert, Features als fertig oder UI-Entwürfe als bestätigt darstellen, solange das nicht belegt ist. Dieses Kontextdokument dient dagegen ausdrücklich der fachlichen Übergabe an weitere Agenten.

## 12. Offene Punkte für die konkrete Planung

| Punkt | Status und nächste Konkretisierung |
|---|---|
| Speicher | Lokaler Start empfohlen; endgültige Auswahl und Sicherungsumfang bestätigen. |
| Defaults | Konkrete Ersatzwerte, leere Anzeigen und Umgang mit fehlenden Preisen festlegen. |
| Währung | Euro empfohlen; keine bestätigte Mehrwährungsanforderung. |
| Eigene Attribute | Leere/doppelte Keys, Umbenennen, Löschen und spätere Sortiersemantik klären. |
| Kategorieverwaltung | Wiederverwendung, Umbenennen und Löschverhalten konkretisieren. |
| Zuordnung | Üblicherweise ein Exemplar in einer Sammlung; Verschieben oder Mehrfachzuordnung sind nicht entschieden. Mehrfachzuordnung dürfte Gesamtsummen nicht unbeabsichtigt verdoppeln. |
| Sammlungslöschung | Folgen für enthaltene Objekte und Bestätigung/Rückgängig noch nicht festgelegt. |
| Favoriten | Funktion gewünscht, Einführungsstufe und Darstellung offen. |
| Navigation | Darstellung künftiger Tabs, aktive Markierung in Unteransichten und Layout mit sechs Einträgen klären. |
| Bildlayout | Seitenverhältnis, Einpassen/Beschneiden, Platzhalter und Rasterspalten bestimmen. |
| Analyse | Geltungsbereich von Standardkaufpreisen und zeitliche Wirkung von Änderungen klären. |
| Offlineumfang | Lokal gespeicherter Bestand ist Ausgangspunkt; vollständig offline startbare PWA und Caching sind noch technisch zu planen. |
| Technik | Framework, Sprache, Hosting, Datenmodell, Schnittstellen und Teststrategie sind noch nicht ausgewählt. |

Diese Details erfordern keine erneute Grundsatzdiskussion über die Produktidee. Sie können schrittweise in der Planung entschieden werden. Externe Anbieter müssen nicht vor dem manuellen Prototyp ausgewählt sein.

## 13. Prüfbasis für die erste benutzbare Version

Die folgenden Szenarien leiten sich aus den Anforderungen ab und dienen der späteren Abnahme; sie behaupten keine bereits ausgeführten Tests:

1. Eine Sammlung mit vorgefertigter oder eigener benannter Kategorie lässt sich anlegen.
2. Ein Objekt lässt sich ohne verpflichtende manuelle Attributangaben erzeugen; technische ID und Hinzufügedatum werden automatisch gesetzt.
3. Zwei inhaltlich identische Figuren bleiben getrennte Exemplare und lassen sich unabhängig bearbeiten und löschen.
4. Ein Bild lässt sich aus Fotos oder Dateien übernehmen und im einheitlichen Raster anzeigen.
5. Eigene String-Schlüssel und String-Werte lassen sich hinzufügen und in der Detailansicht bearbeiten.
6. Änderungen von Preisen sowie Hinzufügen und Löschen von Objekten spiegeln sich korrekt in den Wertanzeigen wider.
7. Dashboard, einzelne Sammlung und „Alle“ führen zum richtigen Objekt und zeigen konsistente Bestände.
8. Die untere Navigation bleibt in den vorgesehenen Ansichten sichtbar und kennzeichnet den aktiven Bereich konsistent.
9. In der ersten benutzbaren Version bleiben gespeicherte Daten und Bilder nach Schließen und erneutem Öffnen erhalten.
10. Die manuellen Kernabläufe funktionieren ohne externe Preis- oder Erkennungsdienste.

## 14. Hinweise für übernehmende Agenten

- Zuerst die Statusunterscheidungen lesen; Empfehlungen nicht stillschweigend in Anforderungen umwandeln.
- Keine Namenspflicht oder Eindeutigkeitsprüfung auf Namen/Katalognummern einführen.
- Eigene Attribute zunächst als einfache String-Paare behandeln; keinen ungefragten Schemaeditor bauen.
- Interne Exemplar-ID und fachliche Katalog-ID strikt unterscheiden.
- Suche, Filter, Sortierung, Analyse und News nicht ungefragt in den ersten manuellen Umfang ziehen.
- Speicherzugriffe austauschbar entwerfen, ohne schon eine vollständige Cloud-Synchronisation umzusetzen.
- Die gewünschte UI-Struktur respektieren und notwendige Designentscheidungen sichtbar dokumentieren.
- Menschliche Übersichten und technische Dokumentation getrennt, aber konsistent pflegen.
- Neue Entscheidungen und Änderungen mit Datum in diesem Kontext nachführen; veraltete Aussagen ersetzen oder eindeutig kennzeichnen.

## 15. Quellenbasis dieses Kontextdokuments

- Die in dieser Unterhaltung sichtbaren Aussagen des Projektinhabers zur Sammel-App, ihren Entwicklungsstufen, Attributen, Speicherung und Navigation.
- Die bereitgestellte frühere Projektzusammenfassung für die ursprüngliche Zielsetzung und die KI-gestützte Arbeitsweise.
- Die lokal bereitgestellte und gelesene Datei VISUAL_OVERVIEW_CONTEXT.txt.

Es wurden für dieses Dokument keine weiteren privaten Dateien, kein Repository und keine laufende App untersucht. Anbieterangaben aus der vorausgehenden Diskussion sind bewusst nicht als dauerhafte Produktzusagen übernommen.
