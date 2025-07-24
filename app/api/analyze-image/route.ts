import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  try {
    // Parse request body
    const { image } = await request.json();

    // Validate image
    if (!image || typeof image !== "string" || !image.includes(",")) {
      return NextResponse.json(
        { error: "Invalid image data format" },
        { status: 400 }
      );
    }

    const mimeType = image.match(/^data:(.*?);base64/)?.[1] || "image/jpeg";
    const base64Data = image.split(",")[1];

    // Validate MIME type (optional safeguard)
    const supportedTypes = ["image/jpeg", "image/png"];
    if (!supportedTypes.includes(mimeType)) {
      return NextResponse.json(
        { error: `Unsupported image type: ${mimeType}` },
        { status: 415 }
      );
    }

    // Validate base64 size (optional safeguard)
    if (base64Data.length < 1000) {
      return NextResponse.json(
        { error: "Image appears too small or incomplete" },
        { status: 422 }
      );
    }

    // Set up Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Analyze this emergency situation image and respond in this exact format without any asterisks or bullet points:
TITLE: Write a clear, brief title
TYPE: Choose one (Theft, Fire Outbreak, Medical Emergency, Natural Disaster, Violence, or Other)
DESCRIPTION: Write a clear, concise description`;

    // Attempt image analysis
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType,
        },
      },
    ]);

    const text = await result.response.text();

    // Extract structured output using regex
    const titleMatch = text.match(/TITLE:\s*(.+)/);
    const typeMatch = text.match(/TYPE:\s*(.+)/);
    const descMatch = text.match(/DESCRIPTION:\s*(.+)/);

    return NextResponse.json({
      title: titleMatch?.[1]?.trim() || "Untitled",
      reportType: typeMatch?.[1]?.trim() || "Other",
      description: descMatch?.[1]?.trim() || "No description found.",
    });
  } catch (error: any) {
    console.error("🧨 Image analysis failed:", error?.message || error);
    return NextResponse.json(
      { error: "Internal server error during image analysis" },
      { status: 500 }
    );
  }
}
