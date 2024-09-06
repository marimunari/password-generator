/* Constant to define password characteristic types */
export const PasswordType = {
  uppercase: getUppercase,
  lowercase: getLowercase,
  number: getNumber,
  symbol: getSymbol,
};

/* Method to get random uppercase character */
export function getUppercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

/* Method to get random lowercase character */
export function getLowercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

/* Method to get random number character */
export function getNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

/* Method to get random symbol character */
export function getSymbol() {
  const symbols = '`~!@#$%^&*()-_=+[{]}|;:\'",<.>/?';
  return symbols[Math.floor(Math.random() * symbols.length)];
}