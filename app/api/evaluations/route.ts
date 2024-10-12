// app/api/register/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '../../../lib/db';
import { playerEvaluation, users, coaches } from '../../../lib/schema'
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
      .innerJoin(users, eq(playerEvaluation.player_id, users.id))
      .where(eq(playerEvaluation.player_id, userId))  // Apply first where condition
      .where(eq(playerEvaluation.status, status))  // Apply second where condition
      .execute();

    return NextResponse.json(evaluationsData);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { playerEvaluation, coaches } from '../../../lib/schema';
import { eq } from 'drizzle-orm';

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

    console.log('Query parameters:', { playerId, status, search, page, limit, sort });

    let query = db
      .select({
        firstName: coaches.first_name,
        lastName: coaches.last_name,
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
      .where(eq(playerEvaluation.player_id, playerId));  // Apply the first condition

    if (status) {
      query = query.where(eq(playerEvaluation.status, status));  // Apply the second condition if available
    }

    const evaluationsData = await query.limit(limit).execute();
    let filteredData: any[] = evaluationsData;

    // Filter data based on search
    if (search) {
      filteredData = filteredData.filter(item =>
        item.firstName.toLowerCase().includes(search.toLowerCase()) ||
        item.lastName.toLowerCase().includes(search.toLowerCase()) ||
        item.review_title.toLowerCase().includes(search.toLowerCase()) ||
        item.video_description.toLowerCase().includes(search.toLowerCase())
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
    console.error('Error details:', error); // Log the error for debugging
    return NextResponse.json({ error: "errror" }, { status: 500 });
  }
}
