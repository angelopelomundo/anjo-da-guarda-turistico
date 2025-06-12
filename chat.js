export default async function handler(req, res) {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: message,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: "Erro da OpenAI",
        details: data,
      });
    }

    res.status(200).json({ reply: data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({
      error: "Erro interno",
      details: error.message,
    });
  }
}
