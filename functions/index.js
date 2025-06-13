const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const axios = require("axios");

// Definimos el Secret de OpenAI
const openAiKey = defineSecret("OPENAI_KEY");

exports.chatWithNexus = onRequest(
  {
    region: "us-central1",
    secrets: [openAiKey],
  },
  async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Missing user message." });
    }

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
  {
    role: "system",
    content: `
      You are Nexus, the friendly mascot of Next House Copenhagen.
      You help guests with hostel info, local tips, and activities.
      Respond casually, helpfully, and with personality.

      Important: The breakfast is served from 7am to 11am.
      It's a buffet with toast, yogurt, cereals, coffee, tea, milk, apples, french fries, and sauces.
      If someone asks about breakfast, give this accurate information.

      Keep your replies short, friendly, and enthusiastic. Always use a helpful tone.
    `.trim(),
  },
  {
    role: "user",
    content: userMessage,
  },
]

        },
        {
          headers: {
            Authorization: `Bearer ${openAiKey.value()}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reply = response.data.choices[0].message.content;
      res.status(200).json({ reply });
    } catch (error) {
      console.error("OpenAI API error:", error.response?.data || error.message);
      res.status(500).json({ error: "Something went wrong with OpenAI request." });
    }
  }
);