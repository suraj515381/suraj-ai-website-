
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: userMessage }
      ]
    })
  });

  const data = await response.json();
  res.json({ reply: data.choices[0].message.content });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
