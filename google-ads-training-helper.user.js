// ==UserScript==
// @name         Zertifizierung entfernen & Prüfung ersetzen
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Entfernt "Zertifizierung" und ersetzt "Prüfung" durch "Übung"
// @author       Achim Dräger
// @match        *://*.google.com/*
// @match        *://*.docebosaas.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    function processTextNode(node) {
        let text = node.nodeValue;
        let changed = false;

        // Zertifizierung durch " Beispiele" ersetzen (mit optionalem Bindestrich/Leerzeichen davor)
        if (/[-\s]*Zertifizierung/gi.test(text)) {
            text = text.replace(/[-\s]*Zertifizierung/gi, ' Beispiele');
            changed = true;
        }

        // Skillshop entfernen
        if (/skillshop/gi.test(text)) {
            text = text.replace(/\s*skillshop\s*/gi, ' ');
            changed = true;
        }

        // Prüfung durch Übung ersetzen (Groß-/Kleinschreibung beachten)
        if (/Prüfung/g.test(text)) {
            text = text.replace(/Prüfung/g, 'Übung');
            changed = true;
        }
        if (/prüfung/g.test(text)) {
            text = text.replace(/prüfung/g, 'übung');
            changed = true;
        }

        // Test durch Übung ersetzen (Groß-/Kleinschreibung beachten)
        if (/Test/g.test(text)) {
            text = text.replace(/Test/g, 'Übung');
            changed = true;
        }
        if (/test/g.test(text)) {
            text = text.replace(/test/g, 'übung');
            changed = true;
        }

        // Verbleibende Zeit durch Verbleibende Übungszeit ersetzen
        if (/Verbleibende Zeit:/g.test(text)) {
            text = text.replace(/Verbleibende Zeit:/g, 'Verbleibende Übungszeit:');
            changed = true;
        }

        // Verbleibende Versuche durch Übung ersetzen
        if (/Verbleibende Versuche:/g.test(text)) {
            text = text.replace(/Verbleibende Versuche:/g, 'Übung:');
            changed = true;
        }

        if (changed) {
            node.nodeValue = text.trim().replace(/\s+/g, ' ');
        }
    }

    function walkDOM(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            processTextNode(node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Skip script und style Elemente
            if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
                for (let child of node.childNodes) {
                    walkDOM(child);
                }
            }
        }
    }

    // Initial ausführen
    walkDOM(document.body);

    // MutationObserver für dynamisch geladene Inhalte
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
                    walkDOM(node);
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
