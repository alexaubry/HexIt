'use babel';

import { CompositeDisposable } from 'atom';

export default {

    subscriptions: null,

    activate(state) {
        this.subscriptions = new CompositeDisposable();
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'hex-it:hex': () => this.selectionToHex(false)
        }));
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'hex-it:hex-prefix': () => this.selectionToHex(true)
        }));
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'hex-it:decimal': () => this.selectionToDecimal()
        }));
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    /**
     * Converts and replaces the selected text to an hexadecimal string.
     * @param {Bool} addPrefix - A Boolean indicating whether to add the `0x` prefix to the result.
     */

    selectionToHex(addPrefix) {
        let editor
        if (editor = atom.workspace.getActiveTextEditor()) {
            let selection = editor.getSelectedText();
            let replacement = makeHexadecimal(selection, addPrefix);
            editor.insertText(replacement);
        }
    },

    /**
     * Converts and replaces the selected text to a decimal string.
     */

    selectionToDecimal() {
        let editor
        if (editor = atom.workspace.getActiveTextEditor()) {
            let selection = editor.getSelectedText();
            let replacement = makeDecimal(selection);
            editor.insertText(replacement);
        }
    }

};

/**
 * Converts a decimal string to an hexadecimal string.
 * @param {String} decimalString - The decimal string to convert to hexadecimal.
 * @param {Bool} addPrefix - A Boolean indicating whether to add the `0x` prefix to the result.
 * @return {String} The hexadecimal representation of the input if it is a valid
 * number, returns the input back otherwise.
 */

function makeHexadecimal(decimalString, addPrefix) {
    var number = parseInt(decimalString, 10);
    var hexadecimal = (+number).toString(16);

    if (isOdd(hexadecimal.length)) {
        hexadecimal = "0" + hexadecimal
    }

    var prefix = addPrefix ? "0x" : "";
    return isNaN(number) ? decimalString : (prefix + hexadecimal);
}

/**
 * Converts an hexadecimal string to a decimal string.
 * @param {String} hexadecimalString - The hexdecimal string to convert to decimal.
 * @return {String} The decimal representation of the input, if it is a valid
 * number, returns the input back otherwise.
 */

function makeDecimal(hexadecimalString) {
    var number = parseInt(hexadecimalString, 16);
    var decimalString = number.toString(10);
    return isNaN(number) ? hexadecimalString : decimalString;
}

/**
 * Checks if an integer is odd.
 * @param {Int} number - The number to check.
 * @returns A Boolean indicating whether the number is odd (true) or even (false).
 */

function isOdd(number) {
  return (number % 2) == 1
}
