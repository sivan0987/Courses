const fs = require("fs");
const pdfParse = require("pdf-parse");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
function extractAggregationQuery(text) {

    let jsonStart = text.indexOf('[');
    let jsonEnd = text.lastIndexOf(']');
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No JSON found");
    }
    const jsonStr = text.substring(jsonStart, jsonEnd + 1);
    const fixedPipelineStr = jsonStr.replace(/\\"/g, '"');
    const pipeline = eval(fixedPipelineStr);
    return pipeline;
  
  }
  
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateQuizFromPDF = async ( lessonName ,pdfPath) => {
  try {
   
    const dataBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(dataBuffer);
    const pdfText = pdfData.text;

   
    const prompt = `
You are a teacher. I give you a Lesson content: "${pdfText}".
Generate 5 multiple-choice questions in random order with 4 options each.
Make the questions phrased differently each time
Indicate the correct answer and provide a short explanation.
Output ONLY the final JSON array. Do not include any preceding text or explanations,
[
  {
    "question": "...",
    "options": ["...", "...", "...", "..."],
    "correct": "...",
    "explanation": "..."
  }
]
`;

    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return extractAggregationQuery( text);
   

  } catch (err) {
    console.error("Error generating quiz:", err);
    throw err;
  }
};

module.exports = { generateQuizFromPDF };
