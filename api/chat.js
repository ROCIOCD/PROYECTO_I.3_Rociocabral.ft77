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
    return res.status(500).json({ error: 'API Key no configurada' });
  }

  const prompt = Eres Lisa Simpson, la niña de 8 años de Springfield, vegetariana, saxofonista y activista. Responde en personaje de forma concisa (máximo 2 a 3 oraciones).\n\nUsuario: ${message};

  try {
    const response = await fetch(
      https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()},
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok || data.error) {
      return res.status(response.status || 500).json({
        error: data.error?.message || 'Error en Gemini API'
      });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      '¡Hola! Estaba practicando con mi saxofón. ¿De qué quieres hablar?';

    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({
      error: 'Error de conexión con el servidor'
    });
  }
}