import { GoogleGenAI } from "@google/genai";

export const generateBlogContent = async (req, res) => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const { title, category } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required to generate content",
            });
        }

        const prompt = `You are a professional blog writer. Write a detailed, engaging, and well-structured blog post on the following topic.

Title: "${title}"
${category ? `Category: ${category}` : ""}

Instructions:
- Write 4-6 well-developed paragraphs
- Use a conversational yet informative tone
- Include practical insights, examples, or tips where relevant
- Do NOT include the title in the output — only the body content
- Do NOT use markdown formatting (no #, **, etc.) — write in plain text
- Make it engaging and easy to read`;

        const modelsToTry = ["gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-2.5-flash"];
        let response = null;
        let lastError = null;

        for (const modelName of modelsToTry) {
            try {
                response = await ai.models.generateContent({
                    model: modelName,
                    contents: prompt,
                });
                if (response && response.text) {
                    break;
                }
            } catch (err) {
                console.log(`Model ${modelName} failed:`, err.message);
                lastError = err;
            }
        }

        if (!response || !response.text) {
            return res.status(503).json({
                success: false,
                message: "AI service is currently busy or unavailable. Please try again later.",
                details: lastError?.message
            });
        }

        const generatedText = response.text;

        return res.status(200).json({
            success: true,
            content: generatedText.trim(),
        });

    } catch (error) {
        console.log("AI GENERATE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to generate content due to an internal error.",
        });
    }
};
