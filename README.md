# Google Ads Training Helper

Tampermonkey/Greasemonkey Userscript, das Texte auf Google Skillshop und Docebo-Seiten für Übungszwecke anpasst.

## Funktionen

Das Script ersetzt automatisch folgende Begriffe:

| Original | Ersetzung |
|----------|-----------|
| Zertifizierung | Beispiele |
| Skillshop | *(entfernt)* |
| Prüfung | Übung |
| Test | Übung |
| Verbleibende Zeit: | Verbleibende Übungszeit: |
| Verbleibende Versuche: | Übung: |

### URL-Anpassung

Das Script ersetzt auch in der Browser-URL `zertifizierung-` durch `uebung-` (via `history.replaceState()`).

## Installation

1. Browser-Extension installieren: [Tampermonkey](https://www.tampermonkey.net/), [Greasemonkey](https://www.greasespot.net/) oder [Violentmonkey](https://violentmonkey.github.io/)
2. Neues Userscript erstellen
3. Inhalt von `google-ads-training-helper.user.js` einfügen
4. Speichern

## Verwendung

Das Script läuft auf zwei Arten:

1. **Automatisch** beim Laden der Seite
2. **Manuell** über das Tampermonkey-Menü:
   - Klick auf das Tampermonkey-Icon in der Browser-Leiste
   - **Texte ersetzen** wählen

## Unterstützte Seiten

- `*.google.com/*`
- `*.docebosaas.com/*`

## Author

**Achim Dräger**
Internet Marketing Agentur
a.draeger@internet-marketing-agentur.com
