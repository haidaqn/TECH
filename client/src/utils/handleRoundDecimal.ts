export function roundDecimal(number: number) {
    var roundedNumber = Math.round(number);
    var decimalPart = roundedNumber % 1;
    if (decimalPart >= 0.5) {
        return Math.ceil(number);
    } else {
        return Math.floor(number);
    }
}
