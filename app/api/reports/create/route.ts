import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ReportType, ReportStatus } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Incoming request body:", body);

    const {
      title,
      description,
      reportType,
      type,
      location,
      latitude,
      longitude,
      image
    } = body;

    if (!title || !description || !reportType || !type) {
      return NextResponse.json({
        error: "Missing required fields",
        received: body
      }, { status: 400 });
    }

   const enumType = type === "EMERGENCY" ? ReportType.EMERGENCY : ReportType.NON_EMERGENCY;

    const newReport = await prisma.report.create({
      data: {
        reportId: uuidv4(),
        title,
        description,
        type: type as ReportType,
        reportType,  
        location,
        latitude,
        longitude,
        image,
        status: ReportStatus.PENDING,
      },
    });

    return NextResponse.json(newReport, { status: 201 });
  } catch (error) {
    console.error("Failed to create report:", error);
    return NextResponse.json({ error: "Failed to create report" }, { status: 500 });
  } finally {
    if (process.env.VERCEL) {
      await prisma.$disconnect();
    }
  }
}
