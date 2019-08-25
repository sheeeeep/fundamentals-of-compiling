export const isAlpha = (firstChar: string) => {
    return /[a-zA-Z_]/.test(firstChar);
};

export const isDigit = (firstChar: string) => {
    return /[0-9]/.test(firstChar);
};