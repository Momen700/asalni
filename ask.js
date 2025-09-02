const HF_API_KEY = "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";

// النموذج اللي رح نستخدمه (سريع ويدعم العربية كويس)
const MODEL = "mistralai/Mistral-7B-Instruct-v0.2";

async function askQuestion() {
  const question = document.getElementById("question").value.trim();
  const answerBox = document.getElementById("answer");

  if (!question) {
    answerBox.innerText = "⚠️ الرجاء كتابة سؤال أولاً";
    return;
  }

  answerBox.innerText = "⏳ جارٍ البحث...";

  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: question,
          parameters: {
            max_new_tokens: 200,
            temperature: 0.5,
          },
        }),
      }
    );

    if (!response.ok) {
      answerBox.innerText = "❌ خطأ في الاتصال بالنموذج";
      return;
    }

    const result = await response.json();
    console.log(result); // للتجربة فقط

    if (result && result[0] && result[0].generated_text) {
      answerBox.innerText = result[0].generated_text;
    } else {
      answerBox.innerText = "😢 لم أجد جواباً واضحاً، جرّب صياغة السؤال بطريقة أخرى";
    }
  } catch (error) {
    console.error(error);
    answerBox.innerText = "⚠️ حدث خطأ أثناء البحث";
  }
}
