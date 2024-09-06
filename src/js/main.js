// Utils
import { generatePassword } from '../utils/password/password.js';
import { initialize } from '../utils/ui/ui.js';

document.addEventListener('DOMContentLoaded', () => {
  generatePassword();
  initialize();
});
