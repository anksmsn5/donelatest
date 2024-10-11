// app/api/register/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '../../../../lib/db';
import { playerEvaluation, users, coaches } from '../../../../lib/schema'
import { like } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import next from 'next';




export async function POST(req: NextRequest) {
  try {

    const { userId, status } = await req.json();

    const evaluationsData = await db
      .select({
        first_name: users.first_name,
        last_name: users.last_name,
        position: users.position,
        number: users.number,
        image: users.image,
        team: users.team,
        coachPhoto:coaches.image,
        expectedCharge:coaches.expectedCharge,
        ...playerEvaluation,
      })
      .from(playerEvaluation)
      .innerJoin(users, eq(playerEvaluation.player_id, users.id)) // Assuming user_id is the foreign key in playerEvaluation
      .innerJoin(coaches, eq(playerEvaluation.coach_id, coaches.id)) // Assuming user_id is the foreign key in playerEvaluation
      .where(eq(playerEvaluation.coach_id, userId))
      .where(eq(playerEvaluation.status, status))
      .limit(10) // Limit the number of results to 10
      .execute();

    return NextResponse.json(evaluationsData);

  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {

    const { evaluationId, status } = await req.json();
    const parsedEvaluationId = parseInt(evaluationId, 10);
    
    const result = await db
      .update(playerEvaluation)
      .set({ status:status || undefined }) // Set the new status value
      .where(eq(playerEvaluation.id, parsedEvaluationId)) // Condition for evaluation ID
      .returning();

    return NextResponse.json("Success");

  } catch (error) {
    return NextResponse.json(
      { message: error },
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

    if (isNaN(playerId)){
      return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 });
    }

    console.log('Query parameters:', { playerId, status, search, page, limit, sort });

    console.log('Before executing query...');
    let query = db
      .select({
        firstName: coaches.firstName,
        lastName: coaches.lastName,
        ...playerEvaluation,
      })
      .from(playerEvaluation)
      .innerJoin(coaches, eq(playerEvaluation.coach_id, coaches.id))
      .where(eq(playerEvaluation.player_id, playerId));


    if (status) {
      query = query.where(eq(playerEvaluation.status, status));
    }

    // Execute the query with a limit
    const evaluationsData = await query.limit(limit).execute();
    let filteredData: Evaluation[] = evaluationsData;

    // Filter data based on search
    if (search) {
      filteredData = filteredData.filter(item =>
        item.firstName.toLowerCase().includes((search as string).toLowerCase()) ||
        item.lastName.toLowerCase().includes((search as string).toLowerCase()) ||
        item.review_title.toLowerCase().includes((search as string).toLowerCase()) ||
        item.video_description.toLowerCase().includes((search as string).toLowerCase())
      );
    }

    // Sort data
    if (sort) {
      const [key, order] = (sort as string).split(',');
      filteredData.sort((a, b) => {
        if (order === 'asc') return a[key as keyof Evaluation] > b[key as keyof Evaluation] ? 1 : -1;
        return a[key as keyof Evaluation] < b[key as keyof Evaluation] ? 1 : -1;
      });
    }

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const paginatedData = filteredData.slice(startIndex, startIndex + Number(limit));

    return NextResponse.json({
      data: paginatedData,
      total: filteredData.length,
    });
  } catch (error) {
    console.error('Error details:', error); // Log the error for debugging
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
