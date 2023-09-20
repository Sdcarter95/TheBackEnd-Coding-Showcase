"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCyan = exports.printDarkGreen = exports.printWhite = exports.printBlue = exports.printRed = exports.printGreen = void 0;
const app_1 = require("./app");
const resetCode = '\x1b[0m'; // Reset code is to set text color to default after colored text is printed
function printGreen(input) {
    const text = `\x1b[38;5;${app_1.textColor.green}m${input}${resetCode}`;
    printText(text);
}
exports.printGreen = printGreen;
function printRed(input) {
    const text = `\x1b[38;5;${app_1.textColor.red}m${input}${resetCode}`;
    printText(text);
}
exports.printRed = printRed;
function printBlue(input) {
    const text = `\x1b[38;5;${app_1.textColor.blue}m${input}${resetCode}`;
    printText(text);
}
exports.printBlue = printBlue;
function printWhite(input) {
    const text = `\x1b[38;5;${app_1.textColor.white}m${input}${resetCode}`;
    printText(text);
}
exports.printWhite = printWhite;
function printDarkGreen(input) {
    const text = `\x1b[38;5;${app_1.textColor.darkGreen}m${input}${resetCode}`;
    printText(text);
}
exports.printDarkGreen = printDarkGreen;
function printCyan(input) {
    const text = `\x1b[38;5;${app_1.textColor.cyan}m${input}${resetCode}`;
    printText(text);
}
exports.printCyan = printCyan;
function sleepSync(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {
        // Busy-wait until the desired time has passed
    }
}
async function printText(text) {
    for (const char of text) {
        process.stdout.write(char);
        sleepSync(35);
    }
}