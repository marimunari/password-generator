// Ui
import { copyPassword, generatePassword } from '../password/password.js';

/* Method for handling initial events */
export function initialize() {
  const range = document.querySelector('#settings__range');
  const copyIcon = document.getElementById('password__copy');
  const copyButton = document.getElementById('button__copy');
  const refresh = document.getElementById('password__refresh');
  
  range.addEventListener('input', function() {
    document.getElementById('settings__number').textContent = this.value;
    generatePassword();
    updateSliderTrack(range);
  });

  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updatePassword);
  });

  if (copyIcon || copyButton) {
    copyIcon.addEventListener('click', copyPassword);
    copyButton.addEventListener('click', copyPassword);
  }

  if (refresh) {
    refresh.addEventListener('click', generatePassword);
  }

  updateSliderTrack(range);
}

/* Method to update the strength bar of the generated password */
export function updateStrengthBar(strength) {
  const strengthBar = document.getElementById('settings__bar');
  
  if (strength === 'Forte') {
      strengthBar.style.width = '100%';
      strengthBar.style.height = '100%';
      strengthBar.className = 'settings__bar--strong';
  } else if (strength === 'Média') {
      strengthBar.style.width = '50%';
      strengthBar.style.height = '100%';
      strengthBar.className = 'settings__bar--medium';
  } else {
      strengthBar.style.width = '33%';
      strengthBar.style.height = '100%';
      strengthBar.className = 'settings__bar--weak';
  }
}

/* Method to update the slider track */
function updateSliderTrack(slider) {
  const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
  const background = `linear-gradient(to right, white ${value}%, #2C1746 ${value}%)`;
  slider.style.background = background;
}

/* Method to update password */
function updatePassword() {
  generatePassword();
}
