import prisma from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server"; 
import { getServerSession } from "next-auth";

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
      where: { id: params.reportId },
      data: { status },
    });

    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating report" },
      { status: 500 }
    );
  }
}