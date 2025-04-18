const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

// Ortam değişkenlerini al (.env içinden veya Render'dan)
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// OpenAI API ayarları
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// API route
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI Error:', error.message);
    res.status(500).json({ error: 'OpenAI yanıt veremedi' });
  }
});

app.get('/', (req, res) => {
  res.send('AI HZM Backend Aktif!');
});

app.listen(port, () => {
  console.log(`Server çalışıyor http://localhost:${port}`);
});

