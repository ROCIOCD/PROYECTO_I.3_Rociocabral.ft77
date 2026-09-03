export function initChat() {
  const chatForm = document.getElementById('chatForm');
  const messageInput = document.getElementById('messageInput');
  const messagesList = document.getElementById('messagesList');
  const typingIndicator = document.getElementById('typingIndicator');

  // Guardamos el historial de la sesión actual
  let conversationHistory = [];

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userText = messageInput.value.trim();
    if (!userText) return;

    // Mostrar mensaje del usuario
    appendMessage(userText, 'user');
    messageInput.value = '';
    
    // Mostrar que la IA está pensando
    typingIndicator.style.display = 'block';
    scrollToBottom();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, history: conversationHistory })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al conectar con la API');
      }

      // Ocultar indicador
      typingIndicator.style.display = 'none';

      // Mostrar respuesta de la IA
      appendMessage(data.reply, 'ai');

      // Actualizar historial
      conversationHistory.push({ role: 'user', text: userText });
      conversationHistory.push({ role: 'model', text: data.reply });

    } catch (error) {
      typingIndicator.style.display = 'none';
      appendMessage('⚠️ Error: No se pudo conectar con el personaje.', 'ai');
      console.error(error);
    }
  });

  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    messagesList.appendChild(msgDiv);
    scrollToBottom();
  }

  function scrollToBottom() {
    messagesList.scrollTop = messagesList.scrollHeight;
  }
}