// app/api/register/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { playerEvaluation, users, coaches } from '../../../../lib/schema';
import { eq, and } from 'drizzle-orm';

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
        coachPhoto: coaches.image,
        expectedCharge: coaches.expectedCharge,
        evaluationId: playerEvaluation.id, // Select specific columns from playerEvaluation
        reviewTitle: playerEvaluation.review_title, 
        evaluationStatus: playerEvaluation.status,
        createdAt: playerEvaluation.created_at,
        updatedAt: playerEvaluation.updated_at,
      })
      .from(playerEvaluation)
      .innerJoin(users, eq(playerEvaluation.player_id, users.id)) // Assuming player_id is the foreign key in playerEvaluation
      .innerJoin(coaches, eq(playerEvaluation.coach_id, coaches.id)) // Assuming coach_id is the foreign key in playerEvaluation
      .where(
        and(
          eq(playerEvaluation.coach_id, userId),
          eq(playerEvaluation.status, status)
        )
      )
      .limit(10) // Limit the number of results to 10
      .execute();

    return NextResponse.json(evaluationsData);

  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { evaluationId, status } = await req.json();
    const parsedEvaluationId = parseInt(evaluationId, 10);

    const result = await db
      .update(playerEvaluation)
      .set({ status: status || undefined }) // Set the new status value
      .where(eq(playerEvaluation.id, parsedEvaluationId)) // Condition for evaluation ID
      .returning();

    return NextResponse.json("Success");

  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const playerId = Number(url.searchParams.get('playerId'));
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search') || '';
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const sort = url.searchParams.get('sort') || '';

    if (isNaN(playerId)) {
      return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 });
    }

    let query = db
      .select({
        firstName: coaches.firstName,
        lastName: coaches.lastName,
        evaluationId: playerEvaluation.id, // Select specific columns
        reviewTitle: playerEvaluation.review_title,
        evaluationStatus: playerEvaluation.status,
        createdAt: playerEvaluation.created_at,
      })
      .from(playerEvaluation)
      .innerJoin(coaches, eq(playerEvaluation.coach_id, coaches.id))
      .where(eq(playerEvaluation.player_id, playerId));

    if (status) {
      query = query.where(and(eq(playerEvaluation.status, status)));
    }

    // Execute the query with a limit
    const evaluationsData = await query.limit(limit).execute();
    let filteredData = evaluationsData;

    // Filter data based on search
    if (search) {
      filteredData = filteredData.filter(item =>
        item.firstName.toLowerCase().includes(search.toLowerCase()) ||
        item.lastName.toLowerCase().includes(search.toLowerCase()) ||
        item.reviewTitle.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort data
    if (sort) {
      const [key, order] = sort.split(',');
      filteredData.sort((a, b) => {
        if (order === 'asc') return a[key] > b[key] ? 1 : -1;
        return a[key] < b[key] ? 1 : -1;
      });
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedData = filteredData.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      data: paginatedData,
      total: filteredData.length,
    });
  } catch (error) {
    console.error('Error details:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
