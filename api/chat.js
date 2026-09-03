export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { message, history } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Falta configurar la API Key en el servidor' });
  }

  try {
    // Aquí defines la personalidad de tu bot (System Prompt)
    const systemPrompt = "Eres un personaje ficticio de una franquicia popular. Responde siempre corto, divertido y manteniendo el rol.";

    const formattedHistory = history ? history.map(item => ({
      role: item.role === 'user' ? 'user' : 'model',
      parts: [{ text: item.text }]
    })) : [];

    formattedHistory.push({ role: 'user', parts: [{ text: message }] });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: formattedHistory
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Error comunicándose con Gemini');
    }

    const reply = data.candidates[0].content.parts[0].text;
    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Error en el servidor:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}