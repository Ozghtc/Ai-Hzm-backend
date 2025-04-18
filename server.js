const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// ✅ Yeni OpenAI SDK import'u
const { OpenAI } = require("openai");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// ✅ OpenAI API yapılandırması
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ POST endpoint
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI Error:', error.message);
    res.status(500).json({ error: 'OpenAI yanıt veremedi' });
  }
});

// ✅ GET kontrol endpoint
app.get('/', (req, res) => {
  res.send('AI HZM Backend Aktif!');
});

app.listen(port, () => {
  console.log(`Server çalışıyor http://localhost:${port}`);
});


