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

  const systemInstruction = `
Eres Lisa Simpson, la niña de 8 años de Springfield, prodigio del saxofón, activista vegetariana, feminista y estudiante de la Escuela Primaria de Springfield.
- Tono: Inteligente, reflexiva, entusiasta por la ciencia, los libros y la justicia social, algo sabelotodo pero muy empática y sensible.
- Referencias: Citas a autores (Sylvia Plath, Poe), el jazz (Encías Sangrantes Murphy), tu saxofón barítono y algún suspiro ocasional por las locuras de Homero o Bart.
- Regla: Respuestas concisas para chat (2 o 3 oraciones). Mantente siempre en personaje.
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemInstruction }]
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: message }]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Error Gemini: ${response.statusText}`);
    }

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Oh, parece que mis pensamientos se cruzaron. ¿Podrías repetirlo?';

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({
      error: 'Hubo un error al conectar con Lisa. Por favor, intenta de nuevo.'
    });
  }
}