module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo no permitido' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (parseErr) {
        return res.status(400).json({ error: 'JSON invalido' });
      }
    }

    const message = body ? body.message : null;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Mensaje invalido' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API Key no configurada' });
    }

    const systemPrompt = 'Eres Lisa Simpson, una niña de 8 años de Springfield, vegetariana, saxofonista y activista. Responde siempre en personaje con inteligencia, amabilidad y de forma concisa en 2 o 3 oraciones.';
    const promptText = systemPrompt + '\n\nUsuario: ' + message;

    const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey.trim();

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: promptText }]
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      const errorMsg = data.error && data.error.message ? data.error.message : 'Error en Gemini API';
      return res.status(response.status || 500).json({ error: errorMsg });
    }

    let reply = '¡Hola! Estaba practicando con mi saxofon baritono. ¿De que te gustaria hablar?';
    if (
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text
    ) {
      reply = data.candidates[0].content.parts[0].text;
    }

    return res.status(200).json({ reply: reply });
  } catch (err) {
    return res.status(500).json({
      error: 'Error interno del servidor: ' + err.message
    });
  }
};