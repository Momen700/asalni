export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "الطريقة غير مسموحة" });
  }

  const { question, context } = req.body;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/deepset/xlm-roberta-base-squad2",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {
            question: question,
            context: context,
          },
        }),
      }
    );

    const data = await response.json();

    if (data && data.answer) {
      res.status(200).json({ answer: data.answer });
    } else {
      res.status(200).json({ answer: "لم أتمكن من العثور على جواب واضح." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}