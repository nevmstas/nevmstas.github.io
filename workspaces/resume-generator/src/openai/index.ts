import { openaiClient } from "./openai-client";
import { promptCV as generateCV } from "./prompt-cv";
import { promptCoverLetter as generateCoverLetter } from "./prompt-cover-letter";

export { generateCV, generateCoverLetter, openaiClient };
