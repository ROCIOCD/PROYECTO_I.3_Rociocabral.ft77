// Formatea los mensajes para la vista o limpia entradas de texto
export function sanitizeInput(text) {
  if (!text || typeof text !== 'string') return '';
  return text.trim();
}

export function formatTimestamp(date = new Date()) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}