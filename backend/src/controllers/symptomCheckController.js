const { generateContent } = require("../service/aiService");

const symptomCheckService = async (req, res) => {
  const { symptomText } = req.body || {};
  if (!symptomText || typeof symptomText !== "string" || !symptomText.trim()) {
    return res
      .status(400)
      .json({ error: "Invalid input. Provide { symptomText: string }." });
  }

  // Strong prompt with strict JSON output requirement
  const prompt = `You are a highly reliable medical information assistant. Your task is to analyze user-provided symptoms 
and generate strictly educational health information. 
DO NOT provide diagnosis or medical advice. 
DO NOT sound certain or authoritative.

Follow these instructions exactly:

---------------------------------------------------
### 1. INPUT
User Symptoms: ${symptomText}

---------------------------------------------------
### 2. OUTPUT FORMAT (STRICT)
Return output STRICTLY in JSON with two fields:
{
  "conditionsSummary": "...",
  "recommendationsSummary": "..."
}

Where:
- conditionsSummary: Bullet points covering "Possible Conditions (Plain English)" and "Probable Causes" using hedging language (may, could, possibly).
- recommendationsSummary: Bullet points for "Recommended Next Steps" and include clear red-flag symptoms.

Also include this disclaimer verbatim at the end of recommendationsSummary:
“This information is intended purely for educational purposes and must not be considered medical advice. Always consult a qualified healthcare professional for diagnosis, treatment, or any medical concerns.”

---------------------------------------------------
### 3. STYLE GUIDELINES
- Use simple, non-technical language.  
- Avoid complex medical terminology unless necessary.  
- Do NOT declare a diagnosis or certainty.  
- Avoid phrases like “you have”, “this means”, “definitely”, “for sure”.  
- Use hedging phrases: “may be related”, “could be caused”, “possibly”, “might indicate”.

---------------------------------------------------
### 4. SAFETY RULES (MANDATORY)
- Never provide treatment plans beyond common self-care.  
- Never prescribe medication.  
- Never encourage the user to avoid doctors.  
- Always include the medical disclaimer in recommendationsSummary.  
- Never provide emergency instructions (like CPR, dosage, emergency steps).  
- Never tell user to ignore symptoms.

---------------------------------------------------
### 5. GOAL
Your goal is to provide:  
- High-quality reasoning  
- Educational health suggestions  
- Clean structured output  
- Maximum safety  
- No hallucinations`;

  // Fallback section extractor (kept for resilience if model ignores JSON)
  const extractSections = (text) => {
    const getBlock = (label) => {
      const pattern = new RegExp(
        `\\*\\*${label}\\*\\*[\\s\\S]*?(?=\\*\\*|$)`,
        "i"
      );
      const match = text.match(pattern);
      return match
        ? match[0].replace(new RegExp(`\\*\\*${label}\\*\\*`, "i"), "").trim()
        : "";
    };
    const disclaimerBlock = getBlock("Important Safety Disclaimer");
    return {
      conditions: getBlock("Possible Conditions (Plain English)") || text,
      recommendations: getBlock("Recommended Next Steps") || text,
      disclaimer:
        disclaimerBlock ||
        "This is for educational purposes only and not a substitute for professional medical advice.",
    };
  };

  try {
    const llmText = await generateContent(prompt);

    // Try to parse strict JSON response
    let parsed;
    try {
      // Some models may wrap JSON in code fences; strip them
      const cleaned = llmText
        .trim()
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```$/i, "")
        .trim();
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = null;
    }

    if (parsed && typeof parsed === "object") {
      const conditionsSummary = parsed.conditionsSummary || "";
      const recommendationsSummary = parsed.recommendationsSummary || "";
      const disclaimerText =
        "This is for educational purposes only and not a substitute for professional medical advice.";

      return res.json({
        conditions: conditionsSummary || llmText,
        recommendations: recommendationsSummary || llmText,
        disclaimer: disclaimerText,
      });
    }

    // Fallback: section-based extraction
    const { conditions, recommendations, disclaimer } =
      extractSections(llmText);
    return res.json({
      conditions,
      recommendations,
      disclaimer,
    });
  } catch (err) {
    console.error("Gemini API error:", err?.response?.data || err.message);
    return res.status(502).json({ error: "Failed to process symptoms." });
  }
};

module.exports = { symptomCheckService };
