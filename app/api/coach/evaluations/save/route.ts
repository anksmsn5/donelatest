// app/api/evaluation/save/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../../../../lib/db'; // Import your Drizzle ORM database instance
import { evaluationResults, playerEvaluation } from '@/lib/schema';
import { eq } from 'drizzle-orm';
export async function POST(req: NextResponse) {
    try {
        const data=await req.json();
        const { evaluationId,playerID,coachID, technicalScores, tacticalScores, physicalScores, technicalRemarks, tacticalRemarks, physicalRemarks, finalRemarks } = data;
        const insertedData = await db.insert(evaluationResults).values({
            evaluationId: evaluationId,
            playerId: playerID,
            coachId: coachID,
            technicalScores: technicalScores,
            tacticalScores: tacticalScores,
            physicalScores: physicalScores,
            technicalRemarks: technicalRemarks,
            tacticalRemarks: tacticalRemarks,
            physicalRemarks: physicalRemarks,
            finalRemarks: finalRemarks,
            createdAt: new Date(),
        }).returning(); 


        const updateEvaluation = await db
        .update(playerEvaluation)
        .set({
          status:2 || undefined
        })
        .where(eq(playerEvaluation.id,evaluationId)) // Update by user ID
        .returning();
         
        return NextResponse.json({ success:"success" });
    } catch (error) {
        console.error('Error saving evaluation results:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
