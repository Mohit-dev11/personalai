import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINIAI_KEY } from "./constants";


// const client = new OpenAI({
//   apiKey: OPENAPI_KEY, // This is the default and can be omitted
//   dangerouslyAllowBrowser: true,
// });

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(GEMINIAI_KEY);
const openai = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default openai;