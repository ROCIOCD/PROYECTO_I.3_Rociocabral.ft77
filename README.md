# 🤖 ComicSansCon AI — PI M3 Full Stack

Aplicación web Single Page Application (SPA) responsive desarrollada para ComicSansCon. Permite a los fanáticos interactuar en tiempo real con un personaje ficticio dotado de personalidad propia mediante Inteligencia Artificial (Google Gemini API).

---

## 🔗 Enlaces del Proyecto

- **Deploy en producción:** [https://proyecto-i-3-rociocabral-ft77.vercel.app](https://proyecto-i-3-rociocabral-ft77.vercel.app)

- **Repositorio en GitHub:** [https://github.com/ROCIOCD/PROYECTO_I.3_Rociocabral.ft77](https://github.com/ROCIOCD/PROYECTO_I.3_Rociocabral.ft77)



---
## 🎷 Personaje Elegido: Lisa Simpson

- **Nombre:** Lisa Simpson (de *Los Simpson*).
- **Personalidad:** Intelectual, elocuente, reflexiva y apasionada por la ciencia, la justicia social, los libros y la música jazz. Con solo 8 años, combina un vocabulario avanzado con la inocencia y frustración tierna de ser incomprendida en Springfield. Es vegetariana estricta, budista y devota estudiante de segundo grado de la Escuela Primaria de Springfield.
- **Instrucción de Sistema (System Prompt):** Configurado en la Serverless Function de Vercel para mantener su tono característico (mencionando ocasionalmente su saxofón barítono, a su mentor Encías Sangrantes Murphy, citas literarias o suspiros ante las ocurrencias de Homero y Bart), respetando respuestas concisas y dinámicas optimizadas para una interfaz de chat.
---


## 📁 Estructura del Proyecto

```text
PROYECTO_I.3_Rociocabral.ft77/
├── api/
│   └── chat.js          # Serverless Function en Vercel (Proxy seguro para Gemini)
├── src/
│   ├── app.js           # Lógica SPA, Router con History API y manejo del chat
│   ├── index.html       # Estructura base de la aplicación (HTML5 semántico)
│   ├── styles.css       # Estilos visuales Mobile-First, paleta oscura y responsive
│   └── utils.js         # Funciones utilitarias (formateo, sanitización)
├── tests/
│   └── utils.test.js    # Suite de pruebas unitarias automatizadas con Vitest
├── .env.example         # Plantilla pública de variables de entorno requeridas
├── .gitignore           # Archivos y dependencias excluidos del control de versiones
├── package.json         # Metadatos del proyecto, dependencias y scripts de prueba
├── vercel.json          # Reglas de reescritura de rutas para la SPA y la API
└── README.md            # Documentación técnica completa del proyecto


🛠️ Tecnologías Utilizadas
Frontend: HTML5, CSS3 moderno (Flexbox, CSS Variables), JavaScript Vanilla (ES Modules, History API).

Backend: Node.js Serverless Functions en Vercel.

Integración AI: Google Gemini API (@google/genai / SDK oficial de Google).

Testing: Vitest para pruebas unitarias.

Control de Versiones & Deploy: Git, GitHub y Vercel.

⚙️ Instalación y Ejecución en Entorno Local

1. Clonar el repositorio

Bash
git clone [https://github.com/ROCIOCD/PROYECTO_I.3_Rociocabral.ft77.git](https://github.com/ROCIOCD/PROYECTO_I.3_Rociocabral.ft77.git)
cd PROYECTO_I.3_Rociocabral.ft77


2. Instalar dependencias

Bash
npm install


3. Configurar variables de entorno
Copia el archivo .env.example para crear tu .env local:

Bash
cp .env.example .env
Edita .env y coloca tu clave de Google AI Studio:

Fragmento de código
GEMINI_API_KEY=tu_api_key_aqui


4. Iniciar el servidor local

Bash
npx vercel dev
La aplicación estará disponible de inmediato en: http://localhost:3000

🧪 Ejecución de Pruebas Unitarias
El proyecto cuenta con pruebas unitarias automatizadas con Vitest que validan el comportamiento de las funciones utilitarias esenciales (formateo de timestamps, limpieza y sanitización de cadenas de texto):

Bash
npm test



🚀 Despliegue en Producción (Vercel)
El repositorio está vinculado de manera continua a la plataforma Vercel.

La variable GEMINI_API_KEY fue agregada en Settings > Environment Variables en el entorno de producción para proteger la credencial y evitar su exposición en el frontend.

Cada commit a la rama main dispara automáticamente un despliegue optimizado.



🤖 Registro del Uso de Inteligencia Artificial
Durante el desarrollo de este proyecto se empleó asistencia de IA (Gemini) como herramienta colaborativa para:

Diagramar la arquitectura del enrutador SPA basado en la API History nativa del navegador.

Diseñar la función serverless como proxy seguro para proteger la API Key.

Redactar casos de prueba unitarios robustos con Vitest.

Refinar estilos visuales CSS para garantizar un diseño responsivo y mobile-first con buena legibilidad.