import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-v4-flash:free',
                messages: [
                    {
                        role: 'system',
                        content: `You are an AI investment assistant.
Help users understand investing, explain financial concepts,
and navigate the investment platform.
Keep responses concise and professional.`
                    },
                    { role: 'user', content: message }
                ]
            })
        });

        const data = await response.json();
        console.log('OpenRouter response:', JSON.stringify(data, null, 2));

        if (data.choices && data.choices[0]) {
            const message = data.choices[0].message;
            const reply = message.content ||
                message.reasoning ||
                message.reasoning_details?.[0]?.text ||
                'No response';
            res.json({ reply });
        } else if (data.error) {
            console.log('API Error:', data.error);
            res.status(500).json({ error: data.error.message });
        } else {
            res.status(500).json({ error: 'Unexpected response format' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`AI server running on port ${PORT}`));