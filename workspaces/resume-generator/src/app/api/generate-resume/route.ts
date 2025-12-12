import { NextRequest, NextResponse } from "next/server";
import { generateResume, openaiClient } from "@/openai";

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

    const result = await generateResume(openaiClient, jobDescription, resume);

    if (!result) {
      throw new Error("No response received from OpenAI");
    }

    return NextResponse.json({
      aiResponse: result,
      message: "Resume generated successfully",
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
