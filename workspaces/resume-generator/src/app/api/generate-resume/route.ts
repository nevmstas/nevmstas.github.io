import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getBioMessage } from "../../../openai/get-bio-message";
import { getSkillsMessage } from "../../../openai/get-skills-message";
import { getCoverLetterMessage } from "../../../openai/get-cover-letter-message";
import { getExperiencesMessage } from "../../../openai/get-experiences-message";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { generateSchema } from "@/schema";

const openaiClient = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobDescription, resume } = body;

    if (!jobDescription) {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }

    if (!resume) {
      return NextResponse.json(
        { error: "Resume data is required" },
        { status: 400 }
      );
    }

    const completion = await openaiClient.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content: `You're a resume creator with deep expertise in updating resumes, bios, and cover letters.
                    Your goals are to:
                    1. Update the given resume data based on the job description
                    2. Create a cover letter
                    3. Return the original resume data with the updated fields and the cover letter in json format`,
        },
        {
          role: "system",
          content: `You're given the following job description ${jobDescription} and resume data ${JSON.stringify(
            resume
          )}`,
        },
        getBioMessage(),
        getSkillsMessage(),
        getExperiencesMessage(),
        getCoverLetterMessage(),
      ], 
      response_format: zodResponseFormat(generateSchema, 'generate'),
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("No response content received from OpenAI");
    }

    return NextResponse.json({
      aiResponse: responseContent,
      message:
        "AI response received. You may need to manually parse the response to extract structured data.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to generate resume",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
