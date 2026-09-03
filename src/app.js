import { initChat } from './chat.js';

const routes = {
  '/home': `
    <div class="view-container">
      <h1>Bienvenido al Chat AI</h1>
      <p>Chatea con tu personaje favorito en esta experiencia interactiva desarrollada para el PI M3.</p>
      <a href="/chat" class="nav-link btn-primary">Empezar a chatear</a>
    </div>
  `,
  '/chat': `
    <div class="chat-wrapper">
      <div id="messagesList" class="messages-list">
        <div class="message ai">¡Hola! ¿De qué quieres hablar hoy?</div>
      </div>
      <div id="typingIndicator" class="typing-indicator" style="display:none;">El personaje está escribiendo...</div>
      <form id="chatForm" class="chat-input-form">
        <input type="text" id="messageInput" placeholder="Escribe tu mensaje acá..." autocomplete="off" required />
        <button type="submit">Enviar</button>
      </form>
    </div>
  `,
  '/about': `
    <div class="view-container">
      <h1>Acerca del Proyecto</h1>
      <p>Desarrollado como Proyecto Integrador (PI M3) en SoyHenry.</p>
      <p>Tecnologías: Vanilla JS, Node.js (Vercel Serverless), CSS Mobile-First y Gemini AI.</p>
    </div>
  `
};

function navigateTo(pathname) {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  renderRoute();
}

function renderRoute() {
  // Por defecto cargamos /home si la ruta no existe o es la raíz
  const path = routes[window.location.pathname] ? window.location.pathname : '/home';
  const appDiv = document.getElementById('app');
  
  appDiv.innerHTML = routes[path];

  // Si estamos en la vista del chat, inicializamos su lógica
  if (path === '/chat') {
    initChat();
  }
}

// Interceptar clics en los enlaces para usar la History API (sin recargar)
document.addEventListener('click', (e) => {
  if (e.target.matches('.nav-link')) {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    navigateTo(href);
  }
});

// Manejar el botón de "Atrás" del navegador
window.addEventListener('popstate', renderRoute);

// Cargar la vista inicial al abrir la página
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname === '/') {
    window.history.replaceState({}, '/home', '/home');
  }
  renderRoute();
});