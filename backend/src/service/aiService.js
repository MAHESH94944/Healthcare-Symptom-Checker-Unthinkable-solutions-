const axios = require("axios");

const getModel = () => {
  // Prefer env override; else try requested "gemini-2.5-flash"; fallback to "gemini-1.5-flash"
  const envModel = process.env.GEMINI_MODEL;
  if (envModel && typeof envModel === "string") return envModel.trim();
  return "gemini-2.5-flash";
};

async function generateContent(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Gemini API key not configured.");

  let model = getModel();
  let url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const response = await axios.post(url, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    const parts = response?.data?.candidates?.[0]?.content?.parts || [];
    const text =
      parts
        .map((p) => p?.text)
        .filter(Boolean)
        .join("\n") ||
      response?.data?.candidates?.[0]?.output_text ||
      "";

    if (!text) throw new Error("No response from LLM.");
    return text;
  } catch (err) {
    // If the requested model fails (e.g., NOT_FOUND), retry with a known supported model.
    const status = err?.response?.status;
    const code = err?.response?.data?.error?.code;
    const notFound = status === 404 || code === 404;
    if (notFound && model !== "gemini-1.5-flash") {
      model = "gemini-1.5-flash";
      url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const retry = await axios.post(url, {
        contents: [{ parts: [{ text: prompt }] }],
      });
      const parts = retry?.data?.candidates?.[0]?.content?.parts || [];
      const text =
        parts
          .map((p) => p?.text)
          .filter(Boolean)
          .join("\n") ||
        retry?.data?.candidates?.[0]?.output_text ||
        "";
      if (!text) throw new Error("No response from LLM.");
      return text;
    }
    throw err;
  }
}

module.exports = { generateContent };
