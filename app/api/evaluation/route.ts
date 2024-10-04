import { NextRequest, NextResponse } from 'next/server';
 
import { db } from '../../../lib/db'; // Adjust the import based on your file structure
import { playerEvaluation } from '../../../lib/schema'; // Adjust if necessary
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log('Request body:', body); // Log the incoming request body

    try {
        const { reviewTitle, primaryVideoUrl, videoUrl2, videoUrl3, videoDescription, coachId, playerId } = body;
 
        // Await the insertion and ensure you are capturing the result
        const result = await db.insert(playerEvaluation).values({
            player_id: playerId,
            review_title: reviewTitle,
            primary_video_link: primaryVideoUrl,
            video_link_two: videoUrl2,
            video_link_three: videoUrl3,
            video_description: videoDescription,
            coach_id: coachId,
            evaluation_status: "Requested",
            payment_status: "Pending",
            created_at: new Date(),
            updated_at: new Date(),
        }).returning();

       

        return NextResponse.json({ message:"Evaluation Request Submitted Successfully." }, { status: 200 });
    } catch (error) {
        console.error('Error during insertion:', error); // Log the error for debugging
        return NextResponse.json({ message: error.message || 'Failed to insert data' }, { status: 500 });
    }
}



export async function GET(req: NextRequest) {
    
    const url = new URL(req.url);
    const playerId = url.searchParams.get('playerId')?.trim();
    const status = url.searchParams.get('status')?.trim();

 
try{
    const result = await db
        .select()
        .from(playerEvaluation)
        .where(eq(playerEvaluation.player_id, playerId))
        .where(eq(playerEvaluation.evaluation_status, status))
        .execute();
    return NextResponse.json({ message:result,status:status }, { status: 200 });
 
    } catch (error) {
        console.error('Error during insertion:', error); // Log the error for debugging
        return NextResponse.json({ message: error.message || 'Failed to insert data' }, { status: 500 });
    }
}

