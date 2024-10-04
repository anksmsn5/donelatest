import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '../../../lib/db';
import { users } from '../../../lib/schema';
import debug from 'debug';
import jwt, { JwtPayload } from 'jsonwebtoken'; // Import JwtPayload
import { SECRET_KEY } from '@/lib/constants';

export async function PATCH(req: NextRequest) {
  const logError = debug('app:error');

  try {
    // Parse the request body
    const body = await req.json();

    // Get the token from the Authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'Authorization header missing' }, { status: 400 });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    // Verify the JWT token
    const decoded = jwt.verify(token, SECRET_KEY); // No type assertion here initially

    // Type guard to check if decoded is JwtPayload
    if (typeof decoded === 'string') {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

    // Safely get userId from decoded, defaulting to null if not found
    const userId = decoded.id || null; // This will set userId to null if decoded.id is undefined or falsy

    if (!userId) {
      return NextResponse.json({ message: 'User ID not found in token' }, { status: 400 });
    }

    // Extract fields from the request body
    const {
      email,
      password,
      first_name,
      last_name,
      grade_level,
      location,
      birthday,
      gender,
      sport,
      team,
      position,
      number,
      image
    } = body;

    // Update the user in the database
    const updatedUser = await db
      .update(users)
      .set({
        first_name: first_name || undefined,
        last_name: last_name || undefined,
        grade_level: grade_level || undefined,
        location: location || undefined,
        birthday: birthday || undefined,
        gender: gender || undefined,
        sport: sport || undefined,
        team: team || undefined,
        position: position || undefined,
        number: number || undefined,
        image: image || undefined
      })
      .where(users.id.eq(userId)) // Update by user ID
      .returning();

    // Respond with the updated user data
    return NextResponse.json({ message: 'User updated successfully', user: updatedUser }, { status: 200 });

  } catch (error) {
    logError('Error updating user: %O', error);
    return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
  }
}
