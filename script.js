async function sendMessage() {

  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chat-box");

  const pergunta = input.value;
  if (!pergunta) return;

  chatBox.innerHTML += `<div class="message user">${pergunta}</div>`;
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  const API_KEY = "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";

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Você é um assistente pedagógico da URE-CAIEIRAS.

Use APENAS o conteúdo abaixo como base:
${baseConhecimento}

Se a resposta não estiver no material, diga:
"Essa informação não está no DOCUMENTO ORIENTADOR disponível."

Explique de forma clara e didática.
Seja sucinto e objetivo na sua resposta. 
`
        },
        {
          role: "user",
          content: pergunta
        }
      ]
    })
  });

  const data = await response.json();
  const resposta = data.choices[0].message.content;

  chatBox.innerHTML += `<div class="message bot">${resposta}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
