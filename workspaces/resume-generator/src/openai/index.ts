import { openaiClient } from "./openai-client"
import { promptCV as generateCV } from "./prompt-cv"
import { promptCoverLetter as generateCoverLetter } from "./prompt-cover-letter"
import { promptDM as generateDM } from "./prompt-dm"

export { generateCV, generateCoverLetter, generateDM, openaiClient }
