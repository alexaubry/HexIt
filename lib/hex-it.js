'use babel';

import { CompositeDisposable } from 'atom';

export default {

    subscriptions: null,

    activate(state) {
        this.subscriptions = new CompositeDisposable();
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'hex-it:hex': () => this.toHex(false)
        }));
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'hex-it:hex-prefix': () => this.toHex(true)
        }));
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'hex-it:decimal': () => this.toDecimal()
        }));
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    /**
     * Converts a Decimal String to a Hex String.
     */

    toHex(addPrefix) {
        let editor
        if (editor = atom.workspace.getActiveTextEditor()) {
            let selection = editor.getSelectedText()
            let replacement = d2h(selection,addPrefix)
            editor.insertText(replacement);
        }
    },

    /**
     * Converts a Hex String to a Decimal String.
     */

    toDecimal() {
        let editor
        if (editor = atom.workspace.getActiveTextEditor()) {
            let selection = editor.getSelectedText()
            let replacement = h2d(selection)
            editor.insertText(replacement);
        }
    }

};

/**
 * Converts a Hex String to a Decimal String.
 * @param {String} The decimal string to convert to hexadecimal.
 * @param {Bool} A Boolean indicating whether to add the `0x` prefix.
 * @return {String} The hexadecimal representation of the numbber
 */

function d2h(hs,addPrefix) {
    var n = parseInt(hs, 10);
    var s = (+n).toString(16);
    if(s.length < 2) {
        s = '0' + s;
    }
    var prefix = addPrefix ? "0x" : ""
    return s != "NaN" ? (prefix + s) : (prefix + s)
}

/**
 * Converts a Decimal String to a Hex String.
 * @param {String} The hexdecimal string to convert to decimal.
 * @return {String} The decimal representation of the numbber
 */

function h2d(s) {
    var str = s.replace("0x", "")
    var number = parseInt(str, 16);
    var decimal = number.toString(10)
}
