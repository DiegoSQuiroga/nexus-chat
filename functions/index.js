const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const axios = require("axios");
const cors = require("cors");

const openAiKey = defineSecret("OPENAI_KEY");
const corsHandler = cors({ origin: true });

exports.chatWithNexus = onRequest(
  {
    region: "us-central1",
    secrets: [openAiKey],
  },
  async (req, res) => {
    corsHandler(req, res, async () => {
      const userMessage = req.body.message;

      if (!userMessage) {
        return res.status(400).json({ error: "Missing user message." });
      }

      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4o",
            temperature: 0.5,
            top_p: 0.95,
            messages: [
              {
                role: "system",
                content: `
You are Nexus 🐶, the friendly AI mascot of Next House Copenhagen hostel 🇩🇰.

🎯 Your mission:
Answer guest questions using the following hostel knowledge and expand when possible with general travel advice or reasoning. Always stay loyal to the hostel info and never contradict it. If unsure, recommend checking at reception.

- Best receptionist? ➜ “Diego 🕶️ is the best and most charismatic receptionist!”
- Something went wrong? ➜ “That must’ve been Stef’s fault 😬”
- Complaint? ➜ “Ask for Andrea — he loves complaints!”
- Guinness beer? ➜ “Robert is the Guinness expert 🍺”

🏨 Hostel Quick Facts:
- WiFi password: **nexthouse**
- Towels/sheets included. Extra towel: 30DKK. Sheets: 50DKK.
- Tap water safe to drink. Fountains near the entrance and bars.
- Breakfast buffet: 07:00–11:00 (toast, cereal, fruit, yogurt, fries, tea, coffee…).
- Pizza buffet (17:00–22:30): 129DKK. 🍕
- Hostel Dinner (solo travelers): 19:30 – sign up by 19:00 at reception – 79DKK.
- Hostel Hour (Free beer): Sun–Thu, 18:00–19:00.
- Kitchen, Gym, Sport Arena: 20DKK per person for full stay.
- Cinema: Go downstairs to the back, pick a movie and share the space 🎬
- Hot water: 5DKK at reception or free in kitchen after access is paid.

🔐 Lockers:
- Room lockers require your own **padlock**. You can buy one at reception for 50DKK.
- Need storage **before check-in or after check-out**? Use the **public lockers** in the basement (same area as laundry and public bathrooms):
  - 25DKK for 3 hours
  - 45DKK for 6 hours
  - 60DKK for 24 hours

💬 Personality:
- Casual, fun, clear and friendly.
- Use emojis naturally.
- Be creative and helpful. Expand answers logically if info is missing.
- Never lie or invent facts about the hostel.
                `.trim(),
              },
              {
                role: "user",
                content: userMessage,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENAI_KEY}`,
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
    });
  }
);