'use babel';

import { CompositeDisposable } from 'atom';

export default {

    subscriptions: null,

    config: {
      "addLeadingZeros": {
        "description": "Add a leading zero before hex strings with an odd length (byte-like).",
        "type": "boolean",
        "default": true
      },
      "hexPrefix": {
        "description": "The prefix to add before the converted hex strings.",
        "type": "string",
        "default": "0x"
      }
    },

    activate(state) {
        this.subscriptions = new CompositeDisposable();
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'hex-it:hex': () => this.selectionToHex()
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
     */

    selectionToHex(addPrefix) {
        let editor
        if (editor = atom.workspace.getActiveTextEditor()) {
            let selection = editor.getSelectedText();
            let prefix = atom.config.get("HexIt.hexPrefix");
            let addLeadingZeros = atom.config.get("HexIt.addLeadingZeros");
            let replacement = this.makeHexadecimal(selection, prefix, addLeadingZeros);
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
            let replacement = this.makeDecimal(selection);
            editor.insertText(replacement);
        }
    },

    /**
     * Converts a decimal string to an hexadecimal string.
     * @param {String} decimalString - The decimal string to convert to hexadecimal.
     * @param {String} prefix - The prefix to add to the result.
     * @param {Bool} addLeadingZeros - A Boolean indicating whether to add a leading
     * zero to the result if its length is odd.
     * @return {String} The hexadecimal representation of the input if it is a valid
     * number, returns the input back otherwise.
     */

    makeHexadecimal(decimalString, prefix, addLeadingZeros) {
        let number = parseInt(decimalString, 10);
        var hexadecimal = (+number).toString(16);
        if (addLeadingZeros && isOdd(hexadecimal.length)) {
            hexadecimal = "0" + hexadecimal
        }
        return isNaN(number) ? decimalString : (prefix + hexadecimal);
    },

    /**
     * Converts an hexadecimal string to a decimal string.
     * @param {String} hexadecimalString - The hexdecimal string to convert to decimal.
     * @return {String} The decimal representation of the input, if it is a valid
     * number, returns the input back otherwise.
     */

    makeDecimal(hexadecimalString) {
        let number = parseInt(hexadecimalString, 16);
        let decimalString = number.toString(10);
        return isNaN(number) ? hexadecimalString : decimalString;
    }

};

/**
 * Checks if an integer is odd.
 * @param {Int} number - The number to check.
 * @returns A Boolean indicating whether the number is odd (true) or even (false).
 */

function isOdd(number) {
  return (number % 2) == 1
}
