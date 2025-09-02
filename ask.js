async function ask() {
  const question = document.getElementById("question").value;
  const answerDiv = document.getElementById("answer");
  answerDiv.innerText = "⏳ جاري البحث...";

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: question
      })
    });

    const result = await response.json();
    console.log(result);

    if (result && result[0] && result[0].generated_text) {
      answerDiv.innerText = result[0].generated_text;
    } else {
      answerDiv.innerText = "😔 لم أتمكن من إيجاد إجابة مناسبة.";
    }

  } catch (error) {
    console.error(error);
    answerDiv.innerText = "⚠️ حدث خطأ أثناء الاتصال بالخادم.";
  }
}
