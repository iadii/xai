const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/prompt', async (req, res) => {
    const { apiKey, prompt } = req.body;

    if (!apiKey || !prompt) {
        return res.status(400).json({ error: 'API key and prompt are required.' });
    }

    try {
        const response = await axios.post(
            'https://xai-api.com/v1/chat',
            { prompt },
            { headers: { Authorization: `Bearer ${apiKey}` } }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error connecting to the xAI API.', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
