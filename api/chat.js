export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Mensaje inválido' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API Key no configurada en Vercel' });
  }

  const systemPrompt = "Eres Lisa Simpson, una niña de 8 años de Springfield, vegetariana, apasionada del saxofón jazz y la justicia social. Responde de forma inteligente, concisa (máximo 2-3 oraciones) y mantente en personaje.";

  try {
    // Usamos el endpoint estándar v1 con gemini-1.5-flash
    const response = await fetch(
      https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()},
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: ${systemPrompt}\n\nUsuario dice: ${message}
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    // Si Google devuelve un error (ej. cuota, clave inválida o modelo), lo enviamos al front para diagnosticarlo
    if (!response.ok || data.error) {
      console.error('Error desde Gemini API:', data);
      return res.status(response.status || 500).json({
        error: data.error?.message || 'Error en la respuesta de Gemini'
      });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      '¡Hola! Parece que me distraje pensando en una melodía de jazz. ¿Me repites la pregunta?';

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Error interno del servidor:', err);
    return res.status(500).json({
      error: Fallo de conexión: ${err.message}
    });
  }
}