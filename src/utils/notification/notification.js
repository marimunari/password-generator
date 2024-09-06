/* Method to create and show a notification */
export function showNotification(type, title, description) {
  const notification = document.createElement('div');
  notification.className = `notification__item ${type}`;

  const content = document.createElement('div');
  content.className = 'notification__content';

  const titleElement = document.createElement('div');
  titleElement.className = 'notification__title';
  titleElement.textContent = title;

  const descriptionElement = document.createElement('div');
  descriptionElement.className = 'notification__description';
  descriptionElement.textContent = description;

  content.appendChild(titleElement);
  content.appendChild(descriptionElement);

  notification.appendChild(content);

  const container = document.getElementById('notification');
  container.appendChild(notification);

  setTimeout(() => {
      notification.classList.add('show');
  }, 10);

  setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
          container.removeChild(notification);
      }, 500);
  }, 3000);
}