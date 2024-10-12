// app/api/register/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '../../../lib/db';
import { playerEvaluation, users, coaches } from '../../../lib/schema'
import { like } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { and } from 'drizzle-orm';
import next from 'next';




export async function POST(req: NextRequest) {
  try {
    const { userId, status } = await req.json();

    const evaluationsData = await db
      .select({
        first_name: users.first_name,
        last_name: users.last_name,
        review_title: playerEvaluation.review_title,
        primary_video_link: playerEvaluation.primary_video_link,
        video_link_two: playerEvaluation.video_link_two,
        video_link_three: playerEvaluation.video_link_three,
        video_description: playerEvaluation.video_description,
        status: playerEvaluation.status,
        payment_status: playerEvaluation.payment_status,
        created_at: playerEvaluation.created_at,
        updated_at: playerEvaluation.updated_at,
      })
      .from(playerEvaluation)  // This selects from the `playerEvaluation` table
      .innerJoin(users, eq(playerEvaluation.player_id, users.id)) // Inner join with the `users` table
      .where(
        and(
          eq(playerEvaluation.player_id, userId),     // First condition
          eq(playerEvaluation.status, status)   // Second condition
        )
      )
       // Apply the second filter
      .execute();

    return NextResponse.json(evaluationsData);
  } catch (error) {
    return NextResponse.json(
      { message: "Error in fecthing data" },
      { status: 500 }
    );
  }
}


 

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl;

    const playerId = Number(url.searchParams.get('playerId'));
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search') || '';
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const sort = url.searchParams.get('sort') || '';

    if (isNaN(playerId)) {
      return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 });
    }

    // Build the initial query
    let query = db
      .select({
        firstName: coaches.firstName,
        lastName: coaches.lastName,
        review_title: playerEvaluation.review_title,
        primary_video_link: playerEvaluation.primary_video_link,
        video_link_two: playerEvaluation.video_link_two,
        video_link_three: playerEvaluation.video_link_three,
        video_description: playerEvaluation.video_description,
        status: playerEvaluation.status,
        payment_status: playerEvaluation.payment_status,
        created_at: playerEvaluation.created_at,
        updated_at: playerEvaluation.updated_at,
      })
      .from(playerEvaluation)
      .innerJoin(coaches, eq(playerEvaluation.coach_id, coaches.id))
      .where(eq(playerEvaluation.player_id, playerId));  // Always filter by `playerId`

    // Conditionally add `status` filter if it exists
    if (status) {
      query = query.where(eq(playerEvaluation.status, status));  // Apply the second condition if available
    }

    // Execute the query with a limit
    const evaluationsData = await query.limit(limit).execute();

    let filteredData = evaluationsData;

    // Additional filtering and sorting logic can go here...

    return NextResponse.json({
      data: filteredData,
      total: filteredData.length,
    });
  } catch (error) {
    console.error('Error details:', error); // Log the error for debugging
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}