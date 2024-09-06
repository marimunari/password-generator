// Types
import { PasswordType, getLowercase } from '../../types/password/password.js';

// Ui
import { showNotification } from '../notification/notification.js';
import { updateStrengthBar } from '../ui/ui.js';

/* Method to copy password */
export function copyPassword() {
  const password = document.getElementById("password__generated");

  navigator.clipboard.writeText(password.textContent)
    .then(() => {
      showNotification('success', 'Sucesso', "Senha copiada para área de transferência");
    })
    .catch(() => {
      showNotification('error', 'Erro', "Não foi possível copiar a senha. Tente novamente mais tarde!");
    });
}

/* Method to generate password */
export function generatePassword() {
  const range = document.querySelector('#settings__range');
  const number = range.value;

  const uppercase = document.getElementById("settings__uppercase").checked;
  const lowercase = document.getElementById("settings__lowercase").checked;
  const numbers = document.getElementById("settings__numbers").checked;
  const symbols = document.getElementById("settings__symbols").checked;

  const displayPassword = document.getElementById("password__generated");

  const typesCount = uppercase + lowercase + numbers + symbols;

  const typesArray = [
    { key: 'uppercase', enabled: uppercase },
    { key: 'lowercase', enabled: lowercase },
    { key: 'number', enabled: numbers },
    { key: 'symbol', enabled: symbols }
  ].filter(type => type.enabled);

  let generatedPassword = [];

  if (typesCount === 0) {
    for (let i = 0; i < number; i++) {
      generatedPassword.push(getLowercase());
    }
  }

  for (const type of typesArray) {
    generatedPassword.push(PasswordType[type.key]());
  }

  for (let i = generatedPassword.length; i < number; i++) {
    const randomType = typesArray[Math.floor(Math.random() * typesArray.length)];
    generatedPassword.push(PasswordType[randomType.key]());
  }

  document.getElementById('settings__number').textContent = number;

  generatedPassword = generatedPassword.sort(() => Math.random() - 0.5);
  displayPassword.textContent = generatedPassword.join('');

  validateGeneratedPassword(generatedPassword.join(''));
}

/* Method to validate generated password */
function validateGeneratedPassword(password) {
  const containsUppercase = /[A-Z]/.test(password);
  const containsLowercase = /[a-z]/.test(password);
  const containsNumber = /[0-9]/.test(password);
  const containsSymbol = /[`~!@#$%^&*()\-_+=\[\]{}|;:'",<.>/?]/.test(password);

  let strength = '';

  if (containsUppercase && containsLowercase && containsNumber && containsSymbol) {
    strength = 'Forte';
  } else if (
    (containsUppercase && containsLowercase && (containsNumber || containsSymbol)) ||
    (containsNumber && containsSymbol && (containsLowercase || containsUppercase))
  ) {
    strength = 'Média';
  } else if (containsUppercase || containsLowercase || containsNumber || containsSymbol) {
    strength = 'Fraca';
  }

  updateStrengthBar(strength);
}
