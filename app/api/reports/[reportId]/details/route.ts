import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,

  { params: rawParams }: { params: Promise<{ reportId: string }> }
) {
  try {

    const params = await rawParams;
    const report = await prisma.report.findUnique({
      where: { reportId: params.reportId },
    });

    return report
      ? NextResponse.json(report)
      : NextResponse.json({ error: "Report not found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching report details:", error);
    return NextResponse.json(
      { error: "Failed to fetch report details" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  
  { params: rawParams }: { params: Promise<{ reportId: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  
    const params = await rawParams;
    const { status } = await request.json();
    const report = await prisma.report.update({
      where: { reportId: params.reportId },
      data: { status },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json(
      { error: "Error updating report" },
      { status: 500 }
    );
  }
}