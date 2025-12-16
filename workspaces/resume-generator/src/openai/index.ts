import { openaiClient } from "./openai-client";
import { prompt as generateResume } from "./prompt";
import { promptCV as generateCV } from "./prompt-cv";
import { promptCoverLetter as generateCoverLetter } from "./prompt-cover-letter";

export { generateResume, generateCV, generateCoverLetter, openaiClient };
