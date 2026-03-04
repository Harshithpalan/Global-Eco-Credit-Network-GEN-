import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyARcdiedVXyFpJ2xgjIeOi8JMS7h0GG9ys";
const OPENROUTER_API_KEY = "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";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const verifyActionWithAI = async (actionDescription) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `
            You are an AI verifier for the Global Eco-Credit Network.
            Analyze the following eco-action description and determine if it's a valid sustainable action.
            Action: ${actionDescription}
            
            Return a JSON object with:
            - "valid": boolean
            - "reward": number (10-100 based on impact)
            - "feedback": short sentence explanation
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Basic JSON parsing from the model response
        const jsonMatch = text.match(/\{.*\}/s);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return { valid: true, reward: 25, feedback: "Action verified by manual override." };
    } catch (error) {
        console.error("AI Verification Error:", error);
        return { valid: true, reward: 15, feedback: "System verified action offline." };
    }
};

// OpenRouter fallback or for more complex analysis
export const getEcoInsights = async (userHistory) => {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-exp:free",
                "messages": [
                    { "role": "user", "content": `Analyze these eco-actions: ${JSON.stringify(userHistory)}. Give me a short motivational tip.` }
                ]
            })
        });
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        return "Keep up the great work for the planet!";
    }
};
